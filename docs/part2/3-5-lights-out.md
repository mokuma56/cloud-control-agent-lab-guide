# 3.5 Lights Out (3:10, 25 min)

!!! abstract "Goal"
    Hands off. Attacks start, your agent finds yours, your tile turns red. Then you wake up, approve the
    remediation, and your agent verifies and turns your light off.

## 1. Hands off (about 5 min)

- The room lights dim. Hands off keyboards.
- The proctor starts the board timer and **starts all 30 lanes**. From now on, a source IP that
  belongs to your seat is attacking something in the data center or DMZ.
- Scheduled agents run at the announced time. If you run from Canvas, wait for the proctor's
  **"go"**, then send your saved prompt.

Watch the room wall: amber tiles show attacks nobody has found yet, with a clock counting up. They turn red
as agents report, seat by seat, and the wall records each seat's **time to detect**.

![20-wall](../img/20-wall.png){ loading=lazy }

*The room wall during Lights Out: (3) amber = attack not found yet, (4) red = an agent's alert, (5) stopped and verifying, (6) resolved; (7) the agents' messages and (8) the leaderboard.*


## 2. Wake up and read the finding (about 10 min)

Open your agent's latest run (or your Canvas answer). A good finding looks like this:

```text
STATUS: issue
SEVERITY: major
SUMMARY: 10.106.10.1xx is sending web attack patterns to Core services (AD-1)
ATTACK: SQL injection and path traversal requests with a Nikto scanner user agent
EVIDENCE:
- Secure Firewall (get_my_security_events): 31 IPS events "SERVER-WEBAPP ... SQL injection
  attempt", Web Application Attack, priority 1, action Would block
- Secure Firewall: 472 connections to 198.18.5.102:80 via rule Allow WAN-to-DC, URLs like
  /admin/config.php?file=../../../../etc/shadow
- Lab Tools: no change in the last 24 hours explains it; on-call policy: wake primary for critical
NEXT STEP: stop_my_lane for 10.106.10.1xx (affects only my source). Awaiting approval.
```

Check it before you approve:

- [ ] The source IP is **yours** (compare with `get_my_watch_scope`).
- [ ] The ATTACK is supported by evidence, not assumed. See the [evidence guide](../reference/evidence.md).
- [ ] Your tile on the room wall is red.

    ![11-lights-evidence](../img/11-lights-evidence.png){ loading=lazy }

    *A real finding for seat T3-C: (1) Secure Firewall events and IPS signatures from get_my_security_events, (2) NEXT STEP waits for approval.*


## 3. Approve the remediation (about 5 min)

Reply to your agent or Canvas with an explicit approval:

```text
Yes, approved: stop_my_lane for my watch source.
```

The agent calls `stop_my_lane`. Only your lane stops; your tile shows **Stopped · verifying**, and your neighbors stay red until they act.

![12-lights-approve](../img/12-lights-approve.png){ loading=lazy }

*(1) signal_issue raised the alert (red tile), (2) the agent asks before stop_my_lane, (3) the human approval.*


## 4. Verify and clear (about 5 min)

Ask your agent (or Canvas) to verify:

```text
Re-check my security events for the last 5 minutes. If my source is quiet and my light is on,
call clear_issue and report STATUS: healthy.
```

- [ ] Your tile turns green: **Resolved ✓**.
- [ ] The board shows your **time to clear**.

    ![13-lights-healthy](../img/13-lights-healthy.png){ loading=lazy }

    *After the stop: (1) STATUS healthy, (2) the light is cleared and only this seat's source was affected.*


!!! success "Prizes"
    Fastest detect, fastest clear, and best custom workflow (judged by the proctors from your
    integration and your agent's descriptions).
