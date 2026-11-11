# 3.4 Wire it in and choose how it runs (2:55, 15 min)

!!! abstract "Goal"
    Your agent uses your integration, passes a "light on" test, and is scheduled for Lights Out (or
    ready to run from Canvas).

## Wire the integration into the agent

You change an existing agent by reopening it in the builder and asking Studio, the same chat you used
in 3.1.

1. Open **Studio → Manage → Applications** and select your agent's name (for example
   **[Directory Services Night Watch]**).

    ![24a-manage-agent](../img/24a-manage-agent.png){ loading=lazy }

    *(1) Manage, (2) Applications, (3) your agent (capability Agent). Your integrations from 3.3 are listed here too. Owners are blurred in this guide.*

2. On the agent's **Details** page, select **Edit Agent** (top right).

    ![24b-agent-details](../img/24b-agent-details.png){ loading=lazy }

    *(1) Details shows the description you wrote in 3.1, (2) Edit Agent reopens the builder, (3) Schedule: Not scheduled yet.*

3. The builder opens with the **Studio** chat on the left. Click in **Ask Studio to refine the Agent**,
   paste the prompt for the path you built in 3.3, and send it (Enter or the arrow).

    === "Path A: My Table Light"

        ```text
        Add my integrations PseudoCo Lab Tools and My Table Light. Always call get_my_watch_scope
        first, then get_my_security_events. If STATUS is issue, call signal_issue with the severity and
        summary. Propose stop_my_lane and wait: the only approval is my reply "approve stop" after your
        report. If STATUS is healthy and get_light_status says my light is on, call clear_issue. Keep
        everything else the same.
        ```

    === "Path B: My Lab Tools"

        ```text
        Add my integrations PseudoCo Lab Tools and My Lab Tools. Always call get_my_watch_scope
        first, then get_my_security_events. If STATUS is issue, call signal_issue with the severity and
        summary. Propose stop_my_lane and wait: the only approval is my reply "approve stop" after your
        report. If STATUS is healthy and get_light_status says my light is on, call clear_issue. Keep
        everything else the same.
        ```

    ![24d-refine-prompt](../img/24d-refine-prompt.png){ loading=lazy }

    *(1) Ask Studio to refine the Agent: your prompt goes here, (2) send. Review Agent on the right shows the current manifest.*

    !!! info "Why the prompt repeats the approval rule"
        Studio rewrites the instructions from what you ask. Saying "keep everything else the same" and
        repeating the "approve stop" rule stops a refinement from loosening the guardrail you tested in 3.2.

4. Wait while Studio works through **Reviewing your request → Preparing the conversation → Updating
   your Agent → Preparing the response** (about a minute). Do not send another message until it finishes.

    ![24e-refine-building](../img/24e-refine-building.png){ loading=lazy }

    *(1) Agent build in progress, (2) the right-hand panel rebuilds the draft. Schedule is greyed out again: every change needs a new passing test.*

5. When it finishes (Studio shows **Ready to test**), stay on **Review Agent** and scroll down to
   **MCP servers** and **API integrations**.

    ![24f-refine-done](../img/24f-refine-done.png){ loading=lazy }

    *(1) Studio's summary: what it added, and that the change is not tested yet, (2) the version went up (v3), (3) the "approve stop" rule kept, (4) MCP servers: one `byo-` entry per MCP integration (here PseudoCo Lab Tools and My Lab Tools) plus the Cisco servers. Schedule is greyed until you rerun a test.*

- [ ] Studio's summary names your integrations. In the manifest, MCP integrations show as `byo-` IDs, not names:
      Path B shows **two** `byo-` entries (PseudoCo Lab Tools and My Lab Tools); Path A shows one, with
      **My Table Light** under **API integrations**.
- [ ] The instructions still say the only approval for `stop_my_lane` is "approve stop".

## Add a fourth test

Your change in the step above created a new version, so Schedule is locked until a test passes on it.
Test 4 checks the whole chain at once with your own integration: find the problem, raise the alert,
confirm the light is on, and still wait for approval.

Run it the same way as the three tests in 3.2: in the builder's right-hand panel open **Test**, copy the
**Scenario** and the **Expected outcome** into their boxes, then **Run scenario** (about a minute).

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

![25a-test4-form](../img/25a-test4-form.png){ loading=lazy }

*(1) Scenario, (2) Expected outcome, (3) Run scenario. Earlier results stay further down the panel; the newest appears at the top.*

**What a pass looks like** (seat T1-A, port scan):

![25b-test4-result](../img/25b-test4-result.png){ loading=lazy }

*(1) Scenario Result: Completed, (2) STATUS issue, SEVERITY from business criticality, (3) the activity named (here a port scan), (4) Schedule is blue again: this version passed a test.*

![25c-test4-evidence](../img/25c-test4-evidence.png){ loading=lazy }

*Evidence: (1) the agent learned its own seat first and saw the lane running, (2) it decided from the 5-minute window: one source, five ports on one host, no IPS events, still a port scan.*

![25d-test4-light](../img/25d-test4-light.png){ loading=lazy }

*(1) stop_my_lane proposed, waiting for "approve stop", (2) the light confirmed on with get_light_status.*

- [ ] Test 4 passed: your tile is red on the room wall.
- [ ] All four tests pass on your latest saved version, so **Schedule** is blue.

## Choose how it runs

Your agent is ready. Now decide **how it starts** for Lights Out (3.5). There are two options, and both
end the same way: your agent finds your lane, raises your alert, and waits for your approval.

| | Option A: Scheduled (recommended) | Option B: On demand from Canvas |
| --- | --- | --- |
| Who starts it | Studio, at the time you set | You, by sending a prompt |
| What it feels like | Real night shift: it runs while you are hands off | A colleague you ask to check now |
| Uses | Your agent, its instructions and your integrations | Canvas, Lab Tools and the triage note |
| Pick it when | You want the real-world experience | You want to start right away, or Schedule is still locked |

There is no race. Every seat's lane keeps sending traffic until the end of the lab, so your agent finds
yours whenever it runs.

### Before you choose: get your seat ready

1. **Your lane must be running.** If a test stopped it (for example a failed Test 3), ask the proctor to
   restart your seat. A stopped lane gives a healthy report and nothing to find.
2. **Reset your tile**, so you see your agent turn it red. Select **Run**: it clears your alert on the room
   wall with your seat token.

    <div class="sc-run" data-method="POST" data-path="/v1/clear" data-label="Reset your tile: it goes back to quiet"></div>

=== "Option A: Scheduled"

    1. **Note the time now** on your laptop clock. Pick the **next 5-minute slot that is at least 5
       minutes away**, so the run starts after you finish here. For example: it is 9:07, choose 9:15.
    2. Select **Schedule** (top right of the builder). It is blue only after a passing test of your
       latest saved version; otherwise it says *Run a test on the latest saved changes first*: rerun
       Test 4.
    3. In **Schedule Agent**:
        - **Activation cadence**: **Daily** (the choices are Hourly, Daily and Weekly).
        - **Local run time**: the slot from step 1. The list is in 5-minute steps and in your laptop's
          time zone; Studio converts it to UTC.
        - **Max runs**: `1`. One run is all you need, and the schedule stops by itself.
        - **Trigger prompt**: keep Studio's text (for example *Run the ... night-watch review.*). It is
          the message your agent receives when the schedule fires.
        - Select **Schedule**.

        ![18b-schedule-dialog](../img/18b-schedule-dialog.png){ loading=lazy }

        *Schedule Agent: (1) Daily, (2) the next 5-minute slot at least 5 minutes away, (3) Max runs 1, (4) the trigger prompt your agent gets, (5) Schedule.*

    4. Check **Review Agent → Current schedule**: it shows your run time instead of *This Agent is not
       scheduled*.

    Then go to [3.5](3-5-lights-out.md) and keep your hands off until your run time. A scheduled run
    reports and raises your alert; it never stops your lane. You approve the stop yourself, in Canvas.

    !!! tip "Missed your slot?"
        If the time passed before you selected Schedule, or Studio says *Schedule failed: Your user
        identity is unavailable* (reload the page first), open **Schedule** again and pick the next slot.
        The run uses the version that passed its test, so you do not need to test again unless you changed
        the agent.

=== "Option B: On demand from Canvas"

    You start the same check yourself, in AI Canvas. Canvas uses the same Lab Tools and your seat token,
    so your tile turns red the same way. It is quicker to start, but nobody is asleep: you are the one
    asking.

    1. Open **Canvas** and your board from Part 1 (or **+ New**).
    2. Go to [3.5](3-5-lights-out.md) and send this prompt there when you are ready:

        ```text
        Using Lab Tools and the lane triage guidance: what is my watch source doing right now? Get my
        watch scope, then my security events for the last 5 minutes and the last 60 minutes, use the
        business context for impact and severity, give the STATUS report, and call signal_issue if it
        is an issue. Then propose stop_my_lane and wait for my reply "approve stop".
        ```

    ![10-lights-plan](../img/10-lights-plan.png){ loading=lazy }

    *Running it from Canvas: (1) your prompt, (2) Canvas's plan: discover Lab Tools, get watch scope and events, assess and signal, ask before the stop.*

- [ ] My lane is running and my tile is quiet.
- [ ] My agent is scheduled for the next slot (Option A), or I have the Canvas prompt ready (Option B).
