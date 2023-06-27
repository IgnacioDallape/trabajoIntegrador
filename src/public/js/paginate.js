const socket = io()

const nextPage = document.getElementById('nextPage')
const previusPage = document.getElementById('previusPage')
const products = document.getElementById('prodBox')
let ret
let prevPage
let proxPage


//paginate


const nextPageFunction = () => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query)
    let currentPage = urlParams.get('page');
    let currentLimit = urlParams.get('limit');
    let currentCategory = urlParams.get('category');
    let currentSort = urlParams.get('sort');
    if (!currentPage) {
        currentPage = parseInt(currentPage);
        currentPage = 2;
    } else {
        currentPage = parseInt(currentPage) + 1
    }
    urlParams.set('page', currentPage);

    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    proxPage = {
        page: currentPage,
        limit: currentLimit,
        category: currentCategory,
        sort: currentSort,
    }
    window.location.href = newUrl;
    console.log(window.location.href, 232)
    return proxPage
}

const previusPageFunction = () => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query)
    let currentPage = urlParams.get('page');
    let currentLimit = urlParams.get('limit');
    let currentCategory = urlParams.get('category');
    let currentSort = urlParams.get('sort');
    if (!currentPage) {
        currentPage = parseInt(currentPage);
        currentPage = 1;
    }
    if (currentPage > 1) {
        currentPage -= 1;
    }
    urlParams.set('page', currentPage);

    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    prevPage = {
        page: currentPage,
        limit: currentLimit,
        category: currentCategory,
        sort: currentSort,
    }
    window.location.href = newUrl;
    console.log(window.location.href, 232)
    return prevPage
}

nextPage.addEventListener('click', () => {
    socket.emit('nextPage', proxPage)
})

previusPage.addEventListener('click', () => {
    socket.emit('prevPage', prevPage)
})


//actual pagina

const getCurrentPageAndParams = () => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);

    const currentPage = urlParams.get('page');
    const currentLimit = urlParams.get('limit');
    const currentCategory = urlParams.get('category');
    const currentSort = urlParams.get('sort');

    return {
        page: currentPage,
        limit: currentLimit,
        category: currentCategory,
        sort: currentSort,
    };
};


socket.on('paginate', async (data) => {
    console.log('Conectado al servidor de Socket.IO');
    let a = await render(data);
    const currentPageParams = await getCurrentPageAndParams();
    socket.emit('page', currentPageParams);
});

const render = (data) => {
    const html = data.docs.map((e) => {
        return `
        <div style="gap: 1rem;" >
            <li>
                producto : ${e.title} <br/>
                precio: ${e.price}  <br/>
                stock: ${e.stock}
            </li>
        </div>
    `;
    });
    products.innerHTML = html.join('');
}

