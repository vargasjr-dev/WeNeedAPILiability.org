"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing.");
        setEmail("");
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
              <Link href="/news" className="text-gray-600 hover:text-gray-900">
                News
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Every Automated Action Should Have a Human Accountable
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            As autonomous systems increasingly act on our behalf, we need clear rules about who is responsible when things go wrong. This proposal ensures that every API call with real-world effects maps to a specific, liable human being.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Problem</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Software systems are increasingly autonomous. AI agents book flights, execute trades, issue refunds, and manage infrastructure without direct human oversight. When these systems cause harm, determining who is responsible has become genuinely difficult.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Current legal frameworks were designed for a world where humans made decisions and machines executed them. That assumption no longer holds. The result is a growing accountability gap: systems act, consequences follow, but no one is clearly responsible.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Proposal</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We propose a simple principle: every automated action that has real-world effects must be legally attributable to a specific human individual. This does not mean humans must approve every action in advance. It means that when an autonomous system acts, there must be a designated person who bears responsibility for that action.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This could be the developer who deployed the system, the operator who configured it, or the executive who authorized its use. The specific allocation can vary by context. What matters is that the chain of accountability never breaks.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why This Preserves Innovation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This proposal does not slow down AI development or restrict what autonomous systems can do. It simply ensures that the people who benefit from deploying these systems also bear the risks. This is how liability has always worked for other technologies.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Clear accountability rules actually help innovation by providing legal certainty. Builders can deploy autonomous systems knowing exactly what their obligations are. Users can trust these systems knowing that someone stands behind them. Markets function better when responsibility is clear.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who This Is For</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This proposal is relevant to policymakers drafting AI governance frameworks, technologists building autonomous systems, and anyone affected by automated decisions. It offers a practical framework that works within existing legal traditions while addressing genuinely new challenges.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are not anti-technology. We believe AI systems will continue to become more capable and more autonomous. The question is not whether to allow this, but how to ensure it happens responsibly.
          </p>
        </section>

        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Stay Informed</h2>
          <p className="text-gray-600 mb-6">
            Get updates on the proposal and related developments.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`mt-3 text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}>
              {message}
            </p>
          )}
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 mb-2">
            This is an advocacy project, not legal advice. The content on this site represents policy proposals and educational material, not professional legal counsel.
          </p>
          <p className="text-sm text-gray-500">
            Maintained by David Vargas. Questions or feedback: contact via the email list.
          </p>
        </div>
      </footer>
    </div>
  );
}
