import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PdfViewer from "@/components/PdfViewer";
import { getProposalContent } from "@/lib/proposal";

export default function ProposalPage() {
  const proposalContent = getProposalContent();

  return (
    <div className="min-h-screen bg-white">
      <Nav currentPage="proposal" />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            API Liability Act of 2026
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            This document establishes our proposed framework for assigning legal
            liability when autonomous systems take actions. It is an evolving
            draft that is made available to the public for open feedback as it
            is developed. The final output is intended to read as a legislative
            proposal that can be submitted immediately before Congress.
          </p>
        </header>

        <section className="mb-12">
          <PdfViewer content={proposalContent} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
