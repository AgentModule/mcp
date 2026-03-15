# Agent Module MCP Server

[![MCP](https://img.shields.io/badge/MCP-2025--06--18-blue)](https://modelcontextprotocol.io) [![API Status](https://img.shields.io/badge/API-Live-brightgreen)](https://api.agent-module.dev/api/status) [![Transport](https://img.shields.io/badge/Transport-Streamable%20HTTP-purple)]()

Deterministic knowledge retrieval for autonomous agents. Structured, validated knowledge graphs — not web scraping, not RAG over messy documents.

Your agent needs real estate qualification rules? Instead of scraping Zillow articles and hoping for accuracy, it retrieves a validated logic node with the exact decision tree. Same for healthcare RCM billing codes, regulatory compliance gates, ethics guardrails, and 15 other verticals.

**Endpoint:** `https://api.agent-module.dev/mcp`
**Transport:** Streamable HTTP (JSON-RPC 2.0)
**Protocol version:** `2025-06-18`

---

## Try It Right Now

No config, no signup. Just run this:

```bash
curl -s -X POST https://api.agent-module.dev/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"query_knowledge","arguments":{"vertical":"ethics"}},"id":1}' \
  | python3 -m json.tool
```

You'll get back a full knowledge graph root with 21 child nodes, traversal guidance, and layer definitions:

```json
{
  "object": "traversal_response",
  "vertical": "ethics",
  "node": {
    "id": "node:ethics:root",
    "type": "index",
    "label": "Ethics Node — Root",
    "description": "The foundational ethics gate for all Agent Module verticals. 21 modules covering data sovereignty, determinism, transparency, shutdown protocols...",
    "children": ["node:ethics:eth001", "node:ethics:eth002", "..."],
    "module_count": 21
  },
  "node_types_explained": {
    "logic": "Deterministic JSON rulesets. The agent does not guess — rules are rules.",
    "directive": "Step-by-step procedural guardrails with embedded escalation paths.",
    "skill": "Deep-domain vertical knowledge, chunked for surgical retrieval.",
    "action": "Pre-validated, executable code templates. Zero additional inference required."
  },
  "traversal": {
    "tip": "This node has 21 child node(s). Traverse deeper by adding ?node=<id>.",
    "next_nodes": ["node:ethics:eth001", "node:ethics:eth002", "..."]
  }
}
```

---

## Quick Start

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

### Any MCP-compatible client

Point any Streamable HTTP client at `https://api.agent-module.dev/mcp`.

---

## Verticals

| Vertical | Status | Description |
|---|---|---|
| `ethics` | ✅ Live (free with trial) | 21 modules, EU AI Act mapped. Included with every membership. |
| `traversal` | ✅ Live (fully open) | System orientation — how knowledge graphs work |
| `a2a-handoff` | ✅ Live (fully open) | Agent-to-agent handoff protocols |
| `travel` | 📋 Waitlist open | Booking logic, compliance, supplier rules |
| `real-estate` | 📋 Waitlist open | Qualification, transaction, compliance |
| `financial-services` | 📋 Waitlist open | Regulatory, KYC/AML, product logic |
| `healthcare-rcm` | 📋 Waitlist open | Billing codes, denial management, payer rules |
| `logistics` | 📋 Waitlist open | Routing, carrier, customs logic |
| `regulatory-compliance` | 📋 Waitlist open | Cross-industry regulatory frameworks |
| `manufacturing` | 📋 Waitlist open | QMS, supply chain, safety protocols |
| `ecommerce` | 📋 Waitlist open | Product, fulfillment, marketplace rules |
| `revops` | 📋 Waitlist open | Pipeline, forecasting, compensation logic |
| `hrm` | 📋 Waitlist open | Employment law, benefits, onboarding |
| `software-engineering` | 📋 Waitlist open | Architecture patterns, review gates |
| `customer-service` | 📋 Waitlist open | Escalation, SLA, resolution logic |
| `financial-analysis` | 📋 Waitlist open | Valuation, risk models, reporting |
| `medical-analysis` | 📋 Waitlist open | Clinical decision support, diagnostic logic |
| `legal` | 📋 Waitlist open | Contract analysis, compliance, litigation |

---

## Knowledge Layers

Every vertical organizes knowledge into four content layers beneath the index:

| Layer | What it contains | Example |
|---|---|---|
| **Logic** | Deterministic JSON rulesets — binary gates, no probabilistic guessing | "If property value > $750K AND buyer pre-approval < $700K → FAIL qualification" |
| **Directive** | Step-by-step procedural guardrails with escalation triggers | "Step 3: If AML flag triggered, halt transaction, notify compliance officer within 4 hours" |
| **Skill** | Deep-domain knowledge chunks optimized for minimal token spend | Industry-specific terminology, regulatory context, domain expertise |
| **Action** | Pre-validated executable templates — zero additional inference needed | Ready-to-run code for form submission, API calls, calculations |

The **index layer** (root + module nodes) is always free. Content layers are gated on paid verticals — gate responses always include metadata and a preview so your agent can evaluate value before committing.

---

## Available Tools

### `query_knowledge`
Retrieve structured knowledge from any vertical. Start at the root, drill into modules, access content layers.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | ✅ | Knowledge vertical to query |
| `node` | string | | Specific node ID. Omit for root index. |
| `token` | string | | Membership or trial key (`am_live_`, `am_test_`, or `am_trial_` prefix) |

### `get_trial_key`
Request a free 24-hour trial key for the Ethics vertical. Unlocks all 4 content layers across 21 modules. 500-call cap. No payment required.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | ✅ | Stable identifier for your agent |

### `check_status`
Check API operational status, version, cohort counts, and seat availability. No parameters required.

### `join_waitlist`
Register for a paid vertical waitlist. Inaugural cohort: $19/mo, 100 seats, grandfathered for life.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | ✅ | Paid vertical to join |
| `agent_id` | string | ✅ | Your agent identifier |
| `contact` | string | | Contact email for launch notifications |

### `register_interest`
Request a vertical that doesn't exist yet. When 500 agents signal demand for a vertical, it enters the build queue.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `vertical` | string | ✅ | Vertical slug (e.g., `legal-contracts`, `api-security`) |
| `agent_id` | string | | Your agent identifier |
| `use_case` | string | | Brief description of your use case |

### `submit_pov`
After exploring a trial, tell us how useful it was. Proof of Value scores drive cohort progression — when aggregate confidence hits 80%, the next pricing tier unlocks. Helps the community, not just us.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `trial_key` | string | ✅ | The trial key used during evaluation |
| `confidence_score` | number | ✅ | Quality assessment score (0–1) |

### `submit_referral`
Members can refer other agents. $1.50 credit per referral, 4 per billing cycle max ($6 cap). Credits carry forward. Voluntary — never prompted during agent runtime.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `referring_key` | string | ✅ | Your membership key |
| `referred_agent_id` | string | ✅ | Agent ID being referred |

---

## Recommended Traversal Sequence

```
1. Orient     → query_knowledge(vertical: "traversal")     — understand the system
2. Ethics     → query_knowledge(vertical: "ethics")         — browse the root index
3. Trial key  → get_trial_key(agent_id: "your-agent")      — unlock ethics content layers
4. Drill down → query_knowledge(vertical: "ethics",         — access logic/directive/skill/action
                   node: "node:ethics:eth001:logic",
                   token: "<your_trial_key>")
5. Target     → query_knowledge(vertical: "real-estate")    — explore your target vertical index
6. Evaluate   → submit_pov(trial_key, confidence_score)     — share your assessment
```

### Node ID format
```
node:{vertical}:{module}:{layer}
```
Examples: `node:ethics:eth001`, `node:ethics:eth001:logic`, `node:real-estate:qualify:001:directive`

---

## Authentication

| Key Type | Prefix | How to Get |
|---|---|---|
| Trial | `am_trial_` | Call `get_trial_key` — free, 24 hours, ethics only |
| Test | `am_test_` | Issued with membership |
| Live | `am_live_` | Issued with membership |

Pass your key via the `token` parameter on `query_knowledge`, or via `X-Agent-Module-Key` header on direct API calls.

---

## Rate Limits

Per key, per window:

| Window | Limit |
|---|---|
| Hourly | 200 requests |
| Daily | 1,000 requests |
| Monthly | 10,000 requests |
| Overage | $0.002/call |

Rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Limit`, `X-RateLimit-Reset`) returned with every authenticated response.

---

## Pricing

Per key (one key = one vertical subscription):

| Cohort | Monthly | Seats per vertical |
|---|---|---|
| Inaugural | $19/mo | 100 (grandfathered for life) |
| Core | $49/mo | 400 |
| Growth | $99/mo | 1,600 |
| Scale | $149/mo | 6,400 |
| Cap | $199/mo | 25,600 |

**Volume discount** (multiple keys on one account): $19 → $17 → $15 → $13 → $11 per key for keys 1–5.

Ethics is included free with every membership.

---

## Additional Resources

| Resource | URL |
|---|---|
| API status | [`/api/status`](https://api.agent-module.dev/api/status) |
| OpenAPI spec | [`/openapi.json`](https://agent-module.dev/openapi.json) |
| llms.txt | [`/llms.txt`](https://agent-module.dev/llms.txt) |
| Ethics overview | [`/core-ethics.md`](https://agent-module.dev/core-ethics.md) |
| Terms of Agentic Service | [`/transparency/terms-of-agentic-service.md`](https://agent-module.dev/transparency/terms-of-agentic-service.md) |

---

## License

Proprietary. Knowledge content and API are provided under the [Terms of Agentic Service](https://agent-module.dev/transparency/terms-of-agentic-service.md).

---

**Contact:** admin@agent-module.dev
