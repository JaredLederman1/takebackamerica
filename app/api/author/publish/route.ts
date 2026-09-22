import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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
  const slug = slugify(body.title);
  if (!image || !slug) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image under 5 MB and a valid title." }, { status: 400 });
  }

  const branch = process.env.GITHUB_BRANCH || "main";
  const articlePath = `content/articles/${slug}.mdx`;
  const existing = await githubRequest(`${articlePath}?ref=${encodeURIComponent(branch)}`, {
    method: "GET",
  });
  if (existing.ok) {
    return NextResponse.json({ error: "An article with that title already exists." }, { status: 409 });
  }
  if (existing.status !== 404) {
    return NextResponse.json({ error: "Could not check the article destination." }, { status: 502 });
  }

  const imageName = `${slug}-${Date.now()}.${image.extension}`;
  const imagePath = `public/images/${imageName}`;
  const imageUpload = await githubRequest(imagePath, {
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

  const article = `---\ntitle: ${yaml(body.title.trim())}\nslug: ${yaml(slug)}\nexcerpt: ${yaml(body.subtitle.trim())}\ndate: ${yaml(new Date().toISOString().slice(0, 10))}\nauthor: ${yaml("Jared Lederman")}\ncategory: ${yaml("Commentary")}\nimage: ${yaml(`/images/${imageName}`)}\nfeatured: false\n---\n\n${body.post.trim()}\n`;
  const articleUpload = await githubRequest(articlePath, {
    method: "PUT",
    body: JSON.stringify({
      message: `Publish ${body.title.trim()}`,
      content: Buffer.from(article).toString("base64"),
      branch,
    }),
  });
  if (!articleUpload.ok) {
    return NextResponse.json({ error: "Image uploaded, but the article could not be published." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, slug });
}
