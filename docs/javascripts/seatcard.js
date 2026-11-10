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
        <p class="sc-actions"><button class="md-button md-button--primary sc-popout" type="button">Open in new window</button></p>
        <p class="sc-note">Your seat token is a password: paste it only into the credential fields this guide names.
          This card stays in this browser. <a href="#" class="sc-forget">Forget this card</a></p></div>`;
    root.querySelector(".sc-popout").addEventListener("click", () => popout(c));
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

  /* The same card in its own small window, so it can sit next to Cloud Control while you work. */
  function popout(c) {
    const w = window.open("", "ltrops2623-seatcard", "width=620,height=640,resizable=yes,scrollbars=yes");
    if (!w) { alert("Your browser blocked the new window. Allow pop-ups for this site, or keep using the card on this page."); return; }
    const rows = FIELDS.map(([label, k]) => `<tr><th>${label}</th><td><code class="${k === "token" ? "tok" : ""}">${esc(c[k])}</code></td>
      <td><button type="button" data-v="${esc(c[k])}">Copy</button></td></tr>`).join("");
    w.document.open();
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Seat card ${esc(c.seat)}</title>
<meta name="viewport" content="width=device-width,initial-scale=1"><style>
:root{color-scheme:light dark;--bg:#fff;--fg:#14171a;--muted:#5b6470;--line:#d5d9de;--code:#f2f4f6;--btn:#0d274d;--btnfg:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#15181c;--fg:#eef1f4;--muted:#a7b0ba;--line:#39414b;--code:#232830;--btn:#8fc1ff;--btnfg:#0b1320}}
body{margin:0;padding:16px;background:var(--bg);color:var(--fg);font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
.head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}.head b{font-size:28px}
.dot{width:18px;height:18px;border-radius:50%;display:inline-block}.head span{color:var(--muted)}
table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:7px 6px;border-top:1px solid var(--line);vertical-align:middle}
th{white-space:nowrap;font-weight:600;color:var(--muted);font-size:13px}td code{word-break:break-all;background:var(--code);padding:2px 5px;border-radius:4px;font:13px ui-monospace,Menlo,Consolas,monospace}
code.tok{font-size:15px;font-weight:700}button{font:600 13px system-ui,sans-serif;padding:5px 12px;border-radius:6px;border:0;background:var(--btn);color:var(--btnfg);cursor:pointer;white-space:nowrap}
button.ok{background:#2e8540;color:#fff}p{color:var(--muted);font-size:12px}</style></head><body>
<div class="head"><span class="dot" style="background:${esc(c.color_hex)}"></span><b>${esc(c.seat)}</b>
<span>Table ${esc(c.table)} · ${esc(c.color)} · protects ${esc(c.protects)}</span></div>
<table>${rows}</table>
<p>Your seat token is a password: paste it only into the credential fields the guide names. Close this window when you are done.</p>
<script>document.querySelectorAll("button[data-v]").forEach(function(b){b.addEventListener("click",function(){
  var done=function(){b.textContent="Copied";b.className="ok";setTimeout(function(){b.textContent="Copy";b.className="";},1500);};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(b.dataset.v).then(done,function(){b.textContent="Select and copy";});}
  else{b.textContent="Select and copy";}});});<\/script></body></html>`);
    w.document.close();
    w.focus();
  }

  /* Personalize the copy-paste blocks on every page from the card saved in this browser. */
  /* Copy buttons on the values in a .sc-copytable (3.3 A), and a no-display "Copy my seat token" button. */
  function copyButton(getText, label) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "md-button sc-copy sc-copy-inline"; b.textContent = label || "Copy";
    b.addEventListener("click", async () => {
      const t = getText(), old = b.textContent;
      try { await navigator.clipboard.writeText(t); b.textContent = "Copied"; }
      catch { b.textContent = "Select and copy"; }
      setTimeout(() => (b.textContent = old), 1500);
    });
    return b;
  }
  function copyables(c) {
    document.querySelectorAll(".sc-copytable td code").forEach(code => {
      if (code.nextElementSibling && code.nextElementSibling.classList.contains("sc-copy-inline")) return;
      code.after(copyButton(() => code.textContent));
    });
    document.querySelectorAll(".sc-tokenbtn").forEach(el => {
      el.innerHTML = "";
      if (c && c.token) {
        const mask = t => t.slice(0, 5) + "•".repeat(Math.max(4, t.length - 9)) + t.slice(-4);
        const val = document.createElement("code"); val.className = "sc-tokval"; val.textContent = mask(c.token);
        val.title = "Your seat token, from your seat card";
        const show = document.createElement("button");
        show.type = "button"; show.className = "md-button sc-copy sc-copy-inline"; show.textContent = "Show";
        show.addEventListener("click", () => {
          const shown = show.textContent === "Hide";
          val.textContent = shown ? mask(c.token) : c.token; show.textContent = shown ? "Show" : "Hide";
        });
        el.append(val, show, copyButton(() => c.token, "Copy"));
      }
      else el.innerHTML = '(from your <a href="../../setup/#your-seat-card" target="_blank" rel="noopener">seat card</a>)';
    });
  }

  /* "Run" boxes (3.3 Path A): send a Lab Actions call from the browser with the seat token from the card,
     and show the request and reply like a terminal. Nothing to install on the workstation. */
  function runners(c) {
    document.querySelectorAll(".sc-run").forEach(box => {
      if (box.dataset.ready) return;
      box.dataset.ready = "1";
      const method = box.dataset.method || "POST", path = box.dataset.path;
      const base = (() => { try { return new URL(c && c.spec_light).origin; } catch { return LAB; } })();
      const body = box.dataset.body ? box.dataset.body.replace(/\{seat\}/g, (c && c.seat) || "my seat") : "";
      box.innerHTML = `<div class="sc-term-bar"><button type="button" class="md-button md-button--primary sc-run-btn">Run</button>
          <span>${esc(box.dataset.label || "")}</span></div><pre class="sc-term"></pre>`;
      const out = box.querySelector("pre"), btn = box.querySelector("button");
      const cmd = `$ ${method} ${base}${path}` + (body ? `\n  ${body}` : "");
      out.textContent = c ? cmd + "\n\nSelect Run to send it with your seat token." : cmd + "\n\nGet your seat card on Before you start first.";
      if (!c || !c.token) { btn.disabled = true; return; }
      btn.addEventListener("click", async () => {
        btn.disabled = true; out.textContent = cmd + "\n\nSending...";
        try {
          const r = await fetch(base + path, { method, headers: { "Authorization": "Bearer " + c.token, "Content-Type": "application/json" },
                                               body: method === "GET" ? undefined : (body || "{}") });
          const txt = await r.text(); let pretty = txt;
          try { pretty = JSON.stringify(JSON.parse(txt), null, 2); } catch {}
          let note = "";
          try { const j = JSON.parse(txt); if (r.ok && j.light === "on") note = "\n\nYour tile is now RED on the room wall.";
                else if (r.ok && j.light === "off") note = "\n\nYour alert is resolved: your tile is GREEN on the room wall."; } catch {}
          out.textContent = `${cmd}\n\nHTTP ${r.status}\n${pretty}${note}`;
        } catch (e) {
          out.textContent = cmd + "\n\nCould not reach the lab server (" + e.message + "). Check you are on the lab network, or ask a proctor.";
        }
        btn.disabled = false;
      });
    });
  }

  function personalize() {
    const saved = load(), c = saved && saved.card;
    document.querySelectorAll(".sc-autofill").forEach(el => {
      el.className = "admonition " + (c ? "info" : "note") + " sc-autofill";
      el.innerHTML = c
        ? `<p class="admonition-title">Filled in from your seat card</p><p>You are seat <b>${esc(c.seat)}</b>, and your
           table protects <b>${esc(c.protects)}</b>. The highlighted parts of the prompt below were filled in
           automatically from that assignment, so you can copy it as it is.</p>`
        : `<p class="admonition-title">This prompt can fill itself in</p><p>Get your card on
           <a href="${esc(el.dataset.setup || "../../setup/")}#your-seat-card">Before you start</a> and reload
           this page: the parts in brackets are then filled in with the service your table protects.</p>`;
    });
    if (!c) { copyables(null); runners(null); return; }
    const fills = [
      ["[the service I protect]", c.protects],
      ["[Directory Services Night Watch]", c.agent_name],
      ["[PseudoCo's core directory services (AD-1)]", c.protects],
      ["<your seat>", c.seat],
      ["T3-C test", c.seat + " test"],
      ["<your Lab Tools MCP URL>", c.mcp_url],
      ["<your Lab Actions spec URL>", c.spec_light],
      ["<your lab login>", c.login],
      ["<your MCP workspace URL>", c.workspace],
      ["<your workspace MCP URL>", c.workspace ? c.workspace.replace(/\/?$/, "/") + "mcp" : ""],
      ["<lab host>", (() => { try { return new URL(c.spec_light).hostname; } catch { return ""; } })()],
    ].filter(([, v]) => v);
    const inline = fills.filter(([k]) => /^<(your seat|your Lab Tools MCP URL|your Lab Actions spec URL|your MCP workspace URL|your workspace MCP URL|lab host|your lab login)>$/.test(k));   // safe in running text
    document.querySelectorAll(".md-content pre code, .md-content :not(pre) > code").forEach(code => {
      const list = code.parentElement.tagName === "PRE" ? fills : inline;
      const walk = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
      const nodes = []; while (walk.nextNode()) nodes.push(walk.currentNode);
      nodes.forEach(n => {
        let t = n.nodeValue, hit = false;
        list.forEach(([k, v]) => { if (t.includes(k)) { t = t.split(k).join("\u0000" + v + "\u0001"); hit = true; } });
        if (!hit) return;
        const frag = document.createDocumentFragment();
        t.split(/(\u0000[^\u0001]*\u0001)/).forEach(part => {
          if (part.startsWith("\u0000")) {
            const m = document.createElement("mark"); m.className = "sc-fill"; m.textContent = part.slice(1, -1);
            m.title = "Filled in from your seat card"; frag.appendChild(m);
          } else if (part) frag.appendChild(document.createTextNode(part));
        });
        n.parentNode.replaceChild(frag, n);
      });
    });
    copyables(c);
    runners(c);
    document.querySelectorAll(".md-content table").forEach(tbl => {      // 3.1: highlight my table's row
      const head = [...tbl.querySelectorAll("thead th")].map(th => th.textContent.trim());
      if (head[0] !== "Table" || !head.includes("Protects")) return;
      tbl.querySelectorAll("tbody tr").forEach(tr => {
        if (tr.cells[0] && tr.cells[0].textContent.trim() === String(c.table)) tr.classList.add("sc-mine");
      });
    });
  }

  const init = () => { const root = document.getElementById("seat-card"); if (root) render(root); personalize(); };
  if (window.document$ && window.document$.subscribe) window.document$.subscribe(init);   // Material instant navigation
  else document.addEventListener("DOMContentLoaded", init);
})();
