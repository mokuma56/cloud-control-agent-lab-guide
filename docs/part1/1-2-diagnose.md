# 1.2 Multi-domain diagnosis in AI Canvas (0:25, 25 min)

!!! abstract "Goal"
    Find the root cause of a user complaint using only Cisco data, and notice what Canvas cannot tell you.

## The complaint

> "Since a few minutes ago, people plugged into the branch switch get a network link but no IP
> address. Wi-Fi is fine." - Branch office manager

## Climb the prompt ladder

Work in your Canvas board. Send one prompt at a time and read the answer before the next. Canvas
shows its plan and the commands it runs; open them to see which Cisco integration it used.

=== "Rung 1: symptom"

    ```text
    Wired users on the USC-Engineering Cloud Fabric leaf access ports get link but no IP address,
    starting a few minutes ago. What could cause this?
    ```

    You get a list of possibilities. Useful, but generic.

=== "Rung 2: correlate"

    ```text
    Check the Meraki org USC-Engineering: switch port configuration and status on Leaf1 and Leaf2,
    the configuration change log for the last 2 hours, DHCP and client events. Compare Leaf1 to Leaf2.
    ```

    Canvas starts reading real data: port settings, the change log, clients per port.

=== "Rung 3: root cause with evidence"

    ```text
    What is the single most likely root cause? Give the evidence, and name the Cisco source
    (product and object) for each piece.
    ```

=== "Rung 4: proposed fix"

    ```text
    Propose the fix and how to verify it. Do not make any change.
    ```

!!! success "What good looks like"
    Canvas finds that **Leaf1 ports 1, 3 and 4 were moved to an unused VLAN** a few minutes ago
    (the change log shows the edit), while Leaf2's matching ports still use the normal access VLAN
    and policy. Clients on those ports never reach the DHCP server, so they get no address. The fix
    it proposes is to restore the ports to match Leaf2, then confirm clients get an address again.

## Debrief (5 min, with your table)

Canvas found *what* changed. Discuss what it **cannot** tell you from Cisco data:

- Was the change planned? Who asked for it, and which ticket?
- Which business service sits on those ports? Does it matter at this hour?
- Should someone be woken up?

That gap is what you close in 1.3.

- [ ] My Canvas answer names Leaf1, the affected ports and the VLAN change, with sources.
