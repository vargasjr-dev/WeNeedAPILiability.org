import Link from "next/link";

export default function Footer() {
  return (
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
          . Questions or feedback:{" "}
          <Link
            href="/contact"
            className="text-gray-700 hover:text-gray-900 underline"
          >
            Contact us
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
