// VIEWS
function goView(v) {
  // Hide all views
  document.querySelectorAll(".view").forEach((el) => {
    el.classList.remove("active");
    el.style.display = "none";
  });
  // Show target
  var target = document.getElementById(v);
  if (!target) {
    console.error("View not found:", v);
    return;
  }
  target.classList.add("active");
  target.style.display = "block";
  window.scrollTo(0, 0);
  // Nav visibility
  var nav = document.getElementById("mainNav");
  nav.style.display =
    v === "onboarding" || v === "dashboard" ? "none" : "block";
  // Close mobile menu
  mo = false;
  document.getElementById("navLinks").style.cssText = "";
  // Reset onboarding step when going to onboarding
  if (v === "onboarding") {
    cs = 1;
    resetOb();
  }
}
function goHome() {
  goView("landing");
}

// DASHBOARD PANEL SWITCHER
function switchDash(panel) {
  // Hide all panels
  document
    .querySelectorAll(".dash-panel")
    .forEach((p) => p.classList.remove("active"));
  // Show target panel
  var target = document.getElementById("panel-" + panel);
  if (target) target.classList.add("active");
  // Update nav active state
  document.querySelectorAll(".dni").forEach((n) => n.classList.remove("act"));
  var navItem = document.getElementById("nav-" + panel);
  if (navItem) navItem.classList.add("act");
  // Update topbar title
  var titles = {
    overview: "Overview",
    analytics: "Analytics",
    automations: "Automations",
    tasks: "Tasks",
    inbox: "Inbox",
    members: "Members",
    projects: "Projects",
    integrations: "Integrations",
    settings: "Settings",
    billing: "Billing",
  };
  var titleEl = document.querySelector(".dsb-pt");
  if (titleEl && titles[panel]) {
    titleEl.innerHTML =
      titles[panel] +
      ' <span style="font-size:10.5px;font-weight:500;color:var(--ink3);background:var(--bg);border:1px solid var(--bdr);padding:2px 8px;border-radius:100px">June 2026</span>';
  }
  // Close sidebar on mobile
  if (window.innerWidth <= 900) {
    document.getElementById("sidebar").classList.remove("open");
    var bd = document.getElementById("sidebarBackdrop");
    if (bd) bd.style.display = "none";
  }
}

// RESET ONBOARDING
function resetOb() {
  for (var i = 1; i <= 4; i++) {
    var s = document.getElementById("s" + i);
    if (s) s.classList.remove("active");
  }
  var s1 = document.getElementById("s1");
  if (s1) s1.classList.add("active");
  updProg(1);
}

// DARK MODE
let dark = false;
function toggleDark() {
  dark = !dark;
  document.body.setAttribute("data-dark", dark ? "" : null);
  if (!dark) document.body.removeAttribute("data-dark");
  document.querySelectorAll("#dkBtn,button").forEach((b) => {
    if (b.textContent === "🌙" || b.textContent === "☀️")
      b.textContent = dark ? "☀️" : "🌙";
  });
}

// NAV SCROLL
window.addEventListener("scroll", () =>
  document.getElementById("mainNav").classList.toggle("solid", scrollY > 10)
);

// MENU
let mo = false;
function toggleMenu() {
  mo = !mo;
  const nl = document.getElementById("navLinks");
  nl.style.cssText = mo
    ? "display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:var(--bg);padding:18px 28px;border-bottom:1px solid var(--bdr);gap:16px;z-index:199;"
    : "";
}

// FAQ
function toggleFaq(btn) {
  const row = btn.parentElement;
  const open = row.classList.contains("open");
  document.querySelectorAll(".fq-row.open").forEach((r) => {
    r.classList.remove("open");
    r.querySelector(".fq-a").style.maxHeight = "0";
  });
  if (!open) {
    row.classList.add("open");
    const a = row.querySelector(".fq-a");
    a.style.maxHeight = a.scrollHeight + "px";
  }
}

// PRICING
let ann = true;
const prices = { ann: [15, 39, 103], mo: [19, 49, 129] };
function flipPrice() {
  ann = !ann;
  document.getElementById("ptog").className = "ptog " + (ann ? "on" : "off");
  const p = ann ? prices.ann : prices.mo;
  ["pp1", "pp2", "pp3"].forEach(
    (id, i) => (document.getElementById(id).textContent = p[i])
  );
}

// ONBOARDING
let cs = 1;
function obNext(n) {
  if (n > cs && !obVal(cs)) return;
  document.getElementById("s" + cs).classList.remove("active");
  cs = n;
  document.getElementById("s" + n).classList.add("active");
  updProg(n);
}
function obVal(s) {
  let ok = true;
  const se = (id, show) => {
    const inp = document.getElementById("f" + id);
    const err = document.getElementById("e" + id);
    inp.classList.toggle("inv", show);
    err.style.display = show ? "block" : "none";
  };
  if (s === 1) {
    if (!document.getElementById("f1").value.trim()) {
      se(1, true);
      ok = false;
    } else se(1, false);
    if (!document.getElementById("f2").value.trim()) {
      se(2, true);
      ok = false;
    } else se(2, false);
    if (
      !document.getElementById("f3").value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      se(3, true);
      ok = false;
    } else se(3, false);
    if (document.getElementById("f4").value.length < 8) {
      se(4, true);
      ok = false;
    } else se(4, false);
  }
  if (s === 2) {
    if (!document.getElementById("f5").value.trim()) {
      se(5, true);
      ok = false;
    } else se(5, false);
  }
  return ok;
}
function updProg(n) {
  for (let i = 1; i <= 4; i++) {
    const c = document.getElementById("pc" + i);
    const l = document.getElementById("plab" + i);
    c.className = "ps-c " + (i < n ? "done" : i === n ? "curr" : "");
    c.textContent = i < n ? "✓" : i;
    l.className = "plab " + (i === n ? "curr" : "");
  }
  for (let i = 1; i <= 3; i++)
    document.getElementById("pl" + i).className =
      "ps-ln " + (i < n ? "done" : "");
}
function pickR(el) {
  document.querySelectorAll(".ro").forEach((o) => o.classList.remove("sel"));
  el.classList.add("sel");
}
function pickP(el) {
  document.querySelectorAll(".po").forEach((o) => o.classList.remove("sel"));
  el.classList.add("sel");
}

// CONTACT
function sendContact() {
  const em = document.getElementById("c3");
  if (!em.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    em.classList.add("inv");
    document.getElementById("ce3").style.display = "block";
    return;
  }
  em.classList.remove("inv");
  document.getElementById("ce3").style.display = "none";
  ["c1", "c2", "c3", "c4", "c5"].forEach(
    (id) => (document.getElementById(id).value = "")
  );
  showToast("✅ Message sent! We'll reply within 2 hours.");
}

// TOAST
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}
function toast2(m) {
  showToast(m);
}

// SIDEBAR
function toggleSidebar() {
  var sb = document.getElementById("sidebar");
  var bd = document.getElementById("sidebarBackdrop");
  sb.classList.toggle("open");
  if (bd) bd.style.display = sb.classList.contains("open") ? "block" : "none";
}

// BAR CHART
function buildChart() {
  const ms = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const vs = [22, 27, 24, 31, 36, 41, 38, 44, 42, 48, 46, 48];
  const mx = Math.max(...vs);
  const w = document.getElementById("bch");
  if (!w) return;
  w.innerHTML = ms
    .map(
      (m, i) =>
        `<div class="bc-col"><div class="bc-bw" title="$${
          vs[i]
        }K"><div class="bc-f" style="height:${Math.round(
          (vs[i] / mx) * 100
        )}%"></div></div><span class="bc-lb">${m}</span></div>`
    )
    .join("");
}

// SCROLL ANIMATION
const io = new IntersectionObserver(
  (en) => {
    en.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("vis");
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".fi-up").forEach((el) => io.observe(el));

window.addEventListener("load", () => {
  document
    .querySelectorAll("#hero .fi-up")
    .forEach((el, i) =>
      setTimeout(() => el.classList.add("vis"), 80 + i * 110)
    );
  buildChart();
});
