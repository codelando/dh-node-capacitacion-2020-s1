const express = require('express');
const app = express();

// El objetivo de esta demo es mostrar que los middlewares se anidan más que estar uno después del otro.

const middleware1 = (req, res, next) => {
    console.log('Middleware 1: antes del next()');
    next();
    console.log('Middleware 1: después del next()');
}

const middleware2 = (req, res, next) => {
    console.log('Middleware 2: antes del next()');
    next();
    console.log('Middleware 2: después del next()');
}

const middleware3 = (req, res, next) => {
    console.log('Middleware 3: antes del next()');
    next();
    console.log('Middleware 3: después del next()');
}

app.get('/', middleware1, middleware2, middleware3, (req, res) => {
    res.send('Mirar la consola para ver el ejemplo.')
});

app.listen(3000, () => { console.log('Servidor escuchando en el puerto 3000'); })