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
                Every Automated Action Needs an Accountable Human.
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                As autonomous systems increasingly act on our behalf, we need
                clear rules about who is responsible, to incentivize against
                harmful actions.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                This proposal ensures that every API call maps to a specific,
                liable human being.
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
            Software systems are increasingly capable of acting with meaningful
            autonomy, operating beyond continuous human direction or
            understanding. As autonomy increases, recent public experiments have
            shown autonomous systems discussing private communication channels
            and internal conventions that are intentionally not readily
            interpretable by humans. While not initially dangerous, these
            developments mark a clear shift toward software that can act in the
            world without direct, ongoing human accountability, a strict
            requirement for every AI risk takeoff scenario.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our legal and institutional frameworks were built on a simple
            assumption: autonomy implies responsibility. When a system takes a
            consequential action, there is a clearly identifiable human who can
            be held accountable for it. That assumption is beginning to break
            down. As responsibility becomes diffuse, incentives weaken for
            ensuring these systems are aligned with human interests. At scale,
            we can lose control of how these systems impact our health, safety,
            and well-being.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            The Proposal
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We propose a simple principle:{" "}
            <span className="font-bold">
              every automated action must be legally attributable to a specific
              human individual.
            </span>{" "}
            This does not mean humans must approve every action in advance. It
            means that when an autonomous system acts, there must be a clear
            audit trail to the designated person who bears responsibility for
            that action.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This could be the developer who deployed the system, the operator
            who configured it, or the executive who authorized its use. The
            specific allocation can vary by context, which our proposal and this
            website will detail. What matters is that the chain of
            accountability is never broken.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why This Works
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Across history, the most reliable way societies have reduced
            collective harm is by tying real-world actions to clear human
            accountability. Laws governing finance, transportation, medicine,
            and infrastructure all follow the same pattern: when someone can
            cause meaningful impact, someone must also bear responsibility for
            the outcome. This principle does not prevent progress. It defines
            the rules of competition that allows organizations to scale.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Applying this principle to autonomous systems ensures that
            responsibility does not disappear as software becomes more capable.
            When accountability is explicit and personal, builders are
            incentivized away from system designs that make alignment difficut.
            That includes private agent-to-agent communication channels,
            mechanisms that reduce interpretability, and weak audit trails.
            Clear liability pushes the industry toward systems that remain
            legible, attributable, and controllable as autonomy increases.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Goal
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We want to preserve accountability as AI systems become more capable
            and more autonomous. This proposal does not limit innovation or slow
            deployment. It reinforces a principle that has long enabled progress
            at scale: when systems take consequential actions, a clearly
            identifiable human must stand behind them. By maintaining this link
            between autonomy and responsibility, we can continue advancing AI
            while keeping its impacts aligned with human interests.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This website exists to develop and communicate that principle in a
            form usable by policymakers. It is a working space for articulating
            the proposal, testing it against real-world scenarios, and tracking
            how emerging regulatory developments affect the case for
            human-mapped liability. The intent is to establish the foundation
            for a comprehensive accountability framework: to actively shape the
            policies, regulations, and tools required to ensure autonomous
            systems remain under meaningful human control.
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
