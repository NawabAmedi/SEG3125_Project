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
      "Use the checkboxes to add or remove universities from the bar chart. Change the academic year using the Year buttons to see enrollment data for that year. Select a single university from the Trend Chart controls to update the line chart below.",
    sourceTitle: "Data source: Universities Canada",
    sourceText: "Data sourced from Universities Canada (univcan.ca). Figures represent full-time equivalent students."
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
      "Utilisez les cases à cocher pour ajouter ou retirer des universités de l'histogramme. Changez l'année universitaire avec les boutons d'année. Sélectionnez une université dans les contrôles de tendance pour mettre à jour le graphique linéaire.",
    sourceTitle: "Source des données : Universités Canada",
    sourceText: "Données provenant d'Universités Canada (univcan.ca). Les chiffres représentent les étudiants équivalents temps plein."
  }
};

export default function Design4() {
  const [locale, setLocale] = useState("en");
  const [year, setYear] = useState("2022-23");
  const [selectedTrend, setSelectedTrend] = useState("uoft");
  const [selected, setSelected] = useState(new Set(["mcgill", "uottawa", "queens", "mcmaster", "waterloo"]));
  const [helpCollapsed, setHelpCollapsed] = useState(false);
  const [sourceCollapsed, setSourceCollapsed] = useState(false);

  const t = STRINGS[locale];

  const selectedArray = useMemo(
    () => UNIVERSITIES.filter((u) => selected.has(u.id)),
    [selected]
  );

  const totalSelected = useMemo(
    () => selectedArray.reduce((sum, u) => sum + ENROLLMENT[year][u.id], 0),
    [selectedArray, year]
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
      return next; // allow empty
    });
  };

  const clearAll = () => {
    setSelected(new Set()); // true clear all
  };

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
