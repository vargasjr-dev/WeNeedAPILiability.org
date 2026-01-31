import Link from "next/link";

interface RoadmapStep {
  number: number;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

const roadmapSteps: RoadmapStep[] = [
  {
    number: 1,
    title: "Reaching Out to Lawmakers",
    description:
      "Building awareness and engaging with policymakers to introduce the concept of human-mapped liability for autonomous systems. This includes drafting initial proposals, meeting with legislative staff, and gathering support from key stakeholders.",
    status: "current",
  },
  {
    number: 2,
    title: "Getting Into Law",
    description:
      "Working with legislators to draft and introduce formal legislation. This phase involves refining the legal language, addressing concerns from various stakeholders, and navigating the legislative process to get the proposal enacted.",
    status: "upcoming",
  },
  {
    number: 3,
    title: "Building Enforcement Tools",
    description:
      "Developing technical standards, certification processes, and monitoring tools to help organizations comply with the new liability framework. This includes creating audit trails, accountability registries, and compliance verification systems.",
    status: "upcoming",
  },
  {
    number: 4,
    title: "Domestic Implementation",
    description:
      "Supporting the rollout of the liability framework across industries and jurisdictions. This involves creating guidance documents, training programs, and working with regulatory agencies to ensure consistent enforcement.",
    status: "upcoming",
  },
  {
    number: 5,
    title: "Going Global",
    description:
      "Expanding the framework internationally through coordination with foreign governments, international organizations, and global standards bodies. The goal is to create a consistent global approach to AI accountability.",
    status: "upcoming",
  },
];

function getStatusStyles(status: RoadmapStep["status"]) {
  switch (status) {
    case "completed":
      return {
        circle: "bg-green-600 text-white",
        line: "bg-green-600",
        card: "border-green-200 bg-green-50",
        badge: "bg-green-100 text-green-800",
      };
    case "current":
      return {
        circle: "bg-slate-800 text-white ring-4 ring-slate-200",
        line: "bg-slate-300",
        card: "border-slate-300 bg-slate-50",
        badge: "bg-slate-800 text-white",
      };
    case "upcoming":
      return {
        circle: "bg-gray-200 text-gray-500",
        line: "bg-gray-200",
        card: "border-gray-200 bg-white",
        badge: "bg-gray-100 text-gray-600",
      };
  }
}

function getStatusLabel(status: RoadmapStep["status"]) {
  switch (status) {
    case "completed":
      return "Completed";
    case "current":
      return "In Progress";
    case "upcoming":
      return "Upcoming";
  }
}

export default function RoadmapPage() {
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
              <Link href="/roadmap" className="text-gray-900 font-medium">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Roadmap</h1>
          <p className="text-gray-600 leading-relaxed">
            Establishing human accountability for autonomous systems is a
            long-term effort. Here is our plan for making it happen, from
            initial advocacy to global implementation.
          </p>
        </header>

        <div className="relative">
          {roadmapSteps.map((step, index) => {
            const styles = getStatusStyles(step.status);
            const isLast = index === roadmapSteps.length - 1;

            return (
              <div key={step.number} className="relative flex gap-6 pb-12">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${styles.circle}`}
                  >
                    {step.status === "completed" ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  {!isLast && (
                    <div className={`w-1 flex-1 mt-3 ${styles.line}`} />
                  )}
                </div>

                <div className={`flex-1 border rounded-lg p-6 ${styles.card}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h2>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${styles.badge}`}
                    >
                      {getStatusLabel(step.status)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-8 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Get Involved
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This roadmap is ambitious, and we cannot do it alone. We need
            support from technologists, legal experts, policymakers, and
            concerned citizens who believe in the importance of human
            accountability for AI systems.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Subscribe to our mailing list on the{" "}
            <Link href="/" className="text-gray-900 underline">
              home page
            </Link>{" "}
            to stay updated on our progress, or{" "}
            <Link href="/contact" className="text-gray-900 underline">
              contact us
            </Link>{" "}
            if you would like to contribute directly.
          </p>
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
