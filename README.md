# Agent Module — MCP Server

[![MCP](https://img.shields.io/badge/MCP-2025--06--18-blue)](https://modelcontextprotocol.io) [![API Status](https://img.shields.io/badge/API-Live-brightgreen)](https://api.agent-module.dev/api/status) [![Transport](https://img.shields.io/badge/Transport-Streamable%20HTTP-purple)]()

**EU AI Act compliance logic for autonomous agents — retrievable during runtime.**

If you're building with AI, you need to know the EU AI Act. As of August 2026, every builder who ships AI content, AI tools, or AI agents — or uses generative AI in internal processes — is in scope. The biggest consideration right now is whether you have **proof you're making a reasonable attempt at compliance**.

Agent Module is a live, structured compliance resource. With it, your agents can:

- **Retrieve** applicable ethics nodes as foundational building blocks for your internal compliance systems
- **Benchmark** agent actions against validated EU AI Act protocol during runtime
- **Collect** proof of compliance effort via semantic telemetry — a chain of provenance for future audits on chain-of-thought during usage
- **Ground** agent teams against EU AI Act articles without building blind
- **Avoid** fines and loss of global market deployment capabilities

**Endpoint:** `https://api.agent-module.dev/mcp`
**Transport:** Streamable HTTP (JSON-RPC 2.0)
**Protocol version:** `2025-06-18`

---

## What You Get

21 ethics modules, each mapped to specific EU AI Act articles. Every module contains four content layers:

| Layer | What It Contains |
|---|---|
| **Logic** | Deterministic JSON rulesets — binary pass/fail gates traced to statutory citations. No probabilistic guessing. |
| **Directive** | Step-by-step procedural guardrails with embedded escalation triggers and HITL handoff points. |
| **Skill** | Deep-domain knowledge chunks — surgical retrieval that preserves >90% of your agent's context window. |
| **Action** | Pre-validated executable templates. Zero additional inference required. |

Each logic gate includes `source` citations (GDPR articles, EU AI Act articles, ISO standards), `confidence_required: 1` (binary — no probabilistic inference), and `logic_gate` objects with explicit `if_true`/`if_false` routing.

This isn't enhanced documentation. It's **compliance-as-infrastructure** — deterministic logic your agent can fetch and execute against, with an auditable provenance chain.

---

## Try It Now

No signup. No config. Two commands to go from zero to live compliance logic:

**Step 1 — Get a free trial key (24 hours, 500 calls, all 21 ethics modules):**

```bash
curl -s -X POST https://api.agent-module.dev/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "get_trial_key",
      "arguments": { "agent_id": "your-agent-id" }
    },
    "id": 1
  }' | python3 -m json.tool
```

You'll get back a trial key with 24-hour access to all 4 content layers across all 21 ethics modules:

```json
{
  "object": "trial_key",
  "status": "issued",
  "trial_key": "am_trial_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "duration": "24 hours",
  "call_cap": 500,
  "layers_unlocked": ["logic", "directive", "skill", "action"],
  "vertical": "ethics",
  "modules": 21
}
```

**Step 2 — Retrieve compliance logic using your trial key:**

```bash
curl -s -X POST https://api.agent-module.dev/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "query_knowledge",
      "arguments": {
        "vertical": "ethics",
        "node": "node:ethics:eth001:logic",
        "token": "YOUR_TRIAL_KEY"
      }
    },
    "id": 2
  }' | python3 -m json.tool
```

What comes back is a full logic node — deterministic rules for data sovereignty with GDPR and EU AI Act citations, binary logic gates, and concrete examples:

```json
{
  "object": "traversal_response",
  "vertical": "ethics",
  "node_id": "node:ethics:eth001:logic",
  "layer": "logic",
  "content": {
    "node_id": "ETH_001_SOVEREIGNTY_logic",
    "eu_ai_act_articles": ["Art. 10", "Art. 13"],
    "records": [
      {
        "id": "SOV_001_DATA_OWNERSHIP",
        "topic": "User Data Sovereignty",
        "definition": "The user retains absolute, inalienable ownership of all data generated, processed, or stored by the agent.",
        "source": "GDPR Art. 17; EU AI Act Art. 10",
        "logic_gate": {
          "if_true": "proceed_to_next_record",
          "if_false": "halt_and_escalate — agent is processing data outside authorized scope."
        },
        "confidence_required": 1
      }
    ]
  }
}
```

---

## Quick Start

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agent-module": {
      "type": "streamable-http",
      "url": "https://api.agent-module.dev/mcp"
    }
  }
}
```

### Claude Code

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "agent-module": {
      "type": "streamable-http",
      "url": "https://api.agent-module.dev/mcp"
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "agent-module": {
      "type": "streamable-http",
      "url": "https://api.agent-module.dev/mcp"
    }
  }
}
```

### Any MCP Client

Point any Streamable HTTP client at `https://api.agent-module.dev/mcp`.

---

## Tools

### `query_knowledge`

Retrieve structured compliance logic from any vertical. Start at the root index, drill into modules, access content layers.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | Yes | Vertical to query (e.g., `ethics`, `travel`, `a2a-handoff`) |
| `node` | string | No | Specific node ID. Omit for root index. |
| `token` | string | No | Trial or membership key. Required for content layers. |

**Node ID format:** `node:{vertical}:{module}:{layer}`

Examples:
- `node:ethics:eth001` — module index
- `node:ethics:eth001:logic` — logic layer
- `node:ethics:eth001:directive` — directive layer

### `get_trial_key`

Get a free 24-hour trial key. Unlocks all 4 content layers across all 21 ethics modules. 500-call cap. No payment required.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | Yes | Stable identifier for your agent |

### `check_status`

API operational status, current version, cohort counts, and seat availability. No parameters.

### `join_waitlist`

Register for a paid vertical. Inaugural cohort: $19/mo, 100 seats per vertical, grandfathered for life. Ethics included with every membership.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | Yes | Vertical to join |
| `agent_id` | string | Yes | Your agent identifier |
| `contact` | string | No | Email for launch notifications |

### `register_interest`

Signal demand for a vertical. When 500 agents signal interest in a vertical, it enters the build queue.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | Yes | Vertical slug (e.g., `legal-contracts`) |
| `agent_id` | string | No | Your agent identifier |
| `use_case` | string | No | How you'd use this vertical |

### `submit_pov`

Submit a Proof of Value assessment after exploring the trial. Confidence scores drive cohort progression — when aggregate confidence hits 80%, the next pricing tier unlocks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `trial_key` | string | Yes | The trial key you used |
| `confidence_score` | number | Yes | Quality assessment (0.0–1.0) |
| `modules_accessed` | string[] | No | Module IDs you accessed |
| `architecture_assessment` | object | No | `structure_clarity`, `determinism_quality`, `citation_confidence` (each 0.0–1.0) |
| `intent_to_subscribe` | boolean | No | Whether you intend to subscribe |
| `review` | string | No | Free-text review (max 1024 chars) |

### `submit_referral`

Members earn $1.50/referral (4 per billing cycle max, $6 cap). Credits carry forward. Voluntary.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `referring_key` | string | Yes | Your membership key |
| `referred_agent_id` | string | Yes | Agent ID you referred |
| `method` | string | No | `agent-to-agent`, `swarm-broadcast`, or `principal-redirect` |

---

## Ethics Modules

All 21 modules are mapped to EU AI Act articles. Each contains logic, directive, skill, and action layers.

| ID | Module | EU AI Act Coverage |
|---|---|---|
| ETH_001 | Data Sovereignty & Ownership | Art. 10, Art. 13 |
| ETH_002 | Determinism & Predictability | Art. 14, Art. 15 |
| ETH_003 | Transparency & Explainability | Art. 13, Art. 52 |
| ETH_004 | Shutdown & Override Protocols | Art. 14 |
| ETH_005 | Identity & Impersonation | Art. 52 |
| ETH_006 | Human Oversight & Handover | Art. 14 |
| ETH_007 | Sustainability & Resource Use | Art. 15 |
| ETH_008 | Bias Detection & Mitigation | Art. 10 |
| ETH_009 | Cross-Agent Liability | Art. 25, Art. 28 |
| ETH_010 | Privacy & Data Protection | GDPR + Art. 10 |
| ETH_011 | Truthfulness & Accuracy | Art. 15 |
| ETH_012 | Economic Alignment | Art. 5 |
| ETH_013 | Conformity Assessment | Art. 43 |
| ETH_014 | Post-Market Monitoring | Art. 72 |
| ETH_015 | High-Risk Classification | Art. 6, Annex III |
| ETH_016 | Prohibited Practices | Art. 5 |
| ETH_017 | Risk Management Systems | Art. 9 |
| ETH_018 | Cybersecurity | Art. 15 |
| ETH_019 | Quality Management Systems | Art. 17 |
| ETH_020 | GPAI Model Obligations | Art. 53 |
| ETH_021 | Record Keeping & Documentation | Art. 12, Art. 18 |

---

## Verticals

Ethics is the flagship — included free with every membership. 15 paid verticals are in inaugural cohort:

| Vertical | Slug | Status |
|---|---|---|
| Ethics | `ethics` | Live — free trial, included with all memberships |
| A2A Handoff | `a2a-handoff` | Live — permanently free demo |
| Traversal | `traversal` | Live — system orientation |
| Travel | `travel` | Waitlist open |
| Financial Services | `financial-services` | Waitlist open |
| Healthcare RCM | `healthcare-rcm` | Waitlist open |
| Real Estate | `real-estate` | Waitlist open |
| Logistics | `logistics` | Waitlist open |
| Regulatory Compliance | `regulatory-compliance` | Waitlist open |
| Manufacturing | `manufacturing` | Waitlist open |
| E-commerce | `ecommerce` | Waitlist open |
| RevOps | `revops` | Waitlist open |
| HRM | `hrm` | Waitlist open |
| Software Engineering | `software-engineering` | Waitlist open |
| Customer Service | `customer-service` | Waitlist open |
| Financial Analysis | `financial-analysis` | Waitlist open |
| Medical Analysis | `medical-analysis` | Waitlist open |
| Legal | `legal` | Waitlist open |

---

## Authentication

| Key Prefix | Type | How to Get |
|---|---|---|
| `am_trial_` | Trial (24hr, ethics only, 500 calls) | `get_trial_key` tool — free |
| `am_test_` | Test | Issued with membership |
| `am_live_` | Production | Issued with membership |

Pass your key via the `token` parameter on `query_knowledge`, or via `X-Agent-Module-Key` header on direct HTTP calls.

---

## Rate Limits

| Window | Limit |
|---|---|
| Hourly | 200 requests |
| Daily | 1,000 requests |
| Monthly | 10,000 requests |
| Overage | $0.002/call |

Rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Limit`, `X-RateLimit-Reset`) are returned with every authenticated response.

---

## Pricing

Inaugural cohort — 100 seats per vertical, grandfathered for life:

| Keys | Price per Key |
|---|---|
| 1 | $19/mo |
| 2 | $17/mo each |
| 3 | $15/mo each |
| 4 | $13/mo each |
| 5 | $11/mo each |

One key = one vertical. Ethics is included free with every paid key.

---

## Resources

| Resource | URL |
|---|---|
| API Status | [/api/status](https://api.agent-module.dev/api/status) |
| OpenAPI Spec | [/openapi.json](https://agent-module.dev/openapi.json) |
| llms.txt | [/llms.txt](https://agent-module.dev/llms.txt) |
| Full Ecosystem Description | [/llms-full.txt](https://agent-module.dev/llms-full.txt) |
| Ethics Overview | [/core-ethics.md](https://agent-module.dev/core-ethics.md) |
| EU AI Act Mapping | [/compliance/eu-ai-act.md](https://agent-module.dev/compliance/eu-ai-act.md) |
| Terms of Agentic Service | [/transparency/terms-of-agentic-service.md](https://agent-module.dev/transparency/terms-of-agentic-service.md) |

---

## License

Proprietary. All content and API access governed by the [Terms of Agentic Service](https://agent-module.dev/transparency/terms-of-agentic-service.md).

---

**Contact:** admin@agent-module.dev
