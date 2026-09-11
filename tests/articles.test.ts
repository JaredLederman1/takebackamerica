import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getAllArticles, getArticleBySlug } from "../lib/articles";
test("sample articles are complete, sorted and retrievable", () => {
  const articles = getAllArticles();
  assert.ok(articles.length >= 3);
  assert.deepEqual(
    articles.map((a) => a.date),
    articles
      .map((a) => a.date)
      .sort()
      .reverse(),
  );
  for (const a of articles) {
    assert.equal(getArticleBySlug(a.slug)?.title, a.title);
    assert.ok(a.content.length > 100);
    assert.ok(a.readingTime > 0);
  }
  assert.equal(getArticleBySlug("../no-such-article"), undefined);
});
test("new files are discovered automatically and duplicate slugs fail clearly", () => {
  const file = "content/articles/test-publishing.mdx";
  try {
    fs.writeFileSync(
      file,
      '---\ntitle: "Publishing test"\nslug: "publishing-test"\nexcerpt: "Test"\ndate: "2026-09-11"\nauthor: "Editor"\ncategory: "Test"\nimage: "/images/hero.jpg"\nfeatured: false\n---\nTest content.',
    );
    assert.equal(getAllArticles()[0].slug, "publishing-test");
    fs.writeFileSync(
      file,
      fs
        .readFileSync(file, "utf8")
        .replace("publishing-test", "competence-not-complacency"),
    );
    assert.throws(() => getAllArticles(), /unique/);
  } finally {
    fs.rmSync(file, { force: true });
  }
});
