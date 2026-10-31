/* Content for the site. Prices are indicative Indian-market ranges and change often. */

const CATEGORIES = [
  { id: "dress",   label: "Dress",           icon: "◔", desc: "Slim, clean, formal. Made to slide under a cuff." },
  { id: "dive",    label: "Dive",            icon: "◉", desc: "Water-resistant, bold, legible underwater." },
  { id: "field",   label: "Field & Pilot",   icon: "✈", desc: "Tough, readable, no-nonsense tool watches." },
  { id: "chrono",  label: "Chronograph",     icon: "◷", desc: "Built-in stopwatch with sub-dials and pushers." },
  { id: "digital", label: "Digital & Sport", icon: "▦", desc: "LCD, alarms, shock-proof. Cheap and nearly indestructible." },
  { id: "vintage", label: "Vintage",         icon: "❦", desc: "Older pieces with history, patina and character." },
  { id: "luxury",  label: "Luxury",          icon: "♛", desc: "Haute horlogerie, precious materials, heirloom value." },
  { id: "smart",   label: "Smart",           icon: "⌚", desc: "Fitness, notifications, payments on your wrist." },
  { id: "budget",  label: "Budget",          icon: "₹", desc: "Great watches under about ₹5,000." }
];

const MOVEMENT_FILTERS = [
  { id: "quartz", label: "Quartz" },
  { id: "automatic", label: "Automatic" },
  { id: "hand", label: "Hand-wound" },
  { id: "solar", label: "Solar" },
  { id: "spring", label: "Spring Drive" },
  { id: "digital", label: "Digital" },
  { id: "smart", label: "Smart" }
];

const TIERS = {
  1: "Under ₹5,000",
  2: "₹5,000 – ₹25,000",
  3: "₹25,000 – ₹1 lakh",
  4: "₹1 – ₹10 lakh",
  5: "₹10 lakh +"
};

/* kind: analog | chrono | digital | dive | rect   dial/case/hand: hex colours for the generated illustration */
const WATCHES = [
  { n: "Casio F-91W", b: "Casio", c: ["digital", "budget"], m: "digital", y: "1989", s: "35 mm", t: 1, p: "≈ ₹1,500",
    d: "The most-produced digital watch ever. Alarm, stopwatch, daily chime, 7-year battery. A design that has not needed changing in 30+ years.",
    kind: "digital", dial: "#b9c4a8", cs: "#1d1d1d", q: "Casio F-91W" },
  { n: "Casio G-Shock DW-5600", b: "Casio", c: ["digital"], m: "digital", y: "1987 design", s: "42.8 mm", t: 2, p: "₹7,000 – ₹10,000",
    d: "The square G-Shock: shock resistant, 200 m water resistant, and the template for every rugged digital that followed.",
    kind: "digital", dial: "#aab59a", cs: "#242424", q: "Casio G-Shock DW-5600" },
  { n: "Timex Weekender", b: "Timex", c: ["field", "budget"], m: "quartz", y: "Modern classic", s: "38–40 mm", t: 1, p: "₹3,000 – ₹5,000",
    d: "A simple field-style watch on a swappable NATO strap. Indiglo night light. An easy first watch.",
    kind: "analog", dial: "#efe9d8", cs: "#9a9a9a", hand: "#222", q: "Timex Weekender" },
  { n: "Titan Edge", b: "Titan", c: ["dress"], m: "quartz", y: "Modern", s: "≈ 40 mm", t: 2, p: "₹10,000 – ₹35,000",
    d: "India's ultra-slim quartz dress watch. Minimal dial, thin case, and easy to service at any Titan centre.",
    kind: "analog", dial: "#1c2733", cs: "#c8ccd1", hand: "#e8e8e8", q: "Titan Edge" },
  { n: "HMT Janata", b: "HMT", c: ["vintage", "budget"], m: "hand", y: "1960s onward", s: "≈ 35 mm", t: 1, p: "₹2,000 – ₹8,000 (pre-owned / old stock)",
    d: "India's people's watch. A simple hand-wound mechanical with Citizen-derived technology. Original ones are now collectible.",
    kind: "analog", dial: "#f1ece0", cs: "#b9bcc0", hand: "#1d1d1d", q: "HMT Janata" },
  { n: "Seiko 5 SNK809", b: "Seiko", c: ["field"], m: "automatic", y: "2000s onward", s: "37 mm", t: 2, p: "₹10,000 – ₹16,000",
    d: "A legendary entry-level automatic. Day-date, hacking, hand-winding and a rugged 37 mm field look.",
    kind: "analog", dial: "#2b3a4a", cs: "#a8adb2", hand: "#f2f2f2", q: "Seiko 5 SNK809" },
  { n: "Orient Bambino", b: "Orient", c: ["dress"], m: "automatic", y: "2000s onward", s: "40.5 mm", t: 2, p: "₹17,000 – ₹30,000",
    d: "A domed crystal, a dress dial and an in-house automatic movement for the price of a mid-range quartz.",
    kind: "analog", dial: "#f4efe4", cs: "#c9cdd2", hand: "#223", q: "Orient Bambino" },
  { n: "Seiko Presage Cocktail Time", b: "Seiko", c: ["dress"], m: "automatic", y: "2016 onward", s: "40.5 mm", t: 3, p: "₹35,000 – ₹60,000",
    d: "A sunburst dial that changes colour in the light. Japanese craft and finish for a modest price.",
    kind: "analog", dial: "#2a4d8f", cs: "#c9cdd2", hand: "#eee", q: "Seiko Presage Cocktail Time" },
  { n: "Tissot PRX", b: "Tissot", c: ["dress"], m: "automatic", y: "1978 design, 2021 revival", s: "35 / 40 mm", t: 3, p: "₹35,000 – ₹75,000",
    d: "Integrated-bracelet 1970s style at an affordable price. Comes as quartz or Powermatic 80 automatic.",
    kind: "analog", dial: "#2f6b64", cs: "#c4c8cc", hand: "#eee", q: "Tissot PRX" },
  { n: "Hamilton Khaki Field Mechanical", b: "Hamilton", c: ["field"], m: "hand", y: "Military heritage", s: "38 mm", t: 3, p: "₹50,000 – ₹75,000",
    d: "A hand-wound field watch with a military look and an 80-hour power reserve.",
    kind: "analog", dial: "#1f2a22", cs: "#a9adb1", hand: "#eee", q: "Hamilton Khaki Field Mechanical" },
  { n: "Citizen Promaster Diver (Eco-Drive)", b: "Citizen", c: ["dive"], m: "solar", y: "Modern", s: "≈ 44 mm", t: 2, p: "₹20,000 – ₹40,000",
    d: "A 200 m diver powered by light. No battery changes and a lot of watch for the money.",
    kind: "dive", dial: "#0f1a2b", cs: "#1d1d1d", hand: "#f2f2f2", q: "Citizen Promaster Diver Eco-Drive" },
  { n: "Apple Watch", b: "Apple", c: ["smart"], m: "smart", y: "2015 onward", s: "41–49 mm", t: 3, p: "₹30,000 – ₹90,000",
    d: "Health tracking, notifications, payments and GPS. Needs charging every 1–2 days.",
    kind: "rect", dial: "#050505", cs: "#8d8d92", q: "Apple Watch" },
  { n: "Tudor Black Bay 58", b: "Tudor", c: ["dive", "luxury"], m: "automatic", y: "2018", s: "39 mm", t: 4, p: "₹3.5 – 4.5 lakh",
    d: "Vintage-style diver with an in-house movement. Much of the Rolex DNA at a fraction of the price.",
    kind: "dive", dial: "#0b0b0b", cs: "#b8bcc1", hand: "#f2f2f2", q: "Tudor Black Bay 58" },
  { n: "Omega Seamaster Diver 300M", b: "Omega", c: ["dive", "luxury"], m: "automatic", y: "1993 onward", s: "42 mm", t: 4, p: "₹5 – 7.5 lakh",
    d: "Wave-pattern dial, helium escape valve, Co-Axial Master Chronometer movement. A James Bond watch.",
    kind: "dive", dial: "#12306b", cs: "#c3c7cc", hand: "#f2f2f2", q: "Omega Seamaster Diver 300M" },
  { n: "Omega Speedmaster Professional", b: "Omega", c: ["chrono", "luxury"], m: "hand", y: "1957 / NASA 1965", s: "42 mm", t: 4, p: "₹6.5 – 8.5 lakh",
    d: "The Moonwatch. Hand-wound chronograph that went to the Moon. Hesalite or sapphire crystal.",
    kind: "chrono", dial: "#0c0c0c", cs: "#bfc3c8", hand: "#f2f2f2", q: "Omega Speedmaster Professional Moonwatch" },
  { n: "Breitling Navitimer", b: "Breitling", c: ["field", "chrono", "luxury"], m: "automatic", y: "1952", s: "41 / 43 mm", t: 4, p: "₹6 – 10 lakh",
    d: "The pilot's chronograph. Its slide-rule bezel does flight calculations without electronics.",
    kind: "chrono", dial: "#14223a", cs: "#c3c7cc", hand: "#f2f2f2", q: "Breitling Navitimer" },
  { n: "Zenith Chronomaster Original", b: "Zenith", c: ["chrono", "luxury"], m: "automatic", y: "1969 heritage", s: "38 mm", t: 4, p: "₹7 – 10 lakh",
    d: "Houses the El Primero, one of the first automatic chronograph calibres. It beats at 36,000 vph, so the second hand sweeps very smoothly.",
    kind: "chrono", dial: "#d7d9dc", cs: "#c3c7cc", hand: "#16263f", q: "Zenith Chronomaster Original" },
  { n: "Grand Seiko Snowflake (Spring Drive)", b: "Grand Seiko", c: ["dress", "luxury"], m: "spring", y: "2005 onward", s: "41 mm", t: 4, p: "₹8 – 12 lakh",
    d: "A textured white dial that looks like fresh snow, a glide-sweep second hand and a 72-hour power reserve. Famous for its Zaratsu polishing.",
    kind: "analog", dial: "#eef1f3", cs: "#c8ccd0", hand: "#2a4a8a", q: "Grand Seiko Snowflake Spring Drive" },
  { n: "Rolex Submariner", b: "Rolex", c: ["dive", "luxury"], m: "automatic", y: "1953", s: "41 mm", t: 5, p: "₹10 lakh + (waitlists, grey-market premiums)",
    d: "The reference diver. A design unchanged for decades, with tough 904L steel and a strong resale record.",
    kind: "dive", dial: "#0b0b0b", cs: "#c0c4c9", hand: "#f2f2f2", q: "Rolex Submariner" },
  { n: "Rolex GMT-Master II", b: "Rolex", c: ["field", "luxury"], m: "automatic", y: "1954", s: "40 mm", t: 5, p: "₹13 lakh +",
    d: "Made for Pan Am pilots. A fourth hand tracks a second time zone against a 24-hour bezel.",
    kind: "dive", dial: "#0b0b0b", cs: "#c0c4c9", hand: "#f2f2f2", q: "Rolex GMT-Master II" },
  { n: "Cartier Tank", b: "Cartier", c: ["dress", "luxury"], m: "quartz", y: "1917 design", s: "Rectangular", t: 4, p: "₹3 lakh +",
    d: "Inspired by the WW1 Renault tank. A rectangular case, Roman numerals and a blue cabochon crown. A design classic.",
    kind: "rect", dial: "#f5f1e6", cs: "#d9b86a", hand: "#223", q: "Cartier Tank" },
  { n: "Jaeger-LeCoultre Reverso", b: "Jaeger-LeCoultre", c: ["dress", "luxury"], m: "hand", y: "1931", s: "Rectangular", t: 4, p: "₹6 lakh +",
    d: "A case that flips over on its sled to protect the crystal. Created for polo players, now an Art Deco icon.",
    kind: "rect", dial: "#e9e6de", cs: "#c3c7cc", hand: "#223", q: "Jaeger-LeCoultre Reverso" },
  { n: "Audemars Piguet Royal Oak", b: "Audemars Piguet", c: ["luxury"], m: "automatic", y: "1972", s: "37 / 41 mm", t: 5, p: "₹30 lakh +",
    d: "Gérald Genta's octagonal-bezel luxury steel sports watch, which changed the industry. Hand-finished tapisserie dial.",
    kind: "analog", dial: "#1a2c4a", cs: "#c4c8cd", hand: "#eee", q: "Audemars Piguet Royal Oak" },
  { n: "Patek Philippe Calatrava", b: "Patek Philippe", c: ["dress", "luxury"], m: "automatic", y: "1932", s: "39 mm", t: 5, p: "₹20 lakh +",
    d: "Bauhaus-inspired round dress watch. Understated, refined and passed down as an heirloom.",
    kind: "analog", dial: "#f1ece0", cs: "#d6b46a", hand: "#222", q: "Patek Philippe Calatrava" },
  { n: "Seiko Quartz Astron (35SQ)", b: "Seiko", c: ["vintage"], m: "quartz", y: "1969", s: "≈ 36 mm", t: 4, p: "Collector market only",
    d: "The world's first quartz wristwatch, released in Tokyo on Christmas Day 1969. It triggered the 'quartz crisis' in Swiss watchmaking.",
    kind: "analog", dial: "#d8d8d4", cs: "#d9b86a", hand: "#222", q: "Seiko Quartz Astron 35SQ vintage" }
];

const MOVEMENTS = [
  { id: "quartz", name: "Quartz", tag: "Battery · precise · low-maintenance",
    how: "A battery sends current through a tiny quartz crystal, which vibrates 32,768 times a second. A circuit counts the vibrations and steps the motor, which gives the signature one-second tick.",
    acc: "≈ ±15 s / month", power: "Battery, 2–10 years", service: "Battery change; movement is often replaced rather than repaired",
    pros: "Accurate, cheap, thin, durable, great for beginners", cons: "Less 'soul'; usually not repaired when it fails" },
  { id: "hand", name: "Hand-wound mechanical", tag: "Crown-wound · classic · romantic",
    how: "You wind the crown to tighten a mainspring. It releases energy through gears and an escapement, and a balance wheel regulates the beat.",
    acc: "≈ ±10–30 s / day (basic)", power: "Mainspring, 36–80 h", service: "Every 5–7 years",
    pros: "Thin cases, see-through backs, ritual of winding. Examples: HMT Kohinoor, Speedmaster", cons: "Needs winding every day or two; less accurate than quartz" },
  { id: "automatic", name: "Automatic (self-winding)", tag: "Wrist-powered · mainstream mechanical",
    how: "A mechanical movement plus a semicircular rotor that spins with wrist movement and winds the mainspring. Many can still be hand-wound.",
    acc: "≈ ±10–25 s / day (entry); COSC −4/+6 s / day", power: "Mainspring, 38–80 h (often 40–70)", service: "Every 5–8 years",
    pros: "No battery, rewards daily wear, huge variety", cons: "Thicker than hand-wound; stops if unworn for 2–3 days" },
  { id: "solar", name: "Solar / Light-powered", tag: "Quartz that charges from light",
    how: "A solar cell under the dial charges a rechargeable cell that runs a quartz movement. Examples: Citizen Eco-Drive, Casio Tough Solar.",
    acc: "Same as quartz", power: "Months to years in the dark when charged", service: "Cell replacement after ~10+ years",
    pros: "No battery changes; practical and low-maintenance", cons: "Needs regular light exposure" },
  { id: "spring", name: "Spring Drive", tag: "Seiko-only hybrid",
    how: "A mainspring supplies power like a mechanical watch, but a quartz-regulated electromagnetic brake (the 'tri-synchro regulator') controls speed. The second hand glides without ticking.",
    acc: "≈ ±1 s / day (about ±15 s / month)", power: "Mainspring, up to 72 h", service: "Every 3–5 years at Seiko",
    pros: "Mechanical feel, near-quartz accuracy, smooth sweep", cons: "Only on Grand Seiko / some Seiko models; expensive" },
  { id: "digital", name: "Digital / Ana-Digi (LCD)", tag: "Casio-style · feature-packed",
    how: "A quartz module drives an LCD, or both an analog dial and an LCD (ana-digi). It runs alarms, timers, world time and backlight.",
    acc: "≈ ±15–30 s / month", power: "Battery, 2–10 years (Casio quotes up to 10)", service: "Battery change",
    pros: "Cheap, tough, many functions", cons: "Less formal; plastic cases and straps wear out" },
  { id: "smart", name: "Smartwatch", tag: "Connected computer on the wrist",
    how: "A full computer with sensors, touchscreen and apps, kept in sync with your phone.",
    acc: "Syncs time from network/GPS", power: "Rechargeable, 1 day to several weeks", service: "Battery degrades in 2–4 years",
    pros: "Health and fitness data, convenience", cons: "Frequent charging; becomes obsolete faster" }
];

const DIALS = [
  { n: "Sunburst", d: "Fine brushing radiates from the centre, so the dial shimmers and changes tone as it catches light. Seen on dress watches like the Seiko Presage." },
  { n: "Guilloché", d: "Machine-engraved geometric patterns (waves, basket-weave, concentric circles). The centre of your HMT Plus has a fine pattern of this kind." },
  { n: "Tapisserie", d: "Tiny raised squares across the dial, made famous on the Audemars Piguet Royal Oak." },
  { n: "Enamel (Grand Feu)", d: "Powdered glass fired at 800 °C+. Glossy, long-lasting and extremely hard to make, so it's found on top-end pieces." },
  { n: "Sector", d: "Concentric rings and a scale divided into sections, like a sector or protractor. Common on 1920s–30s Art Deco and vintage watches." },
  { n: "Panda / Reverse panda", d: "White dial with black sub-dials, or the reverse. This high-contrast layout is very popular on chronographs." },
  { n: "Skeleton / Open-worked", d: "The dial is cut away so you can see the gears. It's often visible on a see-through case back too." },
  { n: "Tropical", d: "Black dials that faded to brown with age and sunlight. They are valued by vintage collectors." },
  { n: "Meteorite / Mother-of-pearl", d: "Natural materials used for unique patterns; no two dials look the same." },
  { n: "Luminous (lume)", d: "Paint that glows in the dark: older radium (dangerous, no longer used), then tritium, now Super-LumiNova. Patina on old lume is prized." },
  { n: "Day-date window", d: "Windows for day and date. Your vintage day-date watch has one, with a Saturday/9 readout." },
  { n: "Digital LCD", d: "Liquid crystal display for time and functions. Casio dials mix analog hands and LCD, like your World Time watch." }
];

const COMPLICATIONS = [
  { n: "Date / Day-date", d: "Shows the date, and in a day-date, the weekday too. The most common complication." },
  { n: "Chronograph", d: "A stopwatch with pushers and sub-dials. Don't confuse it with 'chronometer', which means certified accuracy." },
  { n: "GMT / Dual time", d: "A second time zone, usually through an extra 24-hour hand. Useful for travellers (Rolex GMT-Master II, Carlington dual time)." },
  { n: "World time", d: "Shows many time zones at once, with a city ring or digital cities. Your Casio World Time has this." },
  { n: "Alarm / Countdown timer", d: "Mechanical or digital alarms, and countdown timers for cooking, sports or diving. Seen on your Casio." },
  { n: "Moon phase", d: "A small disc shows the current phase of the moon. It's elegant and doesn't strictly need any maths." },
  { n: "Power reserve indicator", d: "Shows how much wind is left in the mainspring on mechanical watches." },
  { n: "Perpetual calendar", d: "Knows month lengths and leap years, so it only needs correcting in 2100." },
  { n: "Tourbillon", d: "A rotating cage that averages out gravity's effect on the escapement. It's more art than necessity, and costs a fortune." },
  { n: "Minute repeater", d: "Chimes the time on tiny gongs. One of the most difficult complications." }
];

const STRAPS = [
  { n: "Leather", d: "Dressy, comfortable, ages with you. Avoid water and sweat. Replace every 1–3 years.", good: "Dress, vintage, everyday office" },
  { n: "Stainless-steel bracelet", d: "Durable and water-safe. Types: Oyster (3-link, sporty), Jubilee (5-link, dressy), President (3-link, rounded), Milanese mesh (soft).", good: "All-rounder; sport and tool watches" },
  { n: "Rubber / Silicone", d: "Waterproof, light and sweat-proof, but can attract lint. Like the Casio and Carlington straps.", good: "Dive, sport, beach, gym" },
  { n: "NATO / Zulu", d: "Woven nylon that threads under the watch, so if a spring bar breaks the watch stays on your wrist. Cheap and endlessly swappable.", good: "Field and casual watches" },
  { n: "Canvas / Fabric", d: "Casual, breathable, easy on the budget. Good for summers.", good: "Casual, field" },
  { n: "Ceramic / Titanium links", d: "Scratch-resistant (ceramic) or light and hypoallergenic (titanium). It is mostly found on premium watches.", good: "Premium sports watches" }
];

const GLOSSARY = [
  ["Lug width", "Distance between the lugs, in mm. It decides which straps fit (commonly 18, 20, 22 mm)."],
  ["Crown", "The knob on the side used to set the time or wind the watch."],
  ["Bezel", "The ring around the crystal. It can rotate (dive timer) or be fixed (decorative)."],
  ["Crystal", "The glass over the dial: acrylic/Hesalite (cheap, scratches buff out), mineral (common), sapphire (very scratch-resistant)."],
  ["Case back", "The back of the watch. 'Exhibition' backs let you see the movement; 'screw-down' ones help water resistance."],
  ["Jewels", "Synthetic rubies used as low-friction bearings in mechanical movements. 17 jewels is typical (e.g. HMT Kohinoor)."],
  ["Beats per hour (vph)", "How fast the balance wheel oscillates. 21,600 and 28,800 are common; higher = smoother sweep."],
  ["Hacking", "The second hand stops when you pull out the crown so you can sync to an exact time."],
  ["Chronometer", "A watch whose movement has passed an official accuracy test (e.g. COSC). Not a stopwatch."],
  ["Power reserve", "How long a mechanical watch runs when fully wound and not worn."],
  ["Patina", "Natural ageing of the dial, lume and case. Collectors often prize it, but damage is different."],
  ["Water resistance (WR)", "30 m: splashes only. 50 m: light swimming. 100 m: swimming and snorkelling. 200 m+: diving. The metres are a lab test pressure, not a safe depth."],
  ["Spring bar", "The small rod that holds a strap between the lugs."],
  ["Servicing", "Cleaning, oiling and regulating a mechanical movement every 5–7 years."],
  ["Franken-watch", "A vintage piece assembled from parts of different watches. Check authenticity."],
  ["Redial", "A dial that has been repainted. It's often worth much less to collectors than an original."]
];

/* Your own watches, from your photos */
const MY_WATCHES = [
  { n: "HMT Kohinoor", img: "hmt-kohinoor.jpg", type: "Dress · Vintage-style", mv: "Hand-wound mechanical", cats: ["dress", "vintage"],
    d: "Navy dial, 17 jewels, 'Para Shock', polished tonneau-style case and a navy leather strap. The most 'classic' watch in your box." },
  { n: "HMT Plus Quartz", img: "hmt-plus.jpg", type: "Dress", mv: "Quartz", cats: ["dress"],
    d: "White dial with Roman numerals, a guilloché-style centre, blue steel hands and a tan leather strap. A strong everyday dress watch." },
  { n: "Vintage day-date (HMT-style)", img: "vintage-day-date.jpg", type: "Vintage · Project piece", mv: "Mechanical, likely automatic", cats: ["vintage"],
    d: "Hexagonal case, gold baton markers and a SAT 9 day-date window. The crystal is cracked and the dial is aged: a good restoration candidate. Check the case back for model and movement." },
  { n: "HMT Soumya", img: "hmt-soumya.jpg", type: "Vintage · Ladies", mv: "Mechanical (likely hand-wound)", cats: ["vintage"],
    d: "Gold-tone ladies' bracelet watch with dot markers. The plating shows wear, which is common on old gold-plated cases. It is a keepsake and a good candidate for polishing or re-plating." },
  { n: "VK Collection", img: "vk-collection.jpg", type: "Fashion", mv: "Quartz", cats: ["budget"],
    d: "Blue-reflective crystal with a months sub-dial ring and a black fabric strap. Dramatic looks for the price." },
  { n: "Texovera Multi-dial", img: "texovera.jpg", type: "Fashion · Bracelet", mv: "Quartz", cats: ["budget"],
    d: "All-black steel bracelet with three sub-dials and a luminous-marker dial. Many multi-dial fashion watches have decorative sub-dials, so check which ones work." },
  { n: "Titan × Tata Motors 50 Lakh Cars", img: "titan-tata.jpg", type: "Commemorative · Dress", mv: "Quartz", cats: ["dress"],
    d: "A limited-theme Titan made for Tata Motors' 50 lakh car milestone: black dial, chequered-flag emblem and a red seconds hand. It's a nice corporate-history piece." },
  { n: "Carlington Dual Time", img: "carlington.jpg", type: "Sport · Ana-Digi", mv: "Quartz (analog + digital)", cats: ["digital"],
    d: "Olive silicone strap, analog hands plus LCD windows for week, date and a second time. Big, bold and ready for outdoor use." },
  { n: "Sonata Green Dial", img: "sonata-green.jpg", type: "Dress", mv: "Quartz", cats: ["dress"],
    d: "Rose-gold-tone case, a deep green dial and brown croc-embossed leather. Green dials are very fashionable right now." },
  { n: "Casio World Time (analog-digital)", img: "casio-world-time.jpg", type: "Sport · Ana-Digi", mv: "Quartz (analog + digital)", cats: ["digital"],
    d: "WR 100 m, 3 alarms, countdown timer, world time and a '10 year battery' badge. It looks like the AEQ-120W family, but check the case back to confirm the model." }
];

const STORES = [
  { n: "Titan World (and Sonata, Fastrack)", u: "https://www.titan.co.in", d: "Wide range of Indian watches with a nationwide service network. Best for first and everyday watches.", tag: "New · India" },
  { n: "HMT Watches", u: "https://www.hmtwatches.in", d: "The classic Indian brand. HMT-branded watches are still sold, and original vintage HMTs are traded pre-owned.", tag: "New & vintage · India" },
  { n: "Casio India", u: "https://www.casio.com/in", d: "Official store for Casio, G-Shock and Edifice. Check the model code against the case back.", tag: "New · official" },
  { n: "Seiko", u: "https://www.seikowatches.com", d: "Find Seiko, Presage and Grand Seiko, plus authorized-dealer locator.", tag: "New · official" },
  { n: "Ethos Watch Boutiques", u: "https://www.ethoswatches.com", d: "Multi-brand Indian retailer of Swiss luxury and premium watches, with authorized stock.", tag: "New · luxury" },
  { n: "Chrono24", u: "https://www.chrono24.com", d: "Global marketplace for new and pre-owned watches. Look at seller ratings and use buyer protection.", tag: "Pre-owned · global" },
  { n: "Amazon India / Flipkart", u: "https://www.amazon.in/s?k=watches", d: "Fine for budget and fashion watches. Buy from the brand's official storefront.", tag: "New · budget" }
];

const CHECKLIST = [
  "Decide the budget, including a few thousand rupees for a strap or servicing",
  "Pick the use: office, sport, travel, everyday, collecting",
  "Measure your wrist and choose a case size (use the sizing tool above)",
  "Choose a movement: quartz (easy), automatic (mechanical), solar (low-maintenance)",
  "Check water resistance fits your use (30 m means splashes only)",
  "Check the lug width, so you can change straps later",
  "Buy from an authorized dealer or reputable seller with returns",
  "Keep the box, papers, invoice and warranty card",
  "For pre-owned: ask for the case back, movement and service photos",
  "For vintage: check the crown, hands, lume, crystal and any dial damage"
];

const RED_FLAGS = [
  "Price far below the market for a luxury model",
  "Seller won't send case back, movement or serial-number photos",
  "Misaligned text on the dial, a smoothly sweeping hand on a model that should tick (or the reverse)",
  "No warranty or return policy, or 'no returns, all sales final'",
  "Date magnifier ('cyclops') that is weak or off-centre; fuzzy engravings",
  "The watch weighs noticeably less than expected for solid steel",
  "Mismatched case back, bracelet and dial on a vintage piece (a possible Franken-watch)"
];
