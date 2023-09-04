const socket = io()

const carrito = document.getElementById('carrito')
let productosCarrito = []
socket.on("cart", (respuestaDelServidor) => {
    console.log("Respuesta del servidor:", respuestaDelServidor);
});

// Llama a esta función cuando quieras enviar datos al servidor en el evento 'cart'
function enviarDatosAlServidor(total) {
    socket.emit("cart", total);
}

    
    function vaciarCarrito(){
        console.log('carrito vaciado');
    localStorage.clear();
}

function mostrarCarritoEnPagina(carrito) {
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
    
    // async function getCartFromServer() {
    //     try {
    //         const response = await fetch('/products/cart'); 
    //         if (response.ok) {
    //         const data = await response.json(); 
    //         const cart = data.cart; 
            
    //         console.log('Carrito del servidor:', cart);
    //         } else {
    //         console.error('Error al obtener el carrito del servidor');
    //         }
    //     } catch (error) {
    //         console.error('Error de red:', error);
    //     }
    // }
    
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