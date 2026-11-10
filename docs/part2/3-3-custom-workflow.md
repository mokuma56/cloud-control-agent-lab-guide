# 3.3 Build your custom workflow (2:20, 35 min)

!!! abstract "Goal"
    Your own integration in Studio that your agent can call, proven by turning your seat red on the room wall.
    This is the "custom workflow that does anything you want" part of the lab.

Everyone does **step A** (10 min). Then pick **one** path for step B (25 min).

## A. Connect Lab Tools to Studio (everyone, 10 min)

Studio agents use MCP or REST integrations registered in Studio. Lab Tools offers a shared MCP
server: one URL for all 30 seats, and your seat token decides which seat you are.

1. **Studio → Build → Integrations → Add → MCP**.

    ![08-studio-add-integration](../img/08-studio-add-integration.png){ loading=lazy }

    *(1) Choose MCP. Path A in step B uses REST API instead.*

2. **Connect**

    <div class="sc-copytable" markdown>

    | Field | Value |
    | --- | --- |
    | MCP server URL | `<your Lab Tools MCP URL>` |
    | Display name | `PseudoCo Lab Tools` |
    | Advanced settings → Transport | `Streamable HTTP` |
    | Advanced settings → Header name | `Authorization` |
    | Advanced settings → Scheme | `Bearer` |
    | Canvas visibility | leave **Canvas Direct** and **Canvas Planner** both off |

    </div>

    Each value has a **Copy** button. The MCP URL is filled in from your seat card (get it on
    [Before you start](../setup.md#your-seat-card){target="_blank" rel="noopener"} if it still shows a placeholder). The screenshots use
    the placeholder host `lab.example.com`.

    ![09a-mcp-connect](../img/09a-mcp-connect.png){ loading=lazy }

    *Connect: (1) the Lab Tools MCP URL from your seat card (the example host here is a placeholder), (2) the display name (the screenshot shows an older seat-based name; use PseudoCo Lab Tools), (3) open Advanced settings.*

    ![09b-mcp-advanced](../img/09b-mcp-advanced.png){ loading=lazy }

    *Advanced settings: (1) Streamable HTTP, (2) header Authorization, (3) scheme Bearer, (4) Canvas visibility: leave both boxes off (this screenshot is from an older build with Canvas Direct ticked).*

    !!! question "Why not Canvas Direct or Canvas Planner?"
        Studio says it on this screen: the connector is always available in Studio, and the two boxes only
        expose it to Canvas as well. Your agent runs in Studio, so it does not need them. Canvas already
        reaches Lab Tools through the integration you set up in 1.1 (see
        [Two ways in](../part1/1-1-orientation.md#two-ways-in-openapi-for-canvas-mcp-for-agents){target="_blank" rel="noopener"}), and a
        second copy of the same tools in Canvas only invites it to mix the two.



3. **Authenticate and discover**: authentication **API key / bearer token**, paste your **seat
   token**, then **Discover tools**.

    Your seat token: <span class="sc-tokenbtn"></span>

    It is filled in from your seat card and hidden until you select **Show**. **Copy** copies the whole
    token either way. It is a password: paste it only into this field.

    After **Discover tools** you should see **10 tools**:
    `get_my_watch_scope`, `get_my_security_events`, `get_recent_changes`, `get_business_services`,
    `get_oncall`, `get_saas_status`, `signal_issue`, `clear_issue`, `get_light_status`, `stop_my_lane`.

    ![09c-mcp-auth](../img/09c-mcp-auth.png){ loading=lazy }

    *Authenticate and discover: (1) API key / bearer token, (2) paste your seat token, (3) Discover tools.*

    What you just connected: ten tools the lab team built for PseudoCo, all scoped to **your seat** by
    your seat token. Seven only read, two change your seat's alert on the room wall, and one stops your
    own lane.

    | Tool | What it does | Reads or changes |
    | --- | --- | --- |
    | `get_my_watch_scope` | Tells the agent who it is: your seat, the service your table protects, your watch source IP, segment and SGT, and whether your lane is running. Agents call it first. | Reads |
    | `get_my_security_events` | Secure Firewall events for **your** source IP only, read from Splunk: IPS signatures and their action, connections, destinations and ports, access rules, sample URLs, file events. Pick 1 to 240 minutes. | Reads |
    | `get_recent_changes` | PseudoCo's change calendar: ticket ID, system, what changed, who asked, when, implemented or scheduled. | Reads |
    | `get_business_services` | Business services: criticality, business hours, owner, cost of downtime and what each depends on. Turns a network finding into business impact and severity. | Reads |
    | `get_oncall` | Who is on call now and the wake-up policy. | Reads |
    | `get_saas_status` | Status of Webex, Microsoft 365, the payments gateway and Salesforce, to rule a provider outage in or out. | Reads |
    | `get_light_status` | Whether your seat's alert is open, with its severity and summary, and other open alerts at your table. | Reads |
    | `signal_issue` | Raises your alert: your tile turns red on the room wall with a severity and a one-line summary. Calling it again updates them. | Changes your tile |
    | `clear_issue` | Resolves your alert: your tile turns green. Only after the fix is verified. | Changes your tile |
    | `stop_my_lane` | Stops the attack traffic from your own watch source IP. Changes no shared configuration. **Only after a human approves.** | Stops your lane |

    The same ten operations are what Canvas uses through the Lab Tools OpenAPI integration (see
    [Two ways in](../part1/1-1-orientation.md#two-ways-in-openapi-for-canvas-mcp-for-agents){target="_blank" rel="noopener"}). Full
    details: [Lab Tools reference](../reference/tools.md){target="_blank" rel="noopener"}.

4. **Capabilities and access**: keep all 10 selected, then **Save draft**. When the confirmation
   pop-up opens, click **Manage**. It takes you to **Studio → Manage**, where you check the integration below.

!!! warning "Keep it Personal"
    The integration is saved **Personal**. Do not use *Make available to tenant*: everyone in the
    tenant would then act as your seat.

- [ ] Studio → Manage → Integrations shows `PseudoCo Lab Tools`, Personal, **Configured**.

    ![09d-studio-manage](../img/09d-studio-manage.png){ loading=lazy }

    *Done: (1) your integration card, (2) in the Personal group, (3) Configured. The URL is blurred in this guide.*


## B. Your own workflow (pick one, 25 min)

=== "Path A: REST API (no code)"

    You import the Lab Actions API from its OpenAPI spec and make it *yours* by rewriting how the
    agent should use each operation.

    1. **Studio → Build → Integrations → Add → REST API**.
    2. Use the **Lab Actions spec URL** from your seat card (or download it and upload the file).
    3. **Review API**: Studio finds 6 operations on one HTTPS server.
    4. **Configure**: name it `My Table Light`, bearer token = your seat token.
    5. Rewrite the **descriptions** of `signal_issue` and `clear_issue` in your own words. The
       description is what the agent reads to decide *when* to call an operation, so write it for
       the agent: when to call it, what to send, and when **not** to call it.
    6. Save.

    **Done when:** you turn your own tile red with a direct call. From a terminal on your laptop
    (type the token from your seat card; it stays in this terminal only):

    ```bash
    read -rs SEAT_TOKEN && export SEAT_TOKEN
    curl -s -X POST "https://<lab host>:8443/v1/signal" \
      -H "Authorization: Bearer $SEAT_TOKEN" -H "Content-Type: application/json" \
      -d '{"severity":"minor","summary":"T3-C test from my REST integration"}'
    ```

    Watch your tile on the room wall turn red, then clear it:

    ```bash
    curl -s -X POST "https://<lab host>:8443/v1/clear" -H "Authorization: Bearer $SEAT_TOKEN"
    ```

=== "Path B: MCP server (code)"

    You finish a small MCP server in Python and run it in your own **MCP workspace** on the lab
    server. Nothing to install: it runs in your browser.

    1. Open **Your MCP workspace** from your seat card (`https://<lab host>:9443/seat/<your seat>/`)
       and paste your seat token. You see your own copy of `tools.py`, a test panel and your
       server's log.
    2. Finish the three TODOs in `tools.py`:
        - `get_business_services`: return `GET /v1/context/services`.
        - `signal_issue`: `POST /v1/signal` with `{"severity", "summary"}`.
        - `clear_issue`: `POST /v1/clear`.
    3. Write a **description** for `get_business_services` that tells the agent when to use it.
    4. Select **Save & restart**. A syntax error is refused (with its line number) and your running
       server keeps the last good version. The status pill turns green when your server is up.
    5. Test it: pick `signal_issue` in **Test a tool**, arguments
       `{"severity":"minor","summary":"MCP test"}`, then **Call**. Your tile turns red. Call
       `clear_issue` to turn it green.
    6. Register it in Studio as in step A, but with **your** URL, shown at the top of the
       workspace: `https://<lab host>:9443/seat/<your seat>/mcp`. Display name `My Lab Tools`,
       bearer token = your seat token.

    **Done when:** your own `signal_issue` turns your tile red, and Studio discovers your tools.

    !!! info "What runs where"
        Your code runs in its own locked-down process on the lab server: it can call the Lab Tools
        API and the internet, but nothing else in the lab network, and it cannot see anyone else's
        workspace. Stuck? **Reset to starter** restores the original file; the answers are in the
        take-home kit (`tools_solution.py`).

!!! tip "Fast finishers"
    Add a tool of your own: a weather lookup for the branch, a Webex message, a ticket. See
    [Stretch challenges](../reference/stretch.md).

- [ ] My tile turned red on the wall, and I cleared it (green).
