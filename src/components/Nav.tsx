import Link from "next/link";

interface NavProps {
  currentPage?: "home" | "proposal" | "scenarios" | "roadmap" | "news";
  variant?: "light" | "dark";
}

export default function Nav({ currentPage, variant = "light" }: NavProps) {
  const isDark = variant === "dark";

  const baseClasses = isDark
    ? "fixed top-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700"
    : "border-b border-gray-200";

  const logoClasses = isDark
    ? "text-lg font-semibold text-white"
    : "text-lg font-semibold text-gray-900";

  const linkClasses = (page: NavProps["currentPage"]) => {
    if (currentPage === page) {
      return isDark ? "text-white font-medium" : "text-gray-900 font-medium";
    }
    return isDark
      ? "text-slate-300 hover:text-white transition-colors"
      : "text-gray-600 hover:text-gray-900";
  };

  return (
    <nav className={baseClasses}>
      <div
        className={`${isDark ? "max-w-6xl" : "max-w-4xl"} mx-auto px-6 py-4`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className={logoClasses}>
            API Liability
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/proposal" className={linkClasses("proposal")}>
              Proposal
            </Link>
            <Link href="/scenarios" className={linkClasses("scenarios")}>
              Scenarios
            </Link>
            <Link href="/roadmap" className={linkClasses("roadmap")}>
              Roadmap
            </Link>
            <Link href="/news" className={linkClasses("news")}>
              News
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
