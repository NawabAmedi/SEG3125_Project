
class CampusStatsDesign4 {
  constructor() {
    this.locale = "en";
    this.page = "home"; // homepage first
    this.hasEnteredDashboard = false; // dashboard only after explicit click
    this.year = "2022-23";
    this.selectedTrend = "uoft";
    this.helpCollapsed = false;
    this.sourceCollapsed = false;

    this.universities = [
      { id: "uoft", short: "U of T", shortFr: "U de T", name: "University of Toronto", nameFr: "Université de Toronto", color: "#2d56d4" },
      { id: "ubc", short: "UBC", shortFr: "UBC", name: "Univ. of British Columbia", nameFr: "Univ. de la Colombie-Britannique", color: "#14986b" },
      { id: "mcgill", short: "McGill", shortFr: "McGill", name: "McGill University", nameFr: "Université McGill", color: "#df2f33" },
      { id: "ualberta", short: "U of A", shortFr: "U de A", name: "University of Alberta", nameFr: "Université de l'Alberta", color: "#d88413" },
      { id: "uottawa", short: "uOttawa", shortFr: "uOttawa", name: "University of Ottawa", nameFr: "Université d'Ottawa", color: "#7a45de" },
      { id: "queens", short: "Queen's", shortFr: "Queen's", name: "Queen's University", nameFr: "Université Queen's", color: "#1d8fb0" },
      { id: "mcmaster", short: "McMaster", shortFr: "McMaster", name: "McMaster University", nameFr: "Université McMaster", color: "#bc2a73" },
      { id: "waterloo", short: "Waterloo", shortFr: "Waterloo", name: "University of Waterloo", nameFr: "Université de Waterloo", color: "#6ca611" }
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

  t() {
    const en = {
      langBtn: "🌐 Français",
      subtitle: "Canadian University Enrollment Dashboard",
      heroPill: "🎓 Canadian University Data",
      heroMain: "Compare student enrollment across major Canadian universities. Select universities and years to explore the data interactively.",
      heroNote: "Note: Enrollment figures are approximate values derived from publicly available Universities Canada data.",
      totalStudents: "Total Students (selected)",
      largestUniversity: "Largest University",
      averageEnrollment: "Average Enrollment",
      growth5: "5-Year Growth",
      studentsWord: "students",
      controls: "⚙ Dashboard Controls",
      compareUniversities: "Compare Universities",
      selectAll: "Select all",
      clearAll: "Clear all",
      selectUniversitiesToDisplay: "Select universities to display in the bar chart:",
      academicYear: "Academic Year",
      totalByYear: (y) => `Total student enrollment by university — ${y} academic year.`,
      uniTrendChart: "University — Trend Chart",
      selectUniTrend: "Select a university to view its 5-year enrollment trend:",
      enrollmentComparison: "Enrollment Comparison by University",
      enrollmentComparisonDesc: (y) => `Total student enrollment by university — ${y} academic year. Use the checkboxes to add or remove universities from the comparison.`,
      enrollmentTrendTitle: "Enrollment Trend Over Time",
      enrollmentTrendDesc: (name) => `Year-over-year enrollment change for ${name} from 2018–19 to 2022–23.`,
      avg5yr: "5-yr average",
      howToUse: "How to use CampusStats",
      howToBody: "Use the controls to explore the charts and filter universities.",
      dataSource: "Data source: Universities Canada",
      dataSourceBody: "Data sourced from Universities Canada (univcan.ca). Figures represent full-time equivalent students.",
      universitiesCount: (count, total) => `${count} of ${total} universities`,
      emptySelectionMessage: "No universities selected. Please select at least one university using the checkboxes above.",
      home: "Home",
      dashboard: "Dashboard",
      homePill: "🍁 Canadian University Data · 2018–2023",
      homeTitle: "Explore Canadian University Enrollment",
      homeSub: "An interactive bilingual dashboard comparing student enrollment across major Canadian universities. Select institutions, filter by year, and switch languages — all in real time.",
      openDashboard: "Open Dashboard →",
      learnMore: "Learn more",
      kpiTracked: "universities tracked",
      kpiYears: "years of data",
      kpiStudents: "students in dataset",
      kpiPoints: "enrollment data points",
      whatExplore: "What you can explore",
      whatExploreBody: "CampusStats is designed to make enrollment data clear, interactive, and accessible in both official languages.",
      feat1t: "Bar Chart Comparison",
      feat1d: "Compare enrollment side by side across multiple universities for any academic year from 2018–19 to 2022–23.",
      feat2t: "Trend Analysis",
      feat2d: "Track how enrollment changed year over year with a 5-year line chart and average reference line.",
      feat3t: "Bilingual Interface",
      feat3d: "Switch between English and French at any time. Labels, chart text, and number formats update instantly.",
      feat4t: "Live Filters",
      feat4d: "Select universities with color-coded checkboxes, choose academic years, and update both charts simultaneously.",
      ready: "Ready to explore the data?",
      readyBody: "Open the interactive dashboard to compare universities, filter by year, and switch languages."
    };

    const fr = {
      langBtn: "🌐 English",
      subtitle: "Tableau de bord des inscriptions universitaires canadiennes",
      heroPill: "🎓 Données universitaires canadiennes",
      heroMain: "Comparez les inscriptions étudiantes dans les principales universités canadiennes.",
      heroNote: "Remarque : Les chiffres d'inscription sont approximatifs et proviennent de données publiques d'Universités Canada.",
      totalStudents: "Total des étudiants (sélection)",
      largestUniversity: "Plus grande université",
      averageEnrollment: "Inscription moyenne",
      growth5: "Croissance sur 5 ans",
      studentsWord: "étudiants",
      controls: "⚙ Contrôles du tableau de bord",
      compareUniversities: "Comparer les universités",
      selectAll: "Tout sélectionner",
      clearAll: "Tout effacer",
      selectUniversitiesToDisplay: "Sélectionnez les universités à afficher dans l'histogramme :",
      academicYear: "Année universitaire",
      totalByYear: (y) => `Total des inscriptions par université — année ${y}.`,
      uniTrendChart: "Université — Graphique de tendance",
      selectUniTrend: "Sélectionnez une université pour voir sa tendance d'inscription sur 5 ans :",
      enrollmentComparison: "Comparaison des inscriptions par université",
      enrollmentComparisonDesc: (y) => `Total des inscriptions par université — année ${y}. Utilisez les cases à cocher pour ajouter ou retirer des universités de la comparaison.`,
      enrollmentTrendTitle: "Tendance des inscriptions au fil du temps",
      enrollmentTrendDesc: (name) => `Variation annuelle des inscriptions pour ${name} de 2018–19 à 2022–23.`,
      avg5yr: "moyenne sur 5 ans",
      howToUse: "Comment utiliser CampusStats",
      howToBody: "Utilisez les contrôles pour explorer les graphiques et filtrer les universités.",
      dataSource: "Source des données : Universités Canada",
      dataSourceBody: "Données provenant d'Universités Canada (univcan.ca).",
      universitiesCount: (count, total) => `${count} sur ${total} universités`,
      emptySelectionMessage: "Aucune université sélectionnée. Veuillez en sélectionner au moins une.",
      home: "Accueil",
      dashboard: "Tableau de bord",
      homePill: "🍁 Données universitaires canadiennes · 2018–2023",
      homeTitle: "Explorez les inscriptions universitaires canadiennes",
      homeSub: "Un tableau de bord bilingue interactif comparant les inscriptions étudiantes.",
      openDashboard: "Ouvrir le tableau de bord →",
      learnMore: "En savoir plus",
      kpiTracked: "universités suivies",
      kpiYears: "années de données",
      kpiStudents: "étudiants dans le jeu de données",
      kpiPoints: "points de données",
      whatExplore: "Ce que vous pouvez explorer",
      whatExploreBody: "CampusStats rend les données claires, interactives et accessibles dans les deux langues officielles.",
      feat1t: "Comparaison en histogramme",
      feat1d: "Comparez les inscriptions entre plusieurs universités.",
      feat2t: "Analyse des tendances",
      feat2d: "Suivez l'évolution des inscriptions année par année.",
      feat3t: "Interface bilingue",
      feat3d: "Basculez entre l'anglais et le français à tout moment.",
      feat4t: "Filtres en direct",
      feat4d: "Sélectionnez les universités et mettez à jour les graphiques instantanément.",
      ready: "Prêt à explorer les données ?",
      readyBody: "Ouvrez le tableau de bord interactif pour comparer les universités."
    };

    return this.locale === "fr" ? fr : en;
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
  displayUniName(u) { return this.locale === "fr" ? u.nameFr : u.name; }
  displayUniShort(u) { return this.locale === "fr" ? u.shortFr : u.short; }

  mount() {
    const app = document.getElementById("app");
    if (!app) return;

    const shouldRenderDashboard = this.page === "dashboard" && this.hasEnteredDashboard;
    app.innerHTML = shouldRenderDashboard ? this.renderDashboard() : this.renderHome();
    this.bind();

    if (shouldRenderDashboard) {
      this.drawBar();
      this.drawLine();
    }
  }

  goDashboard() {
    this.hasEnteredDashboard = true;
    this.page = "dashboard";
    this.mount();
  }

  goHome() {
    this.page = "home";
    this.mount();
  }

  renderHome() {
    const tr = this.t();
    const totalAll = this.universities.reduce((sum, u) => sum + this.value(u.id), 0);

    return `
      <div class="hp-page">
        <div class="hp-container">
          <nav class="hp-nav">
            <div class="hp-brand"><span class="dot">◆</span><span>CampusStats</span></div>
            <div class="hp-links">
              <button class="hp-tab active">${tr.home}</button>
              <button class="hp-tab" id="goDashTop">${tr.dashboard}</button>
            </div>
            <button id="langBtn" class="hp-lang">${tr.langBtn}</button>
          </nav>
        </div>

        <div class="hp-hero-wrap">
          <section class="hp-hero hp-container">
            <div class="hp-pill">${tr.homePill}</div>
            <h1 class="hp-title">${tr.homeTitle}</h1>
            <p class="hp-sub">${tr.homeSub}</p>
            <div class="hp-cta">
              <button class="hp-btn primary" id="goDashHero">${tr.openDashboard}</button>
              <button class="hp-btn ghost">${tr.learnMore}</button>
            </div>

            <div class="hp-kpis">
              <div class="hp-kpi"><b>${this.universities.length}</b><span>${tr.kpiTracked}</span></div>
              <div class="hp-kpi"><b>${this.years().length}</b><span>${tr.kpiYears}</span></div>
              <div class="hp-kpi"><b>${this.formatNum(totalAll)}</b><span>${tr.kpiStudents}</span></div>
              <div class="hp-kpi"><b>${this.universities.length * this.years().length}</b><span>${tr.kpiPoints}</span></div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  renderDashboard() {
    const tr = this.t();
    const trUni = this.universities.find((u) => u.id === this.selectedTrend);
    const growth = this.growthFor(this.selectedTrend);
    const largest = this.largestSelected();
    const selectedArr = this.selectedArray();

    return `
      <div class="cs-page">
        <header class="topbar card-lite">
          <div class="brand" id="goHomeBrand" style="cursor:pointer" title="${tr.home}">
            <div class="brand-icon">✉</div>
            <div>
              <h1>CampusStats</h1>
              <p>${tr.subtitle}</p>
            </div>
          </div>
          <button id="langBtn" class="lang-btn">${tr.langBtn}</button>
        </header>

        <section class="controls card">
          <button class="text-btn" id="goHome">← ${tr.home}</button>
          <button class="text-btn" id="goHomeBtn">🏠 ${tr.home}</button>
        </section>

        <section class="hero card-hero">
          <div class="pill">${tr.heroPill}</div>
          <h2>CampusStats</h2>
          <p class="hero-main">${tr.heroMain}</p>
          <p class="hero-note">${tr.heroNote}</p>
        </section>

        <section class="stats-grid">
          ${this.statCard("👥", tr.totalStudents, selectedArr.length ? this.formatNum(this.totalSelected()) : "—", tr.universitiesCount(this.selected.size, this.universities.length), "blue")}
          ${this.statCard("🎓", tr.largestUniversity, largest ? this.displayUniShort(largest) : "—", largest ? `${this.formatNum(this.value(largest.id))} ${tr.studentsWord}` : "", "purple")}
          ${this.statCard("↗", tr.averageEnrollment, selectedArr.length ? this.formatNum(this.avgSelected()) : "—", this.year, "green")}
          ${this.statCard("↗", `${tr.growth5} · ${this.displayUniShort(trUni)}`, this.formatPct(growth.pct), `${this.formatNum(growth.first)} → ${this.formatNum(growth.last)}`, "green")}
        </section>

        <section class="controls card">
          <h3>${tr.controls}</h3>
          <div class="control-grid">
            <div>
              <div class="row-title">
                <strong>${tr.compareUniversities}</strong>
                <span>
                  <button class="text-btn" id="selectAll">${tr.selectAll}</button>
                  <span class="dot">·</span>
                  <button class="text-btn" id="clearAll">${tr.clearAll}</button>
                </span>
              </div>
              <p class="muted">${tr.selectUniversitiesToDisplay}</p>
              <div class="uni-list">${this.universities.map((u) => this.uniCheck(u)).join("")}</div>
            </div>

            <div>
              <strong>${tr.academicYear}</strong>
              <div class="year-row">${this.years().map((y) => `<button class="chip ${y === this.year ? "active" : ""}" data-year="${y}">${y}</button>`).join("")}</div>
              <p class="muted">${tr.totalByYear(this.year)}</p>

              <strong class="trend-title">${tr.uniTrendChart}</strong>
              <p class="muted">${tr.selectUniTrend}</p>
              <div class="trend-grid">
                ${this.universities
                  .map((u) => `<button class="trend-chip ${u.id === this.selectedTrend ? "active" : ""}" data-trend="${u.id}"><i style="background:${u.color}"></i>${this.displayUniShort(u)}</button>`)
                  .join("")}
              </div>
            </div>
          </div>
        </section>

        <section class="charts-grid">
          <article class="card chart-card">
            <h3>${tr.enrollmentComparison}</h3>
            <p class="muted">${tr.enrollmentComparisonDesc(this.year)}</p>
            <div class="legend">${selectedArr.map((u) => `<span><i style="background:${u.color}"></i>${this.displayUniShort(u)}</span>`).join("")}</div>
            ${selectedArr.length ? `<canvas id="barCanvas" width="640" height="320"></canvas>` : `<div class="empty-chart">${tr.emptySelectionMessage}</div>`}
          </article>

          <article class="card chart-card">
            <div class="line-head">
              <h3>${tr.enrollmentTrendTitle}</h3>
              <span class="single-legend"><i style="background:${trUni.color}"></i>${this.displayUniShort(trUni)}</span>
            </div>
            <p class="muted">${tr.enrollmentTrendDesc(this.displayUniName(trUni))}</p>
            <div class="line-kpis">
              <span class="pos">↗ ${this.formatPct(growth.pct)} ${tr.growth5}</span>
              <span class="sep">|</span>
              <span>— ${this.formatNum(Math.round(this.trendValues().reduce((a, b) => a + b, 0) / this.trendValues().length))} ${tr.avg5yr}</span>
            </div>
            <canvas id="lineCanvas" width="640" height="320"></canvas>
          </article>
        </section>
      </div>
    `;
  }

  statCard(icon, label, value, sub, tone) {
    return `<article class="card stat-card"><div class="stat-icon ${tone}">${icon}</div><div><p class="stat-label">${label}</p><h4>${value}</h4><p class="stat-sub">${sub}</p></div></article>`;
  }

  uniCheck(u) {
    return `<label class="uni-item">
      <input type="checkbox" data-uni="${u.id}" ${this.selected.has(u.id) ? "checked" : ""} />
      <span class="check" style="background:${u.color}">${this.selected.has(u.id) ? "✓" : ""}</span>
      <i style="background:${u.color}"></i>
      ${this.displayUniName(u)}
    </label>`;
  }

  bind() {
    document.getElementById("langBtn")?.addEventListener("click", () => {
      this.locale = this.locale === "en" ? "fr" : "en";
      this.mount();
    });

    document.getElementById("goHomeBtn")?.addEventListener("click", () => this.goHome());

    document.getElementById("goDashTop")?.addEventListener("click", () => this.goDashboard());
    document.getElementById("goDashHero")?.addEventListener("click", () => this.goDashboard());

    document.getElementById("goHome")?.addEventListener("click", () => this.goHome());
    document.getElementById("goHomeBrand")?.addEventListener("click", () => this.goHome());

    document.querySelectorAll("[data-year]").forEach((b) => b.addEventListener("click", () => {
      this.year = b.dataset.year;
      this.mount();
    }));

    document.querySelectorAll("[data-trend]").forEach((b) => b.addEventListener("click", () => {
      this.selectedTrend = b.dataset.trend;
      this.mount();
    }));

    document.querySelectorAll("[data-uni]").forEach((cb) => cb.addEventListener("change", () => {
      const id = cb.dataset.uni;
      if (cb.checked) this.selected.add(id);
      else this.selected.delete(id);
      this.mount();
    }));

    document.getElementById("selectAll")?.addEventListener("click", () => {
      this.universities.forEach((u) => this.selected.add(u.id));
      this.mount();
    });

    document.getElementById("clearAll")?.addEventListener("click", () => {
      this.selected = new Set();
      this.mount();
    });
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

    ctx.strokeStyle = "#d7deea";
    ctx.fillStyle = "#7a8ca8";
    ctx.font = "12px Inter, Arial";

    for (let i = 0; i <= 4; i++) {
      const y = margin.t + (plotH * i) / 4;
      ctx.setLineDash(i === 4 ? [] : [4, 4]);
      ctx.beginPath(); ctx.moveTo(margin.l, y); ctx.lineTo(w - margin.r, y); ctx.stroke();
      const v = Math.round(top - (top * i) / 4);
      ctx.setLineDash([]);
      ctx.fillText(v === 0 ? "0" : `${Math.round(v / 1000)}K`, 16, y + 4);
    }

    const slot = plotW / list.length;
    const barW = Math.min(60, slot * 0.74);

    list.forEach((u, idx) => {
      const val = this.value(u.id);
      const bh = (val / top) * plotH;
      const x = margin.l + idx * slot + (slot - barW) / 2;
      const y = margin.t + plotH - bh;
      ctx.fillStyle = u.color;
      ctx.fillRect(x, y, barW, bh);
      ctx.fillStyle = "#62789a";
      ctx.textAlign = "center";
      ctx.fillText(this.displayUniShort(u), x + barW / 2, h - 16);
    });
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

    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const yMin = min - 1500;
    const yMax = max + 1500;

    ctx.strokeStyle = "#d7deea";
    ctx.fillStyle = "#7a8ca8";
    ctx.font = "12px Inter, Arial";

    for (let i = 0; i <= 4; i++) {
      const y = margin.t + (plotH * i) / 4;
      ctx.setLineDash(i === 4 ? [] : [4, 4]);
      ctx.beginPath(); ctx.moveTo(margin.l, y); ctx.lineTo(w - margin.r, y); ctx.stroke();
      const v = Math.round(yMax - ((yMax - yMin) * i) / 4);
      ctx.setLineDash([]);
      ctx.fillText(`${Math.round(v / 1000)}K`, 20, y + 4);
    }

    const points = vals.map((v, i) => ({
      x: margin.l + (i * plotW) / (vals.length - 1),
      y: margin.t + ((yMax - v) / (yMax - yMin)) * plotH
    }));

    ctx.strokeStyle = uni.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();

    points.forEach((p) => {
      ctx.fillStyle = uni.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "#62789a";
    ctx.textAlign = "center";
    years.forEach((yr, i) => {
      const x = margin.l + (i * plotW) / (years.length - 1);
      ctx.fillText(yr, x, h - 12);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new CampusStatsDesign4();
});
