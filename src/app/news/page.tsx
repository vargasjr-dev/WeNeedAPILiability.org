import Link from "next/link";

interface NewsItem {
  date: string;
  title: string;
  summary: string;
  type: "update" | "external" | "policy";
  isPlaceholder?: boolean;
}

const newsItems: NewsItem[] = [
  {
    date: "2026-01-15",
    title: "Initial Website Launch",
    summary: "We have launched this advocacy website to begin building public awareness and support for human-mapped liability in autonomous systems. The site includes our core proposal, educational scenarios, and a mailing list for updates.",
    type: "update",
    isPlaceholder: true
  },
  {
    date: "2026-01-10",
    title: "Draft Proposal Under Development",
    summary: "Our team is working with legal experts and policy researchers to draft formal legislative language. We expect to publish the first public draft in the coming months and will seek feedback from stakeholders across the technology and policy communities.",
    type: "policy",
    isPlaceholder: true
  },
  {
    date: "2026-01-05",
    title: "Example: EU AI Act Implementation Begins",
    summary: "This is a placeholder entry demonstrating how we will link to relevant external developments. The news feed will track policy developments, academic research, and industry practices related to AI accountability and liability.",
    type: "external",
    isPlaceholder: true
  },
  {
    date: "2025-12-20",
    title: "Example: Research on Autonomous Agent Liability",
    summary: "This placeholder represents the type of academic and research content we will highlight. We plan to curate relevant papers, reports, and analyses that inform the policy debate around autonomous system accountability.",
    type: "external",
    isPlaceholder: true
  }
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
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

export default function NewsPage() {
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
            Follow developments related to AI accountability, autonomous system liability, and our policy proposal. This feed includes project updates, relevant external news, and policy developments.
          </p>
        </header>

        <div className="space-y-8">
          {newsItems.map((item, index) => (
            <article key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex items-center gap-3 mb-2">
                <time className="text-sm text-gray-500">{formatDate(item.date)}</time>
                <span className="text-sm text-gray-400">·</span>
                <span className="text-sm text-gray-500">{getTypeLabel(item.type)}</span>
                {item.isPlaceholder && (
                  <>
                    <span className="text-sm text-gray-400">·</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Example Entry</span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed">{item.summary}</p>
            </article>
          ))}
        </div>

        <section className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This news feed will be updated as developments occur. For the most timely updates, subscribe to our mailing list on the <Link href="/" className="text-gray-900 underline">home page</Link>.
          </p>
          <p className="text-gray-600 text-sm">
            We aim to provide factual, non-sensational coverage of relevant developments. Our focus is on substantive policy and technical developments rather than speculation or hype.
          </p>
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
