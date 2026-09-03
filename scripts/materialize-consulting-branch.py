from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
index_path = ROOT / "src/routes/index.tsx"
vite_path = ROOT / "vite.gh.config.ts"
entry_path = ROOT / "src/gh-entry.tsx"
styles_path = ROOT / "src/styles.css"
preview_css_path = ROOT / "src/styles/presentation-consulting-preview.css"
consulting_css_path = ROOT / "src/styles/presentation-consulting.css"
plugin_path = ROOT / "preview-consulting-plugin.ts"

index = index_path.read_text()
old_ids = 'const slideIds = ["cover", "top", "evidence", "commodity", "crowd", "embodiment", "energy", "longevity", "work", "human", "navigator", "today", "end"];'
new_ids = 'const slideIds = ["cover", "top", "evidence", "commodity", "crowd", "embodiment", "energy", "longevity", "work", "human", "navigator", "today", "markets", "consulting", "bet", "end"];'
if old_ids in index:
    index = index.replace(old_ids, new_ids, 1)
elif new_ids not in index:
    raise SystemExit("Could not locate slideIds declaration")

slides = r'''
      <section className="panel market-shift-panel implications-panel" id="markets">
        <div className="implications-kicker dark">11 / FROM TECHNOLOGY TO OUTCOMES</div>
        <h2 className="implications-title dark">What happens<br /><span>to our world?</span></h2>
        <div className="market-shifts">
          <div><small>01</small><strong>CCTV MONITORING</strong><i>→</i><b>URBAN INTELLIGENCE</b></div>
          <div><small>02</small><strong>COMMAND CENTRES</strong><i>→</i><b>DECISION INTELLIGENCE</b></div>
          <div><small>03</small><strong>DRONES</strong><i>→</i><b>AUTONOMOUS AERIAL ECOSYSTEMS</b></div>
          <div><small>04</small><strong>COUNTER-UAS</strong><i>→</i><b>INTEGRATED AIRSPACE SECURITY</b></div>
          <div><small>05</small><strong>EMERGENCY RESPONSE</strong><i>→</i><b>PREDICTIVE RESPONSE</b></div>
          <div><small>06</small><strong>CYBERSECURITY</strong><i>→</i><b>DIGITAL TRUST + RESILIENCE</b></div>
        </div>
        <p className="market-payoff">The client may stop buying <em>assets.</em><br />They may start buying <strong>outcomes.</strong></p>
      </section>

      <section className="panel panel-dark implications-panel value-chain-panel" id="consulting">
        <div className="implications-kicker">12 / THE CONSULTING SHIFT</div>
        <h2 className="implications-title">The value moves<br /><span>upstream.</span></h2>
        <div className="value-chain-block yesterday"><span>YESTERDAY</span><div>DPR <i>→</i> RFP <i>→</i> PROCUREMENT <i>→</i> PMU <i>→</i> IMPLEMENTATION</div></div>
        <div className="value-chain-divider">↓</div>
        <div className="value-chain-block tomorrow"><span>TOMORROW</span><div>FORESIGHT <i>→</i> STRATEGY <i>→</i> ARCHITECTURE <i>→</i> GOVERNANCE <i>→</i> ASSURANCE <i>→</i> TRANSFORMATION</div></div>
        <p className="value-chain-payoff">When technology becomes abundant,<br /><strong>judgement moves up the value chain.</strong></p>
      </section>

      <section className="panel panel-lime implications-panel bet-panel" id="bet">
        <div className="implications-kicker dark">13 / THE QUESTION FOR THE ROOM</div>
        <h2 className="bet-question">If these shifts are real…<br /><span>where should we place our next big bet?</span></h2>
        <div className="bet-grid">
          <span>CAPABILITIES</span><span>SOLUTIONS</span><span>ALLIANCES</span><span>IP</span><span>NEW MARKETS</span><span>NEW ADVISORY</span>
        </div>
      </section>
'''

end_marker = '<section className={`panel end-panel ${endRevealed ? "end-open" : ""}`} id="end">'
if 'id="markets"' not in index:
    if end_marker not in index:
        raise SystemExit("Could not locate end slide marker")
    index = index.replace(end_marker, slides + end_marker, 1)

# The convergence slide must not exist in materialized source.
for forbidden in ["The future does not arrive", "WHEN FORCES COLLIDE", 'id="convergence"']:
    if forbidden in index:
        raise SystemExit(f"Forbidden convergence content remains: {forbidden}")
index_path.write_text(index)

vite = vite_path.read_text()
vite = vite.replace('import { consultingImplicationsPreview } from "./preview-consulting-plugin";\n', '')
vite = vite.replace('    consultingImplicationsPreview(),\n', '')
vite_path.write_text(vite)

entry = entry_path.read_text()
entry = entry.replace('import "./styles/presentation-consulting-preview.css";\n', '')
entry_path.write_text(entry)

if preview_css_path.exists():
    css = preview_css_path.read_text().replace(
        "/* Consulting implications preview — adapted into the MetaTrends visual grammar. */",
        "/* Consulting implications — native branch slides in the MetaTrends visual grammar. */",
        1,
    )
    consulting_css_path.write_text(css)

styles = styles_path.read_text()
normal_import = '@import "./styles/presentation-consulting.css";\n'
if normal_import not in styles:
    anchor = '@import "./styles/presentation-crowd.css";\n'
    if anchor not in styles:
        raise SystemExit("Could not locate styles import anchor")
    styles = styles.replace(anchor, anchor + normal_import, 1)
styles_path.write_text(styles)

if plugin_path.exists():
    plugin_path.unlink()
if preview_css_path.exists():
    preview_css_path.unlink()

print("Consulting implications materialized directly into branch source.")
