const socket = io()

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

socket.emit('connected', 'Nuevo usuario online')

socket.on('products', data => {
    render(data);
});

socket.on('updatedProducts', data => {
    render(data);
});


const render = (data) => {
    try {
        const html = data.docs.map(e => {
            return (
                `
                <div>
                <span>
                <h5> producto: ${e.title}  </h5>
                <em> precio: ${e.price} </em>   
                <em> categoria: ${e.category} </em>   
                </span>
                </div>
                `
            )

        }).join('')
        document.getElementById('box').innerHTML = html
    } catch (err) {
        console.log(err)
    }
}

