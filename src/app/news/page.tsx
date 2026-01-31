import Link from "next/link";
import { getNewsItems, initializeDatabase } from "@/lib/db";
import EmailSubscribeForm from "@/components/EmailSubscribeForm";

interface NewsItem {
  id?: number;
  date: string;
  title: string;
  summary: string;
  type: "update" | "external" | "policy";
  url?: string;
}

async function fetchNewsItems(): Promise<NewsItem[]> {
  try {
    await initializeDatabase();
    const items = await getNewsItems();
    return items.map((item) => ({
      id: item.id as number,
      date:
        typeof item.date === "string"
          ? item.date
          : new Date(item.date as string).toISOString().split("T")[0],
      title: item.title as string,
      summary: item.summary as string,
      type: item.type as "update" | "external" | "policy",
      url: (item.url as string | null) || undefined,
    }));
  } catch {
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getTypeLabel(type: NewsItem["type"]): string {
  switch (type) {
    case "update":
      return "Project Update";
    case "external":
      return "External Link";
    case "policy":
      return "Policy Development";
    default:
      return "News";
  }
}

export default async function NewsPage() {
  const newsItems = await fetchNewsItems();

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-gray-900">
              API Liability
            </Link>
            <div className="flex gap-6 text-sm">
              <Link
                href="/proposal"
                className="text-gray-600 hover:text-gray-900"
              >
                Proposal
              </Link>
              <Link
                href="/scenarios"
                className="text-gray-600 hover:text-gray-900"
              >
                Scenarios
              </Link>
              <Link
                href="/roadmap"
                className="text-gray-600 hover:text-gray-900"
              >
                Roadmap
              </Link>
              <Link href="/news" className="text-gray-900 font-medium">
                News
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            News and Updates
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Follow developments related to AI accountability, autonomous system
            liability, and our policy proposal. This feed includes project
            updates, relevant external news, and policy developments.
          </p>
        </header>

        {newsItems.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-lg bg-gray-50">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No news yet
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              We are just getting started. Subscribe below to be notified when
              we publish updates about our progress and relevant developments in
              AI accountability.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <article
                key={item.id || index}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <time className="text-sm text-gray-500">
                    {formatDate(item.date)}
                  </time>
                  <span className="text-sm text-gray-400">·</span>
                  <span className="text-sm text-gray-500">
                    {getTypeLabel(item.type)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h2>
                <p className="text-gray-700 leading-relaxed">{item.summary}</p>
              </article>
            ))}
          </div>
        )}

        <section className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get updates on the proposal and related developments.
          </p>
          <EmailSubscribeForm />
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 mb-2">
            This is an advocacy project, not legal advice. The content on this
            site represents policy proposals and educational material, not
            professional legal counsel.
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
