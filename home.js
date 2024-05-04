const incrementButton = document.getElementById('incrementButton')
const montoElement = document.getElementById('monto')

let montoGuardado = localStorage.getItem('monto')

if(montoGuardado) {
    montoGuardado = JSON.parse(montoGuardado)
}else{
    montoGuardado = 0
}

montoElement.textContent = `$${montoGuardado}`

if(incrementButton){
incrementButton.addEventListener('click', incrementarMonto)
}

function incrementarMonto() {

    montoGuardado += 2540.75;
    montoElement.textContent = `$${montoGuardado}`
    localStorage.setItem('monto', JSON.stringify(montoGuardado))
}

document.addEventListener('DOMContentLoaded', function() {
    const elementos = document.querySelectorAll('.en-construccion')
    
    elementos.forEach(function(elemento){
        elemento.addEventListener('click', function(event) {
            event.preventDefault() // Evitar que se abra el enlace
            mostrarSweetAlert()
        })
    })
})

function mostrarSweetAlert() {
    Swal.fire({
            icon: "error",
            title: "Woof... Lo sentimos!",
            text: "Sección en Construcción",
    })
}

