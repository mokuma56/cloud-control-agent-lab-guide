# 2.1 Save the combined result (1:15, 15 min)

!!! abstract "Goal"
    Keep the answer you trust and the exact prompt that produced it. Your agent is built from both.

## Pin the answer

1. In the Canvas board with your best 1.3 answer, rename the board: open the board title and call
   it **`Branch wired triage`**.
2. Use the board's card tools to keep the final answer on the board (pin or stack it), so the
   known-good example survives when you start new chats.

## Save the prompt

Copy your final prompt text into a note on your laptop. In Part 2 it becomes the heart of your
agent's description. Strip the bracketed, incident-specific parts so it works for *any* complaint:

```text
Each run:
1. Correlate across every Cisco domain I can see and find the root cause of anything affecting
   [the services I watch].
2. Use Lab Tools for recent changes, business service impact, SaaS status and the on-call policy.
3. Answer: STATUS, SEVERITY (from business criticality), SUMMARY, CAUSE (with change ID),
   EVIDENCE (each bullet names its source), NEXT STEP (propose, never change).
```

## Before the break

The proctors now clear the standing fault. Optional, if you have two minutes: rerun your prompt.

- [ ] Your board is renamed and the final answer is kept on it.
- [ ] Your generalized prompt is saved in a note.
- [ ] (Optional) After the fault is cleared, your prompt returns `STATUS: healthy`.

**Break: 10 minutes.**
