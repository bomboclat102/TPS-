function leggiFile(input) {
    let file = input.files[0]
    let     reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function() {
        let content = reader.result
        mostraTabella(content)
        disegnaGrafico(content)
    }
}
function mostraTabella(content) {
    const linea = content.split('\n').slice(1) 
    const tabella = []
    for (let i = 0; i < linea.length; i++) {
        const line = linea[i]
        const Split = line.split(",")
        const anno = Split[0].slice(1, -1)
        const persone = Split[1].slice(1, -1)
        tabella.push({'anno': anno, 'persone': persone})
    }

    let rows = ''
    const tbody = document.getElementById('tbody')
    for (const row of tabella) {
        rows += '<tr>' + '<td>' + row.anno + '</td><td>' + row.persone + '</td></tr>'
    }
    tbody.innerHTML = rows
}
function disegnaGrafico(content) {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const linea = content.split('\n').slice(1) 
    const anni = []
    const numeri = []
    for (let i = 0; i < linea.length; i++) {
        const line = linea[i]
        const Split = line.split(",")
        const anno = Split[0].slice(1, -1)
        const persone = Split[1].slice(1, -1)
        anni.push(parseInt(anno));
        numeri.push(parseInt(persone));
    }
    

    const persone = massimo(numeri)
    ctx.fillRect(50, 50, 1, canvas.height-65);
    ctx.fillRect(50, 685, 1000, 1);
    const X = (canvas.width - 50) / anni.length
    const Y = (canvas.height - 50) / persone
    ctx.beginPath()
    ctx.moveTo(50, canvas.height - 50 - numeri[0] * Y)
    for (let i = 1; i < anni.length; i++) {
        ctx.font = "10px serif";
        ctx.fillText(anni[i], 50 + i * X, canvas.height-5);
        ctx.fillText(numeri[i], 50 + i * X, canvas.height - numeri[i] * Y);
        ctx.lineTo(50 + i * X, canvas.height - numeri[i] * Y)
    }
    ctx.stroke()
}

function massimo(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
