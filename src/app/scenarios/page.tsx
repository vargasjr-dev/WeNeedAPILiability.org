import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllScenarios, ScenarioData } from "@/lib/scenarios";

export default async function ScenariosPage() {
  const scenarios = await getAllScenarios();

  return (
    <div className="min-h-screen bg-white">
      <Nav currentPage="scenarios" />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Real-World Scenarios
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Understanding how accountability breaks down in practice helps
            clarify why human-mapped liability matters. Click on any scenario
            below to learn more about how clear liability rules would change the
            incentives for everyone involved.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.slug}
              href={`/scenarios/${scenario.slug}`}
              className="group block border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:border-slate-400 hover:shadow-lg hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors">
                {scenario.title}
              </h2>
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {scenario.description}
              </p>
              <div className="mt-4 flex items-center text-slate-600 group-hover:text-slate-800 transition-colors">
                <span className="text-sm font-medium">Read more</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export type { ScenarioData };
