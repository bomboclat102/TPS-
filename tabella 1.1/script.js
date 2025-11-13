// Start after DOM ready (module scripts run after parse)
let data = []; // will be filled after XHR load

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
  const ms18Years = 18 * 365 * 24 * 60 * 60 * 1000; // same threshold logic
  return Date.now() - born.getTime() > ms18Years;
}

function applyFilters() {
  const selection = (selector?.value || 'all').toLowerCase();
  const q = (searchInput?.value || '').toLowerCase();

  let list = Array.isArray(data) ? data : [];

  if (selection === 'adults') {
    list = list.filter(p => isAdult(p.data_nascita));
  }

  if (q !== '') {
    list = list.filter(p => {
      const last = (p && p.cognome ? String(p.cognome) : '').toLowerCase();
      return last.includes(q);
    });
  }

  renderRows(list);
}

selector?.addEventListener('change', applyFilters);
searchInput?.addEventListener('input', applyFilters);

// Load JSON and render using XMLHttpRequest
function loadData() {
  var xhr = new XMLHttpRequest();
  // cache bust param optional; remove if not needed
  xhr.open('GET', 'example.json' + Date.now(), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var json = JSON.parse(xhr.responseText);
          data = Array.isArray(json) ? json : [];
        } catch (e) {
          console.error('JSON parse error:', e);
          data = [];
        }
        applyFilters();
      }
    }
  };
  xhr.send();
}

loadData();


