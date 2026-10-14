/* research.js — the "Research and user flows" section.
   Turns the SITE.research data in content.js into tabs, findings tables and
   diagrams (user flows and sitemaps drawn as SVG, so they stay sharp, follow
   dark mode and can be edited as plain text).

   Two diagram types:
     type: "flow"  nodes + edges, laid out automatically left to right
     type: "tree"  a sitemap: ["Root", [ "Leaf", ["Section", ["Leaf", "Leaf"]] ]]
   See the README for the exact format. */
(function () {
  "use strict";

  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* split a label into lines of roughly `max` characters */
  function wrap(text, max) {
    const lines = []; let cur = "";
    String(text).split(/\s+/).forEach(w => {
      if (cur && (cur + " " + w).length > max) { lines.push(cur); cur = w; }
      else cur = cur ? cur + " " + w : w;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  const bez = (a, b, c, d, t) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;

  let UID = 0;

  /* ---------------------------------------------------------------------
     User flow: nodes + edges, automatic left-to-right layout
     nodes: { id: ["Label", type?] }   type: "s" start, "e" end, "d" decision
     edges: "a>b b>c:Yes b>d:No"      (use _ for spaces inside an edge label)
     --------------------------------------------------------------------- */
  function flowSVG(d, uid) {
    const W = 186, GX = 48, GY = 22, PAD = 18, LH = 15;
    const ids = Object.keys(d.nodes);
    const E = String(d.edges).trim().split(/\s+/).filter(Boolean).map(s => {
      const m = s.match(/^(\w+)>(\w+)(?::(.+))?$/);
      return m ? { a: m[1], b: m[2], l: (m[3] || "").replace(/_/g, " ") } : null;
    }).filter(e => e && d.nodes[e.a] && d.nodes[e.b]);

    const pred = {}, succ = {};
    ids.forEach(i => { pred[i] = []; succ[i] = []; });
    E.forEach(e => { pred[e.b].push(e.a); succ[e.a].push(e.b); });

    const lay = {}, busy = {};
    const L = id => {
      if (lay[id] != null) return lay[id];
      if (busy[id]) return 0;                      // guards against accidental loops
      busy[id] = 1;
      lay[id] = pred[id].length ? 1 + Math.max(...pred[id].map(L)) : 0;
      return lay[id];
    };
    ids.forEach(L);
    const nl = Math.max(...ids.map(i => lay[i])) + 1;
    const cols = Array.from({ length: nl }, () => []);
    ids.forEach(i => cols[lay[i]].push(i));

    /* reduce crossings: order each column by the average position of its neighbours */
    const idx = {};
    const reindex = () => cols.forEach(c => c.forEach((id, k) => { idx[id] = k; }));
    const bary = (id, m) => m[id].length ? m[id].reduce((s, n) => s + idx[n], 0) / m[id].length : idx[id];
    reindex();
    for (let it = 0; it < 4; it++) {
      for (let k = 1; k < nl; k++) { cols[k].sort((a, b) => bary(a, pred) - bary(b, pred)); reindex(); }
      for (let k = nl - 2; k >= 0; k--) { cols[k].sort((a, b) => bary(a, succ) - bary(b, succ)); reindex(); }
    }

    const info = {};
    ids.forEach(id => {
      const [label, type] = d.nodes[id];
      const dec = type === "d";
      const lines = wrap(label, dec ? 15 : 23);
      info[id] = { type, lines, h: dec ? Math.max(84, lines.length * LH + 48) : Math.max(46, lines.length * LH + 22) };
    });
    const colH = cols.map(c => c.reduce((s, id) => s + info[id].h, 0) + (c.length - 1) * GY);
    const H = Math.max(...colH);
    cols.forEach((c, k) => {
      let y = PAD + (H - colH[k]) / 2;
      c.forEach(id => { info[id].x = PAD + k * (W + GX); info[id].y = y; y += info[id].h + GY; });
    });
    const width = PAD * 2 + nl * W + (nl - 1) * GX, height = PAD * 2 + H;

    let paths = "", labels = "";
    E.forEach(e => {
      const A = info[e.a], B = info[e.b];
      const x1 = A.x + W, y1 = A.y + A.h / 2, x2 = B.x, y2 = B.y + B.h / 2;
      /* a path that ends far from the End node gets a short stub and a dot,
         instead of a long line running behind the boxes in between */
      if (B.type === "e" && lay[e.b] - lay[e.a] > 1) {
        paths += `<path d="M${x1} ${y1}H${x1 + 24}"/><circle cx="${x1 + 30}" cy="${y1}" r="5" class="term"/>`;
        if (e.l) labels += `<text x="${x1 + 20}" y="${y1 - 8}" class="el" text-anchor="middle">${esc(e.l)}</text>`;
        return;
      }
      const dx = Math.max(26, (x2 - x1) * 0.5);
      paths += `<path d="M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}" marker-end="url(#${uid}a)"/>`;
      if (e.l) labels += `<text x="${bez(x1, x1 + dx, x2 - dx, x2, .22).toFixed(1)}" y="${(bez(y1, y1, y2, y2, .22) - 6).toFixed(1)}" class="el" text-anchor="middle">${esc(e.l)}</text>`;
    });

    const nodes = ids.map(id => {
      const n = info[id], cx = n.x + W / 2, cy = n.y + n.h / 2;
      const ty = cy - (n.lines.length - 1) * LH / 2 + 4.5;
      const pill = n.type === "s" || n.type === "e";
      const shape = n.type === "d"
        ? `<polygon points="${cx},${n.y} ${n.x + W},${cy} ${cx},${n.y + n.h} ${n.x},${cy}" class="nd"/>`
        : `<rect x="${n.x}" y="${n.y}" width="${W}" height="${n.h}" rx="${pill ? n.h / 2 : 14}" class="${pill ? "np" : "nn"}"/>`;
      const text = `<text y="${ty}" class="${pill ? "ntp" : "nt"}" text-anchor="middle">${n.lines.map((ln, i) => `<tspan x="${cx}" dy="${i ? LH : 0}">${esc(ln)}</tspan>`).join("")}</text>`;
      return shape + text;
    }).join("");

    return `<svg class="dg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${esc(d.title)}">
      <defs><marker id="${uid}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="ah"/></marker></defs>
      <g class="de">${paths}</g>${nodes}<g>${labels}</g></svg>`;
  }

  /* ---------------------------------------------------------------------
     Sitemap: nested arrays, drawn as a left-to-right tree
     --------------------------------------------------------------------- */
  function treeSVG(d) {
    const TW = 236, GX = 42, ROW = 54, TH = 44, PAD = 18;
    const norm = n => typeof n === "string" ? { t: n, k: [] } : { t: n[0], k: (n[1] || []).map(norm) };
    const root = norm(d.tree);
    let leaf = 0, maxD = 0;
    (function place(n, dp) {
      n.d = dp; maxD = Math.max(maxD, dp);
      if (!n.k.length) { n.y = leaf * ROW; leaf++; }
      else { n.k.forEach(c => place(c, dp + 1)); n.y = (n.k[0].y + n.k[n.k.length - 1].y) / 2; }
    })(root, 0);

    const width = PAD * 2 + (maxD + 1) * TW + maxD * GX, height = PAD * 2 + (leaf - 1) * ROW + TH;
    let links = "", boxes = "";
    (function draw(n) {
      const x = PAD + n.d * (TW + GX), y = PAD + n.y;
      const lines = wrap(n.t, 31);
      const shown = lines.slice(0, 2);
      if (lines.length > 2) shown[1] = shown[1].replace(/\s*\S*$/, "") + "…";
      const cls = n.d === 0 ? "np" : n.k.length ? "ns" : "nn";
      const tcls = n.d === 0 ? "ntp" : "nt";
      boxes += `<rect x="${x}" y="${y}" width="${TW}" height="${TH}" rx="${n.d === 0 ? TH / 2 : 12}" class="${cls}"/>` +
        `<text y="${y + TH / 2 - (shown.length - 1) * 7 + 4.5}" class="${tcls}" text-anchor="middle">${shown.map((ln, i) => `<tspan x="${x + TW / 2}" dy="${i ? 14 : 0}">${esc(ln)}</tspan>`).join("")}</text>`;
      n.k.forEach(c => {
        const cx = PAD + c.d * (TW + GX), cy = PAD + c.y;
        const x1 = x + TW, y1 = y + TH / 2, x2 = cx, y2 = cy + TH / 2, dx = (x2 - x1) * 0.5;
        links += `<path d="M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}"/>`;
        draw(c);
      });
    })(root);

    return `<svg class="dg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${esc(d.title)}">
      <g class="de">${links}</g>${boxes}</svg>`;
  }

  const diagram = d => (d.type === "tree" ? treeSVG(d) : flowSVG(d, "d" + (++UID)));

  /* ---------------------------------------------------------------------
     Section markup
     --------------------------------------------------------------------- */
  function panel(p, i) {
    const cols = p.cols || ["Problem", "Design response"];
    const stats = (p.stats || []).map(s => `<li><b>${esc(s[0])}</b> ${esc(s[1])}</li>`).join("");
    const comp = (p.competitors && p.competitors.length)
      ? `<div class="rp-comp"><small>${esc(p.competitorsLabel || "Competitors reviewed")}</small><p>${p.competitors.map(esc).join(", ")}</p></div>` : "";

    const finds = (p.findings || []).map(g => `
      <div class="rp-find">
        <h4>${esc(g.group)}</h4>
        <div class="fr fh"><span>${esc(g.cols ? g.cols[0] : cols[0])}</span><span>${esc(g.cols ? g.cols[1] : cols[1])}</span></div>
        ${g.rows.map(r => `<div class="fr"><span>${esc(r[0])}</span><span>${esc(r[1])}</span></div>`).join("")}
      </div>`).join("");

    const mvp = p.mvp ? `
      <div class="rp-find">
        <h4>${esc(p.mvp.title || "MVP features")}</h4>
        <div class="mvp">${p.mvp.groups.map(g => `<div><small>${esc(g.label)}</small><ul>${g.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      </div>` : "";

    const ds = p.diagrams || [];
    const dtabs = ds.map((d, k) => `<button type="button" role="tab" id="dt-${i}-${k}" aria-selected="${k === 0}" aria-controls="dg-${i}-${k}" tabindex="${k === 0 ? 0 : -1}">${esc(d.title)}</button>`).join("");
    const dpanes = ds.map((d, k) => `<div class="dgm" role="tabpanel" id="dg-${i}-${k}" aria-labelledby="dt-${i}-${k}" tabindex="0"${k ? " hidden" : ""}>${diagram(d)}</div>`).join("");
    const flows = ds.length ? `
      <div class="rp-find">
        <h4>User flows and sitemaps</h4>
        <div class="dg-tabs" role="tablist" aria-label="${esc(p.name)} diagrams">${dtabs}</div>
        ${dpanes}
        <p class="dg-hint">Scroll or drag to move around a diagram.${ds.some(d => d.type !== "tree") ? " A dot marks where a path ends." : ""}</p>
      </div>` : "";

    const board = p.board ? `<p class="rp-board"><a href="${esc(p.board)}" target="_blank" rel="noopener">Open the full board</a></p>` : "";

    return `
    <div class="rp" role="tabpanel" id="rp-${i}" aria-labelledby="rt-${i}"${i ? " hidden" : ""}>
      <div class="rp-top">
        <div>
          <p class="rp-kind">${esc(p.kind)}</p>
          <p class="rp-sum">${esc(p.summary)}</p>
          <ul class="rp-stats">${stats}</ul>
        </div>
        ${comp}
      </div>
      ${finds}${mvp}${flows}${board}
    </div>`;
  }

  function html(R) {
    if (!R || !R.products || !R.products.length) return "";
    const tabs = R.products.map((p, i) => `<button type="button" role="tab" id="rt-${i}" aria-selected="${i === 0}" aria-controls="rp-${i}" tabindex="${i === 0 ? 0 : -1}">${esc(p.name)}</button>`).join("");
    return `<div class="rp-tabs" role="tablist" aria-label="Products">${tabs}</div>${R.products.map(panel).join("")}`;
  }

  /* ---------------------------------------------------------------------
     Behaviour: tabs (keyboard friendly) and drag-to-pan
     --------------------------------------------------------------------- */
  function bindTabs(list) {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = t => tabs.forEach(b => {
      const on = b === t;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      const pane = document.getElementById(b.getAttribute("aria-controls"));
      if (pane) pane.hidden = !on;
    });
    list.addEventListener("click", e => { const t = e.target.closest('[role="tab"]'); if (t) select(t); });
    list.addEventListener("keydown", e => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let n = -1;
      if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = tabs.length - 1;
      if (n >= 0) { e.preventDefault(); tabs[n].focus(); select(tabs[n]); }
    });
  }

  function init() {
    const root = document.getElementById("research");
    if (!root) return;
    root.querySelectorAll('[role="tablist"]').forEach(bindTabs);

    root.querySelectorAll(".dgm").forEach(el => {
      let sx = 0, sy = 0, sl = 0, st = 0, down = false;
      el.addEventListener("pointerdown", e => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        down = true; sx = e.clientX; sy = e.clientY; sl = el.scrollLeft; st = el.scrollTop;
        el.classList.add("drag"); el.setPointerCapture(e.pointerId);
      });
      el.addEventListener("pointermove", e => {
        if (!down) return;
        el.scrollLeft = sl - (e.clientX - sx);
        el.scrollTop = st - (e.clientY - sy);
      });
      const end = () => { down = false; el.classList.remove("drag"); };
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    });
  }

  window.PFResearch = { html, init };
})();
