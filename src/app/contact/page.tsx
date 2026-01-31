"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, body }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for your message. We will get back to you soon.");
        setEmail("");
        setBody("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-gray-900">
              API Liability
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/proposal" className="text-gray-600 hover:text-gray-900">
                Proposal
              </Link>
              <Link href="/scenarios" className="text-gray-600 hover:text-gray-900">
                Scenarios
              </Link>
              <Link href="/roadmap" className="text-gray-600 hover:text-gray-900">
                Roadmap
              </Link>
              <Link href="/news" className="text-gray-600 hover:text-gray-900">
                News
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Have questions, feedback, or want to get involved? We would love to hear from you. Fill out the form below and we will get back to you as soon as possible.
          </p>
        </header>

        <div className="max-w-xl">
          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Message Sent</h2>
              <p className="text-green-700">{message}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-green-800 underline hover:no-underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-y"
                  disabled={status === "loading"}
                />
              </div>

              {message && status === "error" && (
                <p className="text-red-700 text-sm">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 mb-2">
            This is an advocacy project, not legal advice. The content on this site represents policy proposals and educational material, not professional legal counsel.
          </p>
          <p className="text-sm text-gray-500">
            Maintained by{" "}
            <a 
              href="https://twitter.com/dvargas92495" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 underline"
            >
              David Vargas Fuertes
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
