import Link from "next/link";
import { notFound } from "next/navigation";
import { getScenarioBySlug, initializeDatabase } from "@/lib/db";
import { hardcodedScenarios, ScenarioData } from "../page";

async function getScenario(slug: string): Promise<ScenarioData | null> {
  const hardcoded = hardcodedScenarios.find(s => s.slug === slug);
  if (hardcoded) {
    return hardcoded;
  }
  
  try {
    await initializeDatabase();
    const dbScenario = await getScenarioBySlug(slug);
    if (dbScenario) {
      return {
        title: dbScenario.title,
        description: dbScenario.description,
        today: dbScenario.today,
        breakdown: dbScenario.breakdown,
        solution: dbScenario.solution,
        slug: dbScenario.slug
      };
    }
  } catch {
    console.error("Error fetching scenario from DB");
  }
  
  return null;
}

export default async function ScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = await getScenario(slug);
  
  if (!scenario) {
    notFound();
  }

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
              <Link href="/scenarios" className="text-gray-900 font-medium">
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
        <Link 
          href="/scenarios" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all scenarios
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {scenario.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {scenario.description}
          </p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What happens today</h2>
            <p className="text-gray-700 leading-relaxed">{scenario.today}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Where accountability breaks down</h2>
            <p className="text-gray-700 leading-relaxed">{scenario.breakdown}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How human-mapped liability would change incentives</h2>
            <p className="text-gray-700 leading-relaxed">{scenario.solution}</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link 
            href="/scenarios" 
            className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View all scenarios
          </Link>
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

export async function generateStaticParams() {
  return hardcodedScenarios.map((scenario) => ({
    slug: scenario.slug,
  }));
}
