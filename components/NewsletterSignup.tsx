"use client";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
export default function NewsletterSignup() {
  const [done, setDone] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }
  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-title">
          <h2>
            Join Thousands Building
            <br />a Stronger America
          </h2>
        </div>
        <div className="signup-area">
          {done ? (
            <div className="signup-success" role="status">
              <Check size={24} />
              <div>
                <strong>Thanks for raising your hand.</strong>
                <p>
                  This is a signup preview. Your email has not been stored or
                  subscribed.
                </p>
                <button className="text-button" onClick={() => setDone(false)}>
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
                <button className="button" type="submit">
                  Join now
                </button>
              </div>
              <p className="form-note" id="signup-note">
                Get the latest articles, videos, and event updates.
                <span>Signup preview · Subscriptions coming soon.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
