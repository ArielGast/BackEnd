import express from 'express';
import {__dirname} from "./utils.js";
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import session from 'express-session';
import  FileStore  from 'session-file-store';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import cookieParser from 'cookie-parser';
import { ProductManager } from './dao/mongoManagers/productManager.js';
import { MessageManager } from './dao/mongoManagers/messageManager.js';
import './dbconfig.js';
import MongoStore from 'connect-mongo';

const fileStore = FileStore(session);

const app = express();
const PORT = 8080;
const productManager = new ProductManager();
const messageManager = new MessageManager();

// Session File
/* app.use(cookieParser());
app.use(
    session({
        store: new fileStore({
            path: __dirname+'/sessions'
        }),
        resave:false,
        saveUninitialized: false,
        secret: 'sessionKey',
        cookie:{maxAge:20000}
    })) */

//Session Mongo
app.use(cookieParser());
app.use(
    session({
        store: new MongoStore({
            mongoUrl: 'mongodb+srv://arielgast:pepe1234@cluster0.a5yoyot.mongodb.net/ecommerce?retryWrites=true&w=majority'
        }),
        resave:false,
        saveUninitialized: false,
        secret: 'sessionKey',
        cookie:{maxAge:20000}
    }))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');
app.use('/views',viewsRouter );
app.get('/', (req,res) =>{
    res.redirect('/views/login')
});
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);
app.use('/users', usersRouter);


/* app.post('/session', (req,res) => {
    const {username, password} = req.body;
    req.session.username = username;
    req.session.password = password;
    res.json({message: 'Sesion iniciada con exito'})
    })

app.get('/logout', (req,res) => {
    req.session.destroy((error) => {
        if (error) console.log(error)
        else console.log('Sesion finalizada')

    })
}) */


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
        productos = await productManager.getProducts()
        if (productos.length !== 0){         
            socketServer.emit('renderizado', productos )
        } else {
            socketServer.emit('MsjError', 'Error en la petición')
        }
    })

    socket.on('agregar', async (obj) => {
        await productManager.addProduct(obj)
        const productos = await productManager.getProductsForHandle()
        if (productos) {
            socketServer.emit('Agregado', productos);
        }else {
            socketServer.emit('MsjError', 'Request Error')
        }

    })

    socket.on('borrar', async (id) => {
        const productoAborrar = await productManager.deleteProduct(id);
        const newProducts = await productManager.getProductsForHandle();
        if (productoAborrar) {
            socketServer.emit('borrado', newProducts )
        }else {
            socketServer.emit('MsjError', 'No existe el id ingresado')
        }
    })

    socket.on('enviar', async (obj) => {
        await messageManager.addMenssage(obj);
        const mensajes = await messageManager.getMessages()
        socketServer.emit('mensajes', mensajes )
    })
  
});
