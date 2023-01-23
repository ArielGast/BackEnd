import express, { application } from 'express';
import cartsRouter from '../routes/carts.router.js';
import productsRouter from '../routes/products.router.js';
import viewsRouter from '../routes/views.routes.js';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(__dirname+'/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})


app.use('/',viewsRouter );
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);