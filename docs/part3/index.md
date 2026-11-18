# Part 3: Build an App (3:35 to 3:50)

**The morning after.** Your agent worked the night shift on its own. Now the day shift arrives and asks:
*what happened, how fast, can we trust it, and can we see it again?* An agent answers in a report. An
**app** answers on one screen that anyone can open.

In Part 3 you build that app in Cloud Control Studio, not by writing code but from a **design file**: a
Markdown document that says what the app is for, which data feeds each part of the screen, and what the
buttons do. Studio turns it into a working app, tests it and runs it. The app puts your night and your
PseudoCo Service Desk tickets on one timeline. Then you press **Replay the night**: play the night back at
up to 8x with a slider to rewind, and run it again live to watch your own agent catch your attack, with a
stopwatch.

| Module | Min | You finish with |
| --- | --- | --- |
| [3.1 Build Mission Control](3-1-mission-control.md) | 15 | An app built from a design file; the night played back and replayed live |

```mermaid
sequenceDiagram
  autonumber
  participant Y as You
  participant M as Mission Control app
  participant C as Night Watch Console
  participant A as Your agent (scheduled)
  Y->>M: open the app
  M->>C: get_my_timeline / get_my_tickets / get_my_group_board
  C-->>M: what happened, how fast, my tickets, my group
  Y->>M: Replay the night: Playback at 2x-8x (no calls)
  Y->>M: Run it live again
  M->>C: replay_my_attack (reset my card, restart my attack)
  A->>A: next scheduled run: find, signal, stop, verify, clear
  M->>C: get_my_timeline + get_my_tickets every 10 s
  C-->>M: red, ticket notes, striped, green
  M-->>Y: "Your agent handled it in m:ss"
```

The app never stops an attack itself. It shows and it replays; your agent still does the work.
