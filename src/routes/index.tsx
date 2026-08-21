import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const slideIds = ["cover", "top", "evidence", "commodity", "embodiment", "energy", "longevity", "work", "human", "navigator", "today", "end"];

const milestones = [
  { year: "2017", label: "Transformer", note: "the architecture" },
  { year: "2022", label: "ChatGPT", note: "the interface" },
  { year: "2024", label: "Multimodal", note: "the senses" },
  { year: "2025", label: "Reasoning", note: "the deliberation" },
  { year: "2026", label: "Agents", note: "the agency" },
];

const forceData = {
  intelligence: { label: "INTELLIGENCE", question: "What happens when intelligence becomes abundant?", chains: { 3: ["AI agents", "task bundles", "managerial redesign"], 10: ["scientific acceleration", "organisational redesign", "intelligence utility"], 30: ["ASI", "abundant cognition", "human ends"], } },
  embodiment: { label: "EMBODIMENT", question: "What happens when intelligence gets a body?", chains: { 3: ["copilots", "drones", "autonomous workflows"], 10: ["robots", "labs", "physical infrastructure"], 30: ["machine civilisation", "off-world industry", "new frontier"], } },
  energy: { label: "ENERGY", question: "What becomes the bottleneck when intelligence scales?", chains: { 3: ["compute demand", "data centres", "grid constraints"], 10: ["nuclear bridge", "storage", "energy geography"], 30: ["planetary scale", "stellar power", "Dyson swarms"], } },
  longevity: { label: "LONGEVITY", question: "Can we stay healthy for the catch-up?", chains: { 3: ["diagnostics", "prevention", "healthspan"], 10: ["drug discovery", "regeneration", "ageing treatment"], 30: ["longer lives", "new life stages", "time abundance"], } },
  work: { label: "WORK", question: "What happens when work is unbundled?", chains: { 3: ["task automation", "role redesign", "productivity pressure"], 10: ["income transition", "status transition", "institutional response"], 30: ["post-work economy", "UBI possibility", "meaning"], } },
  human: { label: "HUMAN PURPOSE", question: "What remains human in an ASI world?", chains: { 3: ["judgement", "trust", "accountability"], 10: ["agency", "dignity", "responsibility"], 30: ["ends", "meaning", "what must remain ours"], } },
} as const;
type ForceKey = keyof typeof forceData;
type Horizon = 3 | 10 | 30;

function MetaTrendsPresentation() {
  const [slideNumber, setSlideNumber] = useState("1");
  const [selectedForce, setSelectedForce] = useState<ForceKey>("intelligence");
  const [bostromStage, setBostromStage] = useState<0 | 1 | 2>(0);
  const [evidenceStage, setEvidenceStage] = useState<0 | 1 | 2>(0);
  const evidenceRevealed = evidenceStage === 1;
  const [commodityStage, setCommodityStage] = useState<0 | 1 | 2>(0);
  const [energyStage, setEnergyStage] = useState<0 | 1 | 2>(0);
  const [embodimentStage, setEmbodimentStage] = useState<0 | 1 | 2>(0);
  const [longevityStage, setLongevityStage] = useState<0 | 1 | 2>(0);
  const [workStage, setWorkStage] = useState<0 | 1 | 2>(0);
  const [endRevealed, setEndRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => setSlideNumber(String(Math.min(slideIds.length, Math.max(1, Math.round(window.scrollY / window.innerHeight) + 1))));
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === "INPUT") return;
      const backwards = event.key === "ArrowUp" || event.key === "PageUp" || (event.code === "Space" && event.shiftKey);
      const forwards = event.code === "Space" || event.key === "ArrowDown" || event.key === "PageDown";
      if (!backwards && !forwards) return;
      event.preventDefault();
      goTo(backwards ? -1 : 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKeyDown); };
  }, []);

  const goToIndex = (index: number) => {
    const destination = Math.max(0, Math.min(index, slideIds.length - 1));
    setSlideNumber(String(destination + 1));
    if (destination !== 1) setBostromStage(0);
    if (destination !== 2) setEvidenceStage(0);
    if (destination !== 3) setCommodityStage(0);
    if (destination !== 5) setEnergyStage(0);
    if (destination !== 4) setEmbodimentStage(0);
    if (destination !== 6) setLongevityStage(0);
    if (destination !== 7) setWorkStage(0);
    window.setTimeout(() => window.scrollTo({ top: destination * window.innerHeight, behavior: "smooth" }), 50);
  };

  const getCurrentIndex = () => slideIds.reduce((closest, id, index) => {
    const element = document.getElementById(id);
    if (!element) return closest;
    const distance = Math.abs(element.getBoundingClientRect().top);
    return distance < closest.distance ? { index, distance } : closest;
  }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;

  const goTo = (delta: number) => {
    goToIndex(getCurrentIndex() + delta);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, textarea, select, [data-no-advance]")) return;
    const current = getCurrentIndex();
    if (current === 2) {
      if (evidenceStage === 0) { setEvidenceStage(1); return; }
      if (evidenceStage === 1) { setEvidenceStage(2); return; }
      goTo(1);
      return;
    }
    if (current === 3) {
      if (commodityStage === 0) { setCommodityStage(1); return; }
      if (commodityStage === 1) { setCommodityStage(2); return; }
      goTo(1);
      return;
    }
    if (current === 5) {
      if (energyStage === 0) { setEnergyStage(1); return; }
      if (energyStage === 1) { setEnergyStage(2); return; }
      goTo(1);
      return;
    }
    if (current === 4) {
      if (embodimentStage === 0) { setEmbodimentStage(1); return; }
      if (embodimentStage === 1) { setEmbodimentStage(2); return; }
      goTo(1);
      return;
    }
    if (current === 6) {
      if (longevityStage === 0) { setLongevityStage(1); return; }
      if (longevityStage === 1) { setLongevityStage(2); return; }
      goTo(1);
      return;
    }
    if (current === 7) {
      if (workStage === 0) { setWorkStage(1); return; }
      if (workStage === 1) { setWorkStage(2); return; }
      goTo(1);
      return;
    }
    if (current === slideIds.length - 1) {
      if (!endRevealed) { setEndRevealed(true); return; }
      const back = event.clientX < window.innerWidth * 0.28;
      if (back) goTo(-1);
      return;
    }
    const forward = event.clientX >= window.innerWidth * 0.28;
    goTo(forward ? 1 : -1);
  };

  const handleBostromClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (bostromStage < 2) setBostromStage((stage) => (stage + 1) as 1 | 2);
    else goToIndex(2);
  };

  return (
    <main className="site-shell" onClick={handleCanvasClick}>
      <form className="slide-counter" onSubmit={(event) => { event.preventDefault(); goToIndex(Number(slideNumber) - 1); }}>
        <label htmlFor="slide-number">SLIDE</label>
        <input id="slide-number" type="text" inputMode="numeric" value={slideNumber} onChange={(event) => setSlideNumber(event.target.value.replace(/[^0-9]/g, ""))} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); goToIndex(Number((event.target as HTMLInputElement).value) - 1); } }} aria-label="Go to slide number" />
        <span>/ {slideIds.length}</span>
      </form>
      <section className="cover panel panel-lime" id="cover">
        <div className="cover-grid" aria-hidden="true"><span /><span /><span /></div>
        <header className="topbar cover-topbar"><span className="eyebrow dark-eyebrow">EY Managers // 2026</span><span className="page-index">00—10</span></header>
        <div className="cover-copy"><p className="kicker dark-kicker">A visual field note</p><h1>Meta<br /><em>Trends</em></h1><p className="cover-deck">The forces beneath the next three decades.</p></div>
        <div className="cover-footer"><span>INTELLIGENCE / ENERGY / LONGEVITY / WORK</span><span>CLICK TO ENTER →</span></div>
      </section>
      <section className="navigator panel panel-dark" id="navigator">
        <div className="section-head navigator-head"><p className="section-no">09 / THE FUTURE OPERATING ENVIRONMENT</p><h2>The operating system<br /><span>is changing.</span></h2><p className="navigator-subhead">Six forces. One system.</p></div>
        <div className="environment-workspace" data-no-advance>
          <div className="zone-map"><div className="zone-map-label">SYSTEM ZONES / SELECT ONE</div><div className="zone-map-grid">
            {(Object.keys(forceData) as ForceKey[]).map((key, index) => <button key={key} className={`zone-card zone-${index + 1} ${selectedForce === key ? "active" : ""}`} onClick={() => setSelectedForce(key)}><span>ZONE 0{index + 1}</span><b>{forceData[key].label}</b><i>↗</i></button>)}
          </div><div className="zone-map-footer"><span>CONNECTED SYSTEM</span><span>CLICK A ZONE TO EXAMINE</span></div></div>
          <div className="zone-detail"><div className="detail-kicker"><span>SELECTED ZONE</span><b>{forceData[selectedForce].label}</b></div><h3>{forceData[selectedForce].question}</h3><div className="horizon-bands">{([3, 10, 30] as Horizon[]).map((year) => <div className="horizon-band" key={year}><span>{year} YEARS</span><p>{forceData[selectedForce].chains[year].join("  →  ")}</p></div>)}</div><div className="detail-foot"><span>WHAT CHANGES / WHAT IT ENABLES / WHAT IT CONSTRAINS</span><b>↗ evidence layer next</b></div></div>
        </div>
      </section>
      <section className={`hero panel panel-dark bostrom-stage-${bostromStage}`} id="top">
        <div className="hero-grid" aria-hidden="true" />
        <header className="topbar"><span className="eyebrow">EY Managers // 2026</span><span className="page-index">01—11</span></header>
        <div className="hero-copy bostrom-copy"><p className="kicker">A question for the age of AI</p><h1>We may be<br /><em>living through</em><br />the Singularity.</h1></div>
        <aside className="bostrom-panel" aria-live="polite"><span>Nick Bostrom asked:</span><strong>What happens when our computers become smarter than us?</strong><b>We may never know when it happened.</b></aside>
        <div className="hero-signal"><span className="signal-dot" /><span>BOSTROM / THE QUESTION</span><span className="scroll-cue">↓ scroll to evidence</span></div>
        <button className="bostrom-click-zone" type="button" aria-label="Continue the Singularity slide" onClick={handleBostromClick} />
      </section>

      <section className={`panel panel-graph evidence-base ${evidenceRevealed ? "evidence-open" : ""}`} id="evidence">
        <div className="section-head"><p className="section-no">01 / THE ARRIVAL</p><h2>The singularity did not arrive as a bang.<br /><span>It arrived as a curve.</span></h2></div>
        <div className="evidence-grid">
          <article className="chart-card chart-dark"><div className="chart-label"><span>Capability frontier</span><strong>ACCELERATING</strong></div><svg className="curve-chart" viewBox="0 0 620 260" role="img" aria-label="Illustrative accelerating capability curve"><defs><linearGradient id="curveFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#d7ff4f" stopOpacity=".35"/><stop offset="100%" stopColor="#d7ff4f" stopOpacity="0"/></linearGradient></defs><path d="M45 220H585M45 175H585M45 130H585M45 85H585M45 40H585" className="gridline" /><path d="M45 220 C175 220 270 216 345 195 C420 174 455 115 485 75 C520 30 550 18 585 12 L585 220 L45 220Z" fill="url(#curveFill)" /><path d="M45 220 C175 220 270 216 345 195 C420 174 455 115 485 75 C520 30 550 18 585 12" className="neon-line" /><circle cx="470" cy="94" r="5" className="neon-dot" /><circle cx="585" cy="12" r="7" className="neon-dot" /><text x="45" y="247">2017</text><text x="245" y="247">2022</text><text x="430" y="247">2025</text><text x="558" y="247">NOW</text><text x="480" y="64" className="chart-callout">reasoning + agents</text></svg><p className="chart-caption">New capability layers are arriving before organisations finish absorbing the last one.</p></article>
          <article className="chart-card chart-light"><div className="chart-label"><span>Distance to expert performance</span><strong>COLLAPSING</strong></div><svg className="gap-chart" viewBox="0 0 620 260" role="img" aria-label="Illustrative collapse of the gap to expert performance"><path d="M45 220H585M45 175H585M45 130H585M45 85H585M45 40H585" className="gridline-light" /><path d="M45 42 C165 56 215 79 305 108 C385 135 425 169 475 194 C520 214 554 218 585 220" className="red-line" /><circle cx="585" cy="220" r="7" className="red-dot" /><text x="45" y="247">2019</text><text x="245" y="247">2022</text><text x="430" y="247">2025</text><text x="558" y="247">NOW</text><text x="54" y="31" className="chart-callout-dark">human / expert gap</text></svg><p className="chart-caption">Across many public tests, the gap is falling towards the floor. The tests now have to move.</p></article>
        </div>
        <div className="milestones" aria-label="AI milestone timeline">{milestones.map((item, index) => <div className={`milestone ${index === milestones.length - 1 ? "active" : ""}`} key={item.year}><span>{item.year}</span><b>{item.label}</b><small>{item.note}</small></div>)}</div>
        <p className="source-note">Directional visual, not a single benchmark. Source family for final evidence: Stanford AI Index / Epoch AI benchmark data.</p>
        <div className="evidence-overlay" aria-live="polite"><div className="benchmark-reveal-head"><span>THE BENCHMARK TREADMILL</span><b>harder → more real</b></div><div className="benchmark-cards"><article><small>01 / KNOWLEDGE</small><h3>MMLU</h3><p className="benchmark-full">Massive Multitask Language Understanding</p><p>Broad multi-task knowledge.</p><strong>SATURATED → MMLU-PRO</strong></article><article><small>02 / REASONING</small><h3>GPQA</h3><p className="benchmark-full">Graduate-Level Google-Proof Q&amp;A</p><p>Graduate-level science, designed to resist ordinary web search.</p><strong>EXPERT QUESTIONS</strong></article><article><small>03 / FRONTIER</small><h3>HLE</h3><p className="benchmark-full">Humanity’s Last Exam</p><p>Frontier academic knowledge. A milestone—not the end.</p><strong>STILL ACADEMIC</strong></article><article className="benchmark-agent-card"><small>04 / EXECUTION</small><h3>SWE-BENCH PRO<br />TERMINAL-BENCH<br />PAPER-BENCH</h3><p className="benchmark-full">Software engineering, terminal and research tasks</p><p>Can an agent complete real software or research work?</p><strong>DOING THE WORK</strong></article></div><p className="benchmark-thesis">The benchmark does not end.<br /><em>It moves from answering questions to doing the work.</em></p></div>
      </section>

      <section className={`panel panel-lime commodity-panel ${commodityStage === 1 ? "commodity-open" : ""}`} id="commodity"><div className="split-title"><p className="section-no">02 / THE COMMODITY</p><h2>When intelligence<br /><span>becomes cheap.</span></h2></div><div className="commodity-visual"><div className="stack-word">INTELLIGENCE</div><div className="commodity-arrow">↓</div><div className="scarce-row"><span>JUDGEMENT</span><span>TRUST</span><span>DATA</span><span>ACCOUNTABILITY</span></div></div><p className="large-caption">The scarce input to economic activity moves. Answers become abundant; choosing the question becomes valuable.</p><div className="commodity-overlay" aria-live="polite"><div className="commodity-overlay-head"><span>INTELLIGENCE / THE COST CURVE</span><b>cheaper → wider → harder to contain</b></div><div className="commodity-evidence-grid"><article className="token-card"><small>01 / TOKEN ECONOMICS</small><h3>↓↓↓</h3><div className="token-bars"><i /><i /><i /><i /><i /></div><p>Frontier intelligence is moving down the cost curve.</p><strong>MORE USE PER DOLLAR</strong></article><article><small>02 / SMALL MODELS</small><h3>SLMs</h3><p>Smaller, faster models bring useful intelligence to devices, enterprises and the edge.</p><strong>LOCAL / FAST / CHEAP</strong></article><article><small>03 / OPEN WEIGHTS</small><h3>OPEN<br />MODELS</h3><p>Capability is spreading beyond the frontier labs, with more control over cost, deployment and customisation.</p><strong>ACCESS CHANGES THE GAME</strong></article><article className="cyber-card"><small>04 / CAPABILITY DIFFUSION</small><h3>CYBER<br />POWER</h3><p>Advanced cyber capability is no longer confined to a handful of closed systems.</p><strong>INTELLIGENCE LEAVES THE LAB</strong></article></div><p className="commodity-thesis">Intelligence is becoming<br /><em>cheap, local and widely available.</em></p></div></section>

      <section className={`panel panel-dark embodiment-panel ${embodimentStage === 1 ? "embodiment-open" : ""}`} id="embodiment"><div className="section-head compact"><p className="section-no">03 / THE BODY</p><h2>Software is only<br /><span>half the revolution.</span></h2></div><div className="embodiment-field"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="core-mark">AI</div><div className="embodiment-node node-robot"><span>ROBOTS</span><i>↗</i></div><div className="embodiment-node node-lab"><span>AUTONOMOUS LABS</span><i>↗</i></div><div className="embodiment-node node-vehicle"><span>AUTONOMOUS VEHICLES</span><i>↗</i></div></div><p className="field-caption">AI can think at software speed. The world still moves at physical speed.</p><div className="embodiment-overlay" aria-live="polite"><div className="embodiment-image-frame"><img src="/gigafactory-berlin.jpg" alt="Empty production hall inside Tesla's Gigafactory Berlin" /></div><div className="embodiment-overlay-copy"><p className="section-no">THE FIRST INDUSTRIAL BODY</p><h3>The factory is becoming programmable.</h3><p>Today, it builds cars and batteries.<br />Tomorrow, it may build the machines that build them.</p><small>Gigafactory Berlin / production hall</small></div></div></section>

      <section className={`panel energy-panel ${energyStage === 1 ? "energy-dyson-open" : ""}`} id="energy"><div className="section-head"><p className="section-no">04 / THE BINDING CONSTRAINT</p><h2>Intelligence scales.<br /><span>Energy decides.</span></h2></div><div className="energy-layout"><div className="energy-bars" aria-label="Increasing energy demand illustration">{[22, 28, 35, 46, 61, 78, 94].map((height, index) => <div className="energy-bar-wrap" key={height}><div className="energy-bar" style={{height: `${height}%`}} /><small>{2019 + index}</small></div>)}<div className="bar-axis-label">data centres / compute / cooling / grid</div></div><div className="energy-ideas"><div className="idea"><b>NOW</b><span>Grid constraints</span></div><div className="idea"><b>NEXT</b><span>Nuclear as bridge</span></div><div className="idea future"><b>THEN</b><span>Planetary energy systems</span></div></div></div><div className="kardashev-infographic"><div className="kardashev-scale-head"><span>KARDASHEV SCALE</span><b>ENERGY AS A MEASURE OF CIVILISATION</b></div><div className="kardashev-cards"><article className="kardashev-card type-one"><div className="kardashev-type">TYPE <strong>I</strong></div><h3>PLANETARY</h3><p>Harnesses energy available across an entire planet.</p><b>≈ 10<sup>16</sup> W</b><small>Earth, fully switched on</small></article><div className="kardashev-connector">→</div><button type="button" className="kardashev-card type-two dyson-trigger" aria-label="View Dyson swarm" onClick={(event) => { event.stopPropagation(); setEnergyStage(1); }}><div className="kardashev-type">TYPE <strong>II</strong></div><h3>STELLAR</h3><p>Harnesses the output of its home star.</p><b>≈ 10<sup>26</sup> W</b><small>Dyson swarm territory</small></button><div className="kardashev-connector">→</div><article className="kardashev-card type-three"><div className="kardashev-type">TYPE <strong>III</strong></div><h3>GALACTIC</h3><p>Harnesses energy on the scale of an entire galaxy.</p><b>≈ 10<sup>36</sup> W</b><small>Stellar systems as infrastructure</small></article></div><p className="kardashev-footer">The jump is not just more power. It is a larger operating environment.</p></div><div className="dyson-overlay" aria-live="polite"><div className="dyson-overlay-header"><span>TYPE II / STELLAR CIVILISATION</span><b>VIEW: DYSON SWARM</b></div><div className="dyson-image-frame"><img src="/dyson-swarm.png" alt="Thousands of independent collectors and habitats orbiting a star as a Dyson swarm" /></div><div className="dyson-overlay-copy"><p className="section-no">THE NEXT OPERATING ENVIRONMENT</p><h3>A Type II civilisation does not build a shell around its star.</h3><p>It builds an industry around it.</p><small>Independent collectors. Habitats. Power infrastructure.</small></div></div></section>

      <section className={`panel longevity-panel ${longevityStage === 1 ? "longevity-open" : ""}`} id="longevity"><div className="longevity-copy"><p className="section-no">05 / THE PERSONAL CLOCK</p><h2>Stay healthy<br /><em>for the catch-up.</em></h2><p>Longevity escape velocity is a hypothesis: the possibility that medicine eventually extends healthy life faster than ageing removes it.</p></div><div className="longevity-dial"><div className="dial-ring"><div className="dial-arc" /><span className="dial-center">HEALTH<br /><b>→</b><br />TIME</span></div><span className="dial-note note-a">ageing</span><span className="dial-note note-b">medicine</span></div><p className="bottom-line">There is time for us—if we preserve ourselves long enough to use it.</p><div className="health-news-overlay" aria-live="polite"><div className="health-news-header"><span>THE BIOLOGY FRONTIER</span><b>prediction → design → trial → repair</b></div><div className="health-news-stage"><img src="/health-collage-clean.png" alt="Four visual studies of AI-enabled biology and longevity research" /><article className="health-news-card news-one"><small>ALPHAFOLD / NOBEL · OCT 2024</small><p>AlphaFold’s creators win the Nobel Prize in Chemistry, turning protein-structure prediction from a decades-old bottleneck into a computational capability.</p></article><article className="health-news-card news-two"><small>AI DRUG / PHASE III · JUL 2026</small><p>Insilico Medicine begins a Phase III trial for rentosertib, an AI-enabled candidate targeting idiopathic pulmonary fibrosis—now facing decisive human evidence.</p></article><article className="health-news-card news-three"><small>DRUG DESIGN / FRONTIER · APR 2025</small><p>Isomorphic Labs raises $600 million to build drug-design systems beyond AlphaFold, moving from understanding biology toward designing medicines.</p></article><article className="health-news-card news-four"><small>AGE REVERSAL / HUMAN TRIALS · JUN 2026</small><p>NewLimit raises $435 million and prepares a first human trial for a medicine intended to restore youthful function in liver cells.</p></article></div><p className="health-news-thesis">Biology is becoming <em>computable.</em></p></div></section>

      <section className={`panel work-panel ${workStage === 1 ? "work-open" : ""}`} id="work"><div className="section-head"><p className="section-no">06 / THE SOCIAL CLOCK</p><h2>What happens when<br /><span>work is unbundled?</span></h2></div><div className="work-flow"><div className="work-step old"><b>JOB</b><span>one bundle</span></div><div className="flow-line" /><div className="work-step split"><b>TASKS</b><span>automated / augmented</span></div><div className="flow-line" /><div className="work-step new"><b>MEANING</b><span>judgement / trust / care</span></div></div><div className="ubi-strip"><span>UBI?</span><div className="ubi-line"><i /><i /><i /><i /><i /></div><p>Maybe. But only after institutions translate abundance into social stability.</p></div><div className="work-overlay" aria-live="polite"><div className="work-overlay-head"><span>JOB DECOMPOSITION / ONE ROLE</span><b>the workflow is the new unit</b></div><div className="work-unbundle-grid"><div className="work-role-card"><small>ONE BUNDLE</small><h3>ENGAGEMENT<br />MANAGER</h3><p>A role is a container for many different kinds of work.</p></div><div className="work-overlay-arrow">→</div><div className="work-task-grid"><div><small>01</small><b>Research</b></div><div><small>02</small><b>Analysis</b></div><div><small>03</small><b>Drafting</b></div><div><small>04</small><b>Coordination</b></div><div><small>05</small><b>Review</b></div><div><small>06</small><b>Escalation</b></div></div><div className="work-overlay-arrow">→</div><div className="work-destination-grid"><div><b>Automated</b><small>repeatable execution</small></div><div><b>Agent-assisted</b><small>variable work</small></div><div><b>Human-led</b><small>novel exceptions</small></div></div></div><p className="work-overlay-thesis">The job is not the unit anymore.</p></div></section>

      <section className="panel panel-dark human-panel" id="human"><div className="human-visual"><div className="human-orbit" /><div className="human-dot">?</div><div className="human-label label-one">MEANS</div><div className="human-label label-two">ENDS</div><div className="human-label label-three">MEANING</div></div><div className="human-copy"><p className="section-no">07 / THE HUMAN RESIDUE</p><h2>When machines<br />can produce answers,</h2><p className="human-statement">humans remain responsible for deciding which questions are worth asking.</p></div></section>

      <section className="panel close-panel" id="today"><div className="close-mark">∞</div><p className="section-no">08 / BACK TO TODAY</p><h2>The future will not be<br /><em>delivered by intelligence alone.</em></h2><p className="close-copy">It will be delivered by institutions that can translate intelligence into operating reality.</p><div className="consulting-grid"><span>STRATEGY</span><span>OPERATING MODEL</span><span>GOVERNANCE</span><span>IMPLEMENTATION</span><span>TRUST</span></div><footer><span>There is time for us.</span><span>EY Managers // Meta Trends</span></footer></section><section className={`panel end-panel ${endRevealed ? "end-open" : ""}`} id="end"><div className="end-reveal" data-no-advance><img src="/resources-qr.svg" alt="QR code linking to the Meta Trends resources page" /><p className="end-reveal-label">Go deeper</p><a href="/resources">meta.rogerarcher.com/resources</a></div></section>
    </main>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meta Trends \u2014 The forces beneath the next three decades" },
      { name: "description", content: "A visual field note on intelligence, energy, longevity and the future of work. An interactive presentation for EY Managers." },
      { property: "og:title", content: "Meta Trends \u2014 A visual field note" },
      { property: "og:description", content: "Intelligence, energy, longevity and the future of work \u2014 the forces beneath the next three decades." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MetaTrendsPresentation,
});
