
const socket = io();

const formu = document.getElementById('formulario');
const contenido = document.getElementById('content');
const par = document.getElementById('parrafo');
const borrar = document.getElementById('btnBorrar');

formu.onsubmit = (e) => {
    e.preventDefault()
    const nombre = document.getElementById('title').value;
    const descripcion = document.getElementById('description').value;
    const codigo = document.getElementById('code').value;
    const precio = parseInt(document.getElementById('price').value);
    const estado = document.getElementById('status').value;
    const stock = parseInt(document.getElementById('stock').value);
    const categoria = document.getElementById('category').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const newProduct = {
        title: nombre,
        description: descripcion,
        code: codigo,
        price: precio,
        status: estado,
        stock: stock,
        category: categoria,
        thumnail: thumbnail
    }
    socket.emit('agregar', newProduct);
}
socket.on('MsjError', (msj) => {
    par.innerHTML= "";
    par.innerHTML = msj;
})

socket.emit('render');

socket.on('renderizado', (productos) => {   
    contenido.innerHTML="";
    productos.forEach((el) => {
        const prod = document.createElement('div')
        prod.innerHTML = `
                        <p>ID: ${el._id}</p>    
                        <p>Nombre: ${el.title}</p>
                        <p>Descripcion: ${el.description}</p>    
                        <p>Código: ${el.code}</p>
                        <p>Precio: ${el.price}</p>    
                        <p>Estado: ${el.status}</p>
                        <p>Stock: ${el.stock}</p>    
                        <p>Categoria ${el.category}</p>
                        <p>Imagen: ${el.thumbnail}</p> 
                    `
            contenido.appendChild(prod);
        }) 

})

socket.on('Agregado', (productos) => {
    contenido.innerHTML="";
    productos.forEach((el) => {
        const prod = document.createElement('div')
        prod.innerHTML = `
                        <p>ID: ${el._id}</p>    
                        <p>Nombre: ${el.title}</p>
                        <p>Descripcion: ${el.description}</p>    
                        <p>Código: ${el.code}</p>
                        <p>Precio: ${el.price}</p>    
                        <p>Estado: ${el.status}</p>
                        <p>Stock: ${el.stock}</p>    
                        <p>Categoria ${el.category}</p>
                        <p>Imagen: ${el.thumbnail}</p> 
                    `
            contenido.appendChild(prod);
        }) 
    par.innerHTML= ""
    par.innerHTML = "Producto agregado"
}) 

borrar.onclick = (e) => {
    e.preventDefault();
    const prodAborrar = document.getElementById('productoid').value;
    socket.emit ('borrar', prodAborrar)
}

socket.on('borrado', (newProducts) => {
    contenido.innerHTML="";
    newProducts.forEach((el) => {
        const prod = document.createElement('div')
        prod.innerHTML = `
                        <p>ID: ${el._id}</p>    
                        <p>Nombre: ${el.title}</p>
                        <p>Descripcion: ${el.description}</p>    
                        <p>Código: ${el.code}</p>
                        <p>Precio: ${el.price}</p>    
                        <p>Estado: ${el.status}</p>
                        <p>Stock: ${el.stock}</p>    
                        <p>Categoria ${el.category}</p>
                        <p>Imagen: ${el.thumbnail}</p> 
                    `
        contenido.appendChild(prod);
    }) 
    par.innerHTML= ""
    par.innerHTML = "Producto Borrado"
})

