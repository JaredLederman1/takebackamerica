import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getAllArticles, getArticleBySlug } from "../lib/articles";
test("an empty article directory returns no articles", () => {
  const articles = getAllArticles();
  assert.deepEqual(articles, []);
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
        .replace("publishing-test", "publishing-test-duplicate"),
    );
    fs.writeFileSync(
      "content/articles/test-publishing-duplicate.mdx",
      fs.readFileSync(file, "utf8"),
    );
    assert.throws(() => getAllArticles(), /unique/);
  } finally {
    fs.rmSync(file, { force: true });
    fs.rmSync("content/articles/test-publishing-duplicate.mdx", { force: true });
  }
});
