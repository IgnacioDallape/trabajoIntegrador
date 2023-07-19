const socket = io()

socket.on('bienvenida', (data) => {
    console.log(data)
})

socket.on('chat', (data) => {
    render(data)
})

const render = (data) => {
    const html = data.map(e => {
        return (
            `
        <div>
            <span>
            <strong> ${e.userMail}  </strong>
            <em> ${e.message} </em>        
            </span>
        </div>
        `
        )

    }).join('')
    document.getElementById('box').innerHTML = html
}

const addMessage = () => {

    const mensaje = {
        userMail : document.getElementById('userMail').value,
        message : document.getElementById('userMessage').value
    }

    
    socket.emit('chat', mensaje)

    console.log(mensaje)
    return false
}