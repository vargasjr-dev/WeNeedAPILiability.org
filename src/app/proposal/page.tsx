import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav currentPage="proposal" />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About This Document
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            This document establishes our proposed framework for assigning legal
            liability when autonomous systems take actions. It is an evolving
            draft that is made available to the public for open feedback as it
            is developed. The final output is intended to read as a legislative
            proposal that can be submitted immediately before Congress.
          </p>
        </header>

        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">
              API Liability Proposal
            </h3>
          </div>
          <div className="p-6">
            <div className="bg-white border border-gray-200 rounded min-h-96 flex items-center justify-center">
              <div className="text-center px-8">
                <p className="text-gray-500 mb-2">Document Preview</p>
                <p className="text-sm text-gray-400">
                  The full legislative proposal will be embedded here once the
                  draft is complete.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
