import React, { useMemo, useState } from "react";
import "./Design4.css";

const UNIVERSITIES = [
  { id: "uoft", short: "U of T", shortFr: "U de T", name: "University of Toronto", nameFr: "Université de Toronto", color: "#2d56d4" },
  { id: "ubc", short: "UBC", shortFr: "UBC", name: "Univ. of British Columbia", nameFr: "Univ. de la Colombie-Britannique", color: "#14986b" },
  { id: "mcgill", short: "McGill", shortFr: "McGill", name: "McGill University", nameFr: "Université McGill", color: "#df2f33" },
  { id: "ualberta", short: "U of A", shortFr: "U de A", name: "University of Alberta", nameFr: "Université de l'Alberta", color: "#d88413" },
  { id: "uottawa", short: "uOttawa", shortFr: "uOttawa", name: "University of Ottawa", nameFr: "Université d'Ottawa", color: "#7a45de" },
  { id: "queens", short: "Queen's", shortFr: "Queen's", name: "Queen's University", nameFr: "Université Queen's", color: "#1d8fb0" },
  { id: "mcmaster", short: "McMaster", shortFr: "McMaster", name: "McMaster University", nameFr: "Université McMaster", color: "#bc2a73" },
  { id: "waterloo", short: "Waterloo", shortFr: "Waterloo", name: "University of Waterloo", nameFr: "Université de Waterloo", color: "#6ca611" }
];

const ENROLLMENT = {
  "2018-19": { uoft: 85800, ubc: 60870, mcgill: 38900, ualberta: 37100, uottawa: 42000, queens: 25500, mcmaster: 33400, waterloo: 40178 },
  "2019-20": { uoft: 89300, ubc: 63150, mcgill: 39700, ualberta: 36900, uottawa: 43000, queens: 25800, mcmaster: 34600, waterloo: 41500 },
  "2020-21": { uoft: 93800, ubc: 64820, mcgill: 40400, ualberta: 37200, uottawa: 44100, queens: 26200, mcmaster: 35700, waterloo: 41900 },
  "2021-22": { uoft: 97000, ubc: 65990, mcgill: 41100, ualberta: 37500, uottawa: 45500, queens: 26600, mcmaster: 36500, waterloo: 43620 },
  "2022-23": { uoft: 97000, ubc: 66400, mcgill: 41000, ualberta: 37000, uottawa: 46340, queens: 26800, mcmaster: 37000, waterloo: 44500 }
};

const YEARS = Object.keys(ENROLLMENT);

const STRINGS = {
  en: {
    langBtn: "🌐 Français",
    subtitle: "Canadian University Enrollment Dashboard",
    heroPill: "🎓 Canadian University Data",
    heroMain: "Compare student enrollment across major Canadian universities. Select universities and years to explore the data interactively.",
    heroNote: "Note: Enrollment figures are approximate values derived from publicly available Universities Canada data.",
    totalStudents: "Total Students (selected)",
    largestUni: "Largest University",
    avgEnrollment: "Average Enrollment",
    growth: "5-Year Growth",
    students: "students",
    ofUniversities: (n, total) => `${n} of ${total} universities`,
    controls: "⚙ Dashboard Controls",
    compare: "Compare Universities",
    selectAll: "Select all",
    clearAll: "Clear all",
    selectUniversities: "Select universities to display in the bar chart:",
    academicYear: "Academic Year",
    totalByYear: (y) => `Total student enrollment by university — ${y} academic year.`,
    trendTitle: "University — Trend Chart",
    trendHelp: "Select a university to view its 5-year enrollment trend:",
    barTitle: "Enrollment Comparison by University",
    barDesc: (y) => `Total student enrollment by university — ${y} academic year. Use the checkboxes to add or remove universities from the comparison.`,
    emptyBar: "No universities selected. Please select at least one university using the checkboxes above.",
    lineTitle: "Enrollment Trend Over Time",
    yoy: (name) => `Year-over-year enrollment change for ${name} from 2018–19 to 2022–23.`,
    avg5: "5-yr average",
    howTo: "How to use CampusStats",
    howToText:
      "Use the checkboxes to add or remove universities from the bar chart. Change the academic year using the year buttons. Select a university in the trend section to view its 5-year line chart. Switch languages at any time.",
    sourceTitle: "Data source: Universities Canada",
    sourceText: "Data sourced from Universities Canada (univcan.ca). Figures represent full-time equivalent students.",

    homeNavHome: "Home",
    homeNavDash: "Dashboard",
    homePill: "🍁 Canadian University Data · 2018–2023",
    homeTitle: "Explore Canadian University Enrollment",
    homeSub:
      "An interactive bilingual dashboard comparing student enrollment across major Canadian universities. Select institutions, filter by year, and switch languages.",
    openDashboard: "Open Dashboard →",
    learnMore: "Learn more",
    kpiTracked: "universities tracked",
    kpiYears: "years of data",
    kpiStudents: "students in dataset",
    kpiPoints: "enrollment data points",
    whatExplore: "What you can explore",
    whatExploreBody:
      "CampusStats is designed to make enrollment data clear, interactive, and accessible in both official languages.",
    feat1t: "Bar Chart Comparison",
    feat1d: "Compare enrollment side by side across multiple universities for any academic year from 2018–19 to 2022–23.",
    feat2t: "Trend Analysis",
    feat2d: "Track how enrollment changed year over year with a 5-year line chart and average reference.",
    feat3t: "Bilingual Interface",
    feat3d: "Switch between English and French at any time. All labels, chart text, and number formats update instantly.",
    feat4t: "Live Filters",
    feat4d: "Select universities with color-coded checkboxes and update both charts simultaneously.",
    included: "8 UNIVERSITIES INCLUDED",
    aboutData: "About the data",
    aboutDataBody:
      "Enrollment figures are approximate values based on publicly available data from Universities Canada (univcan.ca). This dashboard uses a synthetic educational dataset for demonstration.",
    ready: "Ready to explore the data?",
    readyBody: "Open the interactive dashboard to compare universities, filter by year, and switch languages.",
    footerLeft: "CampusStats · University of Ottawa · SEG3125 Assignment 5",
    footerHome: "Home",
    footerDash: "Dashboard",
    footerSource: "univcan.ca"
  },
  fr: {
    langBtn: "🌐 English",
    subtitle: "Tableau de bord des inscriptions universitaires canadiennes",
    heroPill: "🎓 Données universitaires canadiennes",
    heroMain: "Comparez les inscriptions étudiantes dans les principales universités canadiennes. Sélectionnez les universités et les années pour explorer les données.",
    heroNote: "Remarque : Les chiffres d'inscription sont approximatifs et proviennent de données publiques d'Universités Canada.",
    totalStudents: "Total des étudiants (sélection)",
    largestUni: "Plus grande université",
    avgEnrollment: "Inscription moyenne",
    growth: "Croissance sur 5 ans",
    students: "étudiants",
    ofUniversities: (n, total) => `${n} sur ${total} universités`,
    controls: "⚙ Contrôles du tableau de bord",
    compare: "Comparer les universités",
    selectAll: "Tout sélectionner",
    clearAll: "Tout effacer",
    selectUniversities: "Sélectionnez les universités à afficher dans l'histogramme :",
    academicYear: "Année universitaire",
    totalByYear: (y) => `Total des inscriptions par université — année ${y}.`,
    trendTitle: "Université — Graphique de tendance",
    trendHelp: "Sélectionnez une université pour voir sa tendance d'inscription sur 5 ans :",
    barTitle: "Comparaison des inscriptions par université",
    barDesc: (y) => `Total des inscriptions par université — année ${y}. Utilisez les cases à cocher pour ajouter ou retirer des universités de la comparaison.`,
    emptyBar: "Aucune université sélectionnée. Veuillez en sélectionner au moins une à l'aide des cases ci-dessus.",
    lineTitle: "Tendance des inscriptions au fil du temps",
    yoy: (name) => `Variation annuelle des inscriptions pour ${name} de 2018–19 à 2022–23.`,
    avg5: "moyenne sur 5 ans",
    howTo: "Comment utiliser CampusStats",
    howToText:
      "Utilisez les cases à cocher pour ajouter ou retirer des universités de l'histogramme. Changez l'année universitaire avec les boutons d'année. Sélectionnez une université pour voir sa courbe sur 5 ans. Changez de langue à tout moment.",
    sourceTitle: "Source des données : Universités Canada",
    sourceText: "Données provenant d'Universités Canada (univcan.ca). Les chiffres représentent les étudiants équivalents temps plein.",

    homeNavHome: "Accueil",
    homeNavDash: "Tableau de bord",
    homePill: "🍁 Données universitaires canadiennes · 2018–2023",
    homeTitle: "Explorez les inscriptions universitaires canadiennes",
    homeSub:
      "Un tableau de bord bilingue interactif comparant les inscriptions étudiantes dans les principales universités canadiennes. Sélectionnez les institutions, filtrez par année et changez de langue.",
    openDashboard: "Ouvrir le tableau de bord →",
    learnMore: "En savoir plus",
    kpiTracked: "universités suivies",
    kpiYears: "années de données",
    kpiStudents: "étudiants dans le jeu de données",
    kpiPoints: "points de données",
    whatExplore: "Ce que vous pouvez explorer",
    whatExploreBody:
      "CampusStats est conçu pour rendre les données d'inscription claires, interactives et accessibles dans les deux langues officielles.",
    feat1t: "Comparaison en histogramme",
    feat1d: "Comparez les inscriptions côte à côte entre plusieurs universités pour chaque année de 2018–19 à 2022–23.",
    feat2t: "Analyse des tendances",
    feat2d: "Suivez l'évolution des inscriptions année après année avec une courbe sur 5 ans et une moyenne de référence.",
    feat3t: "Interface bilingue",
    feat3d: "Basculez entre l'anglais et le français à tout moment. Les libellés, textes et formats numériques se mettent à jour instantanément.",
    feat4t: "Filtres en direct",
    feat4d: "Sélectionnez les universités avec des cases à cocher colorées et mettez à jour les deux graphiques simultanément.",
    included: "8 UNIVERSITÉS INCLUSES",
    aboutData: "À propos des données",
    aboutDataBody:
      "Les chiffres d'inscription sont des valeurs approximatives basées sur des données publiques d'Universités Canada (univcan.ca). Ce tableau de bord utilise un jeu de données éducatif synthétique.",
    ready: "Prêt à explorer les données ?",
    readyBody: "Ouvrez le tableau de bord interactif pour comparer les universités, filtrer par année et changer de langue.",
    footerLeft: "CampusStats · Université d'Ottawa · SEG3125 Devoir 5",
    footerHome: "Accueil",
    footerDash: "Tableau de bord",
    footerSource: "univcan.ca"
  }
};

export default function Design4() {
  const [page, setPage] = useState("home");
  const [locale, setLocale] = useState("en");
  const [year, setYear] = useState("2022-23");
  const [selectedTrend, setSelectedTrend] = useState("uoft");
  const [selected, setSelected] = useState(new Set(["mcgill", "uottawa", "queens", "mcmaster", "waterloo"]));
  const [helpCollapsed, setHelpCollapsed] = useState(false);
  const [sourceCollapsed, setSourceCollapsed] = useState(false);

  const t = STRINGS[locale];

  const selectedArray = useMemo(() => UNIVERSITIES.filter((u) => selected.has(u.id)), [selected]);

  const totalSelected = useMemo(
    () => selectedArray.reduce((sum, u) => sum + ENROLLMENT[year][u.id], 0),
    [selectedArray, year]
  );

  const totalAllCurrentYear = useMemo(
    () => UNIVERSITIES.reduce((sum, u) => sum + ENROLLMENT[year][u.id], 0),
    [year]
  );

  const largest = useMemo(() => {
    if (!selectedArray.length) return null;
    return selectedArray.reduce((max, u) => (ENROLLMENT[year][u.id] > ENROLLMENT[year][max.id] ? u : max), selectedArray[0]);
  }, [selectedArray, year]);

  const avgSelected = useMemo(
    () => (selectedArray.length ? Math.round(totalSelected / selectedArray.length) : 0),
    [selectedArray.length, totalSelected]
  );

  const trendUni = UNIVERSITIES.find((u) => u.id === selectedTrend);
  const first = ENROLLMENT["2018-19"][selectedTrend];
  const last = ENROLLMENT["2022-23"][selectedTrend];
  const growthPct = ((last - first) / first) * 100;
  const trendValues = YEARS.map((y) => ENROLLMENT[y][selectedTrend]);
  const trendAvg = Math.round(trendValues.reduce((a, b) => a + b, 0) / trendValues.length);

  const topBar = Math.max(50000, ...selectedArray.map((u) => ENROLLMENT[year][u.id]));
  const lineMin = Math.min(...trendValues);
  const lineMax = Math.max(...trendValues);

  const toggleUni = (id, checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const clearAll = () => setSelected(new Set());

  if (page === "home") {
    return (
      <div className="hp-page">
        <div className="hp-container">
          <nav className="hp-nav">
            <div className="hp-brand">
              <span className="dot">◆</span>
              <span>CampusStats</span>
            </div>
            <div className="hp-links">
              <button className="hp-tab active">{t.homeNavHome}</button>
              <button className="hp-tab" onClick={() => setPage("dashboard")}>{t.homeNavDash}</button>
            </div>
            <button className="hp-lang" onClick={() => setLocale((v) => (v === "en" ? "fr" : "en"))}>
              {locale === "fr" ? "🌐 English" : "🌐 Français"}
            </button>
          </nav>
        </div>

        <div className="hp-hero-wrap">
          <section className="hp-hero hp-container">
            <div className="hp-pill">{t.homePill}</div>
            <h1 className="hp-title">{t.homeTitle}</h1>
            <p className="hp-sub">{t.homeSub}</p>
            <div className="hp-cta">
              <button className="hp-btn primary" onClick={() => setPage("dashboard")}>{t.openDashboard}</button>
              <button className="hp-btn ghost">{t.learnMore}</button>
            </div>

            <div className="hp-kpis">
              <div className="hp-kpi"><b>{UNIVERSITIES.length}</b><span>{t.kpiTracked}</span></div>
              <div className="hp-kpi"><b>{YEARS.length}</b><span>{t.kpiYears}</span></div>
              <div className="hp-kpi"><b>{totalAllCurrentYear.toLocaleString("en-CA")}</b><span>{t.kpiStudents}</span></div>
              <div className="hp-kpi"><b>{UNIVERSITIES.length * YEARS.length}</b><span>{t.kpiPoints}</span></div>
            </div>
          </section>
        </div>

        <section className="hp-section">
          <div className="hp-container">
            <h2>{t.whatExplore}</h2>
            <p className="lead">{t.whatExploreBody}</p>
            <div className="hp-cards">
              <article className="hp-card"><h3>{t.feat1t}</h3><p>{t.feat1d}</p></article>
              <article className="hp-card"><h3>{t.feat2t}</h3><p>{t.feat2d}</p></article>
              <article className="hp-card"><h3>{t.feat3t}</h3><p>{t.feat3d}</p></article>
              <article className="hp-card"><h3>{t.feat4t}</h3><p>{t.feat4d}</p></article>
            </div>
          </div>
        </section>

        <section className="hp-unis">
          <div className="hp-container">
            <h4>{t.included}</h4>
            <div className="hp-chip-row">
              {UNIVERSITIES.map((u) => (
                <span key={u.id} className="hp-chip">
                  <i style={{ background: u.color }} />
                  {locale === "fr" ? u.nameFr : u.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-data">
          <div className="hp-container">
            <div className="hp-data-box">
              <div>
                <h2 style={{ margin: "0 0 10px" }}>{t.aboutData}</h2>
                <p className="lead" style={{ fontSize: 18, margin: 0 }}>{t.aboutDataBody}</p>
              </div>
              <div>
                <p><strong>Data range:</strong> 2018-19 → 2022-23</p>
                <p><strong>Universities:</strong> {UNIVERSITIES.length}</p>
                <p><strong>Data type:</strong> Full-time equivalent</p>
                <p><strong>Source:</strong> univcan.ca</p>
              </div>
            </div>
          </div>
        </section>

        <section className="hp-cta-bottom">
          <div className="hp-container">
            <h3>{t.ready}</h3>
            <p>{t.readyBody}</p>
            <button className="hp-btn primary" onClick={() => setPage("dashboard")}>{t.openDashboard}</button>
          </div>
        </section>

        <footer className="hp-footer">
          <div className="hp-container">
            <span>{t.footerLeft}</span>
            <span>{t.footerHome} · {t.footerDash} · {t.footerSource}</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="cs-page">
      <header className="topbar card-lite">
        <div className="brand">
          <div className="brand-icon">✉</div>
          <div>
            <h1>CampusStats</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>
        <button className="lang-btn" onClick={() => setLocale((v) => (v === "en" ? "fr" : "en"))}>
          {t.langBtn}
        </button>
      </header>

      <section className="hero card-hero">
        <div className="pill">{t.heroPill}</div>
        <h2>CampusStats</h2>
        <p className="hero-main">{t.heroMain}</p>
        <p className="hero-note">{t.heroNote}</p>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <div className="stat-icon blue">👥</div>
          <div>
            <p className="stat-label">{t.totalStudents}</p>
            <h4>{selectedArray.length ? totalSelected.toLocaleString("en-CA") : "—"}</h4>
            <p className="stat-sub">{t.ofUniversities(selected.size, UNIVERSITIES.length)}</p>
          </div>
        </article>
        <article className="card stat-card">
          <div className="stat-icon purple">🎓</div>
          <div>
            <p className="stat-label">{t.largestUni}</p>
            <h4>{largest ? (locale === "fr" ? largest.shortFr : largest.short) : "—"}</h4>
            <p className="stat-sub">{largest ? `${ENROLLMENT[year][largest.id].toLocaleString("en-CA")} ${t.students}` : ""}</p>
          </div>
        </article>
        <article className="card stat-card">
          <div className="stat-icon green">↗</div>
          <div>
            <p className="stat-label">{t.avgEnrollment}</p>
            <h4>{selectedArray.length ? avgSelected.toLocaleString("en-CA") : "—"}</h4>
            <p className="stat-sub">{year}</p>
          </div>
        </article>
        <article className="card stat-card">
          <div className="stat-icon green">↗</div>
          <div>
            <p className="stat-label">{t.growth} · {locale === "fr" ? trendUni.shortFr : trendUni.short}</p>
            <h4>{`${growthPct >= 0 ? "+" : ""}${growthPct.toFixed(1)}%`}</h4>
            <p className="stat-sub">{first.toLocaleString("en-CA")} → {last.toLocaleString("en-CA")}</p>
          </div>
        </article>
      </section>

      <section className="controls card">
        <h3>{t.controls}</h3>
        <div className="control-grid">
          <div>
            <div className="row-title">
              <strong>{t.compare}</strong>
              <span>
                <button className="text-btn" onClick={() => setSelected(new Set(UNIVERSITIES.map((u) => u.id)))}>{t.selectAll}</button>
                <span className="dot">·</span>
                <button className="text-btn" onClick={clearAll}>{t.clearAll}</button>
              </span>
            </div>
            <p className="muted">{t.selectUniversities}</p>

            <div className="uni-list">
              {UNIVERSITIES.map((u) => (
                <label className="uni-item" key={u.id}>
                  <input
                    type="checkbox"
                    checked={selected.has(u.id)}
                    onChange={(e) => toggleUni(u.id, e.target.checked)}
                  />
                  <span className="check" style={{ background: u.color }}>{selected.has(u.id) ? "✓" : ""}</span>
                  <i style={{ background: u.color }} />
                  {locale === "fr" ? u.nameFr : u.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <strong>{t.academicYear}</strong>
            <div className="year-row">
              {YEARS.map((y) => (
                <button key={y} className={`chip ${year === y ? "active" : ""}`} onClick={() => setYear(y)}>
                  {y}
                </button>
              ))}
            </div>
            <p className="muted">{t.totalByYear(year)}</p>

            <strong className="trend-title">{t.trendTitle}</strong>
            <p className="muted">{t.trendHelp}</p>
            <div className="trend-grid">
              {UNIVERSITIES.map((u) => (
                <button
                  key={u.id}
                  className={`trend-chip ${selectedTrend === u.id ? "active" : ""}`}
                  onClick={() => setSelectedTrend(u.id)}
                >
                  <i style={{ background: u.color }} />
                  {locale === "fr" ? u.shortFr : u.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="charts-grid">
        <article className="card chart-card">
          <h3>{t.barTitle}</h3>
          <p className="muted">{t.barDesc(year)}</p>
          <div className="legend">
            {selectedArray.map((u) => <span key={u.id}><i style={{ background: u.color }} />{locale === "fr" ? u.shortFr : u.short}</span>)}
          </div>

          {!selectedArray.length ? (
            <div className="empty-chart">{t.emptyBar}</div>
          ) : (
            <svg viewBox="0 0 640 320" width="100%" height="320" aria-label="bar chart">
              {selectedArray.map((u, idx) => {
                const val = ENROLLMENT[year][u.id];
                const barW = 70;
                const gap = 16;
                const x = 40 + idx * (barW + gap);
                const h = (val / topBar) * 220;
                const y = 260 - h;
                return (
                  <g key={u.id}>
                    <rect x={x} y={y} width={barW} height={h} rx="6" fill={u.color} opacity="0.95" />
                    <text x={x + barW / 2} y={286} textAnchor="middle" fontSize="12" fill="#5f7698">{locale === "fr" ? u.shortFr : u.short}</text>
                  </g>
                );
              })}
            </svg>
          )}
        </article>

        <article className="card chart-card">
          <div className="line-head">
            <h3>{t.lineTitle}</h3>
            <span className="single-legend"><i style={{ background: trendUni.color }} />{locale === "fr" ? trendUni.shortFr : trendUni.short}</span>
          </div>
          <p className="muted">{t.yoy(locale === "fr" ? trendUni.nameFr : trendUni.name)}</p>
          <div className="line-kpis">
            <span className="pos">↗ {`${growthPct >= 0 ? "+" : ""}${growthPct.toFixed(1)}%`} {t.growth}</span>
            <span className="sep">|</span>
            <span>— {trendAvg.toLocaleString("en-CA")} {t.avg5}</span>
          </div>
          <svg viewBox="0 0 640 320" width="100%" height="320" aria-label="line chart">
            {(() => {
              const left = 50, right = 600, top = 30, bottom = 270;
              const pts = trendValues.map((v, i) => {
                const x = left + (i * (right - left)) / (trendValues.length - 1);
                const y = bottom - ((v - lineMin) / Math.max(1, lineMax - lineMin)) * (bottom - top);
                return [x, y];
              });
              const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
              return (
                <>
                  <path d={d} fill="none" stroke={trendUni.color} strokeWidth="3" />
                  {pts.map((p, i) => <circle key={YEARS[i]} cx={p[0]} cy={p[1]} r="4" fill={trendUni.color} />)}
                  {YEARS.map((y, i) => (
                    <text key={y} x={pts[i][0]} y={294} textAnchor="middle" fontSize="12" fill="#5f7698">{y}</text>
                  ))}
                </>
              );
            })()}
          </svg>
        </article>
      </section>

      <section className="bottom-grid">
        <article className={`card info-card ${helpCollapsed ? "collapsed" : ""}`}>
          <button className="info-head" onClick={() => setHelpCollapsed((v) => !v)} aria-expanded={!helpCollapsed}>
            <span>ⓘ <strong>{t.howTo}</strong></span>
            <span>{helpCollapsed ? "▸" : "⌄"}</span>
          </button>
          {!helpCollapsed && <p>{t.howToText}</p>}
        </article>
        <article className={`card info-card ${sourceCollapsed ? "collapsed" : ""}`}>
          <button className="source-head" onClick={() => setSourceCollapsed((v) => !v)} aria-expanded={!sourceCollapsed}>
            <span><span className="source-icon">ℹ</span><strong>{t.sourceTitle}</strong></span>
            <span>{sourceCollapsed ? "▸" : "⌄"}</span>
          </button>
          {!sourceCollapsed && <p>{t.sourceText}</p>}
        </article>
      </section>
    </div>
  );
}
