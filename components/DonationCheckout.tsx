"use client";

import { useState, type FormEvent } from "react";

const SUGGESTED_AMOUNTS = [10, 25, 50, 100];

export default function DonationCheckout() {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const chosenAmount = customAmount ? Number(customAmount) : amount;

    if (!Number.isFinite(chosenAmount) || chosenAmount < 1) {
      setError("Choose a contribution amount of at least $1.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(chosenAmount * 100) }),
      });

      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Checkout is unavailable right now. Please try again later.");
      }

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) throw new Error(data.error ?? "Unable to start checkout.");

      window.location.assign(data.url);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to start checkout.");
      setIsLoading(false);
    }
  }

  return (
    <form className="donation-form" onSubmit={checkout}>
      <fieldset disabled={isLoading}>
        <legend>Choose your contribution</legend>
        <div className="donation-amounts">
          {SUGGESTED_AMOUNTS.map((suggestedAmount) => (
            <button
              className={customAmount === "" && amount === suggestedAmount ? "selected" : ""}
              key={suggestedAmount}
              onClick={() => {
                setAmount(suggestedAmount);
                setCustomAmount("");
              }}
              type="button"
            >
              ${suggestedAmount}
            </button>
          ))}
        </div>
        <label htmlFor="custom-contribution">Or enter another amount</label>
        <div className="custom-amount">
          <span aria-hidden="true">$</span>
          <input
            id="custom-contribution"
            inputMode="decimal"
            min="1"
            onChange={(event) => setCustomAmount(event.target.value)}
            placeholder="Other amount"
            step="0.01"
            type="number"
            value={customAmount}
          />
        </div>
      </fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={isLoading}>
        {isLoading ? "Opening checkout..." : "Continue"}
      </button>
      <p className="donation-note">
        Contributions support Take Back America&apos;s media work. They are not tax-deductible.
      </p>
    </form>
  );
}
