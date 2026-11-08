"use strict"; // strict mode catches common mistakes

/* =====================================================
   1. DEMO DATA (edit here). All prices are in INR and
   are DEMO ESTIMATES, not live prices. FPS is not real.
   Syllabus: constants, numbers, strings, arrays, objects
   ===================================================== */
const MIN_BUDGET = 41000;   // number: smallest supported budget
const MAX_BUDGET = 500000; // number: largest supported budget

// CATALOG: many options for every part type, cheapest first.
// score = demo speed rating (1-10), socket / ramType = compatibility tags, watts = power need or supply.
const CATALOG = {
  "CPU": [
    { name: "AMD Ryzen 5 5500", specs: "6 cores / 12 threads, AM4", price: 9500, score: 3, socket: "AM4", watts: 65 },
    { name: "AMD Ryzen 5 5600", specs: "6 cores / 12 threads, AM4", price: 11500, score: 4, socket: "AM4", watts: 65 },
    { name: "AMD Ryzen 5 7500F", specs: "6 cores / 12 threads, AM5", price: 14500, score: 5, socket: "AM5", watts: 65 },
    { name: "AMD Ryzen 5 7600", specs: "6 cores / 12 threads, AM5", price: 17500, score: 5.5, socket: "AM5", watts: 65 },
    { name: "AMD Ryzen 7 7700", specs: "8 cores / 16 threads, AM5", price: 24000, score: 6.5, socket: "AM5", watts: 65 },
    { name: "AMD Ryzen 7 7800X3D", specs: "8 cores, 3D V-Cache, AM5", price: 36000, score: 8.5, socket: "AM5", watts: 120 },
    { name: "AMD Ryzen 9 9950X", specs: "16 cores / 32 threads, AM5", price: 55000, score: 10, socket: "AM5", watts: 170 }
  ],
  "GPU": [
    { name: "NVIDIA GeForce RTX 3050 6GB", specs: "6 GB GDDR6, entry 1080p", price: 14500, score: 2.5, watts: 130 },
    { name: "AMD Radeon RX 6600 8GB", specs: "8 GB GDDR6, solid 1080p", price: 18500, score: 3.5, watts: 132 },
    { name: "NVIDIA GeForce RTX 4060 8GB", specs: "8 GB GDDR6, DLSS 3", price: 29500, score: 5, watts: 115 },
    { name: "AMD Radeon RX 7700 XT 12GB", specs: "12 GB GDDR6, 1440p ready", price: 38000, score: 6.5, watts: 245 },
    { name: "NVIDIA GeForce RTX 4070 Super 12GB", specs: "12 GB GDDR6X, strong 1440p", price: 58000, score: 8, watts: 220 },
    { name: "NVIDIA GeForce RTX 4080 Super 16GB", specs: "16 GB GDDR6X, 4K gaming", price: 98000, score: 9.5, watts: 320 },
    { name: "NVIDIA GeForce RTX 4090 24GB", specs: "24 GB GDDR6X, enthusiast 4K", price: 185000, score: 10, watts: 450 }
  ],
  "Motherboard": [
    { name: "B450M micro-ATX", specs: "AM4, DDR4, M.2 slot", price: 5500, socket: "AM4", ramType: "DDR4" },
    { name: "B550M micro-ATX", specs: "AM4, DDR4, PCIe 4.0", price: 8500, socket: "AM4", ramType: "DDR4" },
    { name: "B650M micro-ATX", specs: "AM5, DDR5, PCIe 4.0", price: 10500, socket: "AM5", ramType: "DDR5" },
    { name: "B650E ATX WiFi", specs: "AM5, DDR5, PCIe 5.0, WiFi 6E", price: 14000, socket: "AM5", ramType: "DDR5" },
    { name: "X670E ATX WiFi", specs: "AM5, DDR5, premium VRM", price: 24000, socket: "AM5", ramType: "DDR5" }
  ],
  "RAM": [
    { name: "16 GB DDR4-3200 (2x8)", specs: "Dual channel, CL16", price: 3000, ramType: "DDR4" },
    { name: "32 GB DDR4-3600 (2x16)", specs: "Dual channel, CL18", price: 5500, ramType: "DDR4" },
    { name: "16 GB DDR5-5600 (2x8)", specs: "Dual channel, CL36", price: 4500, ramType: "DDR5" },
    { name: "32 GB DDR5-6000 (2x16)", specs: "Dual channel, CL30", price: 8500, ramType: "DDR5" },
    { name: "64 GB DDR5-6000 (2x32)", specs: "Dual channel, CL30", price: 17000, ramType: "DDR5" }
  ],
  "Storage": [
    { name: "500 GB NVMe SSD", specs: "Up to 3,000 MB/s read", price: 3000 },
    { name: "1 TB NVMe SSD", specs: "Up to 5,000 MB/s read", price: 5500 },
    { name: "1 TB Gen4 NVMe SSD", specs: "Up to 7,000 MB/s read", price: 7000 },
    { name: "2 TB Gen4 NVMe SSD", specs: "Up to 7,400 MB/s read", price: 12500 },
    { name: "4 TB Gen4 NVMe SSD", specs: "Up to 7,400 MB/s read", price: 28000 }
  ],
  "Power Supply": [
    { name: "550 W 80+ Bronze", specs: "Non-modular", price: 3000, watts: 550 },
    { name: "650 W 80+ Bronze", specs: "Semi-modular", price: 4500, watts: 650 },
    { name: "750 W 80+ Gold", specs: "Fully modular", price: 6000, watts: 750 },
    { name: "850 W 80+ Gold", specs: "Fully modular, ATX 3.0", price: 9000, watts: 850 },
    { name: "1000 W 80+ Platinum", specs: "Fully modular, ATX 3.0", price: 14000, watts: 1000 }
  ],
  "Cabinet": [
    { name: "Mesh ATX mid tower", specs: "2 RGB fans", price: 2200 },
    { name: "Airflow ATX mid tower", specs: "3 ARGB fans, glass panel", price: 3500 },
    { name: "Premium ATX full glass", specs: "4 ARGB fans, dust filters", price: 4500 },
    { name: "Dual-chamber ATX tower", specs: "Dual-chamber, 6 fans", price: 7500 },
    { name: "Full tower aluminium", specs: "Liquid-cooling ready, 360 mm radiator", price: 12000 }
  ]
};

// Order the parts appear in, and the share of the budget each part aims for (first guess).
const PART_TYPES = ["CPU", "GPU", "Motherboard", "RAM", "Storage", "Power Supply", "Cabinet"];
const SHARE = { "CPU": 0.18, "GPU": 0.38, "Motherboard": 0.11, "RAM": 0.08, "Storage": 0.09, "Power Supply": 0.07, "Cabinet": 0.05 };

// Demo FPS formula: fps = effective score x perScore, limited by cap.
const GAMES = [
  { game: "Valorant", perScore: 60, cap: 500 },
  { game: "GTA V", perScore: 28, cap: 300 },
  { game: "Cyberpunk 2077", perScore: 13, cap: 140 }
];

// Real Indian online stores. "searchUrl" + the product name = a search page for that part.
// Prices stay DEMO estimates ("adjust" = rupees added or removed from the base price).
const STORES = [
  { name: "Amazon.in", searchUrl: "https://www.amazon.in/s?k=",
    adjust: { CPU: 0, GPU: 500, RAM: -200, Storage: 100 } },
  { name: "Flipkart", searchUrl: "https://www.flipkart.com/search?q=",
    adjust: { CPU: -300, GPU: 900, RAM: 0, Storage: -150 } },
  { name: "Vedant Computers", searchUrl: "https://www.vedantcomputers.com/index.php?route=product/search&search=",
    adjust: { CPU: 250, GPU: -600, RAM: 150, Storage: 0 } }
];
const STORE_PARTS = ["CPU", "GPU", "RAM", "Storage"]; // parts compared in the table

// Simple SVG icon paths (24x24 box), one per component type
const ICONS = {
  "CPU": "M6 6h12v12H6z M9 9h6v6H9z M9 3v3 M15 3v3 M9 18v3 M15 18v3 M3 9h3 M3 15h3 M18 9h3 M18 15h3",
  "GPU": "M2 7h20v8H2z M8 11a2.5 2.5 0 1 0 .01 0 M17 11h2 M4 15v3",
  "Motherboard": "M4 4h16v16H4z M7 7h5v5H7z M15 7h2 M15 11h2 M7 16h10",
  "RAM": "M2 8h20v7H2z M6 8v7 M10 8v7 M14 8v7 M18 8v7 M5 15v3 M12 15v3 M19 15v3",
  "Storage": "M4 4h16v16H4z M12 15a3 3 0 1 0 .01 0 M7 7h2",
  "Power Supply": "M3 6h18v12H3z M13 8l-3 4h4l-3 4",
  "Cabinet": "M7 3h10v18H7z M10 7h4 M12 17h.01"
};

/* =====================================================
   2. PAGE ELEMENTS (const: reference never changes)
   ===================================================== */
const $ = (id) => document.getElementById(id); // short helper function
const form = $("budgetForm"), input = $("budget"), errorBox = $("budgetError");
const statusMsg = $("statusMsg"), barEl = $("usageBar");

/* =====================================================
   3. HELPER FUNCTIONS
   ===================================================== */
// Build one element safely. textContent never runs HTML, so user text cannot inject code.
function el(tag, className, text) {
  const node = document.createElement(tag); // local scope: node exists only inside this function
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Format a number as Indian rupees, for example 75000 -> "₹75,000"
function formatINR(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// Make an inline SVG icon with createElementNS (SVG needs its own namespace)
function makeIcon(type) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.6");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", ICONS[type] || ICONS["CPU"]);
  svg.appendChild(path);
  return svg;
}

// Validate the budget. Returns an object: { ok: boolean, value: number, message: string }
function validateBudget() {
  const raw = input.value.trim(); // string
  if (input.validity.badInput) return { ok: false, message: "That is not a valid number. Use digits only, like 75000." };
  if (raw === "") return { ok: false, message: "Please enter your budget in rupees." };
  const value = Math.floor(Number(raw)); // convert string -> number
  if (!Number.isFinite(value)) return { ok: false, message: "Please enter a valid number." };
  if (value <= 0) return { ok: false, message: "Budget must be more than ₹0." };
  if (value < MIN_BUDGET) {
    return { ok: false, message: "Budget too low. A basic gaming PC in this demo needs at least " + formatINR(MIN_BUDGET) + "." };
  }
  if (value > MAX_BUDGET) return { ok: false, message: "This demo supports budgets up to " + formatINR(MAX_BUDGET) + "." };
  return { ok: true, value: value, message: "" };
}

// ---- AUTOMATIC BUILD GENERATOR ----
// Compatibility rules: CPU socket = motherboard socket, motherboard RAM type = RAM type.
function isCompatible(sel) {
  return sel["CPU"].socket === sel["Motherboard"].socket && sel["Motherboard"].ramType === sel["RAM"].ramType;
}
// Best (most expensive) option that still fits the limit; falls back to the cheapest one.
function bestUnder(options, limit) {
  const fits = options.filter((o) => o.price <= limit);
  return fits.length ? fits[fits.length - 1] : options[0];
}
// Make sure the PSU can power the CPU + GPU + 150 W for the rest. If not, pick the cheapest PSU that can.
function fixPsu(sel) {
  const need = sel["CPU"].watts + sel["GPU"].watts + 150;
  if (sel["Power Supply"].watts >= need) return sel;
  const ok = CATALOG["Power Supply"].find((p) => p.watts >= need) || CATALOG["Power Supply"][CATALOG["Power Supply"].length - 1];
  return { ...sel, "Power Supply": ok };
}
function sumOf(sel) {
  return PART_TYPES.reduce((sum, t) => sum + sel[t].price, 0);
}
// Demo tier name from the effective speed score
function tierName(score) {
  if (score < 3) return "Starter 1080p";
  if (score < 5.5) return "Balanced 1080p";
  if (score < 8) return "High 1440p";
  return "Ultra 4K";
}

function generateBuild(budget) {
  // Step 1: pick each part near its share of the budget (CPU first, then matching parts)
  const sel = {};
  sel["CPU"] = bestUnder(CATALOG["CPU"], budget * SHARE["CPU"]);
  sel["GPU"] = bestUnder(CATALOG["GPU"], budget * SHARE["GPU"]);
  sel["Motherboard"] = bestUnder(CATALOG["Motherboard"].filter((m) => m.socket === sel["CPU"].socket), budget * SHARE["Motherboard"]);
  sel["RAM"] = bestUnder(CATALOG["RAM"].filter((r) => r.ramType === sel["Motherboard"].ramType), budget * SHARE["RAM"]);
  sel["Storage"] = bestUnder(CATALOG["Storage"], budget * SHARE["Storage"]);
  sel["Power Supply"] = bestUnder(CATALOG["Power Supply"], budget * SHARE["Power Supply"]);
  sel["Cabinet"] = bestUnder(CATALOG["Cabinet"], budget * SHARE["Cabinet"]);
  let current = fixPsu(sel);

  // Step 2: spend leftover money. One small upgrade per part, round after round, until nothing fits.
  let changed = true;
  while (changed) {
    changed = false;
    for (const type of PART_TYPES) {
      const higher = CATALOG[type].filter((o) => o.price > current[type].price);
      for (const option of higher) { // cheapest upgrade first
        const trial = fixPsu({ ...current, [type]: option });
        if (isCompatible(trial) && sumOf(trial) <= budget) { current = trial; changed = true; break; }
      }
    }
  }

  // Step 3: package the result and estimate FPS
  const effective = Math.min(current["GPU"].score, current["CPU"].score + 2); // weak CPU holds the GPU back
  return {
    name: tierName(effective),
    parts: PART_TYPES.map((type) => ({ type: type, name: current[type].name, specs: current[type].specs, price: current[type].price })),
    fps: GAMES.map((g) => ({ game: g.game, fps: Math.round(Math.min(g.cap, effective * g.perScore)) }))
  };
}

// Add up part prices with reduce
function totalOf(build) {
  return build.parts.reduce((sum, part) => sum + part.price, 0);
}

/* =====================================================
   4. RENDER FUNCTIONS (update the page)
   ===================================================== */
function renderSummary(build, budget) {
  const total = totalOf(build);
  const remaining = budget - total;
  const percent = Math.min(100, Math.round((total / budget) * 100));
  $("buildName").textContent = build.name;
  $("totalCost").textContent = formatINR(total);
  $("remaining").textContent = formatINR(remaining);
  $("barFill").style.width = percent + "%";
  barEl.setAttribute("aria-valuenow", String(percent));
  $("usageText").textContent = "Budget used: " + percent + "% (" + formatINR(total) + " of " + formatINR(budget) + ")";
  statusMsg.textContent = remaining >= 5000
    ? "Done! You still have " + formatINR(remaining) + " left. A bigger SSD or a monitor could fit."
    : "Done! This build uses almost your whole budget.";
}

function renderParts(build) {
  const list = $("partsList");
  list.replaceChildren(); // clear old cards
  build.parts.forEach((part) => {
    const card = el("li", "part");
    card.append(makeIcon(part.type), el("span", "type", part.type), el("h3", "", part.name),
                el("p", "", part.specs), el("p", "price", formatINR(part.price) + " (demo)"));
    list.appendChild(card);
  });
  $("partsEmpty").hidden = true;
}

function renderGames(build) {
  const box = $("gamesList");
  box.replaceChildren();
  build.fps.forEach((g) => {
    const card = el("div", "game");
    const meter = el("div", "meter"), fill = el("span");
    fill.style.width = Math.min(100, (g.fps / 400) * 100) + "%";
    meter.appendChild(fill);
    card.append(el("h3", "", g.game), el("strong", "", "~" + g.fps + " FPS"), el("p", "help", "Demo estimate, 1080p"), meter);
    box.appendChild(card);
  });
  $("gamesEmpty").hidden = true;
}

function renderStores(build) {
  const head = $("storeHead"), body = $("storeBody");
  head.replaceChildren(); body.replaceChildren();
  head.appendChild(el("th", "", "Component"));
  STORES.forEach((s) => head.appendChild(el("th", "", s.name)));

  STORE_PARTS.forEach((type) => {
    const part = build.parts.find((p) => p.type === type); // array find
    const row = el("tr");
    const th = el("th", "", type + ": " + part.name);
    th.scope = "row";
    row.appendChild(th);
    const prices = STORES.map((s) => Math.max(0, part.price + s.adjust[type]));
    const cheapest = Math.min(...prices); // spread array into Math.min
    STORES.forEach((s, i) => {
      const cell = el("td", prices[i] === cheapest ? "best" : "");
      // A real <a> link: opens the store's search results for this exact product in a new tab.
      // encodeURIComponent makes the product name safe to place inside a URL.
      const link = el("a", "btn ghost", "View on " + s.name);
      link.href = s.searchUrl + encodeURIComponent(part.name);
      link.target = "_blank";
      link.rel = "noopener noreferrer"; // security: the new tab cannot control this page
      cell.append(formatINR(prices[i]) + (prices[i] === cheapest ? " (lowest)" : ""), link);
      row.appendChild(cell);
    });
    body.appendChild(row);
  });
  $("storeTable").hidden = false;
  $("storesEmpty").hidden = true;
}

/* =====================================================
   5. EVENTS
   ===================================================== */
function showError(message) {
  errorBox.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const result = validateBudget();
  if (!result.ok) { // conditional
    showError(result.message);
    input.focus();
    return;
  }
  showError("");
  const build = generateBuild(result.value);
  renderSummary(build, result.value);
  renderParts(build);
  renderGames(build);
  renderStores(build);
});

// Preset buttons: read data-budget and put it in the input
document.querySelectorAll("[data-budget]").forEach((btn) => {
  btn.addEventListener("click", () => {
    input.value = btn.dataset.budget;
    showError("");
    input.focus();
  });
});

// Reset: restore the first-load state
$("resetBtn").addEventListener("click", () => {
  form.reset();
  showError("");
  ["buildName", "totalCost", "remaining"].forEach((id) => { $(id).textContent = "–"; });
  $("barFill").style.width = "0";
  barEl.setAttribute("aria-valuenow", "0");
  $("usageText").textContent = "Budget used: 0%";
  statusMsg.textContent = "Enter a budget and press “Build my PC”.";
  $("partsList").replaceChildren();
  $("gamesList").replaceChildren();
  $("storeBody").replaceChildren();
  $("storeTable").hidden = true;
  ["partsEmpty", "gamesEmpty", "storesEmpty"].forEach((id) => { $(id).hidden = false; });
  $("storeNote").textContent = "Prices are demo estimates. Links open each store’s search page, where the real price may differ.";
  input.focus();
});

// Mobile menu: toggle a CSS class and the aria-expanded state
const menuBtn = $("menuBtn"), nav = $("siteNav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open"); // boolean
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", (e) => { // close the menu after choosing a link
  if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
});