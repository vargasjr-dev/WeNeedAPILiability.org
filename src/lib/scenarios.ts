import fs from "fs";
import path from "path";

export interface ScenarioData {
  title: string;
  description: string;
  today: string;
  breakdown: string;
  solution: string;
  slug: string;
}

interface ScenarioFrontmatter {
  title: string;
  slug: string;
  description: string;
}

function parseFrontmatter(content: string): {
  frontmatter: ScenarioFrontmatter;
  body: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error("Invalid frontmatter format");
  }

  const frontmatterStr = match[1];
  const body = match[2];

  const frontmatter: ScenarioFrontmatter = {
    title: "",
    slug: "",
    description: "",
  };

  for (const line of frontmatterStr.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();

    if (key === "title" || key === "slug" || key === "description") {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

function extractSection(body: string, heading: string): string {
  const headingRegex = new RegExp(`## ${heading}\\n\\n([\\s\\S]*?)(?=\\n## |$)`);
  const match = body.match(headingRegex);
  return match ? match[1].trim() : "";
}

export function getScenarioSlugs(): string[] {
  const scenariosDir = path.join(process.cwd(), "content", "scenarios");
  const files = fs.readdirSync(scenariosDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}

export function getScenarioBySlug(slug: string): ScenarioData | null {
  const scenariosDir = path.join(process.cwd(), "content", "scenarios");
  const filePath = path.join(scenariosDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(content);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    slug: frontmatter.slug,
    today: extractSection(body, "What happens today"),
    breakdown: extractSection(body, "Where accountability breaks down"),
    solution: extractSection(body, "How human-mapped liability would change incentives"),
  };
}

export function getAllScenarios(): ScenarioData[] {
  const slugs = getScenarioSlugs();
  const scenarios: ScenarioData[] = [];

  for (const slug of slugs) {
    const scenario = getScenarioBySlug(slug);
    if (scenario) {
      scenarios.push(scenario);
    }
  }

  return scenarios;
}
