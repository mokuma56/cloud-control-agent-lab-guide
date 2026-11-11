# Conclusion: what you built tonight (3:50, 10 min)

!!! abstract "Goal"
    See the whole night in one picture, and leave with one agent idea for your own company.

## Three parts, one method

| Part | You did | What it proved |
| --- | --- | --- |
| **1. Test your prompt in AI Canvas** | Found a broken Leaf1 change from Cisco data alone, added business context from Lab Tools, and saved a **general triage method** | A good prompt is a method, not an answer: it works for problems it has never seen |
| **2. Build an agent that runs it** | Turned that method into a Studio agent, tested it three ways, gave it your own integration, and scheduled it | An agent you describe in plain words can find, **contain**, verify and clear an attack on its own, inside limits you set |
| **3. Build an App** | Built Mission Control from a design file and replayed the night | People need to **see and trust** what an agent did: an app built from a file is repeatable for anyone |

The same thread ran through all three: Cisco telemetry for *what is happening*, one outside source for
*what only the business knows*, and a fixed report (STATUS, SEVERITY, SUMMARY, CAUSE, EVIDENCE, NEXT STEP)
so a person or a program can act on it.

## What to take to work

- **Start with the method, not the tool.** Write the triage prompt first and test it in Canvas. The agent
  is the same prompt plus a schedule and a few actions.
- **Bring one non-Cisco source.** A change calendar, a CMDB, a status page: that is what turns a network
  answer into a business answer.
- **Test the three ways.** Does it find the problem, is it honest when blind, and does it stay in scope?
- **Give actions limits, not hopes.** Your agent may stop only its own source, only on confirmed evidence,
  and it proves the result before it clears the alert. Riskier actions need a human, which is a different
  pattern from tonight's.
- **Show the work.** An app over the agent's results is how the day shift learns to trust the night shift.

## Your business: what would yours watch? (6 min)

Each table picks one thing their own company depends on and fills in this card together:

| Question | Your answer |
| --- | --- |
| What does the business depend on? (a SaaS app, a supplier portal, a store's payment lane, a plant line) | |
| Which Cisco data shows it is healthy or not? | |
| Which **non-Cisco** source would you plug in? (ticketing, CMDB, status page, weather, power, shift roster) | |
| What makes it critical, and when? (hours, money, safety, SLA) | |
| Who should be woken, and when should nobody be? | |
| The one safe action the agent may take on its own, and the one that needs a human | |
| What it must never do | |

Two or three tables share their card with the room in one minute each.

## Wrap

- **Take-home kit:** the Lab Kit (broker, MCP server starter and solution, OpenAPI specs, prompts, night
  shift triage skill, the Mission Control design file, tests). Everything is Python standard library; no
  packages to install.
- **Your work in the tenant:** your Canvas boards, Studio agent, app and integrations stay until the
  proctors reset the tenant after the session. Copy your prompts, manifest text and design file if you
  want them.
- **More to try:** the [Appendix](appendix/challenges.md) lists every challenge scenario in this lab.
- **Survey:** please fill it in before you leave. It decides what we build next.

Thank you, and sleep well.
