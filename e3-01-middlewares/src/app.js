const express = require('express');
const app = express();
const methodOverride = require('method-override');

// Vistas y recursos estáticos
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Formularios
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Rutas
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/products', productRouter);

// Iniciamos el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));