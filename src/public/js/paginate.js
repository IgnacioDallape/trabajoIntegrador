const socket = io()

const carrito = document.getElementById('carrito')
let productosCarrito = []

async function agregarAlCarrito (title, price)  {
    let existingProduct = productosCarrito.find( e => e.title == title)
    if(existingProduct){
        existingProduct.quantity += 1
        escribirCarrito()
        return existingProduct

    } 
    let newProd =  {
        title: title,
        price: price,
        quantity:  1
    }
    productosCarrito.push(newProd)
    escribirCarrito()
}
function escribirCarrito () {
    
    let messageHTML = productosCarrito.map(e => ({
        Producto: e.title,
        Precio: e.price,
        Cantidad: e.quantity
    }));
    

    console.log(messageHTML)
}

// function showCart(){
//     try {
        
//     } catch (error) {
//         console.log(error);
//         return false
//     }
// }