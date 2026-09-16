"use client";
import { useState, type FormEvent } from "react";
import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/articles";
export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [term, setTerm] = useState("");
  if (articles.length === 0) {
    return (
      <div className="empty-results">
        <h2>Articles coming soon.</h2>
        <p>Check back soon for the latest from Take Back America.</p>
      </div>
    );
  }
  const filtered = articles.filter((a) =>
    `${a.title} ${a.excerpt} ${a.category}`
      .toLowerCase()
      .includes(term.toLowerCase()),
  );
  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTerm(query.trim());
  }
  return (
    <>
      <form
        id="search"
        role="search"
        className="article-search"
        onSubmit={search}
      >
        <input
          aria-label="Search articles"
          type="search"
          placeholder="Search ideas, topics, and articles"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) setTerm("");
          }}
        />
        <button className="button">Search</button>
      </form>
      {term && (
        <p role="status" className="meta">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"} for
          “{term}”
        </p>
      )}
      {filtered.length ? (
        <div className="article-index-grid">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <h2>No articles found.</h2>
          <p>Try a different word, or browse all our ideas.</p>
          <button
            className="button"
            onClick={() => {
              setTerm("");
              setQuery("");
            }}
          >
            Show all articles
          </button>
        </div>
      )}
    </>
  );
}
