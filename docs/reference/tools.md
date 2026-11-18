# Lab Tools reference

Every call carries your **seat token** as `Authorization: Bearer <token>`. The token picks your seat;
no call can read or change another seat. Rate limit: 30 requests per minute per token.

## Information in

| Tool (MCP) | REST | Returns | Call it when |
| --- | --- | --- | --- |
| `get_my_watch_scope` | `GET /v1/lane` | Your seat, `watch_source_ip`, the service it is near, segment, SGT, `lane_running`, `business_service`, `site` and `location` (city, latitude, longitude, timezone: for the weather) | **First**, every run |
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

## PseudoCo Service Desk

A separate tenant integration (**PseudoCo Service Desk**, server `/itsm`), with the same seat token. Field
names follow common ITSM practice: `number`, `state`, `impact`, `urgency`, `priority`, `assignment_group`,
`cmdb_ci` (affected business service), `caused_by` (change number), `parent_incident`, work notes,
comments, `close_code`, `close_notes`.

| Operation | REST | Does | Rules |
| --- | --- | --- | --- |
| `list_my_tickets` | `GET /itsm/api/now/table/incident?state=open` | Your queue, newest first, with the last work note | Call every run. Filters: `state`, `cmdb_ci`, `opened_since_minutes` |
| `get_ticket` | `GET /itsm/api/now/table/incident/{number}` | One ticket with all notes and the tickets grouped under it | |
| `create_incident` | `POST /itsm/api/now/table/incident` | Opens a ticket with your findings in `work_note` | If an open ticket already covers the same service, returns it with `duplicate: true` instead |
| `add_work_note` | `POST .../{number}/work_notes` `{"text"}` | Internal, technical note | Moves a new ticket to in progress |
| `add_comment` | `POST .../{number}/comments` `{"text"}` | Note the caller sees | Plain language |
| `update_ticket` | `POST .../{number}/update` | State (`in_progress`, `on_hold`, `resolved`), priority (impact/urgency or severity), group, `caused_by`, `parent_incident` | Resolving needs `close_code` and `close_notes`, and resolves the grouped tickets too. **Closing is not offered**: the caller closes on **My tickets** |

Priority: impact + urgency, 1 (high) to 3 (low): 1/1 is P1, 1/2 or 2/1 is P2, 2/2 is P3, lower is P4.
Severity shortcut: critical = P1, major = P2, minor = P3. Writes are limited to 20 a minute per seat.

**My tickets** (the **My tickets** button on your seat card) shows your queue live and lets you, as the
caller, **Confirm and close** or **Reopen** a resolved ticket.

## Weather: Open-Meteo Weather Forecast

A public tenant integration with no credential (data CC BY 4.0, [open-meteo.com](https://open-meteo.com)).
`getWeatherForecast` takes `latitude` and `longitude` (from `get_my_watch_scope` → `location`), plus
`current`, `daily` and `timezone=auto`. The lab's sites: **Data Center = Dallas, TX** (all six table services),
**Branch-1 = Raleigh, NC**.

## Endpoints

| What | Where |
| --- | --- |
| MCP (Streamable HTTP) | Lab Tools MCP URL on your seat card, path `/mcp` |
| OpenAPI 3.1 specs | `/openapi-labtools-prod.json` (**Lab Tools Production**: all 10 operations, server `/prod`), `/table/openapi-light.json` (Lab Actions, 6 operations, server `/table`: 2.3 Path A), `/openapi-light.json` and `/openapi-context.json` (the original two) |
| PseudoCo Service Desk | spec `/openapi-servicedesk.json` (server `/itsm`), **My tickets** page `/itsm/ui` |
| Room wall | `/` (or `/wall`) |
