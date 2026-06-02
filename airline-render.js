function getAirlineSlugFromPage() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('airline');
  if (fromQuery) return fromQuery;

  const current = document.body.dataset.airline;
  if (current) return current;

  const file = location.pathname.split('/').pop().replace('.html', '');
  return file;
}

function accentColorName(accent) {
  if (accent === 'green') return 'var(--green)';
  if (accent === 'orange') return 'var(--orange)';
  return 'var(--blue)';
}

function renderSectionBody(body) {
  if (Array.isArray(body)) {
    return body.map(paragraph => `<p>${paragraph}</p>`).join('');
  }

  return String(body)
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('');
}

function renderAirlinePage() {
  const slug = getAirlineSlugFromPage();
  const data = window.AIRLINE_DATA && window.AIRLINE_DATA[slug];
  const root = document.getElementById('airline-root');
  if (!root) return;

  if (!data) {
    root.innerHTML = `<section class="hero"><p class="eyebrow">Aviation Matrix</p><h1>הדף לא נמצא</h1><p>לא נמצאו נתונים עבור חברת התעופה המבוקשת.</p><a class="btn" href="index.html">חזרה לדף הבית</a></section>`;
    return;
  }

  document.title = `${data.name} | Aviation Legacy Research`;
  const accent = accentColorName(data.accent);

  const factItems = Object.entries(data.facts).map(([k, v]) => `
    <div class="fact"><strong>${k}</strong><span>${v}</span></div>
  `).join('');

  const sections = data.sections.map((section, i) => `
    <section class="card" id="section-${i + 1}" style="border-right:5px solid ${accent}">
      <h2>${String(i + 1).padStart(2, '0')} — ${section.title}</h2>
      ${renderSectionBody(section.body)}
    </section>
  `).join('');

  const toc = data.sections.map((section, i) => `<a href="#section-${i + 1}">${String(i + 1).padStart(2, '0')} — ${section.title}</a>`).join('');
  const sources = data.sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${label}</a></li>`).join('');

  root.innerHTML = `
    <section class="hero">
      <p class="eyebrow">${data.phase}</p>
      <h1>${data.name}</h1>
      <p>${data.subtitle}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px">
        <a class="btn" href="index.html">חזרה לדף הבית</a>
        <a class="btn secondary" href="${phaseFile(data.phase)}">חזרה לקבוצת המחקר</a>
      </div>
    </section>

    <section class="section">
      <div class="article-layout">
        <aside class="card toc">
          <h3>ניווט בדף</h3>
          <a href="#quick-card">כרטיס מחקר מהיר</a>
          <a href="#research-flow">סדר הקריאה</a>
          ${toc}
          <a href="#sources">מקורות</a>
        </aside>
        <main class="grid">
          <section class="card" id="quick-card" style="border-right:5px solid ${accent}">
            <h2>כרטיס מחקר מהיר</h2>
            <div class="fact-grid">${factItems}</div>
          </section>

          <section class="card" id="research-flow">
            <h2>סדר הקריאה המומלץ</h2>
            <div class="research-flow">
              <div class="flow-item"><div class="flow-number">1</div><div><strong>זהות בסיסית</strong><span>מי החברה, מאיפה היא צמחה, ואיזה סוג תעופה היא מייצגת.</span></div></div>
              <div class="flow-item"><div class="flow-number">2</div><div><strong>עובדה היסטורית</strong><span>הבסיס המתועד שעליו נשען הדף.</span></div></div>
              <div class="flow-item"><div class="flow-number">3</div><div><strong>דיוק, אטימולוגיה ופרשנות</strong><span>הפרדה בין תיקון עובדתי לבין ניתוח מותגי ותרבותי.</span></div></div>
              <div class="flow-item"><div class="flow-number">4</div><div><strong>מקורות</strong><span>קישורים להמשך בדיקה ואימות עצמאי.</span></div></div>
            </div>
          </section>

          <section class="note">
            <strong>הפרדה מחקרית חשובה:</strong>
            בדף זה העובדות ההיסטוריות מוצגות בנפרד מן הפרשנות המותגית והפסיכולוגית. כך האתר נשאר עשיר ומעמיק, אך גם אמין וברור יותר לקורא.
          </section>

          ${sections}

          <section class="card source-list" id="sources">
            <h2>מקורות להמשך בדיקה</h2>
            <ul class="clean">${sources}</ul>
          </section>
        </main>
      </div>
    </section>
  `;
}

function phaseFile(phase) {
  if (phase === 'Global Connectors') return 'global_connectors.html';
  if (phase === 'Low-Cost Pioneers') return 'low_cost_pioneers.html';
  return 'western_legacy.html';
}

document.addEventListener('DOMContentLoaded', renderAirlinePage);
