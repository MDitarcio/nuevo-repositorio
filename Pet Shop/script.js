

const items = document.getElementById('items')
const footer = document.getElementById('footer')
const cards = document.getElementById('cards')
const templateFooter = document.getElementById('template-footer').content 
const templateCarrito = document.getElementById('template-carrito').content
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
} )

//--- EVENTOS ----

cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch ('api.json')
        const data = await res.json()
        pintarCards(data)
       // console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('h6').textContent = `${producto.peso} KG`
        templateCard.querySelector('p').textContent = `$${producto.precio.toFixed(2)}`
        templateCard.querySelector('img').setAttribute("src", producto.imagen)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = 
    {
        id: objeto.querySelector('.btn-dark').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()
    
}
    

const pintarCarrito = () => {

    items.innerHTML = ''
    //console.log(carrito)
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = `$${(producto.cantidad * parseFloat(producto.precio.replace('$', ''))).toFixed(2)}`
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.appendChild(fragment)

    pintarFooter()

    const btnConfir = document.getElementById('confirmar-carrito')
    if(btnConfir){
        btnConfir.addEventListener("click", async () => {
            const { value: email } = await Swal.fire({
            title: "Tu compra se confirmó con exito!",
            input: "email",
            inputLabel: "Por favor, ingresa tu mail",
            inputPlaceholder: "Enter your email address"
            })
        
            if (email) {
            Swal.fire
            ({ 
                title: `Gracias por tu compra!`,
                text: `Te enviamos los datos de la compra al siguiente mail: ${email}`,
                timer: 3000 })
                }
            }
        )
        btnConfir.addEventListener("click", vaciarAlConfirmar)
    }
      localStorage.setItem('carrito', JSON.stringify(carrito))
}


const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML =  `
        <th scope="row" colspan="5">El carrito está vacío!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * parseFloat(precio.replace('$', '')), 0).toFixed(2)
    //console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e => {
    // Aumentar cantidad
    if (e.target.classList.contains('btn-info')) {
       // console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    //disminuir cantidad
    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation
}

function vaciarAlConfirmar(){
    carrito = {}
    pintarCarrito()
}



