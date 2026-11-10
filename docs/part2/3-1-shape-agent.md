# 3.1 Shape the agent from the saved result (1:40, 25 min)

!!! abstract "Goal"
    A draft Studio agent whose manifest you have read line by line: what it watches, which
    integrations it uses, what it may and may not do.

## Describe the agent

1. Open **Studio → Build → Agent**.

    ![14-agent-shape](../img/14-agent-shape.png){ loading=lazy }

    *Shape the agent: (1) paste your description here. (2) The suggestion chips are examples; you do not need them.*

2. Name the agent after **what it protects**, not after your seat. Your table decides the service
   (`get_my_watch_scope` returns it too):

    | Table | Protects | Agent name |
    | --- | --- | --- |
    | 1 | Employee Intranet (PROD) | Intranet Night Watch |
    | 2 | Partner User Lookup Tool (DMZ) | Partner Portal Night Watch |
    | 3 | Core directory services, AD-1 | Directory Services Night Watch |
    | 4 | Customer 360 (DMZ) | Customer 360 Night Watch |
    | 5 | Data center gateway | DC Gateway Night Watch |
    | 6 | DMZ web tier | DMZ Web Night Watch |

    Your agent is Personal, so everyone at your table can use the same name.

3. Paste this description. Put your agent's name and service in the first line, replace the other
   bracketed parts with your own choices, and keep the rules.

```text
Name: [Directory Services Night Watch]. It protects [PseudoCo's core directory services (AD-1)].
Use my integration "PseudoCo Lab Tools".

Build a security troubleshooting agent for PseudoCo that keeps watch while I sleep.

Each run:
1. Call get_my_watch_scope to learn my seat, my watch source IP and the service it is near.
2. Call get_my_security_events for that source IP twice: minutes=5 decides what is happening NOW,
   minutes=60 is context for the report. Use any other Cisco data I can see (Secure Firewall,
   Secure Access, Meraki).
3. Use Lab Tools business context: which service is at risk, how critical it is, whether a recent
   change explains it, and whether on-call should be woken.
4. Report: STATUS, SEVERITY, SUMMARY, ATTACK (what the source is doing), EVIDENCE (each bullet
   names its source), NEXT STEP.
5. If STATUS is issue: call signal_issue with the severity and summary. Propose stop_my_lane, but
   only call it after a human approves.
6. If my lane is not running and the last 5 minutes show no events from my source, STATUS is
   healthy: describe the earlier activity as resolved, do not call signal_issue, and call
   clear_issue if get_light_status says my light is on. Mixed evidence: STATUS inconclusive, no
   signal and no clear.
7. Only link a change to the activity if it touches the same source, destination or segment.
8. Never change shared network or security configuration. Only act on my own watch source.
```

!!! warning "Why two time windows"
    Firewall events stay in the last hour after you stop your lane. An agent that decides from the
    60-minute window alone sees the old attack, calls it an issue again, and relights your bulb on
    the run after your approved stop. Deciding from the last 5 minutes avoids that.

!!! info "Why the agent is not told the attack type"
    `get_my_watch_scope` gives your source IP and the service it is near, never the attack. Your
    agent has to work it out from Cisco telemetry. That is the multi-domain troubleshooting.

## Answer Studio's questions

Studio drafts a **manifest** and asks follow-up questions. Suggested answers:

![15-agent-builder](../img/15-agent-builder.png){ loading=lazy }

*The agent builder: (1) chat with Studio to change the agent, (2) Review Agent shows the manifest and Test runs sandbox scenarios, (3) Schedule unlocks after a passing test.*


| Studio asks | Answer |
| --- | --- |
| How often should it run? | Hourly (you may change this in 3.4) |
| Maximum runs | 10 |
| Output | Markdown in the run output |
| Which integrations? | Lab Tools. If Studio asks you to connect it now, skip; you do it in 3.3 |

## Review the manifest

Read every field. Fix anything by chatting with Studio ("change X to Y"); avoid editing blindly.

![16-agent-manifest](../img/16-agent-manifest.png){ loading=lazy }

*The manifest: (1) Instructions, (2) MCP servers and API integrations, (3) Trigger and schedule, with the scheduled run prompt and run limit.*


- [ ] **Instructions** include "propose, don't change" and "only after a human approves".
- [ ] **Instructions** tell it to call `get_my_watch_scope` first and ignore other seats' IPs.
- [ ] **MCP servers** or **API integrations** list Lab Tools. Studio can use the Canvas Lab Tools
      integration (shown as an API integration) and your MCP connector from 3.3; either works.
- [ ] **Trigger and schedule** shows a scheduled run prompt and a run limit; the time is set in 3.4.
- [ ] Save the draft.

!!! tip "Read it like a code review"
    A manifest is the agent's whole personality. The most common bug is an instruction that sounds
    right but allows too much, for example "fix the issue if possible". Delete it.
