const socket = io()

const carrito = document.getElementById('carrito')

//recibo respuesta para ver que sea bidireccional la comunicacion

socket.on("cart", (respuestaDelServidor) => {
    console.log("Respuesta del servidor:", respuestaDelServidor);
});

//envio solo el total, para probar por ahora

function enviarDatosAlServidor(total) {
    socket.emit("cart", total);
}

//eliminar el carrito acumulado

function vaciarCarrito() {
    console.log('carrito vaciado');
    localStorage.clear();
}

//muestro el total parcial del carrito

function mostrarCarritoEnPagina() {
    let cart = JSON.parse(localStorage.getItem("carrito")) || [];
    total = 0
    cart.forEach(e => {
        e.price = parseFloat(e.price)
        console.log(typeof e.price)
        return total += e.price
    });
    console.log(total)
    enviarDatosAlServidor(total)
    return total
}

//funcion para ir acumulando el total en local storage

let totalPrice = 0;


function agregarAlCarrito(title, price) {
    const numericPrice = parseFloat(price); // Convierte price a número
    if (!isNaN(numericPrice)) { // Verifica si es un número válido
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push({ title, price }); // Asegúrate de agregar el producto correctamente
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarritoEnPagina()
        return carrito;
    } else {
        console.error(`El precio no es un número válido: ${price}`);
        return totalPrice;
    }
}



// function escribirCarrito () {

//     let messageHTML = productosCarrito.map(e => ({
//         Producto: e.title,
//         Precio: e.price,
//         Cantidad: e.quantity
//     }));
//     console.log(messageHTML)
// }

//aca traigo el carrito actualizado desde el servidor

async function obtenerCarritoDelServidor() {
    try {
        const response = await fetch('/products/mostrarCarrito');
        if (response.ok) {
            const data = await response.json();
            const carrito = data.carrito;
            // Actualiza la visualización del carrito en tu página
            mostrarCarritoEnPagina(carrito);
        } else {
            console.error('Error al obtener el carrito del servidor');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}