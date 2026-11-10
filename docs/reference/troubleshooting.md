# Troubleshooting

## Canvas cannot see Lab Tools

- Canvas → **Integrations → Custom Integrations**: is **Lab Tools** there, with **Enabled for me**
  ticked and your credential added? Add it with **⋯ → Replace my bearer token**.
- Start a **new** board after adding the credential; an open board may not pick it up.
- A Studio MCP integration with *Canvas Direct* does not make tools appear in Canvas chat. Canvas
  uses its own **Custom Integrations** (OpenAPI). Use Lab Tools there.

## "missing or invalid bearer token" (401)

Your seat token was mistyped, has a trailing space, or belongs to an earlier session (tokens change
between sessions). Copy it again from your seat card, then update the credential:

- Canvas: Lab Tools card → **⋯ → Replace my bearer token**.
- Studio: Manage → Integrations → your Lab Tools → **⋯ → Update credential**.

## "rate limit" (429)

Your token made more than 30 calls in a minute, usually an agent stuck in a loop. Wait a minute and
check the agent's instructions for a step it repeats.

## Studio discovers fewer than 10 tools

Use **⋯ → Rediscover** on the integration (it asks for your token again). If the URL is not the one
on your seat card, edit the integration.

## My light will not turn off

`clear_issue` only clears **your** seat. If another seat at your table still has an open issue, the
bulb keeps cycling their color. Check `get_light_status`: it lists the other open seats at your table.

## The agent says my lane is stopped, but events continue

Events reach Splunk a minute or two late. Wait two minutes and check again with a short window
(`minutes=5`). If events still arrive, call `stop_my_lane` again (it is safe to repeat) and tell a proctor.

## Canvas shows "There is an issue connecting to this canvas"

The chat reconnects by itself. If the answer seems to disappear, reload the page; finished answers
are kept on the board.

## A caution sign next to my agent ("stale skills")

In **Studio → Manage → Applications**, a caution sign next to your agent opens *Products with stale
skills* and names an integration (for example PseudoCo Lab Tools, or your own Path B server). Studio's
cached copy of that integration's tools is out of date, which happens after the server behind it changed.

**Fix:** Studio → Manage → **Integrations** → the named integration → **⋯ → Rediscover**, paste your seat
token, **Rediscover tools**. The caution sign clears for every agent that uses it. Asking the agent's
Studio chat to "refresh skills" does not help: the skills belong to the integration, not the agent.
Your agent kept working the whole time; run its test again afterwards anyway.
