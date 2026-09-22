"use client";
/* eslint-disable @next/next/no-img-element -- previews use local data URLs before upload. */

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type PortalProps = { authenticated: boolean };

export default function AuthorPortal({ authenticated: initiallyAuthenticated }: PortalProps) {
  const [authenticated, setAuthenticated] = useState(initiallyAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [post, setPost] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const previewImage = useMemo(() => image, [image]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/author/login", {
        method: "POST",
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
    reader.onload = () => setImage(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
    setStatus(null);
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/author/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, post, image }),
      });
      const result = (await response.json()) as { error?: string; slug?: string };
      if (!response.ok) throw new Error(result.error || "Could not publish the article.");
      setStatus(`Published. Vercel will make /articles/${result.slug} available after its GitHub deployment finishes.`);
      setTitle("");
      setSubtitle("");
      setPost("");
      setImage(null);
      setShowPreview(false);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not publish the article.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/author/logout", { method: "POST" });
    setAuthenticated(false);
    setStatus(null);
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
        <div><p className="eyebrow red">AUTHOR STUDIO</p><h1>New article</h1></div>
        <button className="text-button" type="button" onClick={signOut}>Sign out</button>
      </div>
      <form className="author-card author-editor" onSubmit={publish}>
        <label>Feature image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} required={!image} /></label>
        {image && <img className="author-image-preview" src={image} alt="Selected article cover" />}
        <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={140} required /></label>
        <label>Subtitle<input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} maxLength={280} required /></label>
        <label>Post<textarea value={post} onChange={(event) => setPost(event.target.value)} rows={16} required placeholder="Write in Markdown if you want headings, links, or emphasis." /></label>
        {status && <p className={status.startsWith("Published") ? "author-success" : "form-error"} role="status">{status}</p>}
        <div className="author-actions">
          <button className="button outline-button" type="button" onClick={() => setShowPreview((current) => !current)}>{showPreview ? "Hide preview" : "Preview"}</button>
          <button className="button" type="submit" disabled={busy}>{busy ? "Publishing..." : "Publish article"}</button>
        </div>
      </form>
      {showPreview && <article className="author-preview"><p className="eyebrow red">PREVIEW</p>{previewImage && <img src={previewImage} alt="Article cover preview" />}<h1>{title || "Your article title"}</h1><p className="author-preview-subtitle">{subtitle || "Your article subtitle"}</p><div className="author-preview-post">{post || "Your article will appear here."}</div></article>}
    </section>
  );
}
