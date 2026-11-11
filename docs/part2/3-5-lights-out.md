# 3.5 Lights Out (3:10, 25 min)

!!! abstract "Goal"
    Hands off. Your agent runs on its own, finds your lane, raises the alert, stops your source,
    verifies it is quiet and turns your light off. Then you wake up and read what it did. (With
    Option B, Canvas asks you before it stops anything.)

There is no race and no shared start time. Every seat's lane keeps sending traffic until the end of the
lab, so you do this section at your own pace, whenever your agent runs.

## 1. Hands off (about 5 min)

=== "Option A: Scheduled"

    Take your hands off the keyboard and wait for the run time you chose in 3.4. Studio starts your agent
    with its trigger prompt, exactly as it would at 3 a.m. Nobody types anything.

=== "Option B: On demand from Canvas"

    Send the prompt from 3.4 Option B in your Canvas board, then take your hands off while Canvas works.

Watch your tile on the room wall:

1. **Red** with your agent's summary: it called `signal_issue`.
2. **Red stripes, Stopped · verifying**: it called `stop_my_lane` on your own source.
3. **Green, Resolved ✓**: `since_stop` showed nothing after the stop, so it called `clear_issue`.

With Option A this takes about 20 seconds once the run reaches the containment step. Your neighbors'
tiles change at their own times.

![20-wall](../img/20-wall.png){ loading=lazy }

*The room wall: (3) amber = a lane running that no agent has reported yet, (4) red = an agent's alert, (5) stopped and verifying, (6) resolved; (7) the agents' messages.*

!!! tip "Nothing after a few minutes?"
    Check **Studio → Manage → Applications → your agent → View runs** for a run at your time. No run:
    the schedule time had already passed when you saved it; use **Edit schedule** for the next slot. A
    run that says STATUS healthy: your lane was stopped; restart it with the **Restart my lane** button in
    3.4, then schedule the next slot. A tile that stays red: the run found events after the stop and kept
    the alert open; read its EVIDENCE.

## 2. Wake up and read what your agent did (about 10 min)

=== "Option A: Scheduled"

    Open **Studio → Manage → Applications**, select your agent, then **View runs**. The top row is your
    scheduled run: Trigger **Schedule**, Version **production**. Select **View**. (Select **Refresh runs**
    if it is not there yet; a run takes about a minute.)

    ![26b-view-runs](../img/26b-view-runs.png){ loading=lazy }

    *(1) View runs, (2) your scheduled run at the time you chose, (3) Trigger Schedule. The rows below are earlier runs and your sandbox tests (Trigger Test). With Max runs 1 the badge now reads Completed.*

    ![26c-run-detail](../img/26c-run-detail.png){ loading=lazy }

    *A real scheduled run for seat T1-A, nobody at the keyboard: (1) started by the schedule, (2) STATUS: RESOLVED, (3) what it found and what it did: lane stopped, source quiet, alert cleared. Scroll down for EVIDENCE: signal_issue, stop_my_lane, since_stop 0/0/0 and clear_issue, like Test 4 in 3.4.*

=== "Option B: On demand from Canvas"

    Read Canvas's answer in your board, then go on to steps 3 and 4.

A good report looks like this (this one is from a web attack seat; yours names your own seat's activity):

```text
STATUS: resolved
SEVERITY: major
SUMMARY: 10.106.10.1xx is sending web attack patterns to Core services (AD-1)
CAUSE: my watch source is sending SQL injection and path traversal requests with a Nikto scanner user agent
EVIDENCE:
- Secure Firewall (get_my_security_events): 31 IPS events "SERVER-WEBAPP ... SQL injection
  attempt", Web Application Attack, priority 1, action Would block
- Secure Firewall: 472 connections to 198.18.5.102:80 via rule Allow WAN-to-DC, URLs like
  /admin/config.php?file=../../../../etc/shadow
- Cisco Meraki: no port or configuration changes in the last 2 hours, wired and wireless clients normal
- Lab Tools: no change in the last 24 hours explains it; on-call policy: wake primary for critical
- Containment: signal_issue (major), stop_my_lane on 10.106.10.1xx only, since_stop 0/0/0, clear_issue
NEXT STEP: SecOps to find out why 10.106.10.1xx started scanning before its lane is re-enabled.
```

!!! success "Same method, different incident"
    Compare this with your pinned Part 1 answer. The format is the same and the method is the same. Your
    agent checked the network and the change calendar first, the places where the answer was in Part 1, ruled them out, and
    found the cause in the firewall instead. Nobody told it that tonight's problem was an attack.

Check what it did:

- [ ] The source IP it stopped is **yours** (compare with `get_my_watch_scope`), and nothing else was touched.
- [ ] The CAUSE is supported by evidence, not assumed. See the [evidence guide](../reference/evidence.md).
- [ ] It cleared the alert only after `since_stop` showed nothing, and your tile is green.

    ![11-lights-evidence](../img/11-lights-evidence.png){ loading=lazy }

    *Evidence for a web attack seat (T3-C): (1) Secure Firewall events and IPS signatures from get_my_security_events. This run is from Option B, so (2) NEXT STEP waits for approval.*


## 3. Option B only: approve the stop in Canvas (about 5 min)

With Option A your agent already did steps 3 and 4 on its own: skip to the end. Canvas's triage note
makes it ask before it stops anything, so with Option B you approve it:

1. In the Canvas chat where you sent the 3.4 prompt, wait for its report.

2. When Canvas asks *"Approve stop_my_lane for 10.106.10.1xx?"*, check the IP is yours and reply:

    ```text
    approve stop
    ```

Canvas calls `stop_my_lane`. Only your lane stops; your tile shows **Stopped · verifying**, and your neighbors stay red until they act.

![12-lights-approve](../img/12-lights-approve.png){ loading=lazy }

*(1) signal_issue raised the alert (red tile), (2) the agent asks before stop_my_lane, (3) the human approval.*


## 4. Option B only: verify and clear (about 5 min)

**Wait 5 minutes after the stop.** Firewall events from before the stop stay in the 5-minute window
until they age out, so a check right away still sees them and will not clear your light. Use the time to
read your agent's evidence.

Then, in the same Canvas chat, ask it to verify:

```text
Re-check my security events for the last 5 minutes. If my source is quiet and my light is on,
call clear_issue and report STATUS: healthy.
```

- [ ] Your tile turns green: **Resolved ✓**. If Canvas says events are still arriving, wait two more
      minutes and send the same message again.

    ![13-lights-healthy](../img/13-lights-healthy.png){ loading=lazy }

    *After the stop: (1) STATUS healthy, (2) the light is cleared and only this seat's source was affected.*

!!! success "What you just did"
    An agent you described in plain words ran on its own, used Cisco telemetry and your own integration
    to find a problem nobody told it about, raised the alert, contained it within the limits you set,
    proved it was quiet and closed the alert. That is the night shift. Keeping a human in the loop for
    riskier actions is a different pattern, and you will build it in a later section.
