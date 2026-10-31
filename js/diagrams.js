/* Hand-drawn SVG reference diagrams (no external images). Colours use the site's CSS variables. */
const Diagrams = (() => {
  let uid = 0;
  const id = p => `${p}${++uid}`;
  const G = "var(--gold)", G2 = "var(--gold-2)", T = "var(--text)", M = "var(--muted)", L = "var(--line)";
  const svg = (vb, body, label, cls = "") =>
    `<svg class="diagram ${cls}" viewBox="${vb}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

  /* ---------- icons used in movement flow charts (drawn in a 60x60 box) ---------- */
  const gear = (cx, cy, r, teeth = 10, col = G) => {
    let t = "";
    for (let i = 0; i < teeth; i++) t += `<rect x="${cx - 2.5}" y="${cy - r - 4}" width="5" height="6" fill="${col}" transform="rotate(${(360 / teeth) * i} ${cx} ${cy})"/>`;
    return `${t}<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="2" fill="${col}"/>`;
  };
  const spiral = (cx, cy, turns, step, col = G) => {
    let d = "";
    for (let a = 0; a <= turns * Math.PI * 2; a += 0.25) {
      const r = 2 + (a / (Math.PI * 2)) * step;
      d += `${a === 0 ? "M" : "L"}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)} `;
    }
    return `<path d="${d}" fill="none" stroke="${col}" stroke-width="2"/>`;
  };
  const ICONS = {
    crown: `<rect x="8" y="22" width="14" height="16" rx="3" fill="none" stroke="${G}" stroke-width="2.5"/><rect x="22" y="26" width="26" height="8" fill="none" stroke="${G}" stroke-width="2.5"/><path d="M12 25v10M16 25v10" stroke="${G}" stroke-width="1.5"/>`,
    spring: `<circle cx="30" cy="30" r="22" fill="none" stroke="${G}" stroke-width="2.5"/>${spiral(30, 30, 3.2, 5.2)}`,
    gears: `${gear(22, 32, 11, 9)}${gear(42, 22, 8, 8, G2)}`,
    escape: `<circle cx="22" cy="32" r="13" fill="none" stroke="${G}" stroke-width="2"/><path d="M22 19l8 6-4 4M22 45l8-6-4-4M9 32l6-5 3 5M35 32l-6-5" fill="none" stroke="${G}" stroke-width="2"/><path d="M40 12l8 14-4 2" fill="none" stroke="${G2}" stroke-width="3" stroke-linecap="round"/><rect x="38" y="30" width="14" height="8" fill="${G2}"/>`,
    balance: `<circle cx="30" cy="30" r="21" fill="none" stroke="${G}" stroke-width="3"/><path d="M9 30h42M30 9v42" stroke="${G}" stroke-width="2"/>${spiral(30, 30, 2.5, 3.2, G2)}`,
    hands: `<circle cx="30" cy="30" r="23" fill="none" stroke="${G}" stroke-width="2.5"/><path d="M30 30V13M30 30l12 8" stroke="${G}" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="30" r="2.5" fill="${G}"/>`,
    rotor: `<path d="M8 34A22 22 0 0 1 52 34Z" fill="${G}" opacity=".85"/><circle cx="30" cy="34" r="3" fill="var(--bg)" stroke="${G}" stroke-width="2"/><path d="M12 48a22 22 0 0 0 36 0" fill="none" stroke="${G2}" stroke-width="2.5"/><path d="M48 44l1 6-6-1" fill="none" stroke="${G2}" stroke-width="2.5"/>`,
    battery: `<rect x="6" y="18" width="42" height="24" rx="3" fill="none" stroke="${G}" stroke-width="2.5"/><rect x="48" y="25" width="6" height="10" fill="${G}"/><path d="M14 24v12M22 24v12M30 24v12" stroke="${G}" stroke-width="3"/>`,
    crystal: `<path d="M20 50V16M40 50V16M20 50h20M30 50v6" fill="none" stroke="${G}" stroke-width="3" stroke-linecap="round"/><path d="M12 22q-4 8 0 16M8 18q-6 12 0 24M48 22q4 8 0 16M52 18q6 12 0 24" fill="none" stroke="${G2}" stroke-width="2"/>`,
    chip: `<rect x="14" y="14" width="32" height="32" rx="3" fill="none" stroke="${G}" stroke-width="2.5"/><path d="M20 8v6M30 8v6M40 8v6M20 46v6M30 46v6M40 46v6M8 20h6M8 30h6M8 40h6M46 20h6M46 30h6M46 40h6" stroke="${G}" stroke-width="2.5"/><text x="30" y="35" text-anchor="middle" font-size="11" font-family="monospace" fill="${G2}">÷2¹⁵</text>`,
    coil: `<path d="M6 30c4-14 8-14 12 0s8 14 12 0 8-14 12 0 8 14 12 0" fill="none" stroke="${G}" stroke-width="3"/><rect x="22" y="40" width="16" height="10" fill="${G2}"/>`,
    sun: `<circle cx="30" cy="30" r="9" fill="${G2}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="30" y1="12" x2="30" y2="6" stroke="${G2}" stroke-width="3" stroke-linecap="round" transform="rotate(${a} 30 30)"/>`).join("")}`,
    cell: `<rect x="6" y="12" width="48" height="36" fill="none" stroke="${G}" stroke-width="2.5"/><path d="M22 12v36M38 12v36M6 24h48M6 36h48" stroke="${G}" stroke-width="1.6"/>`,
    lcd: `<rect x="5" y="14" width="50" height="32" rx="3" fill="${G2}" opacity=".25" stroke="${G}" stroke-width="2.5"/><text x="30" y="37" text-anchor="middle" font-size="16" font-family="monospace" font-weight="700" fill="${G}">10:08</text>`,
    glide: `${gear(24, 32, 12, 12)}<rect x="38" y="20" width="16" height="22" rx="2" fill="none" stroke="${G2}" stroke-width="2.5"/><path d="M38 31h16" stroke="${G2}" stroke-width="2"/><text x="46" y="28" text-anchor="middle" font-size="9" fill="${G2}">N</text><text x="46" y="39" text-anchor="middle" font-size="9" fill="${G2}">S</text>`,
    phone: `<rect x="17" y="6" width="26" height="48" rx="5" fill="none" stroke="${G}" stroke-width="2.5"/><circle cx="30" cy="47" r="2" fill="${G}"/><path d="M23 16h14M23 22h14M23 28h9" stroke="${G2}" stroke-width="2"/>`,
    sensor: `<path d="M6 32h10l5-14 8 28 6-20 4 6h15" fill="none" stroke="${G}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    cpu: `<rect x="16" y="16" width="28" height="28" rx="3" fill="${G}" opacity=".25" stroke="${G}" stroke-width="2.5"/><rect x="24" y="24" width="12" height="12" fill="${G2}"/><path d="M22 10v6M30 10v6M38 10v6M22 44v6M30 44v6M38 44v6" stroke="${G}" stroke-width="2.5"/>`
  };
  const icon = n => `<svg class="ic" viewBox="0 0 60 60" aria-hidden="true">${ICONS[n]}</svg>`;

  const FLOWS = {
    quartz: [["battery", "Battery", "Supplies current"], ["crystal", "Quartz crystal", "Vibrates 32,768×/second"], ["chip", "Circuit", "Divides down to 1 pulse/s"], ["coil", "Stepper motor", "Moves one step per pulse"], ["gears", "Gear train", "Reduces speed"], ["hands", "Hands", "Show the time"]],
    hand: [["crown", "Crown", "You wind it"], ["spring", "Mainspring", "Stores energy"], ["gears", "Gear train", "Passes energy on"], ["escape", "Escapement", "Releases it in tiny steps"], ["balance", "Balance wheel", "Sets the beat"], ["hands", "Hands", "Show the time"]],
    automatic: [["rotor", "Rotor", "Swings with your wrist"], ["spring", "Mainspring", "Wound by the rotor"], ["gears", "Gear train", "Passes energy on"], ["escape", "Escapement", "Releases it in tiny steps"], ["balance", "Balance wheel", "Sets the beat"], ["hands", "Hands", "Show the time"]],
    solar: [["sun", "Light", "Sun or lamp"], ["cell", "Solar cell", "Under the dial"], ["battery", "Storage cell", "Rechargeable"], ["crystal", "Quartz module", "Keeps the time"], ["coil", "Motor", "Steps the hands"], ["hands", "Hands", "Show the time"]],
    spring: [["spring", "Mainspring", "Stores energy"], ["gears", "Gear train", "Passes energy on"], ["glide", "Glide wheel", "Magnetic brake slows it"], ["crystal", "Quartz regulator", "Controls the brake"], ["hands", "Hands", "Glide smoothly"]],
    digital: [["battery", "Battery", "Supplies current"], ["crystal", "Quartz crystal", "Keeps the beat"], ["chip", "Chip", "Counts, runs alarms"], ["lcd", "LCD display", "Shows time and modes"]],
    smart: [["battery", "Battery", "Rechargeable"], ["cpu", "Processor", "Runs apps"], ["sensor", "Sensors", "Heart rate, motion, GPS"], ["lcd", "Touchscreen", "Shows info"], ["phone", "Your phone", "Syncs by Bluetooth"]]
  };
  const flow = key => `<ol class="flow">${(FLOWS[key] || []).map(([i, t, s]) =>
    `<li>${icon(i)}<b>${t}</b><span>${s}</span></li>`).join("")}</ol>`;

  /* ---------- watch anatomy ---------- */
  const ANATOMY = [
    ["Crown", "Wind or set the time. Screw-down crowns improve water resistance."],
    ["Bezel", "Ring around the crystal: fixed for style, or rotating to time dives."],
    ["Crystal", "The glass cover: acrylic, mineral or sapphire."],
    ["Dial", "The face, with markers and printing."],
    ["Hands", "Hour, minute and (usually) seconds."],
    ["Lugs", "The arms that hold the strap. The gap between them is the lug width."],
    ["Case", "The metal or plastic body that holds the movement."],
    ["Strap or bracelet", "Leather, rubber, fabric or metal links."],
    ["Buckle / clasp", "Fastens the strap. Folding clasps are more secure."],
    ["Case back (underside)", "Solid or see-through. It carries the model, water-resistance and serial info."]
  ];
  function anatomy() {
    const pin = (n, x, y) => `<g><circle cx="${x}" cy="${y}" r="11" fill="${G}"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="13" font-weight="700" fill="#111" font-family="sans-serif">${n}</text></g>`;
    const body = `
      <rect x="112" y="0" width="76" height="130" rx="8" fill="#3a2a1d"/><rect x="112" y="310" width="76" height="130" rx="8" fill="#3a2a1d"/>
      <path d="M118 20v90M182 20v90M118 330v90M182 330v90" stroke="${G}" stroke-width="1.2" stroke-dasharray="5 4" opacity=".6"/>
      <path d="M92 150l20-30h76l20 30M92 290l20 30h76l20-30" fill="#6b5424" stroke="${G}" stroke-width="2"/>
      <circle cx="150" cy="220" r="100" fill="${G}"/>
      <circle cx="150" cy="220" r="92" fill="#8e7338"/>
      <circle cx="150" cy="220" r="80" fill="#e6e3d8" opacity=".25"/>
      <circle cx="150" cy="220" r="76" fill="#12161d"/>
      ${Array.from({ length: 12 }, (_, i) => `<line x1="150" y1="156" x2="150" y2="${i % 3 ? 164 : 172}" stroke="${G2}" stroke-width="${i % 3 ? 2 : 4}" transform="rotate(${i * 30} 150 220)"/>`).join("")}
      <text x="150" y="200" text-anchor="middle" font-size="9" fill="${G}" font-family="Georgia,serif" letter-spacing="2">BRAND</text>
      <line x1="150" y1="220" x2="150" y2="170" stroke="${T}" stroke-width="3.5" stroke-linecap="round" transform="rotate(-60 150 220)"/>
      <line x1="150" y1="220" x2="150" y2="156" stroke="${T}" stroke-width="2.5" stroke-linecap="round" transform="rotate(60 150 220)"/>
      <line x1="150" y1="232" x2="150" y2="154" stroke="#d94a3a" stroke-width="1.2" transform="rotate(170 150 220)"/>
      <circle cx="150" cy="220" r="4" fill="${G}"/>
      <path d="M115 175a52 52 0 0 1 40-24" fill="none" stroke="#fff" stroke-width="3" opacity=".25" stroke-linecap="round"/>
      <rect x="248" y="212" width="18" height="16" rx="3" fill="${G}"/><rect x="238" y="216" width="12" height="8" fill="#8e7338"/>
      <circle cx="150" cy="395" r="0"/>
      <rect x="132" y="408" width="36" height="16" rx="3" fill="none" stroke="${G2}" stroke-width="2.5"/>
      ${pin(1, 268, 196)}${pin(2, 78, 150)}${pin(3, 150, 128)}${pin(4, 150, 262)}${pin(5, 188, 205)}${pin(6, 82, 296)}${pin(7, 72, 225)}${pin(8, 150, 70)}${pin(9, 214, 416)}
      <g transform="translate(20 20)"><rect x="0" y="0" width="76" height="46" rx="8" fill="none" stroke="${L}"/><rect x="14" y="8" width="48" height="30" rx="15" fill="${G}" opacity=".8"/>${pin(10, 38, 23)}</g>
      <text x="58" y="76" text-anchor="middle" font-size="9" fill="${M}" font-family="sans-serif">underside</text>`;
    return `<div class="anatomy">${svg("0 0 300 440", body, "Labelled diagram of the parts of a wristwatch", "anatomy-svg")}
      <ol class="legend">${ANATOMY.map(([t, d]) => `<li><b>${t}</b> ${d}</li>`).join("")}</ol></div>`;
  }

  /* ---------- dial & complication swatches ---------- */
  function dial(kind) {
    const a = id("p"), r = 46;
    const ring = (n = 12, col = "#e9e4d6") => Array.from({ length: n }, (_, i) => `<line x1="60" y1="${60 - r + 6}" x2="60" y2="${60 - r + (i % 3 ? 11 : 15)}" stroke="${col}" stroke-width="${i % 3 ? 1.6 : 3}" transform="rotate(${(360 / n) * i} 60 60)"/>`).join("");
    const hands = (col = "#e9e4d6") => `<line x1="60" y1="60" x2="60" y2="38" stroke="${col}" stroke-width="3" stroke-linecap="round" transform="rotate(-60 60 60)"/><line x1="60" y1="60" x2="60" y2="28" stroke="${col}" stroke-width="2" stroke-linecap="round" transform="rotate(60 60 60)"/><circle cx="60" cy="60" r="2.5" fill="${col}"/>`;
    const base = (fill, extra = "", rim = "#b9bcc0") => `<defs><clipPath id="${a}"><circle cx="60" cy="60" r="${r}"/></clipPath></defs><circle cx="60" cy="60" r="${r + 7}" fill="${rim}"/><circle cx="60" cy="60" r="${r}" fill="${fill}"/><g clip-path="url(#${a})">${extra}</g>`;
    const S = {
      sunburst: () => base("#1f3f7a", Array.from({ length: 72 }, (_, i) => `<line x1="60" y1="60" x2="60" y2="0" stroke="#fff" stroke-opacity="${i % 2 ? .1 : .02}" stroke-width="3" transform="rotate(${i * 5} 60 60)"/>`).join("")) + ring() + hands(),
      guilloche: () => base("#e7e2d3", Array.from({ length: 14 }, (_, i) => `<circle cx="${60 + Math.cos(i / 14 * 6.28) * 14}" cy="${60 + Math.sin(i / 14 * 6.28) * 14}" r="26" fill="none" stroke="#8b8470" stroke-width=".6"/>`).join("")) + ring(12, "#333") + hands("#223"),
      tapisserie: () => base("#1c2c4a", Array.from({ length: 12 }, (_, i) => `<line x1="${i * 10}" y1="0" x2="${i * 10}" y2="120" stroke="#6f86b3" stroke-width=".9"/><line x1="0" y1="${i * 10}" x2="120" y2="${i * 10}" stroke="#6f86b3" stroke-width=".9"/>`).join("")) + ring() + hands(),
      enamel: () => `${base("#f7f5ee", `<ellipse cx="46" cy="38" rx="26" ry="12" fill="#fff" opacity=".7" transform="rotate(-30 46 38)"/>`, "#c9a45c")}${ring(12, "#1b2a4a")}${hands("#1b2a4a")}`,
      sector: () => base("#efeadb", `<circle cx="60" cy="60" r="36" fill="none" stroke="#9a947f" stroke-width="1"/><circle cx="60" cy="60" r="26" fill="none" stroke="#9a947f" stroke-width="1"/>${Array.from({ length: 12 }, (_, i) => `<line x1="60" y1="24" x2="60" y2="34" stroke="#9a947f" transform="rotate(${i * 30} 60 60)"/>`).join("")}`) + ring(12, "#2b2b2b") + hands("#2b2b2b"),
      panda: () => base("#f1f1ee", `<circle cx="60" cy="38" r="12" fill="#222"/><circle cx="38" cy="62" r="12" fill="#222"/><circle cx="82" cy="62" r="12" fill="#222"/>`) + ring(12, "#222") + hands("#222"),
      skeleton: () => base("#10141b", `${gear(42, 58, 16, 12, "#c9a45c")}${gear(76, 48, 12, 10, "#e3c581")}${gear(70, 82, 10, 9, "#c9a45c")}`) + hands(),
      tropical: () => base("radial-gradient(#6b4a2a,#3d2a18)", "") + `<circle cx="60" cy="60" r="${r}" fill="#5b3f22"/><circle cx="60" cy="60" r="${r}" fill="#8a6338" opacity=".35"/>${ring(12, "#e8dcb0")}${hands("#e8dcb0")}`,
      meteorite: () => base("#4a4a4d", Array.from({ length: 22 }, (_, i) => `<line x1="${-20 + i * 8}" y1="0" x2="${40 + i * 8}" y2="120" stroke="#a7a7ab" stroke-width=".8" opacity=".6"/><line x1="${140 - i * 8}" y1="0" x2="${80 - i * 8}" y2="120" stroke="#8d8d92" stroke-width=".8" opacity=".5"/>`).join("")) + ring() + hands(),
      pearl: () => `<defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e8ef"/><stop offset=".4" stop-color="#d7e7f2"/><stop offset=".7" stop-color="#efe4c8"/><stop offset="1" stop-color="#e7d3e6"/></linearGradient></defs><circle cx="60" cy="60" r="${r + 7}" fill="#c9a45c"/><circle cx="60" cy="60" r="${r}" fill="url(#${a})"/>${ring(12, "#6a5a68")}${hands("#6a5a68")}`,
      lume: () => base("#0b0d10", "") + `<g style="filter:drop-shadow(0 0 3px #8cff6a)">${ring(12, "#9dff7a")}${hands("#9dff7a")}</g>`,
      daydate: () => base("#14233f", "") + ring(12, "#e9e4d6") + `<rect x="68" y="55" width="26" height="12" fill="#f3efe2" stroke="#c9a45c"/><text x="81" y="64.5" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#111">SAT 9</text>` + hands(),
      digital: () => `<circle cx="60" cy="60" r="${r + 7}" fill="#2a2a2a"/><circle cx="60" cy="60" r="${r}" fill="#101010"/><rect x="26" y="46" width="68" height="28" rx="4" fill="#b9c4a8"/><text x="60" y="68" text-anchor="middle" font-family="monospace" font-weight="700" font-size="22" fill="#1b1f17">10:08</text>${ring(12, "#888")}`,
      /* complications */
      date: () => base("#e9e6dc", "") + ring(12, "#222") + `<rect x="74" y="54" width="14" height="13" fill="#fff" stroke="#333"/><text x="81" y="64.5" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#111">31</text>` + hands("#222"),
      chrono: () => base("#171a20", `<circle cx="60" cy="40" r="10" fill="none" stroke="#777"/><circle cx="40" cy="62" r="10" fill="none" stroke="#777"/><circle cx="80" cy="62" r="10" fill="none" stroke="#777"/><path d="M60 40v-8M40 62h-8M80 62h8" stroke="#d94a3a" stroke-width="1.5"/>`) + ring() + hands() + `<rect x="106" y="22" width="6" height="12" rx="2" fill="#b9bcc0"/><rect x="106" y="86" width="6" height="12" rx="2" fill="#b9bcc0"/>`,
      gmt: () => base("#14233f", `<circle cx="60" cy="60" r="38" fill="none" stroke="#e9e4d6" stroke-width="1" stroke-dasharray="2 3"/>`) + ring() + hands() + `<line x1="60" y1="60" x2="60" y2="26" stroke="#d94a3a" stroke-width="2" transform="rotate(130 60 60)"/><path d="M58 24h4l-2-6z" fill="#d94a3a" transform="rotate(130 60 60)"/><text x="60" y="48" text-anchor="middle" font-size="7" fill="#d94a3a" font-family="sans-serif">24h</text>`,
      world: () => base("#10233a", `<circle cx="60" cy="60" r="38" fill="none" stroke="#6fa8dc" stroke-width="6" stroke-dasharray="3 2"/><circle cx="60" cy="60" r="26" fill="none" stroke="#e9e4d6" stroke-width=".8"/><circle cx="60" cy="60" r="16" fill="#6fa8dc" opacity=".4"/>`) + hands() + `<text x="60" y="95" text-anchor="middle" font-size="7" fill="#e9e4d6" font-family="sans-serif">DEL  LON  NYC  TYO</text>`,
      alarm: () => `<circle cx="60" cy="60" r="${r + 7}" fill="#2a2a2a"/><circle cx="60" cy="60" r="${r}" fill="#101419"/>${ring(12, "#888")}${hands("#ddd")}<rect x="40" y="76" width="40" height="14" rx="3" fill="#b9c4a8"/><text x="60" y="87" text-anchor="middle" font-family="monospace" font-weight="700" font-size="11" fill="#1b1f17">06:30</text><path d="M56 40a5 5 0 0 1 10 0c0 6 3 7 3 9H53c0-2 3-3 3-9z" fill="#e3c581"/>`,
      moon: () => base("#13203a", `<circle cx="60" cy="84" r="14" fill="#0a1224" stroke="#c9a45c"/><circle cx="60" cy="84" r="9" fill="#e9e4d6"/><circle cx="66" cy="84" r="9" fill="#0a1224"/>${Array.from({ length: 9 }, (_, i) => `<circle cx="${30 + i * 7.5}" cy="${30 + (i % 2) * 6}" r="1" fill="#e9e4d6"/>`).join("")}`) + ring() + hands(),
      reserve: () => base("#1d1d1f", `<path d="M30 38a34 34 0 0 1 60 0" fill="none" stroke="#777" stroke-width="3"/><path d="M30 38a34 34 0 0 1 36-10" fill="none" stroke="#c9a45c" stroke-width="3"/><text x="60" y="48" text-anchor="middle" font-size="7" fill="#e9e4d6" font-family="sans-serif">POWER RESERVE</text>`) + ring() + hands(),
      perpetual: () => base("#e9e6dc", `<circle cx="38" cy="50" r="9" fill="none" stroke="#555"/><circle cx="82" cy="50" r="9" fill="none" stroke="#555"/><circle cx="60" cy="80" r="9" fill="none" stroke="#555"/><text x="38" y="53" text-anchor="middle" font-size="7" font-family="sans-serif">MON</text><text x="82" y="53" text-anchor="middle" font-size="7" font-family="sans-serif">DEC</text><text x="60" y="83" text-anchor="middle" font-size="7" font-family="sans-serif">LEAP</text>`) + hands("#222"),
      tourbillon: () => base("#111418", `<circle cx="60" cy="82" r="14" fill="none" stroke="#c9a45c" stroke-width="2"/><path d="M60 68v28M46 82h28" stroke="#c9a45c" stroke-width="2"/><circle cx="60" cy="82" r="4" fill="#e3c581"/>`) + ring() + hands(),
      repeater: () => base("#171a20", `<path d="M36 90q24 10 48 0" fill="none" stroke="#c9a45c" stroke-width="3"/><path d="M40 96q20 8 40 0" fill="none" stroke="#e3c581" stroke-width="3"/>`) + ring() + hands() + `<rect x="2" y="56" width="10" height="8" rx="2" fill="#c9a45c"/>`
    };
    return svg("0 0 120 120", (S[kind] || S.sunburst)(), "Illustration of a " + kind + " dial", "swatch");
  }

  /* ---------- straps ---------- */
  function strap(kind) {
    const w = 260, h = 70, a = id("s");
    const wrap = body => svg(`0 0 ${w} ${h}`, body, "Illustration of a " + kind + " strap", "strap-art");
    const links = (n, lw, fill, extra = "") => Array.from({ length: n }, (_, i) => `<rect x="${6 + i * (lw + 2)}" y="8" width="${lw}" height="54" rx="4" fill="${fill}"/>${extra && extra(6 + i * (lw + 2), lw)}`).join("");
    const T = {
      leather: () => wrap(`<rect x="2" y="10" width="256" height="50" rx="8" fill="#8a4b1f"/><rect x="2" y="10" width="256" height="50" rx="8" fill="none" stroke="#c98a53" stroke-width="1.5" stroke-dasharray="6 4" transform="translate(0 0)" opacity=".0"/><rect x="8" y="16" width="244" height="38" rx="5" fill="none" stroke="#e0b184" stroke-width="1.4" stroke-dasharray="5 4"/>${[150, 170, 190, 210].map(x => `<circle cx="${x}" cy="35" r="3.2" fill="#2a1608"/>`).join("")}<rect x="228" y="10" width="24" height="50" fill="none" stroke="#c9ccd0" stroke-width="4"/><path d="M240 8v54" stroke="#c9ccd0" stroke-width="3"/>`),
      steelOyster: () => wrap(`<rect x="2" y="8" width="256" height="54" rx="4" fill="#8f949a"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${12 + i * 36}" y="16" width="30" height="38" rx="3" fill="#c3c7cc"/><rect x="${12 + i * 36}" y="16" width="14" height="38" rx="3" fill="#dfe2e5"/>`).join("")}`),
      steelJubilee: () => wrap(`<rect x="2" y="8" width="256" height="54" rx="4" fill="#8f949a"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => [0, 1, 2, 3, 4].map(j => `<rect x="${8 + i * 25}" y="${10 + j * 10}" width="${j === 2 ? 22 : 11}" height="9" rx="2" fill="${j === 2 ? "#e2e5e8" : "#c3c7cc"}" transform="translate(${j === 2 ? 0 : (j % 2 ? 5 : 0)} 0)"/>`).join("")).join("")}`),
      steelPresident: () => wrap(`<rect x="2" y="8" width="256" height="54" rx="4" fill="#8f949a"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${8 + i * 31}" y="12" width="26" height="46" rx="13" fill="#c9a45c"/><rect x="${8 + i * 31}" y="12" width="11" height="46" rx="6" fill="#e3c581"/>`).join("")}`),
      mesh: () => wrap(`<defs><pattern id="${a}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#b3b8bd"/><path d="M0 3h6M3 0v6" stroke="#e1e4e7" stroke-width="1"/></pattern></defs><rect x="2" y="10" width="256" height="50" rx="3" fill="url(#${a})"/><rect x="236" y="8" width="22" height="54" fill="#8f949a"/>`),
      rubber: () => wrap(`<rect x="2" y="8" width="256" height="54" rx="14" fill="#1e2a36"/>${Array.from({ length: 22 }, (_, i) => `<rect x="${12 + i * 11}" y="${14}" width="4" height="42" rx="2" fill="#0f1720"/>`).join("")}${[170, 190, 210].map(x => `<circle cx="${x}" cy="35" r="3" fill="#050a10"/>`).join("")}`),
      nato: () => wrap(`<rect x="2" y="8" width="256" height="54" rx="2" fill="#2b4d3a"/><rect x="2" y="26" width="256" height="9" fill="#c9302c"/><rect x="2" y="35" width="256" height="9" fill="#e8e4d6"/>${[30, 215].map(x => `<rect x="${x}" y="4" width="14" height="62" rx="2" fill="none" stroke="#b9bcc0" stroke-width="4"/>`).join("")}`),
      canvas: () => wrap(`<defs><pattern id="${a}" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#2d3237"/><path d="M0 2.5h5M2.5 0v5" stroke="#4a5158" stroke-width="1.5"/></pattern></defs><rect x="2" y="10" width="256" height="50" rx="4" fill="url(#${a})"/><rect x="8" y="16" width="244" height="38" fill="none" stroke="#a7adb4" stroke-width="1.2" stroke-dasharray="4 4"/>`),
      ceramic: () => wrap(`<rect x="2" y="8" width="256" height="54" rx="4" fill="#9aa1a8"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${10 + i * 36}" y="14" width="${i % 2 ? 28 : 30}" height="42" rx="6" fill="${i % 2 ? "#e9ecef" : "#1b1e22"}"/>`).join("")}`)
    };
    return (T[kind] || T.leather)();
  }

  /* lug width diagram */
  function lug() {
    const body = `
      <rect x="95" y="0" width="70" height="50" fill="#3a2a1d"/><rect x="95" y="190" width="70" height="50" fill="#3a2a1d"/>
      <path d="M85 50v40a20 20 0 0 0 0 0M175 50v40" stroke="${G}" stroke-width="0"/>
      <rect x="70" y="52" width="14" height="52" rx="4" fill="#6b5424" stroke="${G}" stroke-width="2"/><rect x="176" y="52" width="14" height="52" rx="4" fill="#6b5424" stroke="${G}" stroke-width="2"/>
      <rect x="70" y="136" width="14" height="52" rx="4" fill="#6b5424" stroke="${G}" stroke-width="2"/><rect x="176" y="136" width="14" height="52" rx="4" fill="#6b5424" stroke="${G}" stroke-width="2"/>
      <circle cx="130" cy="120" r="62" fill="${G}"/><circle cx="130" cy="120" r="54" fill="#12161d"/>
      <line x1="130" y1="120" x2="130" y2="82" stroke="${T}" stroke-width="3" transform="rotate(-55 130 120)"/><line x1="130" y1="120" x2="130" y2="72" stroke="${T}" stroke-width="2" transform="rotate(55 130 120)"/>
      <g stroke="#6fd0ff" stroke-width="2" fill="#6fd0ff"><line x1="84" y1="30" x2="176" y2="30"/><path d="M84 30l8-5v10zM176 30l-8-5v10z"/></g>
      <text x="130" y="22" text-anchor="middle" font-size="13" fill="#6fd0ff" font-family="sans-serif" font-weight="700">lug width (mm)</text>
      <g stroke="#d98a6a" stroke-width="2" fill="#d98a6a"><line x1="206" y1="52" x2="206" y2="188"/><path d="M206 52l-5 8h10zM206 188l-5-8h10z"/></g>
      <text x="212" y="124" font-size="11" fill="#d98a6a" font-family="sans-serif" transform="rotate(90 212 124)" text-anchor="middle">lug-to-lug</text>`;
    return `<div class="lug-fig">${svg("0 0 260 240", body, "Diagram showing how to measure lug width and lug-to-lug length", "lug-svg")}
      <ul class="ticks"><li>Measure <b>between the lugs</b> (blue) with a ruler or calipers. Common sizes: 18, 20, 22 mm.</li><li>A strap that is 1–2 mm narrower than the lug width still fits; a wider one will not.</li><li><b>Lug-to-lug</b> (orange) should not be wider than your wrist.</li><li>Spring bars (the tiny pins inside the lugs) let you swap straps: quick-release bars need no tools.</li></ul></div>`;
  }

  return { anatomy, flow, dial, strap, lug, icon };
})();
