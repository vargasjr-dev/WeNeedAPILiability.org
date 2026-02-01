"use client";

import { useState, useEffect, useRef } from "react";

interface PdfViewerProps {
  content: string;
}

function parseMarkdown(markdown: string): string {
  let html = markdown;

  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>',
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-xl font-semibold mb-3 mt-5">$1</h2>',
  );
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>',
  );

  html = html.replace(
    /^\d+\.\s+(.+)$/gm,
    '<li class="ml-6 mb-2 list-decimal">$1</li>',
  );
  html = html.replace(
    /^   ([a-z])\.\s+(.+)$/gm,
    '<li class="ml-10 mb-1 list-[lower-alpha]">$2</li>',
  );

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  const lines = html.split("\n");
  const processedLines: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isListItem =
      line.includes('<li class="ml-6') || line.includes('<li class="ml-10');
    const nextLine = lines[i + 1];
    const nextIsListItem =
      nextLine &&
      (nextLine.includes('<li class="ml-6') ||
        nextLine.includes('<li class="ml-10'));

    if (isListItem && !inList) {
      processedLines.push('<ol class="mb-4">');
      inList = true;
    }

    if (isListItem) {
      processedLines.push(line);
    } else if (inList && !isListItem) {
      processedLines.push("</ol>");
      inList = false;
      if (line.trim()) {
        processedLines.push(`<p class="mb-3 leading-relaxed">${line}</p>`);
      }
    } else if (line.trim() && !line.startsWith("<h")) {
      processedLines.push(`<p class="mb-3 leading-relaxed">${line}</p>`);
    } else {
      processedLines.push(line);
    }

    if (inList && !nextIsListItem) {
      processedLines.push("</ol>");
      inList = false;
    }
  }

  return processedLines.join("\n");
}

const PAGE_HEIGHT = 800;

function paginateHtml(
  htmlContent: string,
  measureContainer: HTMLDivElement,
): string[] {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.width = "100%";
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.padding = "40px";
  tempDiv.className = "text-gray-800 text-sm";
  measureContainer.appendChild(tempDiv);

  const elements = Array.from(tempDiv.children);
  const paginatedPages: string[] = [];
  let currentPageContent = "";
  let currentHeight = 0;

  const measureElement = (el: Element): number => {
    const clone = el.cloneNode(true) as HTMLElement;
    const container = document.createElement("div");
    container.style.width = tempDiv.offsetWidth + "px";
    container.style.position = "absolute";
    container.style.visibility = "hidden";
    container.appendChild(clone);
    measureContainer.appendChild(container);
    const height = container.offsetHeight;
    measureContainer.removeChild(container);
    return height;
  };

  for (const element of elements) {
    const elementHeight = measureElement(element);

    if (currentHeight + elementHeight > PAGE_HEIGHT && currentPageContent) {
      paginatedPages.push(currentPageContent);
      currentPageContent = "";
      currentHeight = 0;
    }

    currentPageContent += (element as HTMLElement).outerHTML;
    currentHeight += elementHeight;
  }

  if (currentPageContent) {
    paginatedPages.push(currentPageContent);
  }

  measureContainer.removeChild(tempDiv);

  return paginatedPages;
}

export default function PdfViewer({ content }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const measureRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length || 1;

  useEffect(() => {
    if (!measureRef.current || isInitialized) return;

    const htmlContent = parseMarkdown(content);
    const paginatedPages = paginateHtml(htmlContent, measureRef.current);
    setPages(paginatedPages);
    setIsInitialized(true);
  }, [content, isInitialized]);

  useEffect(() => {
    const handleResize = () => {
      if (!measureRef.current) return;
      const htmlContent = parseMarkdown(content);
      const paginatedPages = paginateHtml(htmlContent, measureRef.current);
      setPages(paginatedPages);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [content]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={measureRef}
        className="absolute invisible"
        style={{ width: "612px" }}
      />

      <div className="bg-gray-100 rounded-lg p-4 mb-4 w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">Page</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
            />
            <span className="text-gray-600">of {totalPages}</span>
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <div
        className="bg-white shadow-lg border border-gray-200 rounded-sm overflow-hidden"
        style={{
          width: "612px",
          minHeight: `${PAGE_HEIGHT + 80}px`,
          aspectRatio: "8.5 / 11",
        }}
      >
        <div
          className="p-10 text-gray-800 text-sm leading-relaxed"
          style={{ minHeight: `${PAGE_HEIGHT}px` }}
          dangerouslySetInnerHTML={{ __html: pages[currentPage - 1] || "" }}
        />
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Use arrow keys or buttons to navigate between pages
      </div>
    </div>
  );
}
