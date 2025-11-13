let data = []; // will be filled after fetch

const selector = document.getElementById('selection');
const searchInput = document.getElementById('search');
const tbody = document.querySelector('tbody');

function getGenerazione(dateStr) {
  const y = new Date(dateStr).getFullYear();
  if (!y || Number.isNaN(y)) return '';
  if (y <= 1945) return 'Silent';
  if (y <= 1964) return 'Boomer';
  if (y <= 1980) return 'Gen X';
  if (y <= 1996) return 'Millennial';
  if (y <= 2012) return 'Gen Z';
  return 'Gen Alpha';
}

function makeRow(p) {
  if (!p) return '';
  return `<tr>
    <td>${p.nome || ''}</td>
    <td>${p.cognome || ''}</td>
    <td>${p.data_nascita || ''}</td>
    <td>${getGenerazione(p.data_nascita)}</td>
    <td>${p.classe || ''}</td>
  </tr>`;
}

function renderRows(list) {
  if (!tbody) return;
  tbody.innerHTML = (list || []).map(makeRow).join('');
}

function isAdult(dateStr) {
  const born = new Date(dateStr);
  if (isNaN(born)) return false;
  const ms18Years = 18 * 365 * 24 * 60 * 60 * 1000; 
  return Date.now() - born.getTime() > ms18Years;
}
function applyFilters() {
  const selection = (selector?.value || 'all').toLowerCase();
  const q = (searchInput?.value || '').toLowerCase();

  // start from full data
  let list = Array.isArray(data) ? data : [];

  // filter by adults
  if (selection === 'adults') {
    list = list.filter(p => isAdult(p.data_nascita));
  }

  // filter by last name search
  if (q !== '') {
    list = list.filter(p => {
      const last = (p && p.cognome ? String(p.cognome) : '').toLowerCase();
      return last.includes(q);
    });
  }

  renderRows(list);
}

// Wire up events
selector?.addEventListener('change', applyFilters);
searchInput?.addEventListener('input', applyFilters);

// Load JSON and render
 function loadData() {
  try {
    const res = await fetch('example.json', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch data.json: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    data = Array.isArray(json) ? json : [];
    applyFilters(); // initial render
  } catch (err) {
    console.error(err);
    data = [];
    renderRows([]);
  }
}

// Start after DOM ready (module scripts run after parse)
loadData();
