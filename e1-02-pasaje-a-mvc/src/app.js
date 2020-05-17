// Path nos asegura que las rutas van a funcionar sin importar el SO.
const path = require('path');
const express = require('express');
const app = express();

// Necesitamos indicarle a Express que todo lo que está en la capeta public
// es contenido estático, es decir que no pasa por el sistema de rutas
app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/login.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/productDetail.html'));
});    

app.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/productCart.html'));
});    

app.get('/product/new', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/productAdd.html'));
});

// Iniciamos el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));