const socket = io()

const nextPage = document.getElementById('nextPage')
const previusPage = document.getElementById('previusPage')
const products = document.getElementById('prodBox')
let productosCarrito = []

function agregarAlCarrito(title, price) {
    console.log('Producto agregado al carrito: ', title, ', precio: ', price)
    let newProd= {
        title: title,
        price: price,
        quantity: prodQuantity(title)
    }
    productosCarrito.push(newProd)
}

function prodQuantity (title){
    console.log(productosCarrito)
    let finding = productosCarrito.find( e => e.title == title)
    if(!finding) return 1
    console.log(finding.quantity)
    let quantity = finding.quantity + 1
    console.log(quantity,'2123')
    return quantity
}



