                let data = [];
            
                function getGenerazione(dateString) {
                    const year = new Date(dateString).getFullYear();
                    if (year < 1946) return "Silent Generation";
                    if (year < 1965) return "Baby Boomers";
                    if (year < 1981) return "Generazione X";
                    if (year < 1997) return "Millennials";
                    return "Generazione Z";
                }

                const req = new XMLHttpRequest();
                req.open("GET", "example.json");
                req.send();
                req.onload = function() {
                    const tbody = document.getElementById('tbody');
                    data = JSON.parse(req.responseText);
                    data.forEach(persona => {
                        tbody.innerHTML += `<tr><td>${persona.nome}</td><td>${persona.cognome}</td><td>${persona.data_nascita}</td><td>${getGenerazione(persona.data_nascita)}</td><td>${persona.classe}</td></tr>`;
                    });
                }

                const selector = document.getElementById('selection');
                selector.addEventListener('change', () => {
                    const selection = selector.value;
                    tbody.innerHTML = "";
                    if (selection === "all") {
                        data.forEach(persona => {
                            tbody.innerHTML += `<tr><td>${persona.nome}</td><td>${persona.cognome}</td><td>${persona.data_nascita}</td><td>${getGenerazione(persona.data_nascita)}</td><td>${persona.classe}</td></tr>`;
                        });
                    } else {
                        data.forEach(persona => {
                            if ((new Date() - new Date(persona.data_nascita)) > 18*365*24*60*60*1000) {
                                tbody.innerHTML += `<tr><td>${persona.nome}</td><td>${persona.cognome}</td><td>${persona.data_nascita}</td><td>${getGenerazione(persona.data_nascita)}</td><td>${persona.classe}</td></tr>`;
                            }
                        });
                    }
                });

                const search = document.getElementById('search');
                search.addEventListener('input', () => {
                    const query = search.value.toLowerCase();
                    tbody.innerHTML = "";
                    data.forEach(persona => {
                        if (persona.cognome.toLowerCase().includes(query)) {
                            tbody.innerHTML += `<tr><td>${persona.nome}</td><td>${persona.cognome}</td><td>${persona.data_nascita}</td><td>${getGenerazione(persona.data_nascita)}</td><td>${persona.classe}</td></tr>`;
                        }
                    });
                });