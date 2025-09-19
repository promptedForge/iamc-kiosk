# API Documentation

This document provides detailed information about the IAMC Human Rights Intelligence Platform REST API.

## Base URL

```
Development: http://localhost:8787
Production: https://api.iamc-platform.com
```

## Authentication

Currently, the API does not require authentication for demo purposes. In production, implement:
- JWT tokens for user sessions
- API keys for service-to-service communication
- Role-based access control (RBAC)

## Common Headers

```http
Content-Type: application/json
Accept: application/json
```

## Error Responses

All errors follow a consistent format:

```json
{
  "error": "Brief not found",
  "code": "BRIEF_NOT_FOUND",
  "status": 404
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Resource not found
- `500` - Internal server error

---

## Endpoints

### 1. Ingestion Status

Get the current status of data ingestion from various sources.

**Endpoint:** `GET /ingest/status`

**Response:**
```json
{
  "count": 8,
  "sources": [
    "news.rss",
    "twitter",
    "press_releases",
    "regulatory_portal"
  ],
  "last_run": "2025-09-19T20:15:49.785817637Z"
}
```

**Fields:**
- `count` - Total number of items ingested today
- `sources` - List of active data sources
- `last_run` - ISO 8601 timestamp of last ingestion

---

### 2. Classify Today's Issues

Retrieve classified issues for today, organized by quadrant.

**Endpoint:** `GET /classify/today`

**Query Parameters:**
- `role` (optional) - Filter by user role: `Analyst` | `Strategy Head`
- `mock` (optional) - Use mock data: `true` | `false`

**Response:**
```json
[
  {
    "id": "energy-20250919",
    "title": "New Energy Regulation Draft Released",
    "quadrant": "Policy",
    "score": 0.92,
    "visibility": ["Analyst", "Strategy Head"],
    "priority": "high"
  },
  {
    "id": "labor-20250919",
    "title": "Labor Coalition Announces Nationwide Actions",
    "quadrant": "Advocacy",
    "score": 0.81,
    "visibility": ["Analyst"],
    "priority": "medium"
  }
]
```

**Fields:**
- `id` - Unique identifier for the issue
- `title` - Brief description
- `quadrant` - Classification: `Policy` | `Industry` | `Advocacy` | `Risk`
- `score` - Confidence score (0.0 - 1.0)
- `visibility` - Roles that can see this issue
- `priority` - Issue priority: `critical` | `high` | `medium` | `low`

---

### 3. Get Issue Brief

Retrieve detailed information about a specific issue.

**Endpoint:** `GET /brief/:id`

**Path Parameters:**
- `id` - Issue identifier (e.g., `energy-20250919`)

**Query Parameters:**
- `lens` (optional) - Role-specific view: `ceo` | `coo` | `director`

**Response (Standard Brief):**
```json
{
  "id": "energy-20250919",
  "title": "Energy Regulation Draft: Immediate Implications",
  "summary": "The draft introduces phased compliance that raises near-term uncertainty but opens avenues for pilot program funding.",
  "risks": [
    "Short-term compliance ambiguity for members",
    "Potential press mischaracterization of IAMC stance",
    "Operational retooling for mid-size facilities"
  ],
  "opportunities": [
    "Leverage pilot programs to shape final language",
    "Position IAMC as a standards partner",
    "Strengthen member onboarding to new reporting tools"
  ],
  "recommendations": [
    "Publish neutral explainer within 2 hours",
    "Schedule coalition roundtable within 48 hours",
    "Identify 3 pilot candidates for early engagement"
  ],
  "evidence": [
    {
      "source": "Federal Register (Draft)",
      "url": "https://example.gov/energy/draft",
      "confidence": 0.86
    }
  ]
}
```

**Response (With Lens):**
```json
{
  "actions": [
    "Sign coalition letter by EOD Friday",
    "Brief board on compliance timeline",
    "Allocate budget for pilot participation"
  ],
  "talking_points": [
    "IAMC supports responsible energy transition",
    "Our members need clarity, not complexity",
    "Pilot programs offer win-win opportunities"
  ]
}
```

---

### 4. Generate Communication Assets

Create tailored communication materials for different audiences.

**Endpoint:** `POST /assets/generate`

**Request Body:**
```json
{
  "brief": {
    "id": "energy-20250919",
    "title": "Energy Regulation Draft",
    "summary": "...",
    "risks": ["..."],
    "opportunities": ["..."]
  },
  "audience": "CEO"
}
```

**Parameters:**
- `brief` - Complete brief object
- `audience` - Target audience: `CEO` | `COO` | `Director` | `Board` | `Members`

**Response:**
```json
{
  "linkedin": "New energy regulations present both challenges and opportunities. As IAMC members, we're uniquely positioned to shape responsible implementation while protecting our industry's interests. Key actions: 1) Engage pilot programs 2) Provide member feedback 3) Maintain unified voice. Together, we'll navigate this transition successfully. #EnergyPolicy #IndustryLeadership",
  "email_paragraph": "Dear [Name], I wanted to brief you on the newly released energy regulation draft. While it introduces some near-term compliance uncertainties, it also opens doors for pilot program participation that could significantly influence the final regulations. IAMC is taking a proactive stance by organizing member roundtables and preparing comprehensive guidance. I recommend we allocate resources for pilot participation to ensure our voice is heard in shaping these critical standards.",
  "press_excerpt": "The International Association of Manufacturing Companies (IAMC) welcomes the opportunity to engage with regulators on the proposed energy standards. 'We believe collaborative pilot programs offer the best path forward for both industry and environmental goals,' said [Spokesperson]. IAMC will work closely with members to ensure responsible implementation that balances compliance with operational realities."
}
```

---

### 5. ROI Metrics

Get return on investment metrics for the intelligence platform.

**Endpoint:** `GET /roi/today`

**Response:**
```json
{
  "hours_saved": 47.5,
  "fte_equiv": 0.6,
  "before_hours": 8.0,
  "after_minutes": 5.0,
  "issues_processed": 156,
  "decisions_accelerated": 12
}
```

**Fields:**
- `hours_saved` - Total hours saved today
- `fte_equiv` - Full-time employee equivalent
- `before_hours` - Manual processing time
- `after_minutes` - Automated processing time
- `issues_processed` - Total issues analyzed
- `decisions_accelerated` - Critical decisions expedited

---

### 6. Export Issue Package

Export a comprehensive package for an issue (requires dual sign-off).

**Endpoint:** `POST /export/:id`

**Path Parameters:**
- `id` - Issue identifier

**Response:**
- **Success**: Binary ZIP file download
- **Error** (if sign-off incomplete):
```json
{
  "error": "Dual sign-off required. Missing: Strategy Head",
  "signed": ["Analyst"],
  "required": ["Analyst", "Strategy Head"]
}
```

**ZIP Contents:**
- `brief.pdf` - Formatted brief document
- `evidence/` - Supporting documents
- `assets.json` - Generated communication materials
- `metadata.json` - Issue metadata and audit trail

---

### 7. Configuration Management

Get or update system configuration.

**Endpoint:** `GET /config`

**Response:**
```json
{
  "cadence": "daily",
  "time_of_day": "07:30",
  "days_of_week": ["Mon", "Tue", "Wed", "Thu", "Fri"],
  "audiences": ["CEO", "COO", "Director"],
  "require_dual_signoff": true,
  "autopublish": false
}
```

**Endpoint:** `POST /config`

**Request Body:**
```json
{
  "cadence": "weekly",
  "time_of_day": "08:00",
  "require_dual_signoff": false
}
```

**Note:** Only provided fields will be updated. Omitted fields retain current values.

---

### 8. Review Status

Get current human review status.

**Endpoint:** `GET /review/status`

**Response:**
```json
{
  "human_interrupt_active": false,
  "signoff": {
    "Analyst": true,
    "Strategy Head": false
  },
  "last_interrupt": "2025-09-19T15:30:00Z",
  "pending_reviews": 3
}
```

---

### 9. Review Controls

Control human-in-the-loop review process.

**Endpoint:** `POST /review/interrupt`

Activates human review mode, pausing automated processing.

**Response:**
```json
{
  "status": "interrupted",
  "timestamp": "2025-09-19T20:30:00Z"
}
```

**Endpoint:** `POST /review/resume`

Resumes automated processing.

**Response:**
```json
{
  "status": "resumed",
  "timestamp": "2025-09-19T20:35:00Z"
}
```

---

### 10. Sign-off Management

Submit role-based approval for current intelligence.

**Endpoint:** `POST /review/signoff`

**Request Body:**
```json
{
  "role": "Analyst",
  "approve": true,
  "notes": "Verified all data sources"
}
```

**Parameters:**
- `role` - Signing role: `Analyst` | `Strategy Head`
- `approve` - Approval decision: `true` | `false`
- `notes` (optional) - Additional comments

**Response:**
```json
{
  "success": true,
  "signoff_status": {
    "Analyst": true,
    "Strategy Head": false
  },
  "timestamp": "2025-09-19T20:40:00Z"
}
```

---

### 11. Learning Samples

Manage historical samples for model training.

**Endpoint:** `GET /learn/samples`

**Response:**
```json
[
  {
    "id": "week-2024-09-01",
    "date_range": "2024-09-01 to 2024-09-07",
    "issue_count": 42,
    "tweaks": {
      "added": 3,
      "removed": 1,
      "modified": 5
    }
  }
]
```

**Endpoint:** `POST /learn/upload`

**Request Body:**
```json
{
  "week_start": "2024-09-08",
  "issues": [...],
  "tweaks": {
    "added": [...],
    "removed": [...],
    "modified": [...]
  }
}
```

---

## WebSocket Events (Future)

For real-time updates, connect to:
```
ws://localhost:8787/ws
```

**Events:**
```json
{
  "type": "issue_added",
  "data": {
    "id": "cyber-20250919",
    "title": "Critical Infrastructure Alert",
    "priority": "critical"
  }
}
```

**Event Types:**
- `issue_added` - New issue detected
- `issue_updated` - Issue information changed
- `signoff_changed` - Sign-off status updated
- `config_updated` - System configuration changed

---

## Rate Limiting

API rate limits (production):
- **Anonymous**: 100 requests/hour
- **Authenticated**: 1,000 requests/hour
- **Enterprise**: Unlimited

Headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1632512400
```

---

## Best Practices

1. **Caching**: Cache brief and classification data for 5 minutes
2. **Pagination**: Use limit/offset for large result sets
3. **Compression**: Accept gzip encoding for responses
4. **Retries**: Implement exponential backoff for failed requests
5. **Timeouts**: Set client timeout to 30 seconds

## Example Integration

```javascript
// JavaScript/TypeScript
const API_BASE = process.env.VITE_API_URL || 'http://localhost:8787';

async function getClassifiedIssues(role) {
  const response = await fetch(`${API_BASE}/classify/today?role=${role}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

async function signOffAsRole(role) {
  const response = await fetch(`${API_BASE}/review/signoff`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, approve: true })
  });
  return response.json();
}
```

```python
# Python
import requests

API_BASE = "http://localhost:8787"

def get_brief(issue_id, lens=None):
    url = f"{API_BASE}/brief/{issue_id}"
    params = {"lens": lens} if lens else {}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def export_issue(issue_id):
    response = requests.post(f"{API_BASE}/export/{issue_id}")
    if response.status_code == 200:
        with open(f"{issue_id}.zip", "wb") as f:
            f.write(response.content)
    else:
        raise Exception(response.json()["error"])
```

---

For additional support or to report issues with the API, please contact the development team.