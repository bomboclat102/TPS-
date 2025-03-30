let matrice = localStorage.getItem("obj")
  ? JSON.parse(localStorage.getItem("obj"))
  : [];

function bomboclat() {
  const obj = {
    nome: document.querySelector("#nome").value,
    cognome: document.querySelector("#Cognome").value,
    citta: document.querySelector("#Citta").value,
    indirizzo: document.querySelector("#Indirizzo").value,
  };

  matrice.push(obj);
  aggiornaTabella(); 
  document.querySelector("#nome").value = "";
  document.querySelector("#Cognome").value = "";
  document.querySelector("#Citta").value = "";
  document.querySelector("#Indirizzo").value = "";
  
  localStorage.setItem("obj", JSON.stringify(matrice));
}

function aggiornaTabella() {
  let tabella = document.querySelector("#tabella");
  tabella.innerHTML = ""; 
  if (matrice.length > 0) {
    let hriga = document.createElement("tr");
    let riga = matrice[0]; 
    for (let a in riga) {
      let th = document.createElement("th");
      th.textContent = a;
      hriga.appendChild(th);
    }
    tabella.appendChild(hriga);
  }
  for (let i = 0; i < matrice.length; i++) {
    let riga = matrice[i];
    let tr = document.createElement("tr");
    for (let a in riga) {
      let td = document.createElement("td");
      td.textContent = riga[a];
      tr.appendChild(td);
    }
    tabella.appendChild(tr);
  }
}

function pagina() {
  location.href = "pagina.html";
}

function pag2() {
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", aggiornaTabella);