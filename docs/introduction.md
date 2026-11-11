# Build a Network Agent in Cisco Cloud Control That Troubleshoots Anything While You Sleep

**LTROPS-2623** &middot; Cisco Live EMEA 2027 &middot; 4-hour instructor-led lab &middot; 30 seats

You are the night-shift engineer at **PseudoCo**, and you would like to sleep tonight. Your table
looks after one PseudoCo service: the Employee Intranet, the directory servers, the partner portal and so on.
Its column on the room wall is headed with that service. In the next four hours you teach Cisco Cloud Control
to do your night shift. It has to find what is hurting the business across every Cisco domain, add the
business context only you know, decide how bad it is, wake you only when it matters, and take one safe
action you approve.

## Tonight: two incidents, one method

| | Incident 1: a change breaks the branch | Incident 2: something hits your service |
| --- | --- | --- |
| When | Part 1, AI Canvas | Part 2, Lights Out |
| Who | The whole room, one shared fault | Every seat its own, at the same time |
| Who drives | **You**: you troubleshoot in Canvas and refine the prompt | **Your agent**: you are "asleep" until it asks you to approve the fix |
| What it really is | A port change on a branch switch (users get no IP address) | Hostile traffic against your table's service |

The two incidents have nothing in common, on purpose. In Part 1 you do not write a "Leaf1 prompt".
You write a **general triage method**: look across every Cisco domain, check what changed, add the
business context, then report in a fixed format. In 2.1 you save that method, and in Part 2 it becomes your agent's instructions.
At Lights Out nobody tells your agent that tonight's problem is an attack. The same method that
found a bad switch change has to find it on its own. That is what *troubleshoots anything* means.

The lab follows three steps:

1. **Test a multi-domain troubleshooting prompt in AI Canvas** on incident 1.
2. **Save it as a general triage method**, together with the answer that proves it works.
3. **Build an agent in Cloud Control Studio** from that method, with a custom workflow of your own:
   an integration that brings in non-Cisco information and lights up your seat on the room wall. Then
   let it handle incident 2 while you sleep.

!!! tip "What you leave with"
    A working Studio agent, a Canvas prompt you trust, an integration pattern (MCP or REST) you can
    point at any system your business depends on, and the take-home kit to rebuild it.

## How the lab is built

```mermaid
flowchart TB
  subgraph CC["Cisco Cloud Control (USC-Engineering tenant)"]
    Canvas["AI Canvas<br/>multi-domain troubleshooting"]
    Studio["Studio agent<br/>(your agent)"]
  end
  subgraph Kit["Lab Kit (always on, public HTTPS)"]
    Broker["Lab Context + Lab Actions APIs<br/>OpenAPI specs, board"]
    MCP["Shared MCP server<br/>your seat token = your seat"]
  end
  subgraph Pod["POD-45 lab network"]
    Meraki["Meraki Cloud Fabric"]
    FTD["Secure Firewall (hqftdv)<br/>IPS, connection, file events"]
    Splunk["Splunk"]
    Gen["Traffic generator<br/>30 lanes, one per seat"]
  end
  Canvas -- "Cisco integrations" --> Meraki
  Canvas -- "Lab Tools (OpenAPI)" --> Broker
  Studio -- "Lab Tools (MCP)" --> MCP --> Broker
  Broker -- "your source IP only" --> Splunk
  FTD --> Splunk
  Gen -- "attack lane" --> FTD
  Broker -- "stop_my_lane" --> Gen
  Broker -- "signal / clear" --> Wall["Room wall<br/>(your seat tile)"]
```

- **AI Canvas** does the Cisco multi-domain work with its built-in integrations (Meraki, Secure
  Firewall, Secure Access, Catalyst Center, Intersight, Nexus Dashboard).
- **Lab Tools** is the custom integration. It brings in what Cisco cannot know: PseudoCo's change
  calendar, business services, on-call policy and SaaS status. It also gives your agent its watch
  scope, the firewall events for your seat, and two actions: raise your seat's alert on the room wall, and stop
  your seat's attack traffic.
- **Lanes:** in Part 2 the traffic generator sends one stream of simulated attack traffic per seat, called
  a *lane*. Each lane comes from that seat's own source IP and goes through the firewall to the service its table protects.
- **Your seat token** is the key. Everyone uses the same URLs; the token decides which seat, which
  lane and which light you can see and touch. You can never act on another seat.

## Agenda (4 hours)

| Clock | Min | Step | Module | You finish with |
| --- | --- | --- | --- | --- |
| 0:00 | 10 | - | [Before you start](setup.md) | Seat card, logged in |
| 0:10 | 15 | 1 | [1.1 Orientation](part1/1-1-orientation.md) | Canvas, Studio and Lab Tools open |
| 0:25 | 25 | 1 | [1.2 Multi-domain diagnosis](part1/1-2-diagnose.md) | Root cause from Cisco data alone |
| 0:50 | 25 | 1 | [1.3 Make it yours: Lab Tools](part1/1-3-lab-tools.md) | Same answer plus change ID, business impact, severity |
| 1:15 | 15 | 2 | [2.1 Save the triage method](part1/2-1-save.md) | Pinned Canvas and your general triage prompt |
| 1:30 | 10 | - | Break | |
| 1:40 | 25 | 3 | [3.1 Shape the agent](part2/3-1-shape-agent.md) | Draft agent, manifest reviewed |
| 2:05 | 15 | 3 | [3.2 Sandbox test](part2/3-2-test-publish.md) | Three tests passed, Schedule unlocked |
| 2:20 | 35 | 3 | [3.3 Build your custom workflow](part2/3-3-custom-workflow.md) | Your integration turns your seat red on the wall |
| 2:55 | 15 | 3 | [3.4 Wire it in and choose how it runs](part2/3-4-wire-schedule.md) | Four tests passed, scheduled or Canvas chosen |
| 3:10 | 25 | 3 | [3.5 Lights Out](part2/3-5-lights-out.md) | Light on at detection, off when fixed |
| 3:35 | 15 | - | [3.6 Your business](part2/3-6-your-business.md) | One agent idea for your own company |
| 3:50 | 10 | - | Wrap | Take-home kit, survey |

Finished early? The [stretch challenges](reference/stretch.md) have another hour of work.

## The room wall

There are no lights on the tables. Instead, the room screen shows the **Night Watch wall**: all 30 seats,
one column per table, headed by the service that table protects. Your seat ID is `T<table>-<letter>`,
for example **T3-C** is table 3, seat C. The small colored dot on your tile matches your seat card.

![20-wall](img/20-wall.png){ loading=lazy }

*(1) Live counts, (2) the Lights Out clock, (3) a threat nobody has detected yet, (4) an agent's alert with its summary, (5) a lane stopped after approval and being verified, (6) resolved, (7) what the agents said, (8) the leaderboard.*

| Your tile | Means | Who changes it |
| --- | --- | --- |
| Grey, **Quiet** | Nothing is happening at your seat | - |
| Amber, **Threat active · undetected 2:31** | Your attack lane is running and no agent has reported it yet; the clock counts up | the proctor starts lanes |
| Red, **Alert** + your agent's summary | Your agent called `signal_issue`. Minor is steady, major pulses, critical pulses fast | your agent |
| Red stripes, **Stopped · verifying** | You approved `stop_my_lane`; the agent has not confirmed it is quiet yet | you, then your agent |
| Green, **Resolved ✓** | Your agent verified the source is quiet and called `clear_issue` | your agent |

When every attack is resolved, the wall shows **ALL CLEAR**. The leaderboard ranks the fastest detect,
stop and clear.
