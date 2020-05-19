const express = require('express');
const app = express();

// Vistas y recursos estáticos
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Rutas
const userRouter = require('./routes/userRouter');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/products', (req, res) => {
    res.render('index');
});

// Cargamos las rutas de usuarios en '/'
// Otra opción hubiera sido cargarlas en '/users'
app.use('/', userRouter);

app.get('/products/detail', (req, res) => {
    res.render('productDetail');
});    

app.get('/products/cart', (req, res) => {
    res.render('productCart');
});

app.get('/products/new', (req, res) => {
    res.render('productAdd');
});

// Iniciamos el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));