import Link from "next/link";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-gray-900">
              API Liability
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/proposal" className="text-gray-900 font-medium">
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
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Legislative Proposal
          </h1>
          <p className="text-gray-600 leading-relaxed">
            This page will host the full text of our proposed legislative framework for human accountability in automated systems. The document is currently being drafted in consultation with legal experts and policy researchers.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Document</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The proposal establishes a framework for assigning legal liability when autonomous systems take actions with real-world consequences. It addresses questions such as: Who is responsible when an AI agent makes a harmful decision? How should liability be allocated across developers, operators, and deployers? What documentation and audit requirements should apply?
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our goal is to create legislation that is technically informed, practically implementable, and consistent with existing legal principles around agency and liability.
          </p>
        </section>

        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Draft Proposal Document</h3>
          </div>
          <div className="p-6">
            <div className="bg-white border border-gray-200 rounded min-h-96 flex items-center justify-center">
              <div className="text-center px-8">
                <p className="text-gray-500 mb-2">Document Preview</p>
                <p className="text-sm text-gray-400">
                  The full legislative proposal will be embedded here once the draft is complete.
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  Expected format: PDF document with section-by-section analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Feedback Welcome</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This proposal is evolving and open to feedback. We are particularly interested in input from legal scholars, technologists who build autonomous systems, and policymakers who understand the legislative process.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you have expertise in relevant areas and would like to contribute to the drafting process, please subscribe to our mailing list on the <Link href="/" className="text-gray-900 underline">home page</Link> to receive updates and opportunities to participate.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Principles</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The proposal is built around several core principles that guide its structure and recommendations.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <span className="font-medium">Clear attribution:</span> Every automated action must trace to a specific human who bears legal responsibility for that action.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <span className="font-medium">Proportional liability:</span> Responsibility should be allocated based on the degree of control and benefit each party has over the system.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <span className="font-medium">Practical compliance:</span> Requirements should be implementable with existing technology and reasonable operational overhead.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-medium">Technology neutrality:</span> The framework should apply regardless of the specific AI technology used, focusing on outcomes rather than methods.
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
