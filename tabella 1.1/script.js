
let data = []; 

const selector = document.getElementById('selection');
const searchInput = document.getElementById('search');
const tbody = document.getElementById('tbody');

function getGenerazione(dataoggi) {
  const y = new Date(dataoggi).getFullYear();
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
function maggiorenne(dataoggi) {
  const born = new Date(dataoggi);
  const maggiore = 18 * 365 * 24 * 60 * 60 * 1000; 
  return Date.now() - born.getTime() > maggiore;
}
function applyFilters() {
  const selection = (selector?.value || 'all').toLowerCase();
  const q = (searchInput?.value || '').toLowerCase();
  let list = Array.isArray(data) ? data : [];
  if (selection === 'adults') {
    list = list.filter(p => maggiorenne(p.data_nascita));
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
function loadData() {
  var xhr = new XMLHttpRequest();

  xhr. open('GET', 'example.json');
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


