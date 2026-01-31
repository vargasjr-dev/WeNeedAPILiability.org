"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function EmailSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
    <div>
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
        <p
          className={`mt-3 text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const scrollToContent = () => {
    document
      .getElementById("main-content")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav currentPage="home" variant="dark" />

      <section className="relative min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 pt-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Every Automated Action Should Have a Human Accountable.
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                As autonomous systems increasingly act on our behalf, we need
                clear rules about who is responsible when things go wrong.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                This proposal ensures that every API call with real-world
                effects maps to a specific, liable human being.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg shadow-2xl transform rotate-3 flex items-center justify-center border border-slate-600">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-600 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      API Liability Framework
                    </h3>
                    <p className="text-slate-400 text-sm">
                      A policy proposal for human accountability in autonomous
                      systems
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-72 h-96 bg-slate-900/50 rounded-lg -z-10 transform -rotate-3" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white transition-all cursor-pointer flex flex-col items-center gap-2"
        >
          <span>Read more</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </section>

      <main id="main-content" className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            The Problem
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Software systems are increasingly autonomous. AI agents book
            flights, execute trades, issue refunds, and manage infrastructure
            without direct human oversight. When these systems cause harm,
            determining who is responsible has become genuinely difficult.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Current legal frameworks were designed for a world where humans made
            decisions and machines executed them. That assumption no longer
            holds. The result is a growing accountability gap: systems act,
            consequences follow, but no one is clearly responsible.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            The Proposal
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We propose a simple principle: every automated action that has
            real-world effects must be legally attributable to a specific human
            individual. This does not mean humans must approve every action in
            advance. It means that when an autonomous system acts, there must be
            a designated person who bears responsibility for that action.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This could be the developer who deployed the system, the operator
            who configured it, or the executive who authorized its use. The
            specific allocation can vary by context. What matters is that the
            chain of accountability never breaks.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why This Preserves Innovation
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This proposal does not slow down AI development or restrict what
            autonomous systems can do. It simply ensures that the people who
            benefit from deploying these systems also bear the risks. This is
            how liability has always worked for other technologies.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Clear accountability rules actually help innovation by providing
            legal certainty. Builders can deploy autonomous systems knowing
            exactly what their obligations are. Users can trust these systems
            knowing that someone stands behind them. Markets function better
            when responsibility is clear.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Who This Is For
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This proposal is relevant to policymakers drafting AI governance
            frameworks, technologists building autonomous systems, and anyone
            affected by automated decisions. It offers a practical framework
            that works within existing legal traditions while addressing
            genuinely new challenges.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are not anti-technology. We believe AI systems will continue to
            become more capable and more autonomous. The question is not whether
            to allow this, but how to ensure it happens responsibly.
          </p>
        </section>

        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get updates on the proposal and related developments.
          </p>
          <EmailSubscribeForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
