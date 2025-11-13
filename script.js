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
function parseXmlPeople(xmlDoc) {
  if (!xmlDoc) return [];
  const personas = Array.from(xmlDoc.getElementsByTagName('persona'));
  return personas.map(n => ({
    nome: n.getElementsByTagName('nome')[0]?.textContent.trim() || '',
    cognome: n.getElementsByTagName('cognome')[0]?.textContent.trim() || '',
    data_nascita: n.getElementsByTagName('data_nascita')[0]?.textContent.trim() || '',
    classe: n.getElementsByTagName('classe')[0]?.textContent.trim() || '',
  }));
}
function loadData() {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'http://localhost/xml_dati1.xml', true);
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        try {
          let xmlDoc = this.responseXML;
          if (!xmlDoc && this.responseText) {
            xmlDoc = new DOMParser().parseFromString(this.responseText, 'application/xml');
          }
          data = parseXmlPeople(xmlDoc);
        } catch (e) {
          console.error('XML parse error:', e);
          data = [];
        }
        applyFilters();
      }
    }
  };
  xhttp.send();
}

loadData();
