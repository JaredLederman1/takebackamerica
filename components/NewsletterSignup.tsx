export default function NewsletterSignup({ standalone = false }: { standalone?: boolean }) {
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
          <form
            action="https://jaredlederman.substack.com/api/v1/free?nojs=true"
            method="post"
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
        </div>
      </div>
    </section>
  );
}
