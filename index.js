// imports modulos de npm
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import session  from 'express-session';
import connectMongo from 'connect-mongo';
import passport  from 'passport';
import { engine } from 'express-handlebars';
import { config as dotEnvConfig } from 'dotenv';
import yargs from 'yargs';

//imports routes propios.
import routerLogin  from './routes/login.js';
import routerSignup from './routes/register.js';
import routerProductosTest from './routes/productosTest.js';
import routerFailLogin from './routes/failLogin.js';
import routerFailSignup from './routes/failSignup.js';
import routerLogout from './routes/logout.js';
import routerInfo from './routes/info.js';
import routerRandoms from './routes/randoms.js';

//imports modulos propios propios.
import authUser from './passport/authUser.js';
import createUser from './passport/createUser.js';
import ConectarDB from './config/configMongo.js';
import ContenedorMongoDB from './contenedores/contenedorMongo.js';
import { productosCollection, productosSchema } from './models/productos.js';
import { mensajesCollection, mensajesSchema } from './models/mensajes.js';
import User from './models/User.js';


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
dotEnvConfig();

ConectarDB();

authUser(passport);
createUser(passport);

//middlewares de uso general
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//config handlebars
app.engine('.handlebars', engine());
app.set("view engine", ".handlebars");
app.set("views", "./views");

//objeto con la info de la session.
const sessionData = session({
    store: new connectMongo({
        mongoUrl: process.env.DB,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000 * 60,
        httpOnly: false,
        secure: false
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
});

//agrego la sesion a la app.
app.use(sessionData);

//passport
app.use(passport.initialize());
app.use(passport.session());

// routas
app.use('/login', routerLogin);
app.use('/signup', routerSignup);
app.use('/api/productos-test', routerProductosTest);
app.use('/faillogin', routerFailLogin);
app.use('/failsignup', routerFailSignup);
app.use('/logout', routerLogout);
app.use('/info', routerInfo);
app.use('/api/randoms', routerRandoms);

//middleware para usar las sesiones en los sockets.
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionData));

//conexion del socket. Si no existe la session redirecciona al login.
io.on('connection', async socket => {
    const session = socket.request.session.passport;
    if (!session) {
        socket.emit('redirect', '/login');
    } else {
        const contenedorMongoProductos = new ContenedorMongoDB(productosCollection, productosSchema);
        const contenedorMongoMensajes = new ContenedorMongoDB(mensajesCollection, mensajesSchema);
        const idUser = session.user;
        const user = await User.findById(idUser).exec();
        console.log(`Usuario: ${user.email} conectado`);
        const productos = await contenedorMongoProductos.getAll();
        const mensajes = await contenedorMongoMensajes.getAll();
        socket.emit('newSession', user.email);
        socket.emit("getProductos", productos);
        socket.emit("getMensajes", mensajes);

        //producto nuevo, si la sesion expiro, redirecciona al login.
        socket.on('addProducto', async prod => {
            const session = socket.request.session;
            if (new Date() > session.cookie._expires) {
                socket.emit('redirect', '/login');
            } else {
                console.log("Agregando producto...");
                await contenedorMongoProductos.addData(prod);
                console.log("Producto Agregado.");
                const productos = await contenedorMongoProductos.getAll();
                io.sockets.emit('getProductos', productos);
            }
        });

        //mensaje nuevo, si la sesion expiro, redirecciona al login
        socket.on('addMensaje', async msj => {
            const session = socket.request.session;
            if (new Date() > session.cookie._expires) {
                socket.emit('redirect', '/login');
            } else {
                console.log("Agregando Mensaje...");
                await contenedorMongoMensajes.addData(msj);
                console.log("Mensaje Agregado");
                const mensajes = await contenedorMongoMensajes.getAll();
                io.sockets.emit('getMensajes', mensajes);
            }
        });
    }
});

//iniciacion de srv.
const args = yargs(process.argv.slice(2)).argv;
const PORT = args.port || 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor levantado en puerto ${PORT}`)
})

server.on('error', error => {
    console.log(error);
})