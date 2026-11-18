# Troubleshooting

## Canvas cannot see Lab Tools

- Studio → **Manage → Integrations**: does **Lab Tools Production** (Tenant) show **Configured**? If it
  shows **Configure**, select it and paste your seat token.
- Canvas → **Integrations → Custom Integrations**: does **Lab Tools Production** show **Your credential:
  Saved** and **Enabled for me** ticked?
- Start a **new** board after adding the credential; an open board may not pick it up.
- Name it in your prompt: "Using **Lab Tools Production**, …". If Canvas also lists an older **Lab Tools**,
  it may try that one first and be refused; that is harmless.

## Canvas looks at Hyperfabric (USC-HF-LEAF1/2) instead of the Meraki Cloud Fabric

Canvas did not get the PseudoCo environment reference, which comes with Lab Tools Production. Check that
it is **Enabled for me** with your credential saved (above), start a **new** board, and ask again. You can
also say it outright: "the Meraki Cloud Fabric, org USC-Engineering, network SITE-105".

## "missing or invalid bearer token" (401)

Your seat token was mistyped, has a trailing space, or belongs to an earlier session (tokens change
between sessions). Copy it again from your seat card, then update the credential:

- Studio: Manage → Integrations → **Lab Tools Production** → **⋯ → Update credential** (Canvas uses the same one).
- Your own 2.3 integration, if you built one: Manage → Integrations → it → **⋯ → Update credential**.

## "rate limit" (429)

Your token made more than 30 calls in a minute, usually an agent stuck in a loop. Wait a minute and
check the agent's instructions for a step it repeats.

## Studio says "Agent update needs attention: The Agent could not be prepared"

Studio's web firewall blocks any message that looks like a web attack, for example text with
`../` paths, SQL injection strings or scanner names, so Studio never receives it. Length is not the
problem. Describe attacks in plain words ("unusual web request paths, web scanner user agents")
instead of quoting attack strings, then start the agent again from **Build → Agent**. Do not paste
raw firewall events or sample URLs into Studio chat. Check **Studio → Manage** first: a failed
attempt does not create an agent.

## "Schedule failed: Your user identity is unavailable. Sign in again."

Your Cloud Control session expired while the builder was open, so Studio cannot say who owns the
schedule. Nothing was scheduled. Reload the page (sign in again if asked), open **Schedule** again and
choose the next 5-minute slot that is at least 5 minutes away: the dialog forgets your earlier choices.

## A run says a tool "returned HTTP 503"

Your **Path B** workspace server (My Lab Tools - MCP) is not running, for example after a proctor reset.
The agent may fall back to Lab Tools Production for the alert, and the report then names the wrong integration. Open
your MCP workspace (the link on your seat card), select **Save** (or **Restart**), and check that
**Test a tool** answers again. Path A students never see this.

## Studio discovers fewer than 10 tools

Use **⋯ → Rediscover** on the integration (it asks for your token again). If the URL is not the one
on your seat card, edit the integration.

## My tile will not turn green

`clear_issue` only clears **your** seat, and your agent calls it only when the last 5 minutes of your
source are quiet and your lane is stopped. Events reach Splunk a minute or two late, so wait two minutes
after the stop and run the check again. `get_light_status` shows whether your alert is still open.

## The agent says my lane is stopped, but events continue

Events reach Splunk a minute or two late. Wait two minutes and check again with a short window
(`minutes=5`). If events still arrive, call `stop_my_lane` again (it is safe to repeat) and tell a proctor.

## Canvas shows "There is an issue connecting to this canvas"

The chat reconnects by itself. If the answer seems to disappear, reload the page; finished answers
are kept on the board.

## A caution sign next to my agent ("stale skills")

In **Studio → Manage → Applications**, a caution sign next to your agent opens *Products with stale
skills* and names an integration (for example your own My Lab Tools - MCP). Studio's
cached copy of that integration's tools is out of date, which happens after the server behind it changed.

**Fix:** Studio → Manage → **Integrations** → the named integration → **⋯ → Rediscover**, paste your seat
token, **Rediscover tools**. The caution sign clears for every agent that uses it. Asking the agent's
Studio chat to "refresh skills" does not help: the skills belong to the integration, not the agent.
Your agent kept working the whole time; run its test again afterwards anyway.

## My tickets says "That token was not accepted"

Open it again with **Log in to Service Desk** on your seat card (it passes your token for you), or paste
the seat token from the card. After the proctor rotates tokens between sessions, old tokens stop working
on purpose.

## Canvas or my agent cannot see PseudoCo Service Desk

Check **Studio → Manage → Integrations → PseudoCo Service Desk** shows **Configured**, and in
**Canvas → Integrations → Custom Integrations** that it shows **Your credential: Saved** and **Enabled for
me**. In the agent, ask Studio to "add my integration PseudoCo Service Desk", then rerun a test.

## The agent answers "duplicate: true" when it opens a ticket

That is the Service Desk protecting you: an open ticket already covers the same service, so no second one
was opened. The agent should work the ticket it returns. If it keeps calling `create_incident`, add to its
instructions: "List open tickets first; open a ticket only when none covers the issue."

## "Only the caller closes a ticket" (403)

The agent tried to close a ticket. It can only resolve it (with `close_code` and `close_notes`); you close
it on **My tickets**. Remove any "close the ticket" wording from its instructions.

## There is no ticket in my queue

Part 1 tickets arrive as soon as the proctor breaks the branch network; Lights Out tickets
arrive when the proctor opens them at the start of 2.5. If yours is still missing after that, ask a proctor:
they can open one for your seat only.

## Mission Control says "No night recorded yet" (or only "Attack started")

The app shows only the night since your attack last started. Restarting your lane (**Restart my lane**,
**Start my traffic**, or **Run it live again**) or a proctor reset starts a new, empty
night. Make sure your lane is running, then trigger your agent (**Test** in Studio, or its next scheduled
slot). When your card turns **Resolved**, the timeline, response times, tickets and **Replay the night**
fill in. Tickets stay in your queue either way: the **Tickets** panel still lists them.

