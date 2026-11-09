# Stretch challenges

About an hour of extra work for fast finishers, roughly in order of difficulty. Each one makes your
agent more like one you would trust at work.

## 1. A sharper triage skill (10 min)

Ask Canvas to explain **why** it chose its severity, then add a rule to your prompt that would have
changed its mind. Example: *"If the affected service is outside its business hours, lower severity by
one level, unless the on-call policy names it."* Rerun and compare.

## 2. The honest "I don't know" (10 min)

Test the missing-information path for real: ask Canvas about a source IP that is not yours. Lab Tools
refuses (your token only sees your seat). Does your prompt make the agent say so plainly instead of
inventing an answer? Fix it until it does.

## 3. A second clue from outside Cisco (15 min, Path B)

Add a tool to `tools.py` that brings in something Cisco cannot know, for example:

- the weather at the branch (a storm explains a power blip),
- a public status page for a SaaS provider,
- a team calendar ("the network team is at an offsite").

Write its description for the agent: when to call it and when not to.

## 4. A second action (15 min)

Give your agent a second way to tell you, alongside the bulb: a Webex message to a space, or a
ticket in a test ServiceNow instance. Keep the rule: it tells, it never changes the network.

## 5. Your own lane, end to end (10 min)

After Lights Out, ask a proctor to restart your lane. Run your agent twice: once while the lane runs
(expect `issue` and your light on), once after you approve the stop and wait two minutes (expect
`healthy` and your light off). Compare the two runs' evidence.

## 6. An app for your agent (stretch of stretches)

In **Studio → Build → App**, describe a one-screen status page for your agent: your seat, the last
run's STATUS and SUMMARY, and your light. Preview it, but do not install it for others.
