class CampusStatsDesign4 {
  constructor() {
    this.locale = "en";
    this.year = "2022-23";
    this.selectedTrend = "uoft";
    this.helpCollapsed = false;
    this.sourceCollapsed = false;

    this.universities = [
      { id: "uoft", short: "U of T", name: "University of Toronto", color: "#2d56d4" },
      { id: "ubc", short: "UBC", name: "Univ. of British Columbia", color: "#14986b" },
      { id: "mcgill", short: "McGill", name: "McGill University", color: "#df2f33" },
      { id: "ualberta", short: "U of A", name: "University of Alberta", color: "#d88413" },
      { id: "uottawa", short: "uOttawa", name: "University of Ottawa", color: "#7a45de" },
      { id: "queens", short: "Queen's", name: "Queen's University", color: "#1d8fb0" },
      { id: "mcmaster", short: "McMaster", name: "McMaster University", color: "#bc2a73" },
      { id: "waterloo", short: "Waterloo", name: "University of Waterloo", color: "#6ca611" }
    ];

    this.enrollmentByYear = {
      "2018-19": { uoft: 85800, ubc: 60870, mcgill: 38900, ualberta: 37100, uottawa: 42000, queens: 25500, mcmaster: 33400, waterloo: 40178 },
      "2019-20": { uoft: 89300, ubc: 63150, mcgill: 39700, ualberta: 36900, uottawa: 43000, queens: 25800, mcmaster: 34600, waterloo: 41500 },
      "2020-21": { uoft: 93800, ubc: 64820, mcgill: 40400, ualberta: 37200, uottawa: 44100, queens: 26200, mcmaster: 35700, waterloo: 41900 },
      "2021-22": { uoft: 97000, ubc: 65990, mcgill: 41100, ualberta: 37500, uottawa: 45500, queens: 26600, mcmaster: 36500, waterloo: 43620 },
      "2022-23": { uoft: 97000, ubc: 66400, mcgill: 41000, ualberta: 37000, uottawa: 46340, queens: 26800, mcmaster: 37000, waterloo: 44500 }
    };

    this.selected = new Set(["mcgill", "uottawa", "queens", "mcmaster", "waterloo"]);
    this.mount();
  }

  years() { return Object.keys(this.enrollmentByYear); }
  value(id, year = this.year) { return this.enrollmentByYear[year][id]; }
  selectedArray() { return this.universities.filter((u) => this.selected.has(u.id)); }
  trendValues() { return this.years().map((y) => this.value(this.selectedTrend, y)); }
  totalSelected() { return this.selectedArray().reduce((sum, u) => sum + this.value(u.id), 0); }

  largestSelected() {
    const arr = this.selectedArray();
    if (!arr.length) return null;
    return arr.reduce((max, u) => (this.value(u.id) > this.value(max.id) ? u : max), arr[0]);
  }

  avgSelected() {
    const arr = this.selectedArray();
    return arr.length ? Math.round(this.totalSelected() / arr.length) : 0;
  }

  growthFor(id) {
    const first = this.value(id, "2018-19");
    const last = this.value(id, "2022-23");
    return { first, last, pct: ((last - first) / first) * 100 };
  }

  formatNum(n) { return Number(n).toLocaleString("en-CA"); }
  formatPct(n) { return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`; }

  mount() {
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = this.render();
    this.bind();
    this.drawBar();
    this.drawLine();
  }

  render() {
    const trUni = this.universities.find((u) => u.id === this.selectedTrend);
    const growth = this.growthFor(this.selectedTrend);
    const largest = this.largestSelected();
    const totalText = `Total student enrollment by university — ${this.year} academic year.`;

    return `
      <div class="cs-page">
        <header class="topbar card-lite">
          <div class="brand">
            <div class="brand-icon">✉</div>
            <div>
              <h1>CampusStats</h1>
              <p>Canadian University Enrollment Dashboard</p>
            </div>
          </div>
          <button id="langBtn" class="lang-btn">🌐 Français</button>
        </header>

        <section class="hero card-hero">
          <div class="pill">🎓 Canadian University Data</div>
          <h2>CampusStats</h2>
          <p class="hero-main">Compare student enrollment across major Canadian universities. Select universities and years to explore the data interactively.</p>
          <p class="hero-note">Note: Enrollment figures are approximate values derived from publicly available Universities Canada data.</p>
        </section>

        <section class="stats-grid">
          ${this.statCard("👥", "Total Students (selected)", this.formatNum(this.totalSelected()), `${this.selected.size} of ${this.universities.length} universities`, "blue")}
          ${this.statCard("🎓", "Largest University", largest ? largest.short : "—", largest ? `${this.formatNum(this.value(largest.id))} students` : "", "purple")}
          ${this.statCard("↗", "Average Enrollment", this.formatNum(this.avgSelected()), this.year, "green")}
          ${this.statCard("↗", `5-Year Growth · ${trUni.short}`, this.formatPct(growth.pct), `${this.formatNum(growth.first)} → ${this.formatNum(growth.last)}`, "green")}
        </section>

        <section class="controls card">
          <h3>⚙ Dashboard Controls</h3>
          <div class="control-grid">
            <div>
              <div class="row-title">
                <strong>Compare Universities</strong>
                <span>
                  <button class="text-btn" id="selectAll">Select all</button>
                  <span class="dot">·</span>
                  <button class="text-btn" id="clearAll">Clear all</button>
                </span>
              </div>
              <p class="muted">Select universities to display in the bar chart:</p>
              <div class="uni-list">${this.universities.map((u) => this.uniCheck(u)).join("")}</div>
            </div>
            <div>
              <strong>Academic Year</strong>
              <div class="year-row">${this.years().map((y) => `<button class="chip ${y === this.year ? "active" : ""}" data-year="${y}">${y}</button>`).join("")}</div>
              <p class="muted">${totalText}</p>
              <strong class="trend-title">University — Trend Chart</strong>
              <p class="muted">Select a university to view its 5-year enrollment trend:</p>
              <div class="trend-grid">
                ${this.universities.map((u) => `<button class="trend-chip ${u.id === this.selectedTrend ? "active" : ""}" data-trend="${u.id}"><i style="background:${u.color}"></i>${u.short}</button>`).join("")}
              </div>
            </div>
          </div>
        </section>

        <section class="charts-grid">
          <article class="card chart-card">
            <h3>Enrollment Comparison by University</h3>
            <p class="muted">Total student enrollment by university — ${this.year} academic year. Use the checkboxes to add or remove universities from the comparison.</p>
            <div class="legend">${this.selectedArray().map((u) => `<span><i style="background:${u.color}"></i>${u.short}</span>`).join("")}</div>
            <canvas id="barCanvas" width="640" height="320"></canvas>
          </article>

          <article class="card chart-card">
            <div class="line-head">
              <h3>Enrollment Trend Over Time</h3>
              <span class="single-legend"><i style="background:${trUni.color}"></i>${trUni.short}</span>
            </div>
            <p class="muted">Year-over-year enrollment change for ${trUni.name} from 2018–19 to 2022–23.</p>
            <div class="line-kpis">
              <span class="pos">↗ ${this.formatPct(growth.pct)} 5-Year Growth</span>
              <span class="sep">|</span>
              <span>— ${this.formatNum(Math.round(this.trendValues().reduce((a, b) => a + b, 0) / this.trendValues().length))} 5-yr average</span>
            </div>
            <canvas id="lineCanvas" width="640" height="320"></canvas>
          </article>
        </section>

        <section class="bottom-grid">
          <article class="card info-card ${this.helpCollapsed ? "collapsed" : ""}">
            <button class="info-head" id="toggleHelp"><span>ⓘ <strong>How to use CampusStats</strong></span><span>${this.helpCollapsed ? "▸" : "⌄"}</span></button>
            ${this.helpCollapsed ? "" : `<p>Use the checkboxes to add or remove universities from the bar chart. Change the academic year using the Year buttons to see enrollment data for that year. Select a single university from the Trend Chart controls to update the line chart below.</p>`}
          </article>
          <article class="card info-card ${this.sourceCollapsed ? "collapsed" : ""}">
            <button class="source-head" id="toggleSource"><span><span class="source-icon">ℹ</span><strong>Data source: Universities Canada</strong></span><span>${this.sourceCollapsed ? "▸" : "⌄"}</span></button>
            ${this.sourceCollapsed ? "" : `<p>Data sourced from Universities Canada (univcan.ca). Figures represent full-time equivalent students.</p>`}
          </article>
        </section>
      </div>
    `;
  }

  statCard(icon, label, value, sub, tone) {
    return `<article class="card stat-card"><div class="stat-icon ${tone}">${icon}</div><div><p class="stat-label">${label}</p><h4>${value}</h4><p class="stat-sub">${sub}</p></div></article>`;
  }

  uniCheck(u) {
    return `<label class="uni-item"><input type="checkbox" data-uni="${u.id}" ${this.selected.has(u.id) ? "checked" : ""} /><span class="check" style="background:${u.color}">${this.selected.has(u.id) ? "✓" : ""}</span><i style="background:${u.color}"></i>${u.name}</label>`;
  }

  bind() {
    document.querySelectorAll("[data-year]").forEach((b) => b.addEventListener("click", () => { this.year = b.dataset.year; this.mount(); }));
    document.querySelectorAll("[data-trend]").forEach((b) => b.addEventListener("click", () => { this.selectedTrend = b.dataset.trend; this.mount(); }));
    document.querySelectorAll("[data-uni]").forEach((cb) => cb.addEventListener("change", () => {
      const id = cb.dataset.uni;
      if (cb.checked) this.selected.add(id); else this.selected.delete(id);
      if (!this.selected.size) this.selected.add(id);
      this.mount();
    }));
    document.getElementById("selectAll")?.addEventListener("click", () => { this.universities.forEach((u) => this.selected.add(u.id)); this.mount(); });
    document.getElementById("clearAll")?.addEventListener("click", () => { this.selected = new Set([this.selectedTrend]); this.mount(); });
    document.getElementById("toggleHelp")?.addEventListener("click", () => { this.helpCollapsed = !this.helpCollapsed; this.mount(); });
    document.getElementById("toggleSource")?.addEventListener("click", () => { this.sourceCollapsed = !this.sourceCollapsed; this.mount(); });
  }

  drawBar() {
    const canvas = document.getElementById("barCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const margin = { t: 28, r: 20, b: 52, l: 58 };
    const plotW = w - margin.l - margin.r;
    const plotH = h - margin.t - margin.b;
    const list = this.selectedArray();
    if (!list.length) return;

    const values = list.map((u) => this.value(u.id));
    const top = Math.ceil(Math.max(...values) / 5000) * 5000;
    const yTicks = 4;

    ctx.strokeStyle = "#d7deea";
    ctx.fillStyle = "#7a8ca8";
    ctx.font = "12px Inter, Arial";

    for (let i = 0; i <= yTicks; i++) {
      const y = margin.t + (plotH * i) / yTicks;
      ctx.setLineDash(i === yTicks ? [] : [4, 4]);
      ctx.beginPath(); ctx.moveTo(margin.l, y); ctx.lineTo(w - margin.r, y); ctx.stroke();
      const v = Math.round(top - (top * i) / yTicks);
      ctx.setLineDash([]); ctx.fillText(v === 0 ? "0" : `${Math.round(v / 1000)}K`, 16, y + 4);
    }

    const slot = plotW / list.length;
    const barW = Math.min(60, slot * 0.74);

    list.forEach((u, idx) => {
      const val = this.value(u.id);
      const bh = (val / top) * plotH;
      const x = margin.l + idx * slot + (slot - barW) / 2;
      const y = margin.t + plotH - bh;
      ctx.fillStyle = u.color; ctx.fillRect(x, y, barW, bh);
      ctx.fillStyle = "#62789a";
      ctx.save(); ctx.translate(x + barW / 2, h - 16); ctx.rotate(-0.3); ctx.textAlign = "center"; ctx.fillText(u.short, 0, 0); ctx.restore();
    });

    ctx.save(); ctx.translate(18, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillStyle = "#8b9db6"; ctx.textAlign = "center"; ctx.fillText("Students", 0, 0); ctx.restore();
  }

  drawLine() {
    const canvas = document.getElementById("lineCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const years = this.years();
    const vals = this.trendValues();
    const uni = this.universities.find((u) => u.id === this.selectedTrend);

    const margin = { t: 22, r: 22, b: 48, l: 62 };
    const plotW = w - margin.l - margin.r;
    const plotH = h - margin.t - margin.b;

    const min = Math.floor(Math.min(...vals) / 1000) * 1000;
    const max = Math.ceil(Math.max(...vals) / 1000) * 1000;
    const pad = Math.max(1500, Math.round((max - min) * 0.2));
    const yMin = min - pad, yMax = max + pad;

    const yTicks = 4;
    ctx.strokeStyle = "#d7deea"; ctx.fillStyle = "#7a8ca8"; ctx.font = "12px Inter, Arial";
    for (let i = 0; i <= yTicks; i++) {
      const y = margin.t + (plotH * i) / yTicks;
      ctx.setLineDash(i === yTicks ? [] : [4, 4]);
      ctx.beginPath(); ctx.moveTo(margin.l, y); ctx.lineTo(w - margin.r, y); ctx.stroke();
      const v = Math.round(yMax - ((yMax - yMin) * i) / yTicks);
      ctx.setLineDash([]); ctx.fillText(`${Math.round(v / 1000)}K`, 20, y + 4);
    }

    const points = vals.map((v, i) => ({
      x: margin.l + (i * plotW) / (vals.length - 1),
      y: margin.t + ((yMax - v) / (yMax - yMin)) * plotH
    }));

    ctx.strokeStyle = uni.color; ctx.lineWidth = 3; ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();

    points.forEach((p) => {
      ctx.fillStyle = uni.color; ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
    });

    ctx.fillStyle = "#62789a"; ctx.textAlign = "center";
    years.forEach((yr, i) => {
      const x = margin.l + (i * plotW) / (years.length - 1);
      ctx.fillText(yr, x, h - 12);
    });

    ctx.save(); ctx.translate(18, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillStyle = "#8b9db6"; ctx.textAlign = "center"; ctx.fillText("Students", 0, 0); ctx.restore();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new CampusStatsDesign4();
});
