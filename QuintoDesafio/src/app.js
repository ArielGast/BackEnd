import express from 'express';
import {__dirname} from "./utils.js";
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import fs from 'fs';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { ProductManager } from './dao/fileManagers/productManager.js';
import './dbconfig.js';




const app = express();
const PORT = 8080;
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');
app.use('/',viewsRouter );
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const httpServer = app.listen(PORT, ()=> {
    console.log(`Escuchando al puerto ${PORT}`);
})
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id)
    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })

    socket.on('render', async () => {
        let productos = [];
        if (fs.existsSync(file_products)){
            const prodJson = await fs.promises.readFile(file_products, 'utf-8')
            productos = JSON.parse(prodJson)            
            socketServer.emit('renderizado', productos )
        } else {
            socketServer.emit('MsjError', 'Error en la petición')
        }
    })

    socket.on('agregar', async (obj) => {
        await productManager.addProduct(obj)
        let productos = [];
        if (fs.existsSync(file_products)){
            const prodJson = await fs.promises.readFile(file_products, 'utf-8')
            productos = JSON.parse(prodJson)
            socketServer.emit('Agregado', productos )    
        }else {
            socketServer.emit('MsjError', 'Error en la petición')
        }
    })

    socket.on('borrar', async (id) => {
        console.log(id)
        const newProducts = await productManager.deleteProduct(id)
        if (newProducts !=='No existe el ID') {
            socketServer.emit('borrado', newProducts )
        }else {
            socketServer.emit('MsjError', 'No existe el id ingresado')
        }
    })
  
});
