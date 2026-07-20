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

export default function Design4() {
  const [page, setPage] = useState("home");
  const [locale, setLocale] = useState("en");
  const [year, setYear] = useState("2022-23");
  const [selectedTrend, setSelectedTrend] = useState("uoft");
  const [selected] = useState(new Set(["mcgill", "uottawa", "queens", "mcmaster", "waterloo"]));

  const selectedArray = useMemo(() => UNIVERSITIES.filter((u) => selected.has(u.id)), [selected]);
  const trendUni = UNIVERSITIES.find((u) => u.id === selectedTrend);
  const trendValues = YEARS.map((y) => ENROLLMENT[y][selectedTrend]);
  const lineMin = Math.min(...trendValues);
  const lineMax = Math.max(...trendValues);

  if (page === "home") {
    return (
      <div className="hp-page">
        <div className="hp-container">
          <nav className="hp-nav">
            <div className="hp-brand"><span className="dot">◆</span><span>CampusStats</span></div>
            <div className="hp-links">
              <button className="hp-tab active">{locale === "fr" ? "Accueil" : "Home"}</button>
              <button className="hp-tab" onClick={() => setPage("dashboard")}>{locale === "fr" ? "Tableau de bord" : "Dashboard"}</button>
            </div>
            <button className="hp-lang" onClick={() => setLocale(v => v === "en" ? "fr" : "en")}>
              {locale === "fr" ? "🌐 English" : "🌐 Français"}
            </button>
          </nav>
          <section className="hp-hero">
            <h1 className="hp-title">{locale === "fr" ? "Explorez les inscriptions universitaires canadiennes" : "Explore Canadian University Enrollment"}</h1>
            <p className="hp-sub">{locale === "fr" ? "Un tableau de bord bilingue interactif." : "An interactive bilingual dashboard."}</p>
            <button className="hp-btn primary" onClick={() => setPage("dashboard")}>
              {locale === "fr" ? "Ouvrir le tableau de bord →" : "Open Dashboard →"}
            </button>
          </section>
        </div>
      </div>
    );
  }

  const totalSelected = selectedArray.reduce((sum, u) => sum + ENROLLMENT[year][u.id], 0);
  const topBar = Math.max(50000, ...selectedArray.map((u) => ENROLLMENT[year][u.id]));

  return (
    <div className="cs-page">
      <header className="topbar card-lite">
        <div className="brand" style={{ cursor: "pointer" }} onClick={() => setPage("home")}>
          <div className="brand-icon">✉</div>
          <div>
            <h1>CampusStats</h1>
            <p>{locale === "fr" ? "Tableau de bord des inscriptions universitaires canadiennes" : "Canadian University Enrollment Dashboard"}</p>
          </div>
        </div>
        <button className="lang-btn" onClick={() => setLocale(v => v === "en" ? "fr" : "en")}>
          {locale === "fr" ? "🌐 English" : "🌐 Français"}
        </button>
      </header>

      <section className="controls card">
        <button className="text-btn" onClick={() => setPage("home")}>← {locale === "fr" ? "Accueil" : "Home"}</button>
        <div className="year-row">
          {YEARS.map((y) => (
            <button key={y} className={`chip ${year === y ? "active" : ""}`} onClick={() => setYear(y)}>{y}</button>
          ))}
        </div>
      </section>

      <section className="charts-grid">
        <article className="card chart-card">
          <h3>{locale === "fr" ? "Comparaison des inscriptions" : "Enrollment Comparison"}</h3>
          <p className="muted">{totalSelected.toLocaleString("en-CA")}</p>
          <svg viewBox="0 0 640 320" width="100%" height="320">
            {selectedArray.map((u, idx) => {
              const val = ENROLLMENT[year][u.id];
              const barW = 70, gap = 16;
              const x = 40 + idx * (barW + gap);
              const h = (val / topBar) * 220;
              const y = 260 - h;
              return (
                <g key={u.id}>
                  <rect x={x} y={y} width={barW} height={h} rx="6" fill={u.color} />
                  <text x={x + barW / 2} y={286} textAnchor="middle" fontSize="12" fill="#5f7698">{u.short}</text>
                </g>
              );
            })}
          </svg>
        </article>

        <article className="card chart-card">
          <h3>{locale === "fr" ? "Tendance" : "Trend"}</h3>
          <div className="trend-grid">
            {UNIVERSITIES.map((u) => (
              <button key={u.id} className={`trend-chip ${selectedTrend === u.id ? "active" : ""}`} onClick={() => setSelectedTrend(u.id)}>
                <i style={{ background: u.color }} />{u.short}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 640 320" width="100%" height="320">
            {(() => {
              const left = 50, right = 600, top = 30, bottom = 270;
              const pts = trendValues.map((v, i) => {
                const x = left + (i * (right - left)) / (trendValues.length - 1);
                const y = bottom - ((v - lineMin) / Math.max(1, lineMax - lineMin)) * (bottom - top);
                return [x, y];
              });
              const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
              return <>
                <path d={d} fill="none" stroke={trendUni.color} strokeWidth="3" />
                {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={trendUni.color} />)}
              </>;
            })()}
          </svg>
        </article>
      </section>
    </div>
  );
}
