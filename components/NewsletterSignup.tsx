"use client";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

export default function NewsletterSignup({ standalone = false }: { standalone?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email !== "string") return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Newsletter signup failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <section className={`newsletter ${standalone ? "newsletter-standalone" : ""}`} id="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-title">
          <h2>
            Join Thousands Building
            <br />a Stronger America
          </h2>
        </div>
        <div className="signup-area">
          {status === "success" ? (
            <div className="signup-success" role="status">
              <Check size={24} />
              <div>
                <strong>Thanks for raising your hand.</strong>
                <p>Check your inbox to confirm your Substack subscription.</p>
                <button className="text-button" onClick={() => setStatus("idle")}>
                  Back to signup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Your email address
              </label>
              <div className="email-row">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  aria-describedby="signup-note"
                />
                <button className="button" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Joining..." : "Join now"}
                </button>
              </div>
              <p className="form-note" id="signup-note">
                Get the latest articles, videos, and event updates.
              </p>
              {status === "error" && (
                <p className="form-error" role="alert">We couldn&apos;t add you right now. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
