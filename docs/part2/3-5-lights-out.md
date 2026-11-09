# 3.5 Lights Out (3:10, 25 min)

!!! abstract "Goal"
    Hands off. Attacks start, your agent finds yours, your bulb lights. Then you wake up, approve the
    remediation, and your agent verifies and turns your light off.

## 1. Hands off (about 5 min)

- The room lights dim. Hands off keyboards.
- The proctor starts the board timer and **starts all 30 lanes**. From now on, a source IP that
  belongs to your seat is attacking something in the data center or DMZ.
- Scheduled agents run at the announced time. If you run from Canvas, wait for the proctor's
  **"go"**, then send your saved prompt.

Watch the projector board: bulbs light table by table, and the board records each seat's
**time to detect**.

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
- [ ] Your bulb is on in your color.

## 3. Approve the remediation (about 5 min)

Reply to your agent or Canvas with an explicit approval:

```text
Yes, approved: stop_my_lane for my watch source.
```

The agent calls `stop_my_lane`. Only your lane stops; your neighbors' bulbs stay on until they act.

## 4. Verify and clear (about 5 min)

Ask your agent (or Canvas) to verify:

```text
Re-check my security events for the last 5 minutes. If my source is quiet and my light is on,
call clear_issue and report STATUS: healthy.
```

- [ ] Your bulb flashes green and goes dark (if you were the last open issue at your table).
- [ ] The board shows your **time to clear**.

!!! success "Prizes"
    Fastest detect, fastest clear, and best custom workflow (judged by the proctors from your
    integration and your agent's descriptions).
