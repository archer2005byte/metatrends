import type { Plugin } from "vite";

const previewSlides = `
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
`;

export function consultingImplicationsPreview(): Plugin {
  return {
    name: "consulting-implications-preview",
    enforce: "pre",
    transform(code, id) {
      if (!id.replaceAll("\\", "/").endsWith("/src/routes/index.tsx")) return null;

      const oldIds = 'const slideIds = ["cover", "top", "evidence", "commodity", "crowd", "embodiment", "energy", "longevity", "work", "human", "navigator", "today", "end"];';
      const newIds = 'const slideIds = ["cover", "top", "evidence", "commodity", "crowd", "embodiment", "energy", "longevity", "work", "human", "navigator", "today", "markets", "consulting", "bet", "end"];';
      const marker = '      <section className={`panel end-panel ${endRevealed ? "end-open" : ""}`} id="end">';

      if (!code.includes(oldIds) || !code.includes(marker)) {
        throw new Error("Consulting preview transform could not find its insertion markers.");
      }

      const transformed = code
        .replace(oldIds, newIds)
        .replace(marker, `${previewSlides}\n${marker}`);

      return { code: transformed, map: null };
    },
  };
}
