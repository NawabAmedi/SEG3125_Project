import React, { useMemo, useState } from "react";
import "./Design4.css";

const UNIVERSITIES = [
  { id: "uoft", short: "U of T", name: "University of Toronto", color: "#2d56d4" },
  { id: "ubc", short: "UBC", name: "Univ. of British Columbia", color: "#14986b" },
  { id: "mcgill", short: "McGill", name: "McGill University", color: "#df2f33" },
  { id: "ualberta", short: "U of A", name: "University of Alberta", color: "#d88413" },
  { id: "uottawa", short: "uOttawa", name: "University of Ottawa", color: "#7a45de" },
  { id: "queens", short: "Queen's", name: "Queen's University", color: "#1d8fb0" },
  { id: "mcmaster", short: "McMaster", name: "McMaster University", color: "#bc2a73" },
  { id: "waterloo", short: "Waterloo", name: "University of Waterloo", color: "#6ca611" }
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
  const [year, setYear] = useState("2022-23");
  const [selectedTrend, setSelectedTrend] = useState("uoft");
  const [selected, setSelected] = useState(new Set(["mcgill", "uottawa", "queens", "mcmaster", "waterloo"]));
  const [helpCollapsed, setHelpCollapsed] = useState(false);
  const [sourceCollapsed, setSourceCollapsed] = useState(false);

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
      if (!next.size) next.add(id);
      return next;
    });
  };

  const clearAll = () => {
    setSelected(new Set([selectedTrend || "uoft"]));
  };

  return (
    <div className="cs-page">
      <header className="topbar card-lite">
        <div className="brand">
          <div className="brand-icon">✉</div>
          <div>
            <h1>CampusStats</h1>
            <p>Canadian University Enrollment Dashboard</p>
          </div>
        </div>
        <button className="lang-btn">🌐 Français</button>
      </header>

      <section className="hero card-hero">
        <div className="pill">🎓 Canadian University Data</div>
        <h2>CampusStats</h2>
        <p className="hero-main">
          Compare student enrollment across major Canadian universities. Select universities and years to explore the data interactively.
        </p>
        <p className="hero-note">
          Note: Enrollment figures are approximate values derived from publicly available Universities Canada data.
        </p>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <div className="stat-icon blue">👥</div>
          <div>
            <p className="stat-label">Total Students (selected)</p>
            <h4>{totalSelected.toLocaleString("en-CA")}</h4>
            <p className="stat-sub">{selected.size} of {UNIVERSITIES.length} universities</p>
          </div>
        </article>
        <article className="card stat-card">
          <div className="stat-icon purple">🎓</div>
          <div>
            <p className="stat-label">Largest University</p>
            <h4>{largest ? largest.short : "—"}</h4>
            <p className="stat-sub">{largest ? `${ENROLLMENT[year][largest.id].toLocaleString("en-CA")} students` : ""}</p>
          </div>
        </article>
        <article className="card stat-card">
          <div className="stat-icon green">↗</div>
          <div>
            <p className="stat-label">Average Enrollment</p>
            <h4>{avgSelected.toLocaleString("en-CA")}</h4>
            <p className="stat-sub">{year}</p>
          </div>
        </article>
        <article className="card stat-card">
          <div className="stat-icon green">↗</div>
          <div>
            <p className="stat-label">5-Year Growth · {trendUni.short}</p>
            <h4>{`${growthPct >= 0 ? "+" : ""}${growthPct.toFixed(1)}%`}</h4>
            <p className="stat-sub">{first.toLocaleString("en-CA")} → {last.toLocaleString("en-CA")}</p>
          </div>
        </article>
      </section>

      <section className="controls card">
        <h3>⚙ Dashboard Controls</h3>
        <div className="control-grid">
          <div>
            <div className="row-title">
              <strong>Compare Universities</strong>
              <span>
                <button className="text-btn" onClick={() => setSelected(new Set(UNIVERSITIES.map((u) => u.id)))}>Select all</button>
                <span className="dot">·</span>
                <button className="text-btn" onClick={clearAll}>Clear all</button>
              </span>
            </div>
            <p className="muted">Select universities to display in the bar chart:</p>

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
                  {u.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <strong>Academic Year</strong>
            <div className="year-row">
              {YEARS.map((y) => (
                <button key={y} className={`chip ${year === y ? "active" : ""}`} onClick={() => setYear(y)}>
                  {y}
                </button>
              ))}
            </div>
            <p className="muted">Total student enrollment by university — {year} academic year.</p>

            <strong className="trend-title">University — Trend Chart</strong>
            <p className="muted">Select a university to view its 5-year enrollment trend:</p>
            <div className="trend-grid">
              {UNIVERSITIES.map((u) => (
                <button
                  key={u.id}
                  className={`trend-chip ${selectedTrend === u.id ? "active" : ""}`}
                  onClick={() => setSelectedTrend(u.id)}
                >
                  <i style={{ background: u.color }} />
                  {u.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="charts-grid">
        <article className="card chart-card">
          <h3>Enrollment Comparison by University</h3>
          <p className="muted">
            Total student enrollment by university — {year} academic year. Use the checkboxes to add or remove universities from the comparison.
          </p>
          <div className="legend">
            {selectedArray.map((u) => <span key={u.id}><i style={{ background: u.color }} />{u.short}</span>)}
          </div>
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
                  <text x={x + barW / 2} y={286} textAnchor="middle" fontSize="12" fill="#5f7698">{u.short}</text>
                </g>
              );
            })}
          </svg>
        </article>

        <article className="card chart-card">
          <div className="line-head">
            <h3>Enrollment Trend Over Time</h3>
            <span className="single-legend"><i style={{ background: trendUni.color }} />{trendUni.short}</span>
          </div>
          <p className="muted">
            Year-over-year enrollment change for {trendUni.name} from 2018–19 to 2022–23.
          </p>
          <div className="line-kpis">
            <span className="pos">↗ {`${growthPct >= 0 ? "+" : ""}${growthPct.toFixed(1)}%`} 5-Year Growth</span>
            <span className="sep">|</span>
            <span>— {trendAvg.toLocaleString("en-CA")} 5-yr average</span>
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
            <span>ⓘ <strong>How to use CampusStats</strong></span>
            <span>{helpCollapsed ? "▸" : "⌄"}</span>
          </button>
          {!helpCollapsed && (
            <p>
              Use the checkboxes to add or remove universities from the bar chart. Change the academic year
              using the Year buttons to see enrollment data for that year. Select a single university from
              the Trend Chart controls to update the line chart below.
            </p>
          )}
        </article>
        <article className={`card info-card ${sourceCollapsed ? "collapsed" : ""}`}>
          <button className="source-head" onClick={() => setSourceCollapsed((v) => !v)} aria-expanded={!sourceCollapsed}>
            <span><span className="source-icon">ℹ</span><strong>Data source: Universities Canada</strong></span>
            <span>{sourceCollapsed ? "▸" : "⌄"}</span>
          </button>
          {!sourceCollapsed && <p>Data sourced from Universities Canada (univcan.ca). Figures represent full-time equivalent students.</p>}
        </article>
      </section>
    </div>
  );
}
