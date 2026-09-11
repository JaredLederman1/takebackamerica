"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
export default function NewsletterSignup() {
  const [done, setDone] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }
  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div>
          <span className="eyebrow">THE NEXT CHAPTER STARTS WITH YOU</span>
          <h2>
            Join Thousands Building
            <br />a Stronger America<span>.</span>
          </h2>
          <p>Fresh ideas. Meaningful conversations. A higher standard.</p>
        </div>
        <div className="signup-area">
          {done ? (
            <div className="signup-success" role="status">
              <Check />
              <div>
                <strong>Thanks for raising your hand.</strong>
                <p>
                  This signup is a preview. Your email hasn’t been stored or
                  subscribed yet.
                </p>
                <button className="text-button" onClick={() => setDone(false)}>
                  Back to signup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor="newsletter-email">Your email address</label>
              <div className="email-row">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  maxLength={254}
                />
                <button className="button" type="submit">
                  Count me in <ArrowRight size={17} />
                </button>
              </div>
              <p className="form-note">
                Signup preview. Email subscriptions are coming soon.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
