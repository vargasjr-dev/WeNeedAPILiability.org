---
title: Dead Man’s Switch Autonomous Agents
slug: dead-mans-switch-agents
description: An autonomous system is configured to execute actions if a human fails to signal their presence, raising questions about posthumous authority and accountability.
---

## What happens today

Alice is a founder who relies heavily on an autonomous cloud agent to manage parts of her digital and financial infrastructure. To protect against lockout or coercion, she configures a dead man’s switch: if she does not signal that she is alive within seven days, the agent is instructed to execute a predefined set of actions.

Those actions include transferring funds, revoking access credentials, and publishing encrypted data. The system is fully automated. No additional human approval is required once the condition is met.

Alice unexpectedly dies. Seven days later, the agent begins executing its instructions. It revokes employee access across production systems, transfers company funds into a frozen escrow account, and automatically publishes encrypted internal documents that were never meant to be made public. Several customers lose access to critical services, employees are locked out of systems needed to operate the business, and confidential information is exposed without any living person authorizing the actions.

## Where accountability breaks down

In the physical world, the law is clear: deceased individuals cannot act. Wills, trusts, and contingency instructions do not execute themselves. A living executor or trustee is always responsible for carrying out instructions and can be held personally accountable for illegal or harmful actions.

Autonomous systems break this pattern. The agent acts as if Alice’s prior intent is sufficient authority, even though she is no longer alive. There is no executor, trustee, or officer formally responsible for evaluating whether the actions are lawful, appropriate, or safe under current circumstances.

When harm results, responsibility is unclear. The deceased cannot be liable. The software provider disclaims responsibility. No living individual was required to approve the actions or intervene. A legal framework that has governed delayed and conditional actions for centuries is bypassed by automation.

## How API Liability changes incentives

Under an API Liability framework, this system could not operate without a designated Responsible Individual who is alive and accountable at the time actions are executed.

Any API call triggered by a dead man’s switch would need to be signed and attributable to a living person, such as a court appointed executor, trustee, or authorized corporate officer. If no such individual is designated, the system would be required to enter a safe state rather than execute consequential actions.

This restores a familiar legal structure. Automated systems may assist in carrying out conditional instructions, but they cannot replace human fiduciaries. Dead man’s switches no longer function as autonomous actors. Instead, they become tools that support human decision makers who bear responsibility for outcomes.

The result is continuity with existing legal principles. Conditional automation remains possible, but accountability never dies with the person who configured the system.
