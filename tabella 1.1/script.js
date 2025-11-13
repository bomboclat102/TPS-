const selector = document.getElementById('selection');
const searchInput = document.getElementById('search');
const tbody = document.querySelector('tbody');

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
  const ms18Years = 18 * 365 * 24 * 60 * 60 * 1000; // keep same threshold logic
  return Date.now() - born.getTime() > ms18Years;
}

selector?.addEventListener('change', () => {
  const selection = (selector.value || '').toLowerCase();
  const src = Array.isArray(data) ? data : [];
  const list = selection === 'all' ? src : src.filter(p => isAdult(p.data_nascita));
  renderRows(list);
});

searchInput?.addEventListener('input', () => {
  const q = (searchInput.value || '').toLowerCase();
  const src = Array.isArray(data) ? data : [];
  const list = src.filter(p => {
    const last = (p && p.cognome ? String(p.cognome) : '').toLowerCase();
    return q === '' || last.includes(q);
  });
  renderRows(list);
});
