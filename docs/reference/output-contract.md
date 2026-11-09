# Output contract

Every answer your prompt or agent gives uses the same fields, so a human can read it in ten seconds
and an agent can act on it without guessing.

```text
STATUS:    healthy | issue
SEVERITY:  minor | major | critical
SUMMARY:   one line - what is broken and who is affected
CAUSE:     the most likely cause, with the change ID if one matches      (Part 1)
ATTACK:    what my watch source is doing                                  (Part 2)
EVIDENCE:  bullets, each starting with its source
NEXT STEP: the proposed fix or remediation; never a change made without approval
```

## How to set severity

Severity comes from the **business service**, not from the size of the network symptom.

| Business criticality (from `get_business_services`) | Inside business hours | Outside business hours |
| --- | --- | --- |
| critical | critical | major |
| high | major | major (minor if nothing depends on it at night) |
| medium | minor | minor |

Then apply the on-call policy from `get_oncall`, and say in NEXT STEP whether it is met.

## Evidence rules

- Every bullet names its source: `Cisco Meraki: change log`, `Secure Firewall (get_my_security_events): IPS`,
  `Lab Tools: get_recent_changes`.
- Quote numbers and names from the data (counts, signature names, ports, change IDs), not adjectives.
- If a source has no data or is unreachable, say so in its own bullet. Never fill the gap with a guess.
