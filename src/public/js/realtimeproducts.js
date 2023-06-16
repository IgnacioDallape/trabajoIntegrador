const socket = io()

socket.on('productsMongo', (data) => {
    console.log(data,222)
    render(data)
})

const render =  (data) => {
    try{

        console.log(data)
        const html =  data.map(e => {
            return (
                `
                <div>
                <span>
                <h5> producto: ${e.name}  </h5>
                <em> precio: ${e.price} </em>   
                <em> categoria: ${e.category} </em>   
                </span>
                </div>
                `
                )
                
            }).join('')
            document.getElementById('box').innerHTML = html
        } catch (err){
            console.log(err)
        }
}
