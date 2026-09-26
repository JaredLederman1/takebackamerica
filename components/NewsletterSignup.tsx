"use client";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

export default function NewsletterSignup({ standalone = false }: { standalone?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    form.submit();
    setStatus("success");
    form.reset();
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
          <iframe
            aria-hidden="true"
            className="sr-only"
            name="substack-newsletter-signup"
            tabIndex={-1}
            title="Substack newsletter signup"
          />
          {status === "success" ? (
            <div className="signup-success" role="status">
              <Check size={24} />
              <div>
                <strong>Thanks for raising your hand.</strong>
                <p>Check your inbox to confirm your Substack subscription.</p>
                <button className="text-button" type="button" onClick={() => setStatus("idle")}>
                  Back to signup
                </button>
              </div>
            </div>
          ) : (
            <form
              action="https://jaredlederman.substack.com/api/v1/free?nojs=true"
              method="post"
              onSubmit={submit}
              target="substack-newsletter-signup"
            >
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
                <button className="button" type="submit">
                  Join now
                </button>
              </div>
              <p className="form-note" id="signup-note">
                Get the latest articles, videos, and event updates.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
