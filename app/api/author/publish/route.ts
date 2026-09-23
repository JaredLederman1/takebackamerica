import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import matter from "gray-matter";
import { authorSessionCookie, isAuthorSession } from "@/lib/author-auth";

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const IMAGE_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

type PublishRequest = {
  title?: unknown;
  subtitle?: unknown;
  post?: unknown;
  image?: unknown;
  imagePosition?: unknown;
  slug?: unknown;
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-+$/, "");
}

function yaml(value: string) {
  return JSON.stringify(value);
}

function getImage(image: unknown) {
  if (typeof image !== "string") return null;
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(image);
  if (!match) return null;
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > MAX_IMAGE_BYTES) return null;
  return { buffer, extension: IMAGE_TYPES.get(match[1])! };
}

function getImagePosition(position: unknown) {
  if (!position || typeof position !== "object") return "50% 50%";
  const { x, y } = position as { x?: unknown; y?: unknown };
  if (typeof x !== "number" || typeof y !== "number" || !Number.isFinite(x) || !Number.isFinite(y) || x < 0 || x > 100 || y < 0 || y > 100) return null;
  return `${Math.round(x)}% ${Math.round(y)}%`;
}

function isImagePath(value: unknown): value is string {
  return typeof value === "string" && /^\/images\/[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value);
}

async function githubRequest(path: string, init: RequestInit) {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY || "JaredLederman1/takebackamerica";
  if (!token) throw new Error("Publishing is not configured.");

  return fetch(`https://api.github.com/repos/${repository}/contents/${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
    cache: "no-store",
  });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthorSession(cookieStore.get(authorSessionCookie.name)?.value)) {
    return NextResponse.json({ error: "Sign in to publish an article." }, { status: 401 });
  }

  let body: PublishRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (
    typeof body.title !== "string" ||
    typeof body.subtitle !== "string" ||
    typeof body.post !== "string" ||
    !body.title.trim() ||
    !body.subtitle.trim() ||
    !body.post.trim()
  ) {
    return NextResponse.json({ error: "An image, title, subtitle, and post are required." }, { status: 400 });
  }

  const image = getImage(body.image);
  const imagePosition = getImagePosition(body.imagePosition);
  const requestedSlug = typeof body.slug === "string" ? body.slug : undefined;
  const slug = requestedSlug || slugify(body.title);
  const editing = Boolean(requestedSlug);
  if ((!image && !editing) || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !imagePosition) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image under 5 MB and a valid title." }, { status: 400 });
  }

  const branch = process.env.GITHUB_BRANCH || "main";
  const articlePath = `content/articles/${slug}.mdx`;
  const existing = await githubRequest(`${articlePath}?ref=${encodeURIComponent(branch)}`, {
    method: "GET",
  });
  if (!editing && existing.ok) {
    return NextResponse.json({ error: "An article with that title already exists." }, { status: 409 });
  }
  if (!editing && existing.status !== 404) {
    return NextResponse.json({ error: "Could not check the article destination." }, { status: 502 });
  }
  if (editing && !existing.ok) {
    return NextResponse.json({ error: "Could not find the article to update." }, { status: 404 });
  }

  let existingSha: string | undefined;
  let existingDate: string | undefined;
  let existingImage: string | undefined;
  if (editing) {
    const existingArticle = await existing.json() as { sha?: unknown; content?: unknown; encoding?: unknown };
    if (typeof existingArticle.sha !== "string" || typeof existingArticle.content !== "string" || existingArticle.encoding !== "base64") {
      return NextResponse.json({ error: "Could not read the article to update." }, { status: 502 });
    }
    existingSha = existingArticle.sha;
    const parsed = matter(Buffer.from(existingArticle.content.replace(/\n/g, ""), "base64").toString("utf8"));
    existingDate = typeof parsed.data.date === "string" ? parsed.data.date : undefined;
    existingImage = isImagePath(parsed.data.image) ? parsed.data.image : undefined;
  }

  let imagePublicPath = existingImage;
  if (image) {
    const imageName = `${slug}-${Date.now()}.${image.extension}`;
    const imageUpload = await githubRequest(`public/images/${imageName}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `Add image for ${body.title.trim()}`,
        content: image.buffer.toString("base64"),
        branch,
      }),
    });
    if (!imageUpload.ok) {
      return NextResponse.json({ error: "Could not upload the article image." }, { status: 502 });
    }
    imagePublicPath = `/images/${imageName}`;
  }
  if (!imagePublicPath) return NextResponse.json({ error: "A feature image is required." }, { status: 400 });

  const article = `---\ntitle: ${yaml(body.title.trim())}\nslug: ${yaml(slug)}\nexcerpt: ${yaml(body.subtitle.trim())}\ndate: ${yaml(existingDate || new Date().toISOString().slice(0, 10))}\nauthor: ${yaml("Jared Lederman")}\ncategory: ${yaml("Commentary")}\nimage: ${yaml(imagePublicPath)}\nimagePosition: ${yaml(imagePosition)}\nfeatured: false\n---\n\n${body.post.trim()}\n`;
  const articleUpload = await githubRequest(articlePath, {
    method: "PUT",
    body: JSON.stringify({
      message: `Publish ${body.title.trim()}`,
      content: Buffer.from(article).toString("base64"),
      branch,
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  });
  if (!articleUpload.ok) {
    return NextResponse.json({ error: "Image uploaded, but the article could not be published." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, slug });
}
