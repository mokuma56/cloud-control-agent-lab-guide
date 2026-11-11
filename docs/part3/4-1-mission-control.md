# 4.1 Build Mission Control: an app for the morning after (3:35, 15 min)

!!! abstract "Goal"
    Build a Studio **app** from a design file, open it, and replay the night: restart your attack and watch
    your agent handle it again, live, with a stopwatch.

Your agent works at night. In the morning, the day shift wants to know three things: *what happened,
can I trust what the agent did, and what does it mean for the business?* An agent answers in a report. An
**app** answers on one screen, for anyone, every morning. Studio builds both: an agent decides and acts,
an app shows and lets people act.

| | Agent (Part 2) | App (Part 3) |
| --- | --- | --- |
| Runs | On a schedule, by itself | When someone opens it |
| Decides | Yes: what is wrong, what to do | No: it shows data and offers buttons |
| Built from | A description in plain words | A **design file** (Markdown), so anyone can rebuild the same app |
| Here | Finds, stops and clears your attack | Shows the timeline, the evidence, the business impact and your group |

## 1. Add the Night Watch Console integration (3 min)

The app reads your seat's timeline from a small API made for it. Add it the same way as Path A in 3.3:

1. **Studio → Build → Integrations → Add → REST API → Use URL** and paste:

    <div class="sc-copytable" markdown>

    | Value | |
    | --- | --- |
    | Night Watch Console spec URL | `<your Night Watch Console spec URL>` |

    </div>

2. **Review API**: 7 operations. Three are for the core app: `get_my_timeline`, `get_my_group_board`,
   `replay_my_attack`. Four are read-only, for the add-ons: `get_my_security_events`, `get_business_services`,
   `get_oncall`, `get_recent_changes`.
3. **Configure**: Display name `Night Watch Console`, Bearer token <span class="sc-tokenbtn"></span>.
4. **Review and save → Save draft**, then click **Manage** in the pop-up.

!!! info "Why a separate integration"
    Your agent must never restart its own attack, so `replay_my_attack` lives only here, where only the app
    can use it. The four read-only operations are the same data your agent reads through Lab Tools, served
    on the standard HTTPS port: Studio apps reach APIs on port 443 only. The app never gets `stop_my_lane`;
    containment stays the agent's job.

## 2. Download the design file (1 min)

[Download NightWatch_Mission_Control.md](../app/NightWatch_Mission_Control.txt){ download="NightWatch_Mission_Control.md" .md-button }

It is plain Markdown: what the app is for, the rules it must follow, and four sections. **Section A** is the
core app you build now: header and card status, response times, timeline, your group, and Replay the night.
**Sections B to D** are add-ons you can ask for afterwards, one at a time. A design file is how you make an
app **repeatable**: the next person gets the same app from the same file.

## 3. Build the app from the file (5 min)

1. **Studio → Build → App → Build**.
2. Click **+** in the box, attach `NightWatch_Mission_Control.md`, and type:

    ```text
    Build section A (the core app) of the attached design. Use my integration Night Watch Console.
    ```

3. Send it and wait. Studio checks the integration and every operation the design names, builds the app,
   then runs its own checks (styling, types, tests) and fixes what fails. This takes several minutes; do
   not send another message while it works.

!!! warning "Build in small steps"
    Ask for section A first, then one add-on per message. A single request for everything at once is too
    big for one build turn: Studio reports *This change didn't complete* and restores the last good version.

## 4. Open it and read your night (3 min)

<!-- screenshots: preview, timeline, evidence, group -->

- [ ] The header shows your seat, your service and your card state.
- [ ] **Overnight timeline** shows when your attack started, your agent's alert (in its own words), the
      stop and the clear, with **Time to detect**, **Time to contain** and **Time to resolve**.
- [ ] **My group** shows your five seats' cards, yours outlined.

## 5. Replay the night (3 min)

1. In Studio, schedule your agent for the next 5-minute slot (Manage → your agent → **Edit schedule**),
   as in 3.4.
2. In the app, select **Replay the night**, read the confirmation, and confirm. Your card resets and your
   attack starts again.
3. Hands off. When your agent's run starts, the app lights each step as it happens: **red**, **striped**,
   **green**, and stops the clock.

- [ ] The app shows *"Your agent handled it in m:ss"*.

## 6. Add-ons (if you have time)

Send one at a time, and wait for each to finish:

=== "B. Evidence"

    ```text
    Add section B of the design.
    ```

    A chart of the connections your agent saw, and a green **Quiet since** badge after the stop.

=== "C. Business impact"

    ```text
    Add section C of the design.
    ```

    Your service's criticality, who the on-call policy would wake, and the last day's changes.

=== "D. Handover notes"

    ```text
    Add section D of the design.
    ```

    A note box your whole group sees: what your agent found, for the day shift.

!!! success "What you just did"
    You built a second kind of Studio application from a file, on top of the same integrations your agent
    uses. The agent does the night shift; the app is how people see and trust it. Change the design file
    (another panel, another integration) and build again: the file is the source code.
