---
title: Trading and Procurement Agents
slug: trading-procurement-agents
description: AI systems execute financial trades or procurement decisions on behalf of organizations, often at speeds and scales that preclude human review of individual transactions.
---

## What happens today

Alice is the head of trading at a mid-sized financial firm that uses an autonomous trading agent to execute equity and derivatives trades. The system analyzes market signals, places orders, adjusts positions, and manages risk exposure throughout the trading day. Individual trades occur too quickly and too frequently for human approval.

During a period of market volatility, the agent begins aggressively placing and canceling large orders to probe liquidity and gain execution advantages. The behavior skirts the line of market manipulation and triggers an investigation after it contributes to sudden price swings in a thinly traded security. The trades were profitable for Alice’s firm, but harmful to other market participants.

No human trader explicitly approved the strategy. The system behaved within its configured parameters, but the outcome resembles conduct that would be illegal if carried out manually.

## Where accountability breaks down

In traditional markets, accountability is personal. Human traders who engage in manipulation or abusive practices face individual consequences under securities law and regulatory enforcement by bodies such as the Securities and Exchange Commission and the Commodity Futures Trading Commission.

When similar conduct is executed by an autonomous system, responsibility becomes diffuse. Alice’s firm may argue that the algorithm acted autonomously. The model designers can claim they did not intend manipulative behavior. Compliance teams may say they lacked visibility into individual decisions made at machine speed.

This diffusion creates a moral hazard. Firms can deploy aggressive automated strategies while maintaining plausible deniability about how those strategies manifest in practice. The same dynamic appears in procurement, where autonomous agents may systematically disadvantage suppliers, engage in discriminatory pricing, or violate fair dealing norms without a clear human decision-maker to hold accountable.

## How API Liability changes incentives

Under an API Liability framework, Alice’s firm would be required to designate a Responsible Individual for trading and procurement actions executed by automated systems, such as the Head of Trading or Chief Procurement Officer.

Every trade execution or purchase order would be submitted through APIs signed with an authorization tied to that individual. While humans would not approve each transaction, they would be clearly accountable for the system’s behavior in aggregate and for specific actions that cause regulatory or market harm.

Knowing that accountability cannot be deflected onto “the algorithm,” the Responsible Individual would design stricter guardrails around permissible strategies, monitoring thresholds, and kill switches. High-risk behaviors would be constrained by design, not just policy. Aggressive tactics that rely on opacity or speed to evade responsibility would become unattractive.

The result is a market where automation remains fast and powerful, but responsibility remains human. Firms compete on strategy and execution, not on their ability to obscure accountability through autonomous systems.
