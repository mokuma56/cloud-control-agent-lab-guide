# 3.3 Build your custom workflow (2:20, 35 min)

!!! abstract "Goal"
    Your own integration in Studio that your agent can call, proven by lighting your table's bulb.
    This is the "custom workflow that does anything you want" part of the lab.

Everyone does **step A** (10 min). Then pick **one** path for step B (25 min).

## A. Connect Lab Tools to Studio (everyone, 10 min)

Studio agents use MCP or REST integrations registered in Studio. Lab Tools offers a shared MCP
server: one URL for all 30 seats, and your seat token decides which seat you are.

1. **Studio → Build → Integrations → Add → MCP**.
2. **Connect**

    | Field | Value |
    | --- | --- |
    | MCP server URL | the **Lab Tools MCP URL** on your seat card |
    | Display name | `<your seat> Lab Tools`, for example `T3-C Lab Tools` |
    | Advanced settings → Transport | Streamable HTTP |
    | Advanced settings → Header name / Scheme | `Authorization` / `Bearer` |
    | Canvas visibility | Canvas Direct on |

3. **Authenticate and discover**: authentication **API key / bearer token**, paste your **seat
   token**, then **Discover tools**. You should see **10 tools**:
   `get_my_watch_scope`, `get_my_security_events`, `get_recent_changes`, `get_business_services`,
   `get_oncall`, `get_saas_status`, `signal_issue`, `clear_issue`, `get_light_status`, `stop_my_lane`.
4. **Capabilities and access**: keep all 10 selected, then **Save draft**.

!!! warning "Keep it Personal"
    The integration is saved **Personal**. Do not use *Make available to tenant*: everyone in the
    tenant would then act as your seat.

- [ ] Studio → Manage → Integrations shows `<your seat> Lab Tools`, Personal, **Configured**.

## B. Your own workflow (pick one, 25 min)

=== "Path A: REST API (no code)"

    You import the Lab Actions API from its OpenAPI spec and make it *yours* by rewriting how the
    agent should use each operation.

    1. **Studio → Build → Integrations → Add → REST API**.
    2. Use the **Lab Actions spec URL** from your seat card (or download it and upload the file).
    3. **Review API**: Studio finds 6 operations on one HTTPS server.
    4. **Configure**: name it `<your seat> My Light`, bearer token = your seat token.
    5. Rewrite the **descriptions** of `signal_issue` and `clear_issue` in your own words. The
       description is what the agent reads to decide *when* to call an operation, so write it for
       the agent: when to call it, what to send, and when **not** to call it.
    6. Save.

    **Done when:** you light your own bulb with a direct call. From a terminal on your laptop
    (type the token from your seat card; it stays in this terminal only):

    ```bash
    read -rs SEAT_TOKEN && export SEAT_TOKEN
    curl -s -X POST "https://<lab host>:8443/v1/signal" \
      -H "Authorization: Bearer $SEAT_TOKEN" -H "Content-Type: application/json" \
      -d '{"severity":"minor","summary":"T3-C test from my REST integration"}'
    ```

    Watch your table's bulb and the board, then clear it:

    ```bash
    curl -s -X POST "https://<lab host>:8443/v1/clear" -H "Authorization: Bearer $SEAT_TOKEN"
    ```

=== "Path B: MCP server (code)"

    You finish a small MCP server in Python and register it in Studio. Use this path if your seat
    has a dev container (ask a proctor) or you can run Python 3.10+ and a tunnel on your laptop.

    1. Get the starter: `mcp_server/` from the take-home kit. Open `tools.py`.
    2. Finish the three TODOs:
        - `get_business_services`: return `GET /v1/context/services`.
        - `signal_issue`: `POST /v1/signal` with `{"severity", "summary"}`.
        - `clear_issue`: `POST /v1/clear`.
    3. Write a **description** for `get_business_services` that tells the agent when to use it.
    4. Run it and test it the way Studio will:

        ```bash
        cd mcp_server
        BROKER_URL=https://<lab host>:8443 SEAT_TOKEN=$SEAT_TOKEN MCP_TOKEN=pick-a-secret \
          python3 server.py
        # in another terminal
        cd tests && MCP_TOKEN=pick-a-secret python3 try_tools.py signal_issue severity=minor "summary=MCP test"
        ```

    5. Publish it with a tunnel (for example `cloudflared tunnel --url http://localhost:9000`) and
       register it in Studio as in step A, with your tunnel URL + `/mcp` and your `MCP_TOKEN`.

    **Done when:** `try_tools.py signal_issue ...` lights your bulb, and Studio discovers your tools.

    Stuck? `tools_solution.py` has the answers (run with `TOOLS=tools_solution`).

!!! tip "Fast finishers"
    Add a tool of your own: a weather lookup for the branch, a Webex message, a ticket. See
    [Stretch challenges](../reference/stretch.md).

- [ ] My bulb lit in my seat color, and I cleared it.
