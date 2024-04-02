
const productos = [
    {
        id: 1,
        nombre: "Eukanuba - Cachorro Puppy",
        peso: 15,
        precio: 35794,
        imagen: "./img/eukanuba-puppy.jpg",
    },
    {
        id: 2,
        nombre: "Pro Plan - Raza Pequeña",
        peso: 14,
        precio: 54891,
        imagen: "./img/proplan-razapequena.jpg",
    },
    {
        id: 3,
        nombre: "Royal Canin - Hipoalergénico",
        peso: 2,
        precio: 19850,
        imagen: "./img/royal-hipoalergenico.jpg",
    },
    {
        id: 4,
        nombre: "Royal Canin - Nutrición",
        peso: 3,
        precio: 29700,
        imagen: "./img/royal-nutricion.jpg",
    },
    {
        id: 5,
        nombre: "Green dog - Alimento Vegano",
        peso: 10,
        precio: 31431,
        imagen: "./img/green-dog.jpg",

    },
    {
        id: 6,
        nombre: "Balanced - Cerdo/Arroz",
        peso: 15,
        precio: 50769,
        imagen: "./img/balanced-cerdo.jpg",   
    }     
];

//let cartProducts 
let cartProductsLS = localStorage.getItem("cartProducts")

// se comprueba si ya existen valores en el localStorage, si existe se parsea el valor y se asigna a cartProducts, sino se inicializa como array vacio
if(cartProductsLS) {
    cartProducts = JSON.parse(cartProductsLS)
}else{
    cartProducts = []
}

let productsContainer = document.getElementById("container")

function renderProducto(productos) {
    if(productsContainer){
     productos.forEach(producto => {
        const card = document.createElement("div")
        card.classList.add("producto")
        card.innerHTML = `<h2>${producto.nombre}</h2>
                            <p>${producto.peso} kg</p>
                            <p class="precio">$${producto.precio.toFixed(2)}</p>
                            <img src="${producto.imagen}" width="150">
                            <input type="number" class="cantidad" value="1" min="1">
                            <button class="productoAgregar" id="${producto.id}">Agregar</button>`          
        productsContainer.appendChild(card)
    });
    //addToCartButton()
    }else {
    //console.error("el contenedor de productos no se encontró en el DOM")
    }
}

renderProducto(productos)
addToCartButton()

function addToCartButton() {
    let addbutton = document.querySelectorAll(".productoAgregar")

    addbutton.forEach (boton => {
        boton.onclick = (e) => {
            const productId = e.currentTarget.id 
            const selectedProduct = productos.find(producto => producto.id == productId)
            cantidadInput = e.currentTarget.parentElement.querySelector('.cantidad')
            const cantidad = parseInt(cantidadInput.value)


            const existingProduct = cartProducts.find(item => item.id === selectedProduct.id)
            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementar su cantidad
                existingProduct.cantidad += cantidad
            } else {
                // Si el producto no está en el carrito, agregarlo con su cantidad correspondiente
                selectedProduct.cantidad = cantidad
                cartProducts.push(selectedProduct)
            }

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            renderCarrito(cartProductsLS)
        }
    })
    
}


