const express = require('express');
// const path = require('path');
const app = express();

// Vistas y recursos estáticos
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Rutas
const siteRouter = require('./routes/siteRouter');

app.use('/', siteRouter);

// Iniciamos el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));