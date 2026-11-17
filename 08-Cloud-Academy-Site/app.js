const NAV_STRUCTURE = [
  {
    group: "СТАРТ И МЕТОДИКА",
    items: [
      { id: "dashboard", icon: "🏠", label: "Главная & Карта Пути", badge: "0–7" },
      { id: "videos_synthesis", icon: "🎬", label: "Синтез Видео & GitHub", badge: "План" },
      { id: "phase0", icon: "🛠️", label: "Фаза 0: Облако & LocalStack", badge: "Нед 1" }
    ]
  },
  {
    group: "БАЗА: LINUX, СЕТИ, КОД",
    items: [
      { id: "phase1", icon: "🐧", label: "Фаза 1: Linux, SSH, CIDR", badge: "Нед 2–5" },
      { id: "phase2", icon: "🐍", label: "Фаза 2: Python, JSON, Git", badge: "Нед 6–9" }
    ]
  },
  {
    group: "ОБЛАЧНОЕ ЯДРО И АТАКИ",
    items: [
      { id: "phase3", icon: "☁️", label: "Фаза 3: IAM, VPC, S3, KMS", badge: "Лаба 1" },
      { id: "phase4", icon: "💥", label: "Фаза 4: Атаки SSRF / flAWS", badge: "Лаба 2" }
    ]
  },
  {
    group: "DEVSECOPS И CLOUD SIEM",
    items: [
      { id: "phase5", icon: "🐳", label: "Фаза 5: Docker, K8s, Terraform", badge: "Лаба 3" },
      { id: "phase6", icon: "📡", label: "Фаза 6: CloudTrail, Sentinel", badge: "SIEM" }
    ]
  },
  {
    group: "КАРЬЕРА, СХЕМЫ И ВСПОМИНАЛКИ",
    items: [
      { id: "phase7", icon: "🏆", label: "Фаза 7: $0 Серты & Проекты", badge: "Оффер" },
      { id: "sources", icon: "🌍", label: "Все Проверенные Источники", badge: "МИТ/Git" },
      { id: "flashcards_page", icon: "⚡", label: "Окно Вспоминанок (45+)", badge: "Alt+M" },
      { id: "analogies", icon: "💡", label: "Банк Бытовых Аналогий", badge: "12+" },
      { id: "commands", icon: "⇄", label: "Переводчик Облаков & CLI", badge: "AWS/Az" },
      { id: "gallery", icon: "🖼️", label: "Галерея 12 Схем & Лабы", badge: "12 SVG" }
    ]
  }
];

const ORDERED_IDS = NAV_STRUCTURE.flatMap(g => g.items.map(i => i.id));
const STORAGE_CHECKS_KEY = "cloudsec_academy_checks_v1";
const STORAGE_THEME_KEY = "cloudsec_academy_theme_v1";
const STORAGE_DISTRO_KEY = "cloudsec_academy_distro_v1";
const STORAGE_TAB_KEY = "cloudsec_academy_active_tab_v1";
const STORAGE_CUSTOM_RECALL_KEY = "cloudsec_academy_custom_recall_v1";

let currentSectionId = "dashboard";
let currentRecallTag = "all";
let isBlindMode = false;

function getSavedChecks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_CHECKS_KEY) || "{}"); }
  catch (e) { return {}; }
}

function saveChecks(obj) {
  try { localStorage.setItem(STORAGE_CHECKS_KEY, JSON.stringify(obj)); } catch (e) {}
}

function getCustomRecallCards() {
  try { return JSON.parse(localStorage.getItem(STORAGE_CUSTOM_RECALL_KEY) || "[]"); }
  catch (e) { return []; }
}

function saveCustomRecallCards(arr) {
  try { localStorage.setItem(STORAGE_CUSTOM_RECALL_KEY, JSON.stringify(arr)); } catch (e) {}
}

function buildSidebar() {
  const navList = document.getElementById("navList");
  if (!navList) return;
  let html = "";
  for (const group of NAV_STRUCTURE) {
    html += `<li class="nav-group-label">${group.group}</li>`;
    for (const item of group.items) {
      const activeClass = item.id === currentSectionId ? "active" : "";
      html += `
        <li class="nav-item ${activeClass}" data-nav-id="${item.id}" onclick="renderSection('${item.id}')">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          <span class="nav-badge">${item.badge}</span>
        </li>
      `;
    }
  }
  navList.innerHTML = html;
}

function injectTOC(container) {
  const headings = Array.from(container.querySelectorAll("h2.section-heading"));
  const hero = container.querySelector(".hero-banner");
  if (headings.length > 1 && hero) {
    const tocBar = document.createElement("div");
    tocBar.className = "toc-bar";
    let pillsHtml = `<span class="toc-label">На странице:</span>`;
    headings.forEach((h, i) => {
      const anchorId = `sec-anchor-${i}`;
      h.id = anchorId;
      const cleanTitle = (h.textContent || "").trim();
      pillsHtml += `<button class="toc-pill" onclick="document.getElementById('${anchorId}').scrollIntoView({behavior:'smooth', block:'start'})">${cleanTitle}</button>`;
    });
    tocBar.innerHTML = pillsHtml;
    hero.insertAdjacentElement("afterend", tocBar);
  }
}

function buildFooterNav(sectionId) {
  const idx = ORDERED_IDS.indexOf(sectionId);
  if (idx === -1) return "";
  const prevId = idx > 0 ? ORDERED_IDS[idx - 1] : null;
  const nextId = idx < ORDERED_IDS.length - 1 ? ORDERED_IDS[idx + 1] : null;
  const prevTitle = prevId && window.ACADEMY_DATA[prevId] ? window.ACADEMY_DATA[prevId].title : "";
  const nextTitle = nextId && window.ACADEMY_DATA[nextId] ? window.ACADEMY_DATA[nextId].title : "";

  return `
    <div class="phase-footer-nav">
      <div>${prevId ? `<button class="btn-action" onclick="renderSection('${prevId}')">← ${prevTitle}</button>` : ""}</div>
      <div>${nextId ? `<button class="btn-action" onclick="renderSection('${nextId}')">${nextTitle} →</button>` : ""}</div>
    </div>
  `;
}

function renderSection(sectionId) {
  const data = window.ACADEMY_DATA[sectionId];
  if (!data) return;

  currentSectionId = sectionId;
  try { localStorage.setItem(STORAGE_TAB_KEY, sectionId); } catch (e) {}

  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active", el.dataset.navId === sectionId);
  });

  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.remove("mobile-open");

  const area = document.getElementById("contentArea");
  area.innerHTML = data.html + buildFooterNav(sectionId);

  injectTOC(area);
  bindCheckboxes();
  updateXPProgress();

  if (sectionId === "flashcards_page") {
    renderInlineFlashcards();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindCheckboxes() {
  const saved = getSavedChecks();
  document.querySelectorAll(".check-row[data-check-id]").forEach(row => {
    const id = row.dataset.checkId;
    const cb = row.querySelector("input[type='checkbox']");
    if (!cb) return;
    cb.checked = !!saved[id];
    row.classList.toggle("checked", cb.checked);

    row.onclick = (e) => {
      if (e.target.tagName !== "INPUT") cb.checked = !cb.checked;
      const all = getSavedChecks();
      all[id] = cb.checked;
      saveChecks(all);
      row.classList.toggle("checked", cb.checked);
      updateXPProgress();
    };
  });
}

function getAllCourseCheckIds() {
  const ids = new Set();
  for (const key of Object.keys(window.ACADEMY_DATA || {})) {
    const html = window.ACADEMY_DATA[key].html || "";
    const matches = html.matchAll(/data-check-id="([^"]+)"/g);
    for (const m of matches) ids.add(m[1]);
  }
  return Array.from(ids);
}

function updateXPProgress() {
  const allIds = getAllCourseCheckIds();
  const saved = getSavedChecks();
  const done = allIds.filter(id => saved[id]).length;
  const total = Math.max(allIds.length, 1);
  const pct = Math.round((done / total) * 100);

  const textEl = document.getElementById("xpText");
  const fillEl = document.getElementById("xpFill");
  const rankEl = document.getElementById("xpRank");

  if (textEl) textEl.textContent = `${done} / ${total} (${pct}%)`;
  if (fillEl) fillEl.style.width = `${pct}%`;

  if (rankEl) {
    let rank = "L0 Облачный Старт";
    if (pct >= 15) rank = "L1 Linux & Сети";
    if (pct >= 35) rank = "L2 IAM & VPC";
    if (pct >= 55) rank = "L3 Cloud Hunter";
    if (pct >= 75) rank = "L4 DevSecOps";
    if (pct >= 95) rank = "L5 CloudSec Ready";
    rankEl.textContent = rank;
  }
}

/* =========================================================
   DEDICATED QUICK-RECALL WINDOW ("ОКНО МАЛЕНЬКИХ ВСПОМИНАНОК")
   ========================================================= */
function openRecallDrawer() {
  document.getElementById("recallBackdrop").classList.add("open");
  document.getElementById("recallDrawer").classList.add("open");
  renderRecallCards();
  const inp = document.getElementById("recallSearchInput");
  if (inp) setTimeout(() => inp.focus(), 120);
}

function closeRecallDrawer() {
  document.getElementById("recallBackdrop").classList.remove("open");
  document.getElementById("recallDrawer").classList.remove("open");
}

function toggleRecallDrawer() {
  const drawer = document.getElementById("recallDrawer");
  if (drawer && drawer.classList.contains("open")) closeRecallDrawer();
  else openRecallDrawer();
}

function setRecallTag(tag) {
  currentRecallTag = tag;
  document.querySelectorAll("#recallTags .tag-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tag === tag);
  });
  renderRecallCards();
}

function toggleBlindMode() {
  isBlindMode = !isBlindMode;
  const btn = document.getElementById("quizBlindBtn");
  if (btn) btn.textContent = isBlindMode ? "👁️ Показать ответы" : "🙈 Скрыть ответы";
  renderRecallCards();
}

function addCustomRecall(e) {
  e.preventDefault();
  const qEl = document.getElementById("customQ");
  const aEl = document.getElementById("customA");
  const q = (qEl.value || "").trim();
  const a = (aEl.value || "").trim();
  if (!q || !a) return;

  const custom = getCustomRecallCards();
  custom.unshift({ id: "custom_" + Date.now(), tag: "custom", q, a, cmd: "" });
  saveCustomRecallCards(custom);

  qEl.value = "";
  aEl.value = "";
  setRecallTag("custom");
}

function deleteCustomRecall(id) {
  const updated = getCustomRecallCards().filter(c => c.id !== id);
  saveCustomRecallCards(updated);
  renderRecallCards();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getAllRecallCards() {
  const custom = getCustomRecallCards();
  const base = window.RECALL_FLASHCARDS || [];
  return [...custom, ...base];
}

function renderRecallCards() {
  const listEl = document.getElementById("recallCardsList");
  const countEl = document.getElementById("recallCountLabel");
  if (!listEl) return;

  const query = ((document.getElementById("recallSearchInput") || {}).value || "").toLowerCase().trim();
  const all = getAllRecallCards();
  if (countEl) countEl.textContent = String(all.length);

  const filtered = all.filter(card => {
    const matchTag = currentRecallTag === "all" || card.tag === currentRecallTag;
    const hay = (card.q + " " + card.a + " " + (card.cmd || "")).toLowerCase();
    const matchQ = !query || hay.includes(query);
    return matchTag && matchQ;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="card" style="text-align:center; color:var(--text-muted);">По этому фильтру пока пусто. Попробуй сбросить тег или добавь свою вспоминалку выше!</div>`;
    return;
  }

  const tagLabels = {
    linux: "🐧 Linux",
    net: "🌐 Сети",
    iam: "🔑 IAM",
    s3: "🪣 S3",
    attack: "💥 Атаки",
    devsecops: "🐳 DevSecOps",
    custom: "📝 Моё"
  };

  listEl.innerHTML = filtered.map(c => `
    <div class="recall-card ${isBlindMode ? "blind" : ""}" onclick="this.classList.toggle('revealed')">
      <div class="recall-card-top">
        <span class="recall-card-q">${escapeHtml(c.q)}</span>
        <div style="display:flex; gap:5px; align-items:center;">
          <span class="recall-card-tag">${tagLabels[c.tag] || c.tag}</span>
          ${c.tag === "custom" ? `<button class="btn-action" style="padding:1px 6px; font-size:0.7rem;" onclick="event.stopPropagation(); deleteCustomRecall('${c.id}')" title="Удалить">🗑️</button>` : ""}
        </div>
      </div>
      <div class="recall-card-body">
        <div class="recall-card-a">${escapeHtml(c.a)}</div>
        ${c.cmd ? `<div class="recall-card-cmd">${escapeHtml(c.cmd)}</div>` : ""}
      </div>
    </div>
  `).join("");
}

function renderInlineFlashcards() {
  const mount = document.getElementById("inlineFlashcardsMount");
  if (!mount) return;
  const cards = getAllRecallCards();
  mount.innerHTML = `
    <div class="grid-2">
      ${cards.map(c => `
        <div class="recall-card">
          <div class="recall-card-top">
            <span class="recall-card-q">${escapeHtml(c.q)}</span>
            <span class="recall-card-tag">${escapeHtml(c.tag)}</span>
          </div>
          <div class="recall-card-a">${escapeHtml(c.a)}</div>
          ${c.cmd ? `<div class="recall-card-cmd">${escapeHtml(c.cmd)}</div>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================================================
   UTILITIES: SEARCH, THEME, DISTRO, LIGHTBOX, COPY, BACKUP
   ========================================================= */
function handleGlobalSearch(raw) {
  const q = (raw || "").trim().toLowerCase();
  if (!q) {
    renderSection(currentSectionId);
    return;
  }

  const results = [];
  for (const id of ORDERED_IDS) {
    const sec = window.ACADEMY_DATA[id];
    if (!sec) continue;
    const text = (sec.title + " " + sec.html.replace(/<[^>]+>/g, " ")).toLowerCase();
    if (text.includes(q)) {
      results.push(sec);
    }
  }

  const area = document.getElementById("contentArea");
  if (results.length === 0) {
    area.innerHTML = `
      <div class="hero-banner">
        <h1 class="hero-title">Поиск: «${escapeHtml(raw)}»</h1>
        <p class="hero-desc">Ничего не найдено в разделах курса. Попробуй поискать в <strong>🧠 Окне Вспоминанок (Alt+M)</strong>!</p>
      </div>`;
    return;
  }

  area.innerHTML = `
    <div class="hero-banner">
      <h1 class="hero-title">🔎 Результаты поиска по курсу: «${escapeHtml(raw)}» (${results.length})</h1>
      <p class="hero-desc">Нажми на любой найденный раздел, чтобы перейти к нему:</p>
    </div>
    <div class="grid-2">
      ${results.map(r => `
        <div class="card" style="cursor:pointer;" onclick="document.getElementById('globalSearchInput').value=''; renderSection('${r.id}')">
          <div class="card-title">${r.title}</div>
          <span class="badge badge-cyan">${r.badge}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function filterAnalogies(cat) {
  document.querySelectorAll("#analogyGrid .analogy-card").forEach(card => {
    card.style.display = (cat === "all" || card.dataset.cat === cat) ? "" : "none";
  });
}

function filterCommandTable(raw) {
  const q = (raw || "").toLowerCase().trim();
  document.querySelectorAll("#cmdMasterTable tbody tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
}

function setDistroMode(mode) {
  document.body.setAttribute("data-distro-mode", mode);
  document.querySelectorAll(".distro-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.distro === mode);
  });
  try { localStorage.setItem(STORAGE_DISTRO_KEY, mode); } catch (e) {}
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = isLight ? "🌙 Dark" : "☀️ Light";
  try { localStorage.setItem(STORAGE_THEME_KEY, isLight ? "light" : "dark"); } catch (e) {}
}

function toggleMobileSidebar() {
  const sb = document.getElementById("sidebar");
  if (sb) sb.classList.toggle("mobile-open");
}

function openLightbox(src) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  if (modal && img) {
    img.src = src;
    modal.classList.add("open");
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("open");
}

function copyCode(btn) {
  const pre = btn.closest(".code-wrap").querySelector("pre");
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const old = btn.textContent;
    btn.textContent = "Скопировано ✓";
    setTimeout(() => { btn.textContent = old; }, 1400);
  });
}

function exportProgress() {
  const payload = {
    checks: getSavedChecks(),
    custom_recalls: getCustomRecallCards(),
    exported_at: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cloudsec-academy-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

function resetProgress() {
  if (!confirm("Точно сбросить все галочки прогресса?")) return;
  localStorage.removeItem(STORAGE_CHECKS_KEY);
  renderSection(currentSectionId);
}

/* Global Keyboard Shortcuts */
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    const inp = document.getElementById("globalSearchInput");
    if (inp) inp.focus();
  }
  if (e.altKey && e.key.toLowerCase() === "m") {
    e.preventDefault();
    toggleRecallDrawer();
  }
  if (e.key === "Escape") {
    closeLightbox();
    closeRecallDrawer();
  }
});

window.addEventListener("scroll", () => {
  const bar = document.getElementById("readingProgressBar");
  const topBtn = document.getElementById("scrollTopBtn");
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, Math.round((window.scrollY / docHeight) * 100)) : 0;
  if (bar) bar.style.width = pct + "%";
  if (topBtn) topBtn.classList.toggle("visible", window.scrollY > 360);
});

/* Init */
window.addEventListener("DOMContentLoaded", () => {
  try {
    if (localStorage.getItem(STORAGE_THEME_KEY) === "light") {
      document.body.classList.add("light-theme");
      const btn = document.getElementById("themeBtn");
      if (btn) btn.textContent = "🌙 Dark";
    }
    const savedDistro = localStorage.getItem(STORAGE_DISTRO_KEY);
    if (savedDistro) setDistroMode(savedDistro);

    const savedTab = localStorage.getItem(STORAGE_TAB_KEY);
    if (savedTab && window.ACADEMY_DATA[savedTab]) currentSectionId = savedTab;
  } catch (e) {}

  buildSidebar();
  renderSection(currentSectionId);
  renderRecallCards();
});
