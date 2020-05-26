const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

// Vistas y recursos estáticos
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Sesiones y cookies
app.use(session({
    secret: 'sticker wizzard',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use(auth);

// Formularios
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Rutas
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

// Iniciamos el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));