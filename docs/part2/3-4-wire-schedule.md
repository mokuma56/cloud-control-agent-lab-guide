# 3.4 Wire it in and choose how it runs (2:55, 15 min)

!!! abstract "Goal"
    Your agent uses your integration, passes a "light on" test, and is scheduled for Lights Out (or
    ready to run from Canvas).

## Wire the integration into the agent

Open your agent in Studio and tell it:

```text
Add my integration PseudoCo Lab Tools. Always call get_my_watch_scope first, then
get_my_security_events. If STATUS is issue, call signal_issue with the severity and summary.
Propose stop_my_lane and wait for my approval. If STATUS is healthy and get_light_status says my
light is on, call clear_issue.
```

Check that the manifest's **MCP servers** or **API integrations** now list your Lab Tools, plus **My Table Light**
if you built Path A, or **My Lab Tools** if you built Path B.

## Add a fourth test

Run it the same way as the three tests in 3.2: copy the **Scenario** and the **Expected outcome** into the
**Test** tab, then **Run scenario**.

**Scenario**

```text
My lane is running and my watch source is attacking the service I protect right now. Find it, report
it, and make sure my light ends up on.
```

**Expected outcome**

```text
STATUS issue with the activity named (port scan, host sweep, web attack, malware file or beacon).
signal_issue is called, and get_light_status afterwards shows my light on. stop_my_lane is proposed
but NOT called.
```

- [ ] Test 4 passed: your tile is red on the room wall.
- [ ] All four tests pass on your latest saved version, so **Schedule** is blue.

## Choose how it runs

=== "Scheduled"

    Select **Schedule** (top right of the builder). It is blue only after a passing test of your latest
    saved version; otherwise it says *Run a test on the latest saved changes first*: rerun Test 4.

    In **Schedule Agent**:

    1. **Activation cadence**: **Daily** (the choices are Hourly, Daily and Weekly; there is no "every
       15 minutes").
    2. **Local run time**: the Lights Out time the proctor announces, in 5-minute steps. It is your
       browser's time zone; Studio converts it to UTC.
    3. **Max runs**: `1`. One run at Lights Out is all you need, and the schedule stops by itself.
    4. **Trigger prompt**: keep Studio's text (for example *Run the ... night-watch review.*). It is the
       message your agent receives when the schedule fires.
    5. Select **Schedule**.

    ![18b-schedule-dialog](../img/18b-schedule-dialog.png){ loading=lazy }

    *Schedule Agent: (1) Daily, (2) the announced Lights Out time, (3) Max runs 1, (4) the trigger prompt your agent gets, (5) Schedule.*

    Back in the builder, **Review Agent → Current schedule** shows the time instead of *This Agent is
    not scheduled*. A scheduled run reports and raises your alert; it never stops your lane. You approve
    the stop yourself in 3.5. If Schedule is not offered in your release, use the Canvas tab.

=== "On demand from Canvas"

    If scheduling is not available in your Studio release, you will run the same check from AI
    Canvas when the proctor says "go". Canvas uses the same Lab Tools, so your tile still turns red.
    Save this prompt now:

    ```text
    Using Lab Tools and the lane triage guidance: what is my watch source doing right now?
    Get my watch scope, then my security events for the last 30 minutes, use the business context
    for impact and severity, give the STATUS report, and call signal_issue if it is an issue.
    Then ask me before stop_my_lane.
    ```

    ![10-lights-plan](../img/10-lights-plan.png){ loading=lazy }

    *Running it from Canvas: (1) your saved prompt, (2) Canvas's plan: discover Lab Tools, get watch scope and events, assess and signal, ask before the stop.*


- [ ] My agent is scheduled for the Lights Out time, or my Canvas prompt is saved.
