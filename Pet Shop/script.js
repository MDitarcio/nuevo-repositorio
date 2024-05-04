
// const productos = [
//     {
//         id: 1,
//         nombre: "Eukanuba - Cachorro Puppy",
//         peso: 15,
//         precio: 35794,
//         imagen: "./img/eukanuba-puppy.jpg",
//     },
//     {
//         id: 2,
//         nombre: "Pro Plan - Raza Pequeña",
//         peso: 14,
//         precio: 54891,
//         imagen: "./img/proplan-razapequena.jpg",
//     },
//     {
//         id: 3,
//         nombre: "Royal Canin - Hipoalergénico",
//         peso: 2,
//         precio: 19850,
//         imagen: "./img/royal-hipoalergenico.jpg",
//     },
//     {
//         id: 4,
//         nombre: "Royal Canin - Nutrición",
//         peso: 3,
//         precio: 29700,
//         imagen: "./img/royal-nutricion.jpg",
//     },
//     {
//         id: 5,
//         nombre: "Green dog - Alimento Vegano",
//         peso: 10,
//         precio: 31431,
//         imagen: "./img/green-dog.jpg",

//     },
//     {
//         id: 6,
//         nombre: "Balanced - Cerdo/Arroz",
//         peso: 15,
//         precio: 50769,
//         imagen: "./img/balanced-cerdo.jpg",   
//     }     
// ];

// Con el localStorage almaceno los datos en el navegador para que persistan en la sesión
// Asocio lo almacenado en la clave "cartProducts" para recuperar los productos del carrito
// En la variable cartProductsLS asigno el valor recuperado del localStorage 

/*----------------> let cartProductsLS = localStorage.getItem("cartProducts")

// Se comprueba si ya existen valores en el localStorage, si existe se parsea el valor y se asigna a cartProducts, sino se inicializa como array vacio
if(cartProductsLS) {
    cartProducts = JSON.parse(cartProductsLS)
}else{
    cartProducts = []
}

// Se busca el elemento por ID y se asigna a la variable productsContainer
let productsContainer = document.getElementById("container")


// Se crea una función para renderizar la lista de productos en el DOM tomando como parámetro "productos"
function renderProducto(productos) {
    // Si productsContainer no es nulo, itera en cada elemento del array ejecutando la función flecha
    if(productsContainer){
     productos.forEach(producto => {
        const card = document.createElement("div") // Se crea un elemento "div" en el DOM y se asigna a la variable "card"
        card.classList.add("producto") // Se agrega la clase "producto" al elemento div creado
        // Se establece el contenido HTML del elemento "card"
        card.innerHTML = `<h2>${producto.nombre}</h2>
                            <p>${producto.peso} kg</p>
                            <p class="precio">$${producto.precio.toFixed(2)}</p>
                            <img src="${producto.imagen}" width="150">
                            <input type="number" class="cantidad" value="1" min="1">
                            <button class="productoAgregar" id="${producto.id}">Agregar</button>`          
        productsContainer.appendChild(card) // Se agrega el elemento "card" al contenedor de productos en el DOM
    });
    //addToCartButton()
    }else {
    //console.error("el contenedor de productos no se encontró en el DOM")
    }
}

renderProducto(productos)
addToCartButton()

// Función para añadir los productos al carrito de compras
function addToCartButton() {
    let addbutton = document.querySelectorAll(".productoAgregar") //Selecciona los elementos del DOM que tienen la clase "productoAgregar"

    addbutton.forEach (boton => { // Itera sobre cada botón "Agregar" seleccionado
        boton.onclick = (e) => { //Controlador de eventos clic a cada botón "Agregar"
            const productId = e.currentTarget.id  // Obtiene el ID del producto que se está agregando al carrito
            const selectedProduct = productos.find(producto => producto.id == productId) // Encuentra el producto seleccionado en la lista utilizando su ID
            cantidadInput = e.currentTarget.parentElement.querySelector('.cantidad')
            const cantidad = parseInt(cantidadInput.value) // Obtiene la cantidad seleccionada convirtiendo el valor a entero
            const existingProduct = cartProducts.find(item => item.id === selectedProduct.id) // Busca si el producto seleccionado ya está en el carrito
            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementar su cantidad
                existingProduct.cantidad += cantidad
            } else {
                // Si el producto no está en el carrito, agregarlo con su cantidad correspondiente
                selectedProduct.cantidad = cantidad
                cartProducts.push(selectedProduct) //Agregar el producto al carrito
            }

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            renderCarrito(cartProductsLS) // Actualiza la interfaz del carrito
        }
    })
    
}
------------------->>>> */

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



