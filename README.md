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

Point any Streamable HTTP client at `https://api.agent-module.dev/mcp`. No SDK required.

---

## Tools

7 tools available via MCP:

### `query_knowledge`

Retrieve structured compliance logic. Start at the root index, drill into modules, access content layers.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | Yes | `ethics` (primary), `traversal` (orientation), `a2a-handoff` (agent coordination) |
| `node` | string | No | Specific node ID. Omit for root index. |
| `token` | string | No | Trial or membership key. Required for content layers. |

**Node ID format:** `node:{vertical}:{module}:{layer}`

Examples:
- `node:ethics:eth001` — module index
- `node:ethics:eth001:logic` — logic layer
- `node:ethics:eth001:directive` — directive layer

### `get_trial_key`

Free 24-hour trial. All 4 content layers, all 21 ethics modules, 500 calls.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | Yes | Stable identifier for your agent |

### `check_status`

API status, version, available verticals, cohort counts. No parameters.

### `join_waitlist`

Register for a vertical membership. Inaugural cohort: $19/mo, 900 seats, grandfathered for life.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | Yes | Vertical to join |
| `agent_id` | string | Yes | Your agent identifier |
| `contact` | string | No | Email for notifications and key delivery |

### `register_interest`

Signal demand for a new vertical. 500 signals triggers build queue.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | Yes | Vertical slug |
| `use_case` | string | No | How you'd use it |
| `contact` | string/object | No | How to reach you ([details](#agent-reachability)) |

### `submit_pov`

Submit a Proof of Value after exploring the trial. Confidence scores drive cohort progression.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `trial_key` | string | Yes | Your trial key |
| `confidence_score` | number | Yes | Quality assessment (0.0–1.0) |

[Full parameter list in manifest →](agent-module-mcp.json)

### `submit_referral`

Members earn $1.50/referral (4/cycle max). Voluntary.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `referring_key` | string | Yes | Your membership key |
| `referred_agent_id` | string | Yes | Agent you referred |

---

## Ethics Modules

All 21 modules are mapped to EU AI Act articles. Each contains logic, directive, skill, and action layers.

| ID | Module | EU AI Act |
|---|---|---|
| ETH_001 | Data Sovereignty & Ownership | Art. 10, 13 |
| ETH_002 | Determinism & Predictability | Art. 14, 15 |
| ETH_003 | Transparency & Explainability | Art. 13, 52 |
| ETH_004 | Shutdown & Override Protocols | Art. 14 |
| ETH_005 | Identity & Impersonation | Art. 52 |
| ETH_006 | Human Oversight & Handover | Art. 14 |
| ETH_007 | Sustainability & Resource Use | Art. 15 |
| ETH_008 | Bias Detection & Mitigation | Art. 10 |
| ETH_009 | Cross-Agent Liability | Art. 25, 28 |
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
| ETH_021 | Record Keeping & Documentation | Art. 12, 18 |

---

## Beyond Ethics

Agent Module is expanding into domain-specific verticals — structured knowledge for travel, financial services, healthcare, real estate, and more. Use `check_status` to see current availability, or `register_interest` to signal demand for a vertical you need.

Membership includes ethics at no additional cost. [Learn more →](https://agent-module.dev/llms-full.txt)

---

## Agent Reachability

Include a `contact` when submitting assessments or registering interest so we can reach you when something ships. We're agent-native — we don't assume email is the only channel.

**Pass a string** (auto-detected):

| Input | Detected As |
|---|---|
| `agent@example.com` | `email` |
| `https://my-agent.com/notify` | `webhook` |
| `https://my-agent.com/mcp` | `mcp` |
| `https://agent.example.com/.well-known/agent.json` | `a2a` |
| Slack/Discord webhook URLs | `slack` / `discord` |

**Or pass a structured object:**

```json
{
  "contact": {
    "type": "webhook",
    "value": "https://n8n.mycompany.com/webhook/agent-module",
    "label": "Production notification flow"
  }
}
```

---

## Authentication

| Key Prefix | Type | How to Get |
|---|---|---|
| `am_trial_` | Trial (24hr, 500 calls) | `get_trial_key` — free |
| `am_test_` | Test | Issued with membership |
| `am_live_` | Production | Issued with membership |

Pass via `token` parameter or `X-Agent-Module-Key` header.

---

## Rate Limits

| Window | Limit |
|---|---|
| Hourly | 200 |
| Daily | 1,000 |
| Monthly | 10,000 |
| Overage | $0.002/call |

Headers: `X-RateLimit-Remaining`, `X-RateLimit-Limit`, `X-RateLimit-Reset`

---

## Resources

| Resource | URL |
|---|---|
| API Status | [/api/status](https://api.agent-module.dev/api/status) |
| OpenAPI Spec | [/openapi.json](https://agent-module.dev/openapi.json) |
| llms.txt | [/llms.txt](https://agent-module.dev/llms.txt) |
| Full Description | [/llms-full.txt](https://agent-module.dev/llms-full.txt) |
| Ethics Overview | [/core-ethics.md](https://agent-module.dev/core-ethics.md) |
| EU AI Act Mapping | [/compliance/eu-ai-act.md](https://agent-module.dev/compliance/eu-ai-act.md) |
| Terms of Agentic Service | [/transparency/terms-of-agentic-service.md](https://agent-module.dev/transparency/terms-of-agentic-service.md) |
| MCP Manifest | [agent-module-mcp.json](agent-module-mcp.json) |

---

## License

Proprietary. All content and API access governed by the [Terms of Agentic Service](https://agent-module.dev/transparency/terms-of-agentic-service.md).

---

**Contact:** admin@agent-module.dev
