# 3.4 Wire it in and choose how it runs (2:55, 15 min)

!!! abstract "Goal"
    Your agent uses your integration, passes a "light on" test, is published as v2, and has a run
    mode for Lights Out.

## Wire the integration into the agent

Open your agent in Studio and tell it:

```text
Add my integration <your seat> Lab Tools. Always call get_my_watch_scope first, then
get_my_security_events. If STATUS is issue, call signal_issue with the severity and summary.
Propose stop_my_lane and wait for my approval. If STATUS is healthy and get_light_status says my
light is on, call clear_issue.
```

Check the manifest's **Integrations** now lists your Lab Tools (and My Light, if you built Path A).

## Add a fourth test

| Scenario | Expected outcome |
| --- | --- |
| Fault present: my source shows IPS events | signal_issue called; my light is on afterwards |

- [ ] All four tests pass. Publish **v2**.

## Choose how it runs

=== "Scheduled"

    Set the schedule to **Hourly**, at the run time the proctor announces, max runs 10. The
    proctor starts Lights Out just before that time.

=== "On demand from Canvas"

    If scheduling is not available in your Studio release, you will run the same check from AI
    Canvas when the proctor says "go". Canvas uses the same Lab Tools, so the bulb still lights.
    Save this prompt now:

    ```text
    Using Lab Tools and the lane triage guidance: what is my watch source doing right now?
    Get my watch scope, then my security events for the last 30 minutes, use the business context
    for impact and severity, give the STATUS report, and call signal_issue if it is an issue.
    Then ask me before stop_my_lane.
    ```

- [ ] My agent is published as v2, and I know whether it runs on a schedule or from Canvas.
