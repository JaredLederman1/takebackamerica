"use client";
import { useState } from "react";
import { Share2 } from "lucide-react";
export default function ShareButton() {
  const [message, setMessage] = useState("");
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("Link copied");
    } catch {
      setMessage("Copy the link from your address bar");
    }
  }
  return (
    <div>
      <button type="button" className="share-button" onClick={share}>
        <Share2 size={16} /> Copy article link
      </button>
      <span role="status" className="meta">
        {message}
      </span>
    </div>
  );
}
