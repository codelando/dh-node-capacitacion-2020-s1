// Path nos asegura que las rutas van a funcionar sin importar el SO.
const path = require('path');
const express = require('express');
const app = express();

// Necesitamos indicarle a Express que todo lo que está en la capeta public
// es contenido estático, es decir que no pasa por el sistema de rutas
app.use(express.static('public'));

// Configuramos EJS como motor de vistas
app.set('view engine', 'ejs');
// Configuramos la carpeta donde EJS buscará los archivos
app.set('views', 'src/views');


// Rutas
const userRouter = require('./routes/userRouter');

app.get('/', (req, res) => {
    res.render('index');
});

// Cargamos las rutas de usuarios en '/'
// Otra opción hubiera sido cargarlas en '/users'
app.use('/', userRouter);

app.get('/product', (req, res) => {
    res.render('productDetail');
});    

app.get('/cart', (req, res) => {
    res.render('productCart');
});    

app.get('/product/new', (req, res) => {
    res.render('productAdd');
});

// Iniciamos el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));