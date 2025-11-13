
let data = [];

function getGenerazione(dateString) {
  const year = new Date(dateString).getFullYear();
  if (!year || isNaN(year)) return "";
  if (year < 1946) return "Silent Generation";
  if (year < 1965) return "Baby Boomers";
  if (year < 1981) return "Generazione X";
  if (year < 1997) return "Millennials";
  return "Generazione Z";
}

function renderRows(list) {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = "";
  list.forEach(p => {
    tbody.innerHTML += `<tr>
      <td>${p.nome || ''}</td>
      <td>${p.cognome || ''}</td>
      <td>${p.data_nascita || ''}</td>
      <td>${getGenerazione(p.data_nascita)}</td>
      <td>${p.classe || ''}</td>
    </tr>`;
  });
}

function isAdult(dateStr) {
  const dob = new Date(dateStr);
  if (isNaN(dob)) return false;
  const now = new Date();
  const ms18 = 18 * 365 * 24 * 60 * 60 * 1000; 
  return (now - dob) > ms18;
}

(function loadXML() {
  const req = new XMLHttpRequest();
  req.open('GET', 'example.xml');
  req.responseType = 'document';
  req.overrideMimeType('text/xml');
  req.onload = function () {
    const xml = req.responseXML;
    if (!xml) {
      renderRows([]);
      return;
    }
    const nodes = xml.querySelectorAll('persona');
    data = Array.from(nodes).map(n => ({
      nome: (n.querySelector('nome') || {}).textContent || '',
      cognome: (n.querySelector('cognome') || {}).textContent || '',
      data_nascita: (n.querySelector('data_nascita') || {}).textContent || '',
      classe: (n.querySelector('classe') || {}).textContent || ''
    }));
    renderRows(data);
  };
  req.onerror = function () { renderRows([]); };
  req.send();
})();

const selector = document.getElementById('selection');
if (selector) {
  selector.addEventListener('change', () => {
    const v = selector.value;
    if (v === 'all') {
      renderRows(data);
    } else {
      renderRows(data.filter(p => isAdult(p.data_nascita)));
    }
  });
}

const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    renderRows(data.filter(p => (p.cognome || '').toLowerCase().includes(q)));
  });
}
