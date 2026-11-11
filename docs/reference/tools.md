# Lab Tools reference

Every call carries your **seat token** as `Authorization: Bearer <token>`. The token picks your seat;
no call can read or change another seat. Rate limit: 30 requests per minute per token.

## Information in

| Tool (MCP) | REST | Returns | Call it when |
| --- | --- | --- | --- |
| `get_my_watch_scope` | `GET /v1/lane` | Your seat, `watch_source_ip`, the service it is near, segment, SGT, `lane_running` | **First**, every run |
| `get_my_security_events` | `GET /v1/lane/events?minutes=60` | Secure Firewall events for **your** source IP only, read from Splunk: totals, IPS signatures and action, destinations and ports, access rules, sample URLs, user agents, file events | To find out what your source is doing (1 to 240 minutes) |
| `get_recent_changes` | `GET /v1/context/changes?hours=24` | PseudoCo change calendar: ID, system, change, requester, time, implemented or scheduled | Something broke at a specific time |
| `get_business_services` | `GET /v1/context/services` | Services, criticality, business hours, owner, impact if down, what each depends on | To turn a network finding into business impact and severity |
| `get_oncall` | `GET /v1/context/oncall` | Who is on call and the wake-up policy | To decide whether to wake someone |
| `get_saas_status` | `GET /v1/context/saas-status` | Status of Webex, Microsoft 365, payments gateway, Salesforce | To rule a provider outage in or out |
| `get_light_status` | `GET /v1/status` | Your alert: open or not, severity, summary, other open seats at your table | Before `clear_issue` |

## Action out

| Tool (MCP) | REST | Does | Rules |
| --- | --- | --- | --- |
| `signal_issue` | `POST /v1/signal` `{"severity","summary"}` | Turns your seat red on the room wall with your summary. Minor is steady, major pulses, critical pulses fast | Call when STATUS is issue. Calling again updates severity and summary |
| `clear_issue` | `POST /v1/clear` | Turns your seat green (resolved) | Only after verifying the fix, and only if your light is on |
| `stop_my_lane` | `POST /v1/lane/stop` | Stops traffic from your watch source IP only | **Your agent's rules decide when.** Changes no shared configuration |

## Endpoints

| What | Where |
| --- | --- |
| MCP (Streamable HTTP) | Lab Tools MCP URL on your seat card, path `/mcp` |
| OpenAPI 3.1 specs | `/openapi-light.json` (Lab Actions, 6 operations), `/openapi-context.json` (Lab Context, 4 operations) |
| Room wall | `/` (or `/wall`) |
