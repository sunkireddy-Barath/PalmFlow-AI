# PalmFlow AI

> **Autonomous AI-Powered Treasury & Workforce Management on Solana**

PalmFlow AI is a next-generation decentralised finance operating system where AI agents autonomously manage treasury capital, execute payroll, enforce governance policies, audit smart contract risk, and conduct on-chain investments — all in real-time on the Solana blockchain, governed by natural language commands.

---

## Table of Contents

1. [What is PalmFlow AI](#what-is-palmflow-ai)
2. [Why It Matters — The Problem](#why-it-matters--the-problem)
3. [Novelty & Innovation](#novelty--innovation)
4. [System Architecture](#system-architecture)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Tech Stack](#tech-stack)
7. [Feature Breakdown](#feature-breakdown)
8. [Database Schema](#database-schema)
9. [API Reference](#api-reference)
10. [Getting Started](#getting-started)
11. [Environment Variables](#environment-variables)
12. [How to Use — User Guide](#how-to-use--user-guide)
13. [Security Model](#security-model)
14. [Project Structure](#project-structure)
15. [Roadmap](#roadmap)

---

## What is PalmFlow AI

PalmFlow AI is a **protocol-level treasury operating system** that replaces traditional human treasury management with an autonomous fleet of AI agents. Each agent is a software entity with:

- A dedicated **Solana wallet** holding PUSD (the protocol stablecoin)
- A **budget allocation** enforced by on-chain policies
- A **performance rating** updated by real reputation algorithms
- The ability to **execute transactions, stream payroll, and collaborate** with other agents

Users interact with the entire system through a single **Neural Core chat interface** — typing natural language instructions like _"Deploy a Risk Manager agent with a 5000 PUSD budget"_ and watching it execute autonomously on-chain within seconds.

---

## Why It Matters — The Problem

Modern organisations and DAOs face a critical bottleneck: **treasury operations are slow, manual, and human-dependent.**

| Traditional Treasury | PalmFlow AI |
|---|---|
| Manual approval for every payment | Policy-gated autonomous execution |
| Payroll processed weekly/monthly | Per-second streaming payroll on-chain |
| Single point of failure (CFO/multisig) | Fleet of specialised AI agents |
| Governance proposals take days | Natural language → instant execution |
| No real-time risk monitoring | Autonomous Sentinel audits every cycle |
| DeFi yield requires manual routing | Idle funds auto-routed to yield vaults |
| Investment decisions are siloed | AI Auditor scores every IDO project |

For DAOs, crypto-native companies, and DeFi protocols, PalmFlow AI is the difference between a treasury that **requires constant human intervention** and one that **runs itself**.

---

## Novelty & Innovation

### 1. Natural Language → On-Chain Action Pipeline
Users type a single English sentence. The Gemini 2.5 Flash LLM parses it into a structured workflow. The workflow engine validates it against governance policies. Then it executes one or more on-chain Solana transactions — all in under 3 seconds. No ABI, no multisig queue, no human review.

### 2. Per-Second Streaming Payroll
Traditional payroll is a batch process (weekly, bi-weekly). PalmFlow streams PUSD at a configured `ratePerSecond` directly to recipient Solana wallets. Every heartbeat cycle accumulates the owed amount. Recipients can withdraw at any moment — they earn as they work, the same way a streaming platform pays per-stream.

### 3. Autonomous Security Sentinel
A real-time audit engine runs on every heartbeat cycle, monitoring:
- **Transaction velocity** — more than 5 tx/min triggers an auto-lock
- **Budget drain alerts** — agents that consume 80%+ of budget are flagged
- **Policy violations** — every workflow step is checked against all active policies before execution

No human needs to watch the treasury. The protocol watches itself.

### 4. AI-Scored IDO Launchpad
Every project listed on the Neural Launchpad is autonomously audited by the AI Auditor. It assigns a **0–100 risk score** and writes a plain-English audit report. Investors see an AI risk rating before investing — something no traditional launchpad offers.

### 5. Multi-Agent Collaboration
Agents can request resources from each other. A Marketing Agent can delegate budget execution to a Finance Agent. The coordination is tracked, logged, and governed by policies — creating an autonomous organisational hierarchy with no human mediator.

### 6. On-Chain Reputation Scoring
Every agent has a live `rating` (1.0–5.0 stars) and `efficiency` score (0–100%) calculated from task completion volume, budget discipline, P&L generated, and stability across heartbeat cycles. This creates a **meritocracy of AI agents** — well-performing agents get higher trust and larger budget allocations over time.

### 7. Idempotent ATA Provisioning
All PUSD transfers use `createAssociatedTokenAccountIdempotentInstruction`, meaning new agent wallets automatically receive their PUSD token account in the same transaction as the first funding — no pre-setup required. First-time wallets never fail.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          PalmFlow AI — Full Stack                       │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Next.js 16, React 19)              │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │Dashboard │  │  Chat /  │  │ Payroll  │  │Launchpad │  ...more   │
│  │  /agents │  │NeuralCore│  │Streaming │  │  (IDO)   │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       │              │              │              │                  │
│  ┌────┴─────────────┴──────────────┴──────────────┴──────┐          │
│  │           TanStack Query v5 (React Query)              │          │
│  │     Optimistic updates · Cache invalidation · SSR      │          │
│  └────────────────────────┬──────────────────────────────┘          │
│                           │ Wallet adapter (Phantom/Solflare/Coinbase)│
└───────────────────────────┼──────────────────────────────────────────┘
                            │ HTTP REST
┌───────────────────────────┼──────────────────────────────────────────┐
│                    API LAYER (Next.js App Router)                    │
│                                                                      │
│  /api/agents           /api/command/v2      /api/treasury/*         │
│  /api/streams/*        /api/policies/*      /api/sentinel/*         │
│  /api/ido/*            /api/insights        /api/system/heartbeat   │
│  /api/workflow/execute /api/agents/sync     /api/agents/collaborate │
└──────────────┬────────────────────────┬──────────────────────────────┘
               │                        │
    ┌──────────▼──────────┐   ┌─────────▼──────────┐
    │    SERVICE LAYER    │   │      AI LAYER       │
    │                     │   │                     │
    │ agentService        │   │  Gemini 2.5 Flash   │
    │ streamService       │   │                     │
    │ sentinelService     │   │  generateAgent      │
    │ reputationService   │   │  Response()         │
    │ workflowService     │   │                     │
    │ yieldService        │   │  JSON-structured    │
    │ policyService       │   │  output (no        │
    │ idoService          │   │  markdown wrapping) │
    │ auditorService      │   │                     │
    │ insightService      │   └─────────────────────┘
    │ coordinationService │
    └──────────┬──────────┘
               │
    ┌──────────▼──────────────────────────────────────┐
    │               BLOCKCHAIN LAYER                  │
    │                                                 │
    │   solanaService                                 │
    │   @solana/web3.js · @solana/spl-token           │
    │                                                 │
    │   getPUSDBalance()  → getAccount (RPC)          │
    │   getPortfolio()    → getParsedTokenAccounts    │
    │   executePayment()  → createATA (idempotent)    │
    │                     → SPL createTransfer        │
    │                     → sendAndConfirmTransaction │
    └──────────┬──────────────────────────────────────┘
               │
    ┌──────────▼─────────────────────┬────────────────────────┐
    │   Supabase PostgreSQL           │   Solana Devnet RPC    │
    │   (via Prisma ORM)              │                        │
    │                                 │   Token accounts       │
    │   Agent · Transaction           │   SOL balances         │
    │   Stream · Policy               │   Transaction sigs     │
    │   Project · Investment          │   v4.0.0-rc.0          │
    └─────────────────────────────────┴────────────────────────┘
```

---

## Data Flow Diagrams

### 1. Natural Language Command Execution

```
User types: "Deploy a Risk Manager agent with 5000 PUSD budget"
        │
        ▼
┌───────────────────┐
│  POST             │
│  /api/command/v2  │
└────────┬──────────┘
         │ Sends prompt + context (agentName, role, status, budget)
         ▼
┌────────────────────────────────────────────────────┐
│  Gemini 2.5 Flash (LLM)                            │
│                                                    │
│  System: You are PalmFlow Orchestrator.            │
│          Parse into structured workflow steps.     │
│                                                    │
│  Output (JSON):                                    │
│  {                                                 │
│    "message": "Deploying Risk Manager...",         │
│    "steps": [                                      │
│      { "type": "deploy_agent",                     │
│        "data": { "name": "Risk Manager",           │
│                  "role": "Risk Manager",           │
│                  "budget": 5000 } }                │
│    ]                                               │
│  }                                                 │
└────────┬───────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────┐
│  workflowService.executeWorkflow(steps)            │
│                                                    │
│  For each step:                                    │
│  ┌─────────────────────────────────────────────┐  │
│  │ 1. policyService.validateAction()           │  │
│  │    → Check spending_limit policies          │  │
│  │    → Check global_lock policies             │  │
│  │    → ALLOW or DENY (log reason if denied)   │  │
│  └────────────────────┬────────────────────────┘  │
│                       │ ALLOWED                    │
│  ┌────────────────────▼────────────────────────┐  │
│  │ 2. Keypair.generate()                       │  │
│  │    → Fresh Solana keypair for agent wallet  │  │
│  └────────────────────┬────────────────────────┘  │
│                       │                            │
│  ┌────────────────────▼────────────────────────┐  │
│  │ 3. agentService.createAgent()               │  │
│  │    → INSERT into agents table               │  │
│  │    → Returns agent record with cuid id      │  │
│  └────────────────────┬────────────────────────┘  │
│                       │                            │
│  ┌────────────────────▼────────────────────────┐  │
│  │ 4. solanaService.executePayment()           │  │
│  │    → getAssociatedTokenAddress (from + to)  │  │
│  │    → getMint (PUSD decimals)                │  │
│  │    → Transaction.add(                       │  │
│  │        createATA_idempotent,  ← new wallet  │  │
│  │        createTransferInstruction            │  │
│  │      )                                      │  │
│  │    → sendAndConfirmTransaction              │  │
│  │    → Returns txHash (base58 signature)      │  │
│  └────────────────────┬────────────────────────┘  │
│                       │                            │
│  ┌────────────────────▼────────────────────────┐  │
│  │ 5. transactionService.createTransaction()   │  │
│  │    → Log in DB: type=deposit, txHash, agent │  │
│  └─────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
         │
         ▼
  { success: true, results: [{ step, success, data }] }
  UI updates via React Query cache invalidation
```

### 2. Payroll Streaming Flow

```
Stream created: { recipient: "Alice", rate: 0.001 PUSD/s, wallet: "AbC..." }
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  POST /api/system/heartbeat  (autonomous cycle)     │
└──────────┬──────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────┐
│  streamService.updateAccruedTotals()                │
│                                                     │
│  For each active stream:                           │
│    elapsed = (now - updatedAt) in seconds           │
│    accrued = elapsed × ratePerSecond                │
│    UPDATE stream SET                                │
│      totalStreamed += accrued,                      │
│      updatedAt = now                                │
└──────────┬──────────────────────────────────────────┘
           │
           ▼
  Streaming page shows live accumulating balance
  Recipient verifies on Solscan (real wallet)
  Pause/Resume toggles stream.status in DB
```

### 3. Risk Sentinel Audit Cycle

```
POST /api/sentinel/audit
        │
        ▼
┌────────────────────────────────────────────────────────┐
│  sentinelService.performSecurityAudit()                │
│                                                        │
│  Check 1 — Transaction Velocity                        │
│    COUNT(transactions WHERE createdAt > now-60s)       │
│    if count > 5:                                       │
│      → autoLockTreasury("High velocity")               │
│      → return { status: 'emergency_lock' }             │
│                                                        │
│  Check 2 — Budget Drain                                │
│    for each active agent:                             │
│      if agent.spent > agent.budget × 0.8:             │
│        → push alert to logs[]                          │
│                                                        │
│  Check 3 — Policy Compliance                           │
│    All active policies validated against current state │
│                                                        │
│  Result:                                               │
│    { status: 'secure' | 'warning' | 'emergency_lock', │
│      message, auditTime, logs[] }                      │
└────────────────────────────────────────────────────────┘

  autoLockTreasury() side effects:
  ┌────────────────────────────────────────────────────┐
  │  prisma.policy.upsert({                           │
  │    type: 'global_lock', isActive: true            │
  │  })                                               │
  │  prisma.transaction.create({                      │
  │    type: 'security_event', status: 'blocked'      │
  │  })                                               │
  └────────────────────────────────────────────────────┘
  All future workflow steps denied until policy removed
```

### 4. IDO Investment & AI Audit Flow

```
User clicks "Invest 500 PUSD" on Neural Launchpad
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  POST /api/ido/invest                               │
│  { projectId, amount, walletAddress }               │
└──────────┬──────────────────────────────────────────┘
           │
           ├──── 1. solanaService.executePayment()
           │         Treasury → Investor wallet
           │         Returns txHash
           │
           ├──── 2. prisma.project.update({
           │           raisedAmount: { increment: amount }
           │         })
           │
           └──── 3. prisma.investment.create({
                     amount, walletAddress, projectId
                   })

AI Audit (runs on project creation):
┌─────────────────────────────────────────────────────┐
│  auditorService → Gemini 2.5 Flash                  │
│                                                     │
│  Input: project name, description, category, goal   │
│  Output:                                            │
│    aiScore: 0–100 (higher = safer)                  │
│    aiAudit: plain-English risk assessment text      │
│                                                     │
│  → Saved to Project record in DB                    │
│  → Displayed as risk badge on Launchpad UI          │
└─────────────────────────────────────────────────────┘
```

### 5. Autonomous Heartbeat Cycle

```
POST /api/system/heartbeat
        │
        ├── Step 1: streamService.updateAccruedTotals()
        │   Update all active stream balances (per-second math)
        │
        ├── Step 2: reputationService.calculateAgentReputation(agentId)
        │   For each agent:
        │     score  = agent.efficiency (base)
        │     score += min(tasksCount × 0.5, 15)  (volume bonus)
        │     score -= 25 if spent > budget        (discipline penalty)
        │     rating = 3.5 + (score / 100) × 1.5  (1.0–5.0 stars)
        │     → UPDATE agent SET efficiency, rating, pnl
        │
        ├── Step 3: sentinelService.performSecurityAudit()
        │   Run full threat detection (see diagram above)
        │
        ├── Step 4: yieldService.routeToYield(balance × 0.1)
        │   if treasury balance > 5000 PUSD:
        │     → Record yield_investment transaction
        │
        └── Step 5: Aggregate protocol stats
            → Return { success, security, metrics }
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.4 | App Router, SSR, file-based API routes |
| **React** | 19.2.4 | UI with concurrent rendering features |
| **TypeScript** | 5.x | End-to-end type safety |
| **Tailwind CSS** | 4.x | Utility-first styling with `@theme` custom tokens |
| **Framer Motion** | 12.x | Page transitions, stagger, spring animations |
| **TanStack Query** | 5.x | Server state, optimistic updates, cache invalidation |
| **Recharts** | 2.x | Treasury history area chart |
| **Lucide React** | 0.477 | Consistent icon system |
| **Zustand** | 5.x | Global UI state (toast notifications, modals) |
| **date-fns** | 4.x | Date formatting |

### Backend / API

| Technology | Version | Purpose |
|---|---|---|
| **Next.js App Router** | 16.2.4 | File-based REST API — 20 routes |
| **Prisma ORM** | 6.4.1 | Type-safe PostgreSQL queries |
| **Supabase** | 2.x | Managed PostgreSQL + row-level security |

### AI

| Technology | Version | Purpose |
|---|---|---|
| **Google Gemini 2.5 Flash** | Latest | LLM: command parsing, auditing, insights |
| **@google/generative-ai** | 0.24.1 | Gemini SDK — JSON-mode structured output |

### Blockchain

| Technology | Version | Purpose |
|---|---|---|
| **@solana/web3.js** | 1.98.0 | RPC connection, transactions, keypair generation |
| **@solana/spl-token** | 0.4.14 | PUSD SPL transfers, ATA creation/querying |
| **@solana/wallet-adapter** | 0.15.x | Phantom, Solflare, Coinbase Wallet integration |
| **Solana Devnet** | v4.0.0-rc.0 | Live blockchain testnet |

---

## Feature Breakdown

### Dashboard — Command Centre
The central hub showing real-time treasury metrics, active agent cards, and a live 7-day PUSD balance chart. All numbers are derived from live Solana RPC calls and PostgreSQL aggregations — zero hardcoded values.

Key metrics:
- Treasury PUSD balance (live on-chain RPC call)
- Active agent count and portfolio breakdown
- Protocol yield estimate (balance × 14.2% APY / 12 months)
- Total protocol transaction volume
- Per-agent budget utilisation with search/filter

### Neural Core Chat — AI Command Interface
The primary control surface. Type any natural language instruction:

| Input | Execution |
|---|---|
| `Deploy a Compliance Agent with 10000 PUSD` | Creates agent, generates Solana wallet, funds on-chain |
| `Start payroll to Alice at 0.001 PUSD/second` | Creates stream, accrual begins immediately |
| `Set a 2000 PUSD daily spending limit` | Creates governance policy enforced on all future steps |
| `Audit current risk level` | Full Sentinel scan, returns threat assessment |

### Agents — AI Workforce
Deploy and manage specialised AI agents. Each agent has a Solana wallet, budget, efficiency score, P&L, and a 1–5 star rating. Status flows: `active` → `executing` → `idle` → `paused`.

### Payroll Streaming — Real-Time Compensation
Configure continuous PUSD streams to any Solana wallet at a rate in PUSD per second. Streams accrue every heartbeat cycle. Pause and resume anytime. Recipients verify their balance directly on Solscan.

### Policy Engine — Governance Guardrails
Define spending limits, risk thresholds, and reserve ratios. The `policyService.validateAction()` function runs before every AI workflow step. Denied steps are skipped with a logged reason — the rest of the workflow continues.

Policy types:
- `spending_limit` — max PUSD per single action
- `risk_threshold` — maximum risk score allowed for investments
- `reserve_ratio` — minimum treasury reserve percentage
- `global_lock` — emergency freeze on all outflows (auto-created by Sentinel)

### Risk Sentinel — Autonomous Security
Monitors treasury 24/7. On high transaction velocity, automatically creates a `global_lock` policy and logs a `security_event` transaction. Operators can review the audit log and remove the lock manually.

### Neural Launchpad — AI-Audited IDO Platform
Projects raise PUSD funding from the community. Every project is scored (0–100) and audited by Gemini before any investment is accepted. The score and full audit text are visible to investors on the project card.

### Portfolio — Live On-Chain Asset View
Derives treasury composition directly from the Solana RPC — SOL balance plus every SPL token account. Completely real-time, no DB caching involved.

### Reputation — Trust Scoring Engine
Each agent's reputation is recomputed on every heartbeat from four factors:
1. Base efficiency score (starts at 100)
2. Task volume bonus (+0.5 pts/task, max +15)
3. Budget discipline penalty (−25 pts if spent > budget)
4. Yield cycle bonus (+0.2% P&L per recorded work cycle)

### Protocol Ledger — Transaction History
Searchable, filterable, exportable table of every on-chain and internal event. Blockchain transactions link to Solscan. One-click CSV export of any filtered view.

### Yield Engine — Idle Capital Optimisation
When treasury exceeds 5,000 PUSD, the heartbeat allocates 10% to the yield vault automatically. Logged as a `yield_investment` transaction with description and timestamp.

### Analytics — Performance Intelligence
Charts for agent P&L trends, efficiency distributions, task completion rates, and budget utilisation across the entire agent fleet over time.

---

## Database Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL (Supabase)                        │
└─────────────────────────────────────────────────────────────────┘

Agent
├── id            String   @id @default(cuid())
├── name          String
├── role          String
├── status        String   // active | idle | executing | paused
├── budget        Float    // Allocated PUSD
├── spent         Float    // Cumulative PUSD spent (auto-incremented)
├── tasksCount    Int      // Completed task count
├── efficiency    Float    // 0–100 performance score
├── pnl           Float    // Profit & Loss (updated per heartbeat)
├── rating        Float    // 1.0–5.0 trust score
├── walletAddress String?  // Solana public key
├── createdAt     DateTime
├── updatedAt     DateTime
├── transactions  Transaction[]
├── policies      Policy[]
└── projects      Project[]

Transaction
├── id          String   @id @default(cuid())
├── amount      Float
├── currency    String   // default: PUSD
├── type        String   // deposit | withdrawal | payment | swap
│                        // investment | yield_investment | security_event
├── description String
├── status      String   // pending | completed | failed | blocked
├── txHash      String?  // Solana transaction signature (Solscan link)
├── agentId     String?  // FK → Agent (nullable = treasury-level tx)
└── createdAt   DateTime

Stream
├── id            String   @id @default(cuid())
├── recipientName String
├── recipientRole String
├── ratePerSecond Float    // PUSD per second
├── totalStreamed Float    // Cumulative PUSD accrued
├── status        String   // active | paused | finished
├── walletAddress String   // Recipient Solana wallet
├── createdAt     DateTime
└── updatedAt     DateTime  // Used to calculate elapsed time for accrual

Policy
├── id          String   @id @default(cuid())
├── name        String
├── type        String   // spending_limit | risk_threshold | reserve_ratio | global_lock
├── value       Float    // Threshold value for enforcement
├── description String
├── isActive    Boolean  // Toggle without deleting
├── agentId     String?  // FK → Agent (null = global, applies to all)
├── createdAt   DateTime
└── updatedAt   DateTime

Project  (Neural Launchpad)
├── id             String   @id @default(cuid())
├── name           String
├── description    String
├── goalAmount     Float    // Fundraising target (PUSD)
├── raisedAmount   Float    // Current amount raised (incremented on invest)
├── status         String   // active | funded | failed
├── creatorAddress String   // Solana wallet of project creator
├── aiScore        Int      // 0–100 risk score from Gemini
├── aiAudit        String?  // Full AI audit report text
├── category       String   // DeFi | Infrastructure | Gaming | etc.
├── createdAt      DateTime
├── updatedAt      DateTime
├── investments    Investment[]
├── agentId        String?  // FK → Agent (if agent-created)
└── agent          Agent?

Investment
├── id            String   @id @default(cuid())
├── amount        Float    // PUSD invested
├── walletAddress String   // Investor Solana wallet (from connected wallet)
├── projectId     String   // FK → Project
└── createdAt     DateTime
```

---

## API Reference

### Agents

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/agents` | List all agents with full transaction history |
| `POST` | `/api/agents` | Create a new agent record |
| `POST` | `/api/agents/sync` | Run AI reasoning cycle for a single agent |
| `POST` | `/api/agents/collaborate` | Initiate agent-to-agent resource collaboration |

### AI Command

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/command/v2` | Parse natural language → execute full workflow |
| `POST` | `/api/workflow/execute` | Execute a pre-structured workflow step array |

### Treasury

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/treasury/stats` | Live PUSD balance + network info (RPC) |
| `GET` | `/api/treasury/portfolio` | On-chain SOL + all SPL token holdings |
| `GET` | `/api/treasury/history` | 7-day chart data with real on-chain baseline |
| `POST` | `/api/treasury/rebalance` | Manually trigger yield vault routing |

### Streams (Payroll)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/streams` | List all payroll streams |
| `POST` | `/api/streams` | Create new stream |
| `POST` | `/api/streams/[id]/toggle` | Pause or resume a stream |

### Policies

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/policies` | List all governance policies |
| `POST` | `/api/policies` | Create new policy |
| `POST` | `/api/policies/[id]/toggle` | Enable or disable a policy |

### Sentinel

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/sentinel/status` | Current security status snapshot |
| `POST` | `/api/sentinel/audit` | Trigger full security audit cycle |

### Launchpad (IDO)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/ido` | List all launchpad projects |
| `POST` | `/api/ido` | Create project + trigger AI audit |
| `POST` | `/api/ido/invest` | Invest PUSD into a project (on-chain) |

### System

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/system/heartbeat` | Run full autonomous cycle (all 5 steps) |
| `GET` | `/api/health` | Service health: DB + Blockchain + AI |
| `GET` | `/api/insights` | AI-generated protocol insights |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Solana wallet browser extension (Phantom, Solflare, or Coinbase Wallet)
- A [Supabase](https://supabase.com) project with a PostgreSQL database
- A [Google AI Studio](https://aistudio.google.com) API key

### Installation

```bash
git clone https://github.com/your-org/palmflow-ai.git
cd palmflow-ai
npm install
```

### Database Setup

```bash
# Apply schema (use port 5432 direct connection — NOT 6543 pooler)
DATABASE_URL="postgresql://postgres.[ref]:[pass]@aws-...supabase.com:5432/postgres" \
  npx prisma db push

# Seed demo agents, streams, and policies
npx prisma db seed
```

### Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## Environment Variables

```env
# ─── Database ────────────────────────────────────────────────────────────────
# IMPORTANT: Use port 5432 (direct), NOT 6543 (PgBouncer/pooler) for schema migrations
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-...supabase.com:5432/postgres"

# ─── Supabase ────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL="https://[ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# ─── AI ──────────────────────────────────────────────────────────────────────
GEMINI_API_KEY="AIza..."          # Google AI Studio — uses gemini-2.5-flash

# ─── Solana ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SOLANA_NETWORK="devnet"
NEXT_PUBLIC_SOLANA_RPC_URL=""     # Leave blank to use public devnet endpoint

# ─── PUSD Token ──────────────────────────────────────────────────────────────
# The SPL token mint address for PUSD
NEXT_PUBLIC_PUSD_MINT="4BTn2941J4ggCKU2s8Gi2L3kZo5LwFm6bmyssikqmJQB"

# The treasury authority keypair as a JSON byte array (64 bytes)
# This wallet holds the PUSD supply and signs all outgoing transfers
# NEVER commit this to source control — use Vercel Secrets or AWS Secrets Manager
PUSD_AUTHORITY_KEY="[144,59,228,...]"
```

---

## How to Use — User Guide

### Connect Your Wallet
1. Click **Connect Wallet** in the top navigation
2. Select Phantom, Solflare, or Coinbase Wallet
3. Approve the connection in your browser extension
4. Your wallet address appears in the top bar — you are now identified on-chain

### Issue Commands via Neural Core Chat
Go to **Neural Core** and type any instruction:

| What you type | What happens |
|---|---|
| `Deploy a DeFi Analyst agent with 8000 PUSD` | Agent created, Solana wallet generated, funded on-chain |
| `Start a payroll stream to Bob at 0.002 PUSD per second` | Stream created, accrual begins immediately |
| `Set a 1000 PUSD spending policy for agents` | Governance policy created and enforced |
| `Audit the risk level` | Sentinel scans velocity, budgets, and compliance |
| `Route 10% of treasury to yield` | Funds allocated, logged as yield_investment |

### Deploy an Agent Manually
1. Go to **Dashboard** or **Agents**
2. Click **Deploy New Agent**
3. Enter: Name, Role, Budget (PUSD)
4. Click **Deploy** — wallet generated, funds sent on-chain instantly

### Create a Payroll Stream
1. Go to **Payroll** (`/streaming`)
2. Click **Create New Stream**
3. Fill in: recipient name, role, PUSD/second, Solana wallet address
4. Stream is active immediately — pause/resume with the toggle button

### Manage Governance Policies
1. Go to **Policy Engine** (`/policy`)
2. Click **New Policy** — choose type and set threshold
3. Toggle any policy on/off without deleting it
4. All future AI workflow steps respect active policies

### Launch a Project on the IDO Launchpad
1. Go to **Neural Launchpad** (`/launchpad`)
2. Ensure your wallet is connected
3. Click **Launch Project** — fill in name, description, goal, and category
4. Gemini AI audits the project and assigns a score (0–100)
5. Investors browse and fund with PUSD — amounts tracked on-chain

### Run a Security Audit
1. Open **Risk Sentinel** (from Navbar or `/sentinel`)
2. Click **Run Audit**
3. Sentinel checks velocity, budget drain, and policy compliance
4. Returns: `secure` / `warning` / `emergency_lock`

### Export Transaction History
1. Go to **Protocol Ledger** (`/history`)
2. Use the search box to filter by agent, type, or description
3. Click the download icon for a full CSV export
4. Click any Solscan link to verify a transaction on the blockchain

---

## Security Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    Defence-in-Depth                             │
└─────────────────────────────────────────────────────────────────┘

Layer 1 — Policy Engine (Pre-execution Validation)
  Every workflow step runs through policyService.validateAction()
  before any DB write or blockchain call is made.
  → Steps that violate active policies are denied and logged.
  → The rest of the workflow continues unaffected.

Layer 2 — Risk Sentinel (Continuous Monitoring)
  Every heartbeat cycle scans for anomalies:
    - Velocity: > 5 transactions per minute → auto-lock
    - Budget drain: agent spent > 80% → critical alert
  Auto-lock creates a global_lock policy and a security_event
  transaction — traceable in the Protocol Ledger.

Layer 3 — On-Chain Guardrails
  The authority keypair only holds PUSD and SOL for gas.
  Agent wallets receive PUSD but cannot independently sign
  outgoing transactions — all payments route through the
  treasury authority, which is subject to policy checks.

Layer 4 — Idempotent ATA Provisioning
  createAssociatedTokenAccountIdempotentInstruction ensures
  PUSD transfers to new wallets never fail due to a missing
  token account. The ATA is created atomically in the same
  transaction as the first transfer.
```

---

## Project Structure

```
palmflow-ai/
├── prisma/
│   ├── schema.prisma           # 6 models: Agent, Transaction, Stream,
│   │                           # Policy, Project, Investment
│   └── seed.ts                 # Demo data seeder
│
├── src/
│   ├── app/
│   │   ├── api/                # 20 REST API route handlers
│   │   │   ├── agents/         # CRUD + AI sync + agent collaboration
│   │   │   ├── command/v2/     # Natural language → workflow execution
│   │   │   ├── ido/            # Launchpad project + investment routes
│   │   │   ├── insights/       # AI-generated protocol insights
│   │   │   ├── policies/       # Governance policy management + toggle
│   │   │   ├── sentinel/       # Security audit + status
│   │   │   ├── streams/        # Payroll stream management + toggle
│   │   │   ├── system/         # Heartbeat (autonomous 5-step cycle)
│   │   │   ├── treasury/       # Stats, portfolio, history, rebalance
│   │   │   └── workflow/       # Pre-parsed workflow step executor
│   │   │
│   │   ├── agents/             # AI Workforce page
│   │   ├── analytics/          # Performance analytics charts
│   │   ├── chat/               # Neural Core chat interface
│   │   ├── dashboard/          # Main command centre
│   │   ├── history/            # Protocol Ledger (searchable, exportable)
│   │   ├── launchpad/          # Neural Launchpad (IDO)
│   │   ├── marketplace/        # Agent marketplace browser
│   │   ├── payroll/            # Payroll management overview
│   │   ├── policy/             # Policy engine UI
│   │   ├── reputation/         # Agent reputation scoring
│   │   ├── streaming/          # Live payroll stream cards
│   │   └── yield/              # Yield optimisation dashboard
│   │
│   ├── components/
│   │   ├── dashboard/          # DashboardMode, AgentCard, modals, charts
│   │   ├── landing/            # Hero, AgentSystem, Ecosystem sections
│   │   ├── layout/             # Navbar, BottomDock, TopHeader
│   │   ├── providers/          # BlockchainProvider, QueryProvider
│   │   ├── ui/                 # BentoGrid, CommandBar, ToastProvider
│   │   └── wallet/             # WalletContextProvider (Phantom/Solflare/Coinbase)
│   │
│   ├── hooks/                  # 10 TanStack Query hooks
│   │   ├── useAgents.ts        # Agent list + deploy + sync mutations
│   │   ├── useTreasury.ts      # Treasury stats + history
│   │   ├── useStreams.ts        # Stream list + create + toggle
│   │   ├── usePolicies.ts      # Policy list + create + toggle
│   │   ├── useIdo.ts           # Projects + invest + createProject
│   │   ├── useInsights.ts      # AI insights
│   │   ├── usePortfolio.ts     # On-chain portfolio
│   │   ├── useReputation.ts    # Agent reputation scores
│   │   ├── useSentinel.ts      # Sentinel status + audit trigger
│   │   └── useYield.ts         # Yield stats + rebalance
│   │
│   ├── lib/
│   │   ├── ai/OpenAIProvider.ts  # Gemini 2.5 Flash integration
│   │   ├── prisma.ts             # Prisma client singleton
│   │   └── store.ts              # Zustand global state
│   │
│   └── server/services/        # 15 service modules
│       ├── agent.service.ts        # Agent CRUD operations
│       ├── auditor.service.ts      # AI risk scoring for IDO projects
│       ├── coordination.service.ts # Agent-to-agent collaboration
│       ├── dex.service.ts          # DEX swap interface (Jupiter-ready)
│       ├── ido.service.ts          # Launchpad project management
│       ├── insight.service.ts      # AI-generated protocol insights
│       ├── policy.service.ts       # Governance validation engine
│       ├── reputation.service.ts   # Trust score calculation
│       ├── sentinel.service.ts     # Security monitoring + auto-lock
│       ├── solana.service.ts       # All Solana RPC interactions
│       ├── stream.service.ts       # Payroll stream management
│       ├── token.service.ts        # SPL token operations
│       ├── transaction.service.ts  # Transaction logging
│       ├── workflow.service.ts     # Multi-step execution engine
│       └── yield.service.ts        # Yield optimisation
│
└── .env                        # Environment configuration (never commit)
```

---

## Roadmap

### Phase 1 — Foundation (Complete)
- AI agent deployment with Solana wallet generation
- PUSD SPL token integration with idempotent ATA provisioning
- Per-second payroll streaming with real-time accrual
- Governance policy engine with pre-execution validation
- Risk Sentinel with velocity detection and auto-lock
- Neural Launchpad with AI audit scoring (Gemini 2.5 Flash)
- Natural language command interface
- On-chain reputation scoring per heartbeat cycle
- Real-time portfolio tracking via Solana RPC
- Protocol Ledger with CSV export and Solscan links

### Phase 2 — DeFi Integration
- Jupiter DEX integration for autonomous token swaps
- Jito liquid staking yield vault (real on-chain yield APY)
- Drift Protocol perpetuals for AI-managed treasury hedging
- Cross-chain bridge support via Wormhole

### Phase 3 — Multi-Tenant Protocol
- Organisation workspaces (multiple independent treasuries)
- Role-based access control for human team members
- Delegated signing — agents sign their own sub-transactions
- SPL Governance integration for on-chain DAO voting

### Phase 4 — Open Agent Marketplace
- Public marketplace of specialised agent templates
- Agent performance leaderboard with on-chain reputation
- Agent NFT certificates for top-rated performers
- Cross-protocol agent collaboration APIs

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Ensure `npx tsc --noEmit` passes with zero errors
4. Ensure `npm run build` succeeds
5. Submit a pull request with a clear description of the change

---

## License

MIT License — open source, free to use and modify.

---

*Built with Gemini 2.5 Flash · Solana Devnet · Next.js 16 · Supabase · Prisma · TanStack Query · Framer Motion*
