function getAirlineSlugFromPage() {
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

function renderAirlinePage() {
  const slug = getAirlineSlugFromPage();
  const data = window.AIRLINE_DATA && window.AIRLINE_DATA[slug];
  const root = document.getElementById('airline-root');
  if (!root) return;

  if (!data) {
    root.innerHTML = `<section class="hero"><p class="eyebrow">Aviation Matrix</p><h1>הדף לא נמצא</h1><p>לא נמצאו נתונים עבור חברת התעופה המבוקשת.</p><a class="btn" href="../index.html">חזרה לדף הבית</a></section>`;
    return;
  }

  document.title = `${data.name} | Aviation Legacy Research`;
  const accent = accentColorName(data.accent);

  const factItems = Object.entries(data.facts).map(([k, v]) => `
    <div class="fact"><strong>${k}</strong><span>${v}</span></div>
  `).join('');

  const sections = data.sections.map((section, i) => `
    <section class="card" id="section-${i + 1}" style="border-right:5px solid ${accent}">
      <h2>${section.title}</h2>
      <p>${section.body}</p>
    </section>
  `).join('');

  const toc = data.sections.map((section, i) => `<a href="#section-${i + 1}">${section.title}</a>`).join('');
  const sources = data.sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${label}</a></li>`).join('');

  root.innerHTML = `
    <section class="hero">
      <p class="eyebrow">${data.phase}</p>
      <h1>${data.name}</h1>
      <p>${data.subtitle}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px">
        <a class="btn" href="../index.html">חזרה לדף הבית</a>
        <a class="btn secondary" href="../${phaseFile(data.phase)}">חזרה לקבוצת המחקר</a>
      </div>
    </section>

    <section class="section">
      <div class="article-layout">
        <aside class="card toc">
          <h3>ניווט בדף</h3>
          ${toc}
          <a href="#sources">מקורות</a>
        </aside>
        <main class="grid">
          <section class="card" style="border-right:5px solid ${accent}">
            <h2>כרטיס מחקר מהיר</h2>
            <div class="fact-grid">${factItems}</div>
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
