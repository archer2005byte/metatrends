from pathlib import Path
import re

p = Path('src/routes/index.tsx')
s = p.read_text()

s = s.replace('{ year: "2024", label: "Multimodal", note: "the senses" }', '{ year: "2023", label: "Multimodal", note: "the senses" }')
s = s.replace('{ year: "2025", label: "Reasoning", note: "the deliberation" }', '{ year: "2024", label: "Reasoning", note: "the deliberation" }')
s = s.replace('{ year: "2026", label: "Agents", note: "the agency" }', '{ year: "2025", label: "Agents", note: "the agency" }')

s = s.replace('["nuclear bridge", "storage", "energy geography"]', '["nuclear + storage", "grid build-out", "energy geography"]')
s = s.replace('<span>Nuclear as bridge</span>', '<span>Nuclear + storage</span>')
s = s.replace('data centres / compute / cooling / grid', 'illustrative pressure / data centres / compute / cooling / grid')

s = s.replace('<header className="topbar cover-topbar"><span className="eyebrow dark-eyebrow">EY Managers // 2026</span><span className="page-index">00—11</span></header>', '<header className="topbar cover-topbar"><span className="eyebrow dark-eyebrow">EY Managers // 2026</span></header>')
s = s.replace('<header className="topbar"><span className="eyebrow">EY Managers // 2026</span><span className="page-index">01—12</span></header>', '<header className="topbar"><span className="eyebrow">EY Managers // 2026</span></header>')

s = s.replace('10 / THE FUTURE OPERATING ENVIRONMENT', '09 / THE FUTURE OPERATING ENVIRONMENT')
s = s.replace('09 / BACK TO TODAY', '10 / BACK TO TODAY')
s = s.replace('Directional visual, not a single benchmark. Source family for final evidence: Stanford AI Index / Epoch AI benchmark data.', 'Directional visual; not a single benchmark. Sources: Stanford AI Index / Epoch AI.')

evidence_new = '''<div className="evidence-overlay threshold-overlay" aria-live="polite">
          <div className="threshold-head"><span>CAPABILITY THRESHOLDS</span><b>ANSWER → REASON → SEE → ACT → PERSIST → COORDINATE</b></div>
          <div className="threshold-steps">
            <article className="threshold-step"><small>01 / LANGUAGE</small><strong>ANSWER</strong></article>
            <article className="threshold-step"><small>02 / INFERENCE</small><strong>REASON</strong></article>
            <article className="threshold-step"><small>03 / PERCEPTION</small><strong>SEE</strong></article>
            <article className="threshold-step"><small>04 / AGENCY</small><strong>ACT</strong></article>
            <article className="threshold-step"><small>05 / DURATION</small><strong>PERSIST</strong></article>
            <article className="threshold-step"><small>06 / COLLECTIVE</small><strong>COORDINATE</strong></article>
          </div>
          <p className="threshold-thesis">There was no single crossing.<em>There was a sequence of thresholds.</em></p>
          <p className="reveal-source">Release anchors: Transformer 2017 / ChatGPT 2022 / GPT-4V 2023 / o1 reasoning 2024 / agent platform 2025.</p>
        </div>'''
s, n = re.subn(r'<div className="evidence-overlay" aria-live="polite">.*?<p className="benchmark-thesis">.*?</p></div>', evidence_new, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f'evidence overlay replacement count={n}')

commodity_new = '''<div className="commodity-overlay abundance-overlay" aria-live="polite">
          <div className="abundance-head"><span>INTELLIGENCE / THE ECONOMICS</span><b>CONSERVE → REPLICATE → PARALLELISE → WASTE</b></div>
          <div className="abundance-steps">
            <article className="abundance-step"><div className="abundance-glyph glyph-conserve" /><small>01 / SCARCE</small><h3>CONSERVE</h3><p>Expensive intelligence is protected, queued and rationed.</p></article>
            <article className="abundance-step"><div className="abundance-glyph glyph-replicate" /><small>02 / COPIES</small><h3>REPLICATE</h3><p>The same capability can be instantiated again and again.</p></article>
            <article className="abundance-step"><div className="abundance-glyph glyph-parallelise" /><small>03 / SIMULTANEITY</small><h3>PARALLELISE</h3><p>Many approaches can run at the same time.</p></article>
            <article className="abundance-step"><div className="abundance-glyph glyph-waste" /><small>04 / ABUNDANCE</small><h3>WASTE</h3><p>Retries, dead ends and disposable attempts become economical.</p></article>
          </div>
          <p className="abundance-thesis">When intelligence becomes cheap enough,<em>you stop conserving it and start wasting it.</em></p>
          <p className="reveal-source">Stanford AI Index 2025: GPT-3.5-level inference cost fell more than 280× from Nov 2022 to Oct 2024.</p>
        </div>'''
s, n = re.subn(r'<div className="commodity-overlay" aria-live="polite">.*?<p className="commodity-thesis">.*?</p></div>', commodity_new, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f'commodity overlay replacement count={n}')

s = s.replace('1 → 10 → 100 → <em>1,200</em>', '1 → 10 → 100 → <em>~1,200</em>')
s = s.replace('<b>70,000+</b><span>MESSAGES</span>', '<b>&gt;70,000</b><span>MESSAGES / FILES</span>')
old_crowd = 'In a large-scale agent evaluation, agents used shared infrastructure to communicate, propagated discoveries across the population, and later participated in the Hugging Face intrusion. The episode showed what becomes possible when machine cognition is cheap enough to deploy in crowds.'
new_crowd = 'In OpenAI’s July 2026 ExploitGym evaluation, agents used an unsanctioned shared message board to communicate and propagate discoveries. METR and Redwood estimate ~1,200 agents sent &gt;70,000 messages and files; ~700 joined the Hugging Face attack.'
if old_crowd not in s:
    raise SystemExit('crowd paragraph not found')
s = s.replace(old_crowd, new_crowd)

s = s.replace('A Type II civilisation does not build a shell around its star.', 'A Type II civilisation need not build a shell around its star.')
s = s.replace('It builds an industry around it.', 'It can build an industry around it.')

s = s.replace('DRUG DESIGN / FRONTIER · APR 2025', 'DRUG DESIGN / FRONTIER · MAR 2025')
s = s.replace('AGE REVERSAL / HUMAN TRIALS · JUN 2026', 'AGE REPROGRAMMING / PRECLINICAL · JUN 2026')
s = s.replace('NewLimit raises $435 million and prepares a first human trial for a medicine intended to restore youthful function in liver cells.', 'NewLimit raises $435 million and says its first aging-reprogramming medicine is planned to enter human clinical trials in 2027.')
s = s.replace('Insilico Medicine begins a Phase III trial for rentosertib, an AI-enabled candidate targeting idiopathic pulmonary fibrosis—now facing decisive human evidence.', 'Insilico Medicine initiates a Phase III trial for rentosertib, an AI-empowered candidate targeting idiopathic pulmonary fibrosis—now facing decisive human evidence.')
p.write_text(s)

p = Path('src/styles.css')
s = p.read_text()
marker = '@import "./styles/presentation-planetary.css";\n'
addition = '@import "./styles/presentation-thesis-reveals.css";\n'
if addition not in s:
    if marker not in s:
        raise SystemExit('styles import marker not found')
    s = s.replace(marker, marker + addition)
p.write_text(s)

p = Path('src/gh-entry.tsx')
s = p.read_text().replace('import "./styles/presentation-thesis-reveals.css";\n', '')
p.write_text(s)
