# Reading the evidence

`get_my_security_events` summarizes what Cisco Secure Firewall logged for your source IP. Use the
patterns below to name the activity. Your agent has the same guide (the night shift triage skill).
The events carry counts, destinations, ports, rules, URLs and user agents. They do not carry connection
durations or byte counts, so a pattern never depends on those.

| What you see | Likely activity |
| --- | --- |
| 3 or more destination ports on one host, or one port on many hosts | Port scan or host sweep |
| URLs with `' OR 1=1`, `../../`, `/etc/passwd`; scanner user agents such as Nikto; IPS signatures `SERVER-WEBAPP ...` or `SQL ...` | Web attack patterns |
| File events with an EICAR or malware disposition | Malware test file transfer |
| The same destination and URI repeating steadily through the window, with a fixed user agent | C2-style beacon |
| ICMP to many addresses in one subnet | Ping sweep |
| Totals are zero | Nothing from your source in the window: STATUS healthy |

## Fields worth quoting

| Field | Example | Why it matters |
| --- | --- | --- |
| `totals.intrusion_events` | `31` | IPS saw it, not only a connection log |
| `intrusion[].signature` and `.action` | `SQL 1 = 1 - possible sql injection attempt`, `Would block` | Names the attack; "Would block" means detected and logged, not dropped |
| `connections[].destination`, `.dst_port`, `.rules` | `198.18.5.102`, `80`, `Allow WAN-to-DC` | What is targeted and which access rule let it through |
| `connections[].sample_urls`, `.user_agents` | `/admin/config.php?file=../../../../etc/shadow`, `Nikto/2.1.6` | The pattern, in the attacker's own words |
| `first_seen`, `last_seen` | timestamps | When it started; after a stop, whether it is still going |

!!! note "Events trail by a minute or two"
    Firewall events travel through syslog to Splunk before your agent can read them. After a stop,
    wait about two minutes before you call the source quiet.
