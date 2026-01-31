import Link from "next/link";

interface ScenarioProps {
  title: string;
  description: string;
  today: string;
  breakdown: string;
  solution: string;
}

function Scenario({ title, description, today, breakdown, solution }: ScenarioProps) {
  return (
    <section className="mb-16 pb-16 border-b border-gray-200 last:border-b-0">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">What happens today</h3>
          <p className="text-gray-700 leading-relaxed">{today}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Where accountability breaks down</h3>
          <p className="text-gray-700 leading-relaxed">{breakdown}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">How human-mapped liability would change incentives</h3>
          <p className="text-gray-700 leading-relaxed">{solution}</p>
        </div>
      </div>
    </section>
  );
}

const scenarios: ScenarioProps[] = [
  {
    title: "Autonomous Customer Support Agent",
    description: "An AI agent handles customer service requests, including issuing refunds, applying credits, and modifying account settings.",
    today: "Companies deploy AI agents that can autonomously decide to issue refunds, sometimes worth thousands of dollars, without human review. These agents make judgment calls about customer complaints, apply company policies, and execute financial transactions. When the agent makes a mistake—issuing an inappropriate refund, denying a legitimate claim, or mishandling sensitive customer data—the company often points to the AI system as if it were an independent actor.",
    breakdown: "The customer has no clear recourse. The company claims the AI made an autonomous decision. The AI vendor disclaims liability in their terms of service. The developer who trained the model is several steps removed. Meanwhile, the customer is left dealing with the consequences of a decision that no human reviewed or approved. The diffusion of responsibility means no one feels accountable for fixing the problem or preventing it from recurring.",
    solution: "Under a human-mapped liability framework, the company deploying the agent would designate a specific individual responsible for the agent's customer service decisions. This person would have authority to review the agent's behavior, override its decisions, and be held accountable when things go wrong. This creates clear incentives: the responsible party will ensure proper guardrails, monitoring, and escalation procedures are in place. Customers know exactly who to contact when they have concerns."
  },
  {
    title: "Trading and Procurement Agents",
    description: "AI systems execute financial trades or make purchasing decisions on behalf of organizations, often operating at speeds and scales that preclude human oversight of individual transactions.",
    today: "Algorithmic trading systems and AI procurement agents make thousands of decisions per second. They analyze market conditions, evaluate suppliers, negotiate terms, and execute transactions. When these systems cause harm—whether through market manipulation, unfair pricing practices, or simply poor decisions that cost money—the trail of responsibility becomes murky. The firm claims the algorithm acted autonomously. The algorithm's designers say they cannot predict every market condition. Regulators struggle to assign blame.",
    breakdown: "Financial markets depend on accountability. When a human trader manipulates the market, they face personal consequences. When an algorithm does the same thing, the consequences are diffused across the organization. This creates a moral hazard: firms can deploy aggressive trading strategies through AI systems while maintaining plausible deniability about the outcomes. The same dynamic applies to procurement, where AI agents might engage in practices that would be clearly unethical if done by a human buyer.",
    solution: "Requiring human-mapped liability means that every trade or procurement decision, even if executed by an AI, has a designated human who bears responsibility. This does not mean humans must approve every transaction—that would be impractical. It means that someone must be accountable for the system's overall behavior and for any specific decision that causes harm. This person has strong incentives to ensure the AI operates within ethical and legal bounds, because their personal liability is on the line."
  },
  {
    title: "Infrastructure Management Agents",
    description: "AI systems manage cloud infrastructure, network configurations, and operational technology, making decisions that affect system availability, security, and performance.",
    today: "Enterprise AI agents increasingly manage critical infrastructure. They scale computing resources, adjust network configurations, deploy software updates, and respond to security incidents. These systems operate with significant autonomy because the speed and complexity of modern infrastructure often exceeds human capacity to manage directly. When an AI agent makes a mistake—taking down a production system, creating a security vulnerability, or causing a data breach—the consequences can be severe and widespread.",
    breakdown: "Infrastructure failures often trigger a blame game. The operations team says the AI made an autonomous decision. The AI vendor says the system was configured incorrectly. The security team says they were not consulted. Meanwhile, customers experience outages, data is compromised, and no one takes clear responsibility for preventing the next incident. The complexity of these systems makes it easy for everyone to point fingers elsewhere.",
    solution: "Human-mapped liability requires that infrastructure AI systems have designated human owners who are accountable for their behavior. This owner must understand what the system can do, ensure appropriate safeguards are in place, and take responsibility when things go wrong. This creates incentives for proper testing, monitoring, and incident response procedures. It also ensures that someone with authority is paying attention to what these powerful systems are doing."
  },
  {
    title: "Multi-Agent Coordination Systems",
    description: "Multiple AI agents work together to accomplish complex tasks, with each agent making decisions that affect the others and the overall outcome.",
    today: "Modern AI deployments increasingly involve multiple agents coordinating with each other. One agent might gather information, another might analyze it, a third might make recommendations, and a fourth might execute actions. These systems can accomplish sophisticated tasks, but they also create complex webs of causation. When something goes wrong, it may be genuinely unclear which agent's decision was the proximate cause of the harm.",
    breakdown: "Multi-agent systems represent the most challenging case for accountability. Each agent's developer can claim their component worked correctly. The system integrator can claim they followed best practices. The deploying organization can claim they had no visibility into the agents' internal coordination. The result is that harmful outcomes emerge from the interaction of multiple systems, with no clear party responsible for the emergent behavior.",
    solution: "Human-mapped liability addresses this by requiring that the overall system—not just individual components—have a designated human responsible for its behavior. This person is accountable for how the agents interact, not just how each agent performs in isolation. This creates incentives to carefully design and test multi-agent interactions, to monitor for emergent behaviors, and to maintain the ability to intervene when the system behaves unexpectedly. The complexity of the system does not excuse the lack of human accountability."
  }
];

export default function ScenariosPage() {
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
              <Link href="/scenarios" className="text-gray-900 font-medium">
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
        <header className="mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Real-World Scenarios
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Understanding how accountability breaks down in practice helps clarify why human-mapped liability matters. The following scenarios illustrate common situations where autonomous systems act with real-world consequences, and how clear liability rules would change the incentives for everyone involved.
          </p>
        </header>

        {scenarios.map((scenario, index) => (
          <Scenario key={index} {...scenario} />
        ))}

        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">The Common Thread</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Across all these scenarios, the fundamental problem is the same: autonomous systems take actions with real consequences, but no specific human bears clear responsibility for those actions. This creates perverse incentives. Organizations can deploy powerful AI systems while maintaining distance from their outcomes. Individuals harmed by these systems have no clear path to accountability.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Human-mapped liability does not prevent organizations from using AI or require humans to approve every automated decision. It simply ensures that the chain of responsibility never breaks—that for every action an AI system takes, there is a human who stands behind it.
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
