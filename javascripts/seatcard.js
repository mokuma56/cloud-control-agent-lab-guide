/* "Get my seat card" on the Before you start page. The card comes from the lab server while a
   proctor has card pickup open; this browser keeps it so a reload or later visit shows it again. */
(function () {
  const LAB = "https://lab.usc-engineering.com:8443";
  const KEY = "ltrops2623.seatcard";
  const FIELDS = [
    ["Cloud Control login", "login"], ["Seat token", "token"], ["Lab Tools MCP URL", "mcp_url"],
    ["Lab Actions spec URL", "spec_light"], ["Lab Context spec URL", "spec_context"],
    ["Your MCP workspace", "workspace"], ["Room wall", "wall"], ["Agent name (3.1)", "agent_name"],
  ];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } };
  const save = v => { try { v ? localStorage.setItem(KEY, JSON.stringify(v)) : localStorage.removeItem(KEY); } catch {} };

  function render(root) {
    const saved = load();
    if (!saved || !saved.card) {
      root.innerHTML = `<form class="sc-form">
          <label for="sc-seat">Your seat ID</label>
          <input id="sc-seat" autocomplete="off" spellcheck="false" placeholder="T3-C" maxlength="6">
          <button class="md-button md-button--primary" type="submit">Get my card</button>
        </form><p class="sc-msg" role="status"></p>`;
      const form = root.querySelector("form"), msg = root.querySelector(".sc-msg");
      form.addEventListener("submit", async ev => {
        ev.preventDefault();
        const seat = root.querySelector("#sc-seat").value.trim().toUpperCase();
        if (!/^T?[1-6]-?[A-E]$/.test(seat)) { msg.textContent = "Seat IDs look like T3-C: table 1 to 6, seat A to E."; return; }
        const norm = seat.replace(/^T?([1-6])-?([A-E])$/, "T$1-$2");
        msg.textContent = "Fetching your card…";
        try {
          const r = await fetch(LAB + "/v1/card", { method: "POST", headers: { "Content-Type": "application/json" },
                                                     body: JSON.stringify({ seat: norm }) });
          const j = await r.json().catch(() => ({}));
          if (!r.ok) { msg.textContent = j.error || ("The lab server said HTTP " + r.status + "."); return; }
          save({ card: j.card, claim: j.claim }); render(root);
        } catch {
          msg.textContent = "Cannot reach the lab server. Check you are on the lab Wi-Fi or ask a proctor.";
        }
      });
      return;
    }
    const c = saved.card;
    root.innerHTML = `<div class="sc-card">
        <div class="sc-head"><span class="sc-dot" style="background:${esc(c.color_hex)}"></span>
          <b>${esc(c.seat)}</b><span>Table ${esc(c.table)} · ${esc(c.color)} · protects ${esc(c.protects)}</span></div>
        <table>${FIELDS.map(([label, k]) => `<tr><th>${label}</th>
          <td><code class="${k === "token" ? "sc-token" : ""}">${esc(c[k])}</code></td>
          <td><button class="md-button sc-copy" type="button" data-k="${k}">Copy</button></td></tr>`).join("")}</table>
        <p class="sc-note">Your seat token is a password: paste it only into the credential fields this guide names.
          This card stays in this browser. <a href="#" class="sc-forget">Forget this card</a></p></div>`;
    root.querySelectorAll(".sc-copy").forEach(b => b.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(String(c[b.dataset.k])); b.textContent = "Copied"; }
      catch { b.textContent = "Select and copy"; }
      setTimeout(() => (b.textContent = "Copy"), 1500);
    }));
    root.querySelector(".sc-forget").addEventListener("click", ev => {
      ev.preventDefault();
      if (confirm("Remove the card from this browser? Getting it again needs a proctor to release your seat.")) { save(null); render(root); }
    });
  }

  const init = () => { const root = document.getElementById("seat-card"); if (root) render(root); };
  if (window.document$ && window.document$.subscribe) window.document$.subscribe(init);   // Material instant navigation
  else document.addEventListener("DOMContentLoaded", init);
})();
