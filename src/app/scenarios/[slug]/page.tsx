import Link from "next/link";
import { notFound } from "next/navigation";
import { getScenarioBySlug, getScenarioSlugs } from "@/lib/scenarios";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav currentPage="scenarios" />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/scenarios"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What happens today
            </h2>
            <p className="text-gray-700 leading-relaxed">{scenario.today}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Where accountability breaks down
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {scenario.breakdown}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How human-mapped liability would change incentives
            </h2>
            <p className="text-gray-700 leading-relaxed">{scenario.solution}</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/scenarios"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            View all scenarios
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = getScenarioSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}
