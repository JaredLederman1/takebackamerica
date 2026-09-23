"use client";
/* eslint-disable @next/next/no-img-element -- previews use local data URLs before upload. */

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type PointerEvent } from "react";
import type { Article } from "@/lib/articles";

type PortalProps = { authenticated: boolean; initialArticle?: Article };
const DRAFT_KEY = "tba-author-draft-v1";
type ImagePosition = { x: number; y: number };
const DEFAULT_IMAGE_POSITION: ImagePosition = { x: 50, y: 50 };

function imageObjectPosition(position: ImagePosition) {
  return `${position.x}% ${position.y}%`;
}

function renderPostPreview(post: string) {
  const blocks = post.trim().split(/\n\s*\n/).filter(Boolean);
  if (!blocks.length) return <p>Your article will appear here.</p>;

  return blocks.map((block, index) => {
    const text = block.trim();
    if (text.startsWith("## ")) return <h2 key={index}>{text.slice(3)}</h2>;
    if (text.startsWith("### ")) return <h3 key={index}>{text.slice(4)}</h3>;
    if (text.startsWith("> ")) return <blockquote key={index}><p>{text.replace(/^>\s?/gm, "")}</p></blockquote>;
    if (text.split("\n").every((line) => line.startsWith("- "))) {
      return <ul key={index}>{text.split("\n").map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    }
    return <p key={index}>{text.replace(/\n/g, " ")}</p>;
  });
}

export default function AuthorPortal({ authenticated: initiallyAuthenticated, initialArticle }: PortalProps) {
  const [authenticated, setAuthenticated] = useState(initiallyAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState(initialArticle?.title || "");
  const [subtitle, setSubtitle] = useState(initialArticle?.excerpt || "");
  const [post, setPost] = useState(initialArticle?.content || "");
  const [image, setImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState<ImagePosition>(() => {
    const [x = "50", y = "50"] = initialArticle?.imagePosition?.match(/\d+/g) || [];
    return { x: Number(x), y: Number(y) };
  });
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const previewImage = useMemo(() => image, [image]);

  useEffect(() => {
    if (!authenticated) return;
    const savedDraft = window.localStorage.getItem(DRAFT_KEY);
    if (!savedDraft) return;
    try {
      const draft = JSON.parse(savedDraft) as { title?: string; subtitle?: string; post?: string; image?: string; imagePosition?: ImagePosition };
      const restoreFrame = window.requestAnimationFrame(() => {
        setTitle(draft.title || "");
        setSubtitle(draft.subtitle || "");
        setPost(draft.post || "");
        setImage(draft.image || null);
        setImagePosition(draft.imagePosition || DEFAULT_IMAGE_POSITION);
        setDraftStatus("Saved draft restored from this browser.");
      });
      return () => window.cancelAnimationFrame(restoreFrame);
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  }, [authenticated]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/author/login/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not sign in.");
      setPassword("");
      setAuthenticated(true);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/image\/(jpeg|png|webp)/.test(file.type) || file.size > 3 * 1024 * 1024) {
      setStatus("Choose a JPG, PNG, or WebP image under 3 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(typeof reader.result === "string" ? reader.result : null);
      setImagePosition(DEFAULT_IMAGE_POSITION);
    };
    reader.readAsDataURL(file);
    setStatus(null);
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/author/publish/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, post, image, imagePosition, slug: initialArticle?.slug }),
      });
      const result = (await response.json()) as { error?: string; slug?: string };
      if (!response.ok) throw new Error(result.error || "Could not publish the article.");
      setStatus(`${initialArticle ? "Updated" : "Published"}. Vercel will make /articles/${result.slug} available after its GitHub deployment finishes.`);
      setTitle("");
      setSubtitle("");
      setPost("");
      setImage(null);
      setImagePosition(DEFAULT_IMAGE_POSITION);
      setShowPreview(false);
      window.localStorage.removeItem(DRAFT_KEY);
      setDraftStatus(null);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not publish the article.");
    } finally {
      setBusy(false);
    }
  }

  function saveDraft() {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, subtitle, post, image, imagePosition }));
      setDraftStatus("Draft saved to this browser.");
    } catch {
      setDraftStatus("This draft is too large to save in this browser.");
    }
  }

  function clearDraft() {
    window.localStorage.removeItem(DRAFT_KEY);
    setTitle("");
    setSubtitle("");
    setPost("");
    setImage(null);
    setImagePosition(DEFAULT_IMAGE_POSITION);
    setShowPreview(false);
    setDraftStatus("Draft cleared.");
  }

  async function signOut() {
    await fetch("/api/author/logout/", { method: "POST", credentials: "same-origin" });
    setAuthenticated(false);
    setStatus(null);
  }

  function setFocalPoint(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setImagePosition({
      x: Math.round(Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100))),
      y: Math.round(Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100))),
    });
  }

  if (!authenticated) {
    return (
      <section className="author-page">
        <form className="author-card author-login" onSubmit={signIn}>
          <div className="author-login-brand" aria-hidden="true">TBA</div>
          <h1>Sign in</h1>
          <p>Enter your credentials to continue.</p>
          <label>
            Email address
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
          </label>
          {status && <p className="form-error" role="alert">{status}</p>}
          <button className="button" type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
        </form>
      </section>
    );
  }

  return (
    <section className="author-page">
      <div className="author-heading">
        <div><p className="eyebrow red">AUTHOR STUDIO</p><h1>{initialArticle ? "Edit article" : "New article"}</h1></div>
        <button className="text-button" type="button" onClick={signOut}>Sign out</button>
      </div>
      <form className="author-card author-editor" onSubmit={publish}>
        <label>Feature image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} required={!image && !initialArticle?.image} /></label>
        {!image && initialArticle?.image && <p className="author-crop-help">Current feature image will be kept unless you choose a replacement.</p>}
        {image && <>
          <div
            className="author-crop-control"
            onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setFocalPoint(event); }}
            onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) setFocalPoint(event); }}
            onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
            role="presentation"
          >
            <img className="author-image-preview" src={image} alt="Drag to place the article image focal point" style={{ objectPosition: imageObjectPosition(imagePosition) }} />
            <span className="author-crop-target" style={{ left: `${imagePosition.x}%`, top: `${imagePosition.y}%` }} aria-hidden="true" />
          </div>
          <p className="author-crop-help">Drag the target onto the subject you want kept in the article crop.</p>
          <div className="author-crop-ranges">
            <label>Horizontal focus<input type="range" min="0" max="100" value={imagePosition.x} onChange={(event) => setImagePosition((current) => ({ ...current, x: Number(event.target.value) }))} /></label>
            <label>Vertical focus<input type="range" min="0" max="100" value={imagePosition.y} onChange={(event) => setImagePosition((current) => ({ ...current, y: Number(event.target.value) }))} /></label>
          </div>
        </>}
        <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={140} required /></label>
        <label>Subtitle<input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} maxLength={280} required /></label>
        <label>Post<textarea value={post} onChange={(event) => setPost(event.target.value)} rows={16} required placeholder="Write in Markdown if you want headings, links, or emphasis." /></label>
        {status && <p className={status.startsWith("Published") ? "author-success" : "form-error"} role="status">{status}</p>}
        {draftStatus && <p className="author-draft-status" role="status">{draftStatus}</p>}
        <div className="author-actions">
          <button className="text-button" type="button" onClick={clearDraft}>Clear draft</button>
          <button className="button outline-button" type="button" onClick={saveDraft}>Save draft</button>
          <button className="button outline-button" type="button" onClick={() => setShowPreview((current) => !current)}>{showPreview ? "Hide preview" : "Preview"}</button>
          <button className="button" type="submit" disabled={busy}>{busy ? (initialArticle ? "Updating..." : "Publishing...") : (initialArticle ? "Update article" : "Publish article")}</button>
        </div>
      </form>
      {showPreview && (
        <article className="author-preview" aria-label="Article preview">
          <header className="container article-heading article-feature-header">
            <div className="article-feature-copy">
              <h1>{title || "Your article title"}</h1>
              <p className="article-deck">{subtitle || "Your article subtitle"}</p>
              <div className="article-feature-byline">
                <img src="/images/jared-lederman.png" alt="Jared Lederman" width={64} height={64} />
                <div>
                  <span>By Jared Lederman</span>
                  <time dateTime={new Date().toISOString().slice(0, 10)}>
                    {new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date())}
                  </time>
                  <i aria-hidden="true" />
                </div>
              </div>
            </div>
            {previewImage && <div className="article-feature-image"><img src={previewImage} alt="Article cover preview" style={{ objectPosition: imageObjectPosition(imagePosition) }} /></div>}
          </header>
          <div className="container prose article-prose">
            {renderPostPreview(post)}
            <p className="photo-credit">Photo by Caleb Ekeroth on Unsplash</p>
          </div>
          <aside className="container author-profile" aria-label="About the author">
            <img src="/images/jared-lederman.png" alt="Jared Lederman" width={160} height={160} />
            <div>
              <span className="eyebrow red">About the author</span>
              <h2>Jared Lederman</h2>
              <p>Jared Lederman is the founder of Take Back America and a senior at Cornell University. He writes on culture, family, faith, and the responsibilities that shape a stronger America.</p>
            </div>
          </aside>
        </article>
      )}
    </section>
  );
}
