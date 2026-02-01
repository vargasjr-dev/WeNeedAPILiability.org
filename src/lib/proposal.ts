import fs from "fs";
import path from "path";

export function getProposalContent(): string {
  const proposalPath = path.join(process.cwd(), "content", "proposal.md");
  return fs.readFileSync(proposalPath, "utf-8");
}
