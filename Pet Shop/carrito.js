let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage)

let cartProducts = cartStorage|| []
let cartContainer = document.getElementById("cart-section")
let totalProductos = calcularTotalProductos(cartProducts)

function renderCarrito (cartItems) {

    let total = 0

    if (cartContainer){
    cartContainer.innerHTML = ""
    cartItems.forEach(producto => {
        const cart = document.createElement("div")
        cart.classList.add("cart-items")
        cart.innerHTML = `<h2>${producto.nombre} </h2>
                            <img src ="${producto.imagen}" width =150>
                            <h3>Cantidad: ${producto.cantidad}</h3>
                            <h3>Precio: $${(producto.precio * producto.cantidad).toFixed(2)}</h3>
                            <button class="btn btn-danger btn-eliminar" id="${producto.id}">Eliminar Producto</button>`
        cartContainer.appendChild(cart)
        total += producto.precio * parseInt(producto.cantidad)
    })
    addRemoveFromCartButton()
    const totalcontainer = document.createElement ("div")
    totalcontainer.innerHTML = `<h3>Total $${total}</h3>`;
    cartContainer.appendChild(totalcontainer)

}   
}
function calcularTotalProductos(carrito){
    let total = 0
    carrito.forEach(producto => {
        total += producto.cantidad
    })
    return total
    
}

function addRemoveFromCartButton() {
    const removeButtons = document.querySelectorAll(".btn-eliminar");
        removeButtons.forEach(button => {
        button.addEventListener("click", e => {
            const productId = e.currentTarget.id
            const index = cartProducts.findIndex(producto => producto.id === parseInt(productId))
            if (index !== -1) {
                cartProducts.splice(index, 1); // Elimina el producto del carrito
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                renderCarrito(cartProducts); // Actualiza la visualización del carrito
            }
        });
    });
}
renderCarrito(cartStorage)