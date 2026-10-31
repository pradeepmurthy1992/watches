(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, attrs = {}, html = "") => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v; else e.setAttribute(k, v);
    }
    if (html) e.innerHTML = html;
    return e;
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
  };

  /* ---------- Generated watch illustrations ---------- */
  const hand = (len, w, ang, col, cy = 100) =>
    `<line x1="100" y1="${cy}" x2="100" y2="${cy - len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" transform="rotate(${ang} 100 ${cy})"/>`;

  function markers(r1, r2, col, n = 12) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, big = i % 3 === 0;
      const ra = big ? r1 - 3 : r1;
      s += `<line x1="${100 + Math.sin(a) * ra}" y1="${100 - Math.cos(a) * ra}" x2="${100 + Math.sin(a) * r2}" y2="${100 - Math.cos(a) * r2}" stroke="${col}" stroke-width="${big ? 3 : 1.5}" stroke-linecap="round"/>`;
    }
    return s;
  }

  function watchSVG(w) {
    const hc = w.hand || "#eee", strap = "#3a3a40";
    const lightDial = parseInt(w.dial.slice(1, 3), 16) > 150;
    const mk = lightDial ? "#222" : "#e9e4d6";
    let body = "";
    if (w.kind === "digital") {
      body = `<rect x="64" y="0" width="72" height="200" rx="14" fill="${strap}"/>
        <rect x="42" y="52" width="116" height="96" rx="16" fill="${w.cs}"/>
        <rect x="54" y="64" width="92" height="72" rx="8" fill="${w.dial}"/>
        <text x="100" y="108" text-anchor="middle" font-family="monospace" font-weight="700" font-size="30" fill="#1b1f17">10:08</text>
        <text x="100" y="128" text-anchor="middle" font-family="monospace" font-size="10" fill="#1b1f17">WE 31</text>`;
    } else if (w.kind === "rect") {
      body = `<rect x="68" y="0" width="64" height="200" rx="6" fill="${strap}"/>
        <rect x="52" y="38" width="96" height="124" rx="12" fill="${w.cs}"/>
        <rect x="60" y="46" width="80" height="108" rx="8" fill="${w.dial}"/>
        ${w.m === "smart" ? `<text x="100" y="108" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="28" fill="#fff">10:08</text><circle cx="100" cy="128" r="5" fill="#e0453a"/>`
          : `${markers(40, 46, mk)}${hand(26, 3, 305, hc)}${hand(38, 2, 60, hc)}`}`;
    } else {
      const chrono = w.kind === "chrono", dive = w.kind === "dive";
      body = `<rect x="70" y="0" width="60" height="200" rx="6" fill="${strap}"/>
        <circle cx="100" cy="100" r="64" fill="${w.cs}"/>
        ${dive ? `<circle cx="100" cy="100" r="60" fill="#14141a"/>${markers(56, 59, "#e9e4d6", 60)}` : ""}
        <circle cx="100" cy="100" r="${dive ? 50 : 56}" fill="${w.dial}"/>
        ${markers(dive ? 45 : 50, dive ? 38 : 43, mk)}
        ${chrono ? `<circle cx="100" cy="76" r="9" fill="none" stroke="${mk}" stroke-width="1" opacity=".6"/><circle cx="76" cy="100" r="9" fill="none" stroke="${mk}" stroke-width="1" opacity=".6"/><circle cx="124" cy="100" r="9" fill="none" stroke="${mk}" stroke-width="1" opacity=".6"/>` : ""}
        ${hand(26, 3.5, 305, hc)}${hand(40, 2.5, 60, hc)}${hand(42, 1, 170, "#d94a3a")}
        <circle cx="100" cy="100" r="3" fill="${hc}"/>
        <rect x="163" y="95" width="9" height="10" rx="2" fill="${w.cs}"/>`;
    }
    return `<svg viewBox="0 0 200 200" role="img" aria-label="Illustration of ${esc(w.n)}">${body}</svg>`;
  }

  /* ---------- Live clock ---------- */
  function setupClock() {
    const svg = $("#live-clock");
    if (!svg) return;
    svg.innerHTML = `<defs><radialGradient id="dg" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#26262b"/><stop offset="1" stop-color="#0d0d0f"/></radialGradient></defs>
      <rect x="72" y="0" width="56" height="200" rx="6" fill="#3a2a1d"/>
      <circle cx="100" cy="100" r="82" fill="#c9a45c"/><circle cx="100" cy="100" r="76" fill="#8e7338"/>
      <circle cx="100" cy="100" r="72" fill="url(#dg)"/>
      ${markers(66, 58, "#e3c581")}
      <text x="100" y="72" text-anchor="middle" font-family="Cormorant Garamond,serif" font-weight="700" font-size="9" letter-spacing="1.5" fill="#c9a45c">PRADEEP'S</text>
      <text x="100" y="138" text-anchor="middle" font-family="sans-serif" font-size="6" letter-spacing="1.5" fill="#7d7868">QUARTZ</text>
      <g id="c-h"><line x1="100" y1="100" x2="100" y2="56" stroke="#ece7dc" stroke-width="4" stroke-linecap="round"/></g>
      <g id="c-m"><line x1="100" y1="100" x2="100" y2="38" stroke="#ece7dc" stroke-width="3" stroke-linecap="round"/></g>
      <g id="c-s"><line x1="100" y1="112" x2="100" y2="32" stroke="#d94a3a" stroke-width="1.2"/></g>
      <circle cx="100" cy="100" r="4" fill="#c9a45c"/>`;
    const h = $("#c-h"), m = $("#c-m"), s = $("#c-s");
    const tick = () => {
      const d = new Date(), sec = d.getSeconds(), min = d.getMinutes() + sec / 60, hr = (d.getHours() % 12) + min / 60;
      h.setAttribute("transform", `rotate(${hr * 30} 100 100)`);
      m.setAttribute("transform", `rotate(${min * 6} 100 100)`);
      s.setAttribute("transform", `rotate(${sec * 6} 100 100)`);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Categories + catalog ---------- */
  const state = { cat: "all", move: "", tier: "", q: "", sort: "asc" };
  const catLabel = id => (CATEGORIES.find(c => c.id === id) || {}).label || id;
  const moveLabel = id => (MOVEMENT_FILTERS.find(m => m.id === id) || {}).label || id;

  function renderCategories() {
    const grid = $("#cat-grid");
    CATEGORIES.forEach(c => {
      const n = WATCHES.filter(w => w.c.includes(c.id)).length;
      const b = el("button", { class: "cat-card", type: "button" },
        `<span class="cat-icon" aria-hidden="true">${c.icon}</span><h3>${esc(c.label)}</h3><p>${esc(c.desc)}</p><small>${n} watch${n === 1 ? "" : "es"} →</small>`);
      b.addEventListener("click", () => jumpToCategory(c.id));
      grid.append(b);
    });
  }

  function jumpToCategory(id) {
    state.cat = id; state.move = ""; state.tier = ""; state.q = "";
    $("#f-move").value = ""; $("#f-tier").value = ""; $("#f-search").value = "";
    renderChips(); renderCatalog();
    showTab("catalog");
  }

  function renderChips() {
    const box = $("#chips");
    box.innerHTML = "";
    [{ id: "all", label: "All" }, ...CATEGORIES].forEach(c => {
      const b = el("button", { class: "chip", type: "button", "aria-pressed": String(state.cat === c.id) }, esc(c.label));
      b.addEventListener("click", () => { state.cat = c.id; renderChips(); renderCatalog(); });
      box.append(b);
    });
  }

  function renderCatalog() {
    const grid = $("#watch-grid");
    const q = state.q.trim().toLowerCase();
    let list = WATCHES.filter(w =>
      (state.cat === "all" || w.c.includes(state.cat)) &&
      (!state.move || w.m === state.move) &&
      (!state.tier || w.t <= Number(state.tier)) &&
      (!q || (w.n + " " + w.b + " " + w.d).toLowerCase().includes(q)));
    list.sort((a, b) => state.sort === "name" ? a.n.localeCompare(b.n) : state.sort === "desc" ? b.t - a.t || a.n.localeCompare(b.n) : a.t - b.t || a.n.localeCompare(b.n));
    $("#result-count").textContent = `${list.length} watch${list.length === 1 ? "" : "es"} found`;
    grid.innerHTML = "";
    if (!list.length) { grid.append(el("p", { class: "empty" }, "No watches match these filters. Try widening them.")); return; }
    list.forEach(w => {
      const card = el("button", { class: "w-card", type: "button" },
        `<div class="w-art">${watchSVG(w)}</div>
         <span class="w-brand">${esc(w.b)}</span>
         <span class="w-name">${esc(w.n)}</span>
         <span class="w-meta">${esc(moveLabel(w.m))} · ${esc(w.s)}</span>
         <span>${w.c.map(c => `<span class="pill">${esc(catLabel(c))}</span>`).join("")}</span>
         <span class="w-price">${esc(w.p)}</span>`);
      card.addEventListener("click", () => openWatch(w));
      grid.append(card);
    });
  }

  function openWatch(w) {
    const enc = encodeURIComponent(w.q);
    const links = w.t >= 4
      ? `<a class="btn primary" target="_blank" rel="noopener noreferrer" href="https://www.chrono24.in/search/index.htm?query=${enc}">Pre-owned on Chrono24</a>
         <a class="btn" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=${encodeURIComponent(w.b + " authorized dealer India")}">Authorized dealers</a>`
      : `<a class="btn primary" target="_blank" rel="noopener noreferrer" href="https://www.amazon.in/s?k=${enc}">Search Amazon.in</a>
         <a class="btn" target="_blank" rel="noopener noreferrer" href="https://www.chrono24.in/search/index.htm?query=${enc}">Chrono24</a>`;
    $("#dlg-body").innerHTML = `
      <div class="w-art">${watchSVG(w)}</div>
      <span class="w-brand">${esc(w.b)}</span>
      <h3>${esc(w.n)}</h3>
      <p>${esc(w.d)}</p>
      <div class="facts">
        <div><b>Movement</b>${esc(moveLabel(w.m))}</div>
        <div><b>Introduced</b>${esc(w.y)}</div>
        <div><b>Case size</b>${esc(w.s)}</div>
        <div><b>Budget band</b>${esc(TIERS[w.t])}</div>
      </div>
      <p><strong style="color:var(--gold-2)">Typical price:</strong> ${esc(w.p)}</p>
      <div class="dlg-links">${links}</div>
      <p class="note">Prices are indicative. Always compare with an authorized dealer.</p>`;
    $("#dlg").showModal();
  }

  function setupFilters() {
    const mv = $("#f-move"), tr = $("#f-tier");
    MOVEMENT_FILTERS.forEach(m => mv.append(el("option", { value: m.id }, esc(m.label))));
    ["Under ₹5,000", "Up to ₹25,000", "Up to ₹1 lakh", "Up to ₹10 lakh", "No limit (incl. ₹10 lakh +)"]
      .forEach((label, i) => tr.append(el("option", { value: String(i + 1) }, esc(label))));
    mv.addEventListener("change", e => { state.move = e.target.value; renderCatalog(); });
    tr.addEventListener("change", e => { state.tier = e.target.value; renderCatalog(); });
    $("#f-sort").addEventListener("change", e => { state.sort = e.target.value; renderCatalog(); });
    $("#f-search").addEventListener("input", e => { state.q = e.target.value; renderCatalog(); });
    document.querySelectorAll("[data-cat-jump]").forEach(b => b.addEventListener("click", () => jumpToCategory(b.dataset.catJump)));
    $("#dlg").addEventListener("click", e => { if (e.target.id === "dlg") e.target.close(); });
  }

  /* ---------- Learn ---------- */
  function renderMovements() {
    const tabs = $("#move-tabs"), panel = $("#move-panel"), tbody = $("#move-table tbody");
    const show = m => {
      panel.innerHTML = `<h3>${esc(m.name)}</h3><p class="tagline">${esc(m.tag)}</p><p>${esc(m.how)}</p>
        <div class="facts"><div><b>Accuracy</b>${esc(m.acc)}</div><div><b>Power</b>${esc(m.power)}</div><div><b>Service</b>${esc(m.service)}</div></div>
        <div class="pc"><div class="pro"><b>Good for</b><p>${esc(m.pros)}</p></div><div class="con"><b>Watch out</b><p>${esc(m.cons)}</p></div></div>`;
      tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", String(t.dataset.id === m.id)));
    };
    MOVEMENTS.forEach((m, i) => {
      const t = el("button", { class: "tab", type: "button", role: "tab", "data-id": m.id }, esc(m.name));
      t.addEventListener("click", () => show(m));
      tabs.append(t);
      tbody.append(el("tr", {}, `<td><b>${esc(m.name)}</b></td><td>${esc(m.acc)}</td><td>${esc(m.power)}</td><td>${esc(m.service)}</td>`));
      if (i === 0) show(m);
    });
  }

  const miniGrid = (id, items, extra) => {
    const g = $(id);
    items.forEach(i => g.append(el("div", { class: "mini" }, `<h4>${esc(i.n)}</h4><p>${esc(i.d)}</p>${extra ? extra(i) : ""}`)));
  };

  function renderGlossary() {
    const dl = $("#glossary");
    const draw = q => {
      dl.innerHTML = "";
      GLOSSARY.filter(([t, d]) => !q || (t + d).toLowerCase().includes(q)).forEach(([t, d]) =>
        dl.append(el("div", {}, `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`)));
      if (!dl.children.length) dl.append(el("p", { class: "empty" }, "No matching terms."));
    };
    draw("");
    $("#g-search").addEventListener("input", e => draw(e.target.value.trim().toLowerCase()));
  }

  /* ---------- Straps / sizing ---------- */
  function setupWrist() {
    const inp = $("#wrist"), out = $("#wrist-out");
    const calc = () => {
      const c = parseFloat(inp.value);
      if (!(c >= 12 && c <= 26)) { out.textContent = "Enter a value between 12 and 26 cm."; return; }
      const [lo, hi, lug] = c < 15 ? [32, 37, "16–18"] : c < 17 ? [36, 40, "18–20"] : c < 19 ? [38, 42, "20–22"] : c < 21 ? [40, 44, "22"] : [42, 46, "22–24"];
      out.textContent = `Try ${lo}–${hi} mm cases; typical strap width ${lug} mm.`;
    };
    inp.addEventListener("input", calc);
    calc();
  }

  /* ---------- Collection ---------- */
  function renderCollection() {
    const g = $("#my-grid");
    MY_WATCHES.forEach(w => {
      const wide = w.img.startsWith("vk");
      g.append(el("article", { class: "my-card" + (wide ? " wide" : "") },
        `<img src="img/${esc(w.img)}" alt="${esc(w.n)}" loading="lazy">
         <div class="my-body"><h3>${esc(w.n)}</h3><p class="meta">${esc(w.type)} · ${esc(w.mv)}</p><p>${esc(w.d)}</p></div>`));
    });
    const mech = MY_WATCHES.filter(w => /hand-wound|mechanical|automatic/i.test(w.mv)).length;
    const quartz = MY_WATCHES.length - mech;
    const vintage = MY_WATCHES.filter(w => w.cats.includes("vintage")).length;
    $("#insights").innerHTML = [
      ["Movement mix", `${mech} mechanical · ${quartz} quartz or ana-digi. A good balance of ritual and reliability.`],
      ["Vintage pieces", `${vintage} vintage watches (Kohinoor, day-date, Soumya). The day-date and the Soumya would benefit from restoration.`],
      ["Gaps to fill", "No dedicated diver, no automatic you can wear daily, and no chronograph. A Seiko 5, an Orient Bambino or a Citizen Eco-Drive would round it out."],
      ["Care tips", "Run mechanicals weekly, rotate watches, and keep leather straps dry. Store them away from magnets and direct sun."]
    ].map(([t, d]) => `<div class="insight"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join("");
  }

  /* ---------- Buy ---------- */
  function renderBuy() {
    const saved = store.get("checklist", []);
    const ul = $("#checklist"), note = $("#check-note");
    const upd = () => { note.textContent = `${ul.querySelectorAll("input:checked").length} of ${CHECKLIST.length} done`; };
    CHECKLIST.forEach((t, i) => {
      const li = el("li", {}, `<label><input type="checkbox" ${saved.includes(i) ? "checked" : ""}><span>${esc(t)}</span></label>`);
      li.querySelector("input").addEventListener("change", () => {
        store.set("checklist", [...ul.querySelectorAll("input")].map((c, j) => c.checked ? j : -1).filter(j => j >= 0));
        upd();
      });
      ul.append(li);
    });
    upd();
    RED_FLAGS.forEach(t => $("#flags").append(el("li", {}, esc(t))));
    const box = $("#store-grid");
    [...new Set(STORES.map(s => s.g))].forEach(g => {
      box.append(el("h4", { class: "store-group" }, esc(g)));
      const row = el("div", { class: "store-row" });
      STORES.filter(s => s.g === g).forEach(s => row.append(el("a", { class: "store", href: s.u, target: "_blank", rel: "noopener noreferrer" },
        `<b>${esc(s.n)}</b><span>${esc(s.d)}</span><small>${esc(s.tag)} ↗</small>`)));
      box.append(row);
    });
  }

  /* ---------- Deals ---------- */
  const inr = n => "₹" + n.toLocaleString("en-IN");
  const dealOff = d => d[4] > d[3] ? Math.round((1 - d[3] / d[4]) * 100) : 0;
  function renderDeals() {
    $("#deals-date").textContent = DEALS_DATE;
    const siteSel = $("#d-site");
    [...new Set(DEALS.map(d => d[0]))].forEach(s => siteSel.append(el("option", { value: s }, esc(s))));
    const sorted = fn => [...DEALS].sort(fn)[0];
    const picks = [
      ["Biggest discount", sorted((a, b) => dealOff(b) - dealOff(a))],
      ["Cheapest watch", sorted((a, b) => a[3] - b[3])],
      ["Best under ₹25,000", [...DEALS].filter(d => d[3] <= 25000).sort((a, b) => dealOff(b) - dealOff(a) || a[3] - b[3])[0]],
      ["Biggest saving in ₹", sorted((a, b) => (b[4] - b[3]) - (a[4] - a[3]))]
    ];
    $("#deal-picks").innerHTML = picks.map(([t, d]) =>
      `<a class="pick" href="${esc(d[5])}" target="_blank" rel="noopener noreferrer"><small>${esc(t)}</small><b>${esc(d[1])} ${esc(d[2])}</b><span>${inr(d[3])}${dealOff(d) ? ` (${dealOff(d)}% off ${inr(d[4])})` : ""} · ${esc(d[0])}</span></a>`).join("");
    const draw = () => {
      const q = $("#d-search").value.trim().toLowerCase(), site = siteSel.value, max = Number($("#d-max").value) || Infinity, sort = $("#d-sort").value;
      const list = DEALS.filter(d => (!site || d[0] === site) && d[3] <= max && (!q || (d[1] + " " + d[2]).toLowerCase().includes(q)));
      list.sort((a, b) => sort === "asc" ? a[3] - b[3] : sort === "desc" ? b[3] - a[3] : dealOff(b) - dealOff(a) || a[3] - b[3]);
      $("#deal-count").textContent = `${list.length} offer${list.length === 1 ? "" : "s"}`;
      $("#deal-grid").innerHTML = list.map(d => `<a class="deal" href="${esc(d[5])}" target="_blank" rel="noopener noreferrer">
        <span class="site">${esc(d[0])}</span><b>${esc(d[1])}</b><span class="model">${esc(d[2])}</span>
        <span class="price">${inr(d[3])}${dealOff(d) ? `<s>${inr(d[4])}</s><span class="off">${dealOff(d)}% off</span>` : ""}</span></a>`).join("") || '<p class="empty">No offers match.</p>';
    };
    ["#d-search", "#d-site", "#d-max", "#d-sort"].forEach(s => $(s).addEventListener("input", draw));
    draw();
  }

  /* ---------- Tabs ---------- */
  const panels = [...document.querySelectorAll(".tabpanel")];
  const navLinks = [...document.querySelectorAll("#menu a")];
  function showTab(id, updateHash = true) {
    if (!panels.some(p => p.id === id)) id = "home";
    panels.forEach(p => { p.hidden = p.id !== id; });
    navLinks.forEach(a => {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (updateHash && location.hash !== "#" + id) history.pushState(null, "", "#" + id);
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", () => showTab(location.hash.slice(1), false));
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (panels.some(p => p.id === id)) { e.preventDefault(); showTab(id); }
    else if (id === "top") { e.preventDefault(); window.scrollTo(0, 0); }
  });

  /* ---------- Nav ---------- */
  function setupNav() {
    const btn = $(".nav-toggle"), menu = $("#menu");
    btn.addEventListener("click", () => { const o = menu.classList.toggle("open"); btn.setAttribute("aria-expanded", String(o)); });
    menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); } });
  }

  /* ---------- Init ---------- */
  $("#stat-watches").textContent = WATCHES.length;
  setupClock();
  setupNav();
  renderCategories();
  setupFilters();
  renderChips();
  renderCatalog();
  renderMovements();
  miniGrid("#dial-grid", DIALS);
  miniGrid("#comp-grid", COMPLICATIONS);
  miniGrid("#strap-grid", STRAPS, s => `<span class="good">Best for: ${esc(s.good)}</span>`);
  renderGlossary();
  setupWrist();
  renderCollection();
  renderBuy();
  renderDeals();
  showTab(location.hash.slice(1), false);
})();
