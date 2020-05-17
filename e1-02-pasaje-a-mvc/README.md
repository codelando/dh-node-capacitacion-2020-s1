# Episodio 1:  HTML Express y sendfile + Conversión a MVC

## Demo 2: Organizando el código con una estructura MVC y vistas EJS

Vamos a partir de la demo anterior y mejorar su estructura con el patrón MVC y vistas usando EJS.

Al terminar deberíamos tener la siguiente estructura de archivos y directorios:

```
.
├── app.js
├── package.json
├── package-lock.json
├── public
│   └── css
│       └── app.css
└── src
    ├── app.js
    ├── controllers
    │   └── userController.js
    ├── routes
    │   └── userRouter.js
    └── views
        ├── index.ejs
        ├── login.ejs
        ├── partials
        │   ├── footer.ejs
        │   ├── head.ejs
        │   └── header.ejs
        ├── pagina-1.ejs
        └── etc...
```

### 1. Instalamos EJS y lo configuramos

```
npm i ejs
```

Configuramos **EJS** como motor de vistas y la carpeta donde va a buscar los archivos **.ejs**.

```javascript
app.set('view engine', 'ejs');
app.set('views', 'src/views');
```

### 2. Pasamos nuestras vistas a EJS y cambiamos **res.sendFile()** por **res.render()**

Para arrancar simplemente con cambiar la extensión **.html** por **.ejs** es suficiente.

Luego nos toca cambiar el método **res.sendFile()**

```javascript
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
});
```

Por el mucho mejor método **res.render()**

```javascript
app.get('/', (req, res) => {
    res.render('index');
});
```

Este método no necesita de extensiones o de rutas absolutas. Buscará archivos .ejs en la carpeta que hayamos configurado.

Con esto ya podemos probar nuestras vistas.

### 3. (Opcional) Creamos archivos parciales y utilizamos **include()**

En este punto, podemos tomar ventaja de herramientas como la función de **include()** de EJS para generar archivos parciales con pedazos de nuestro sitio que se repitan: head, header, footer, etc...

Para hacerlo simplemente creamos una carpeta **partials** dentro de **views** y generamos un archivo .ejs por cada bloque de código que queramos separar. Nuestra estructura de archivos podría verse algo como esto:

```
src
├── app.js
└── views
    ├── index.ejs
    ├── login.ejs
    ├── partials
    │   ├── footer.ejs
    │   ├── head.ejs
    │   └── header.ejs
    ├── pagina-1.ejs
    └── etc...
```

El **<head>...</head>** es un buen ejemplo, para esta demo nuestro **head.ejs** contendrá lo siguiente:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sticker Wizard 🧙‍♂️</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&family=Baloo+Paaji+2&display=swap"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="/css/app.css">
</head>
```

Luego en cada archivo donde lo querramos usar, simplemente implementamos los tags correspondientes `<%- %>` y la función **include** `include('path')` donde el path será relativo desde donde lo estemos ejecutando.

```javascript
<%- include('partials/head') %>
```

### 4. Creamos nuestro primer archivo de rutas

En este caso vamos a mostrar el ejemplo con las rutas de usuarios. Lo ideal es tener un archivo por entidad: usuarios, productos, etc...

Creamos el directorio **routes** y el archivo **userRoutes.js**. Dentro de él deberemos llevar las rutas de usuarios, para el caso de esta demo sería login y registro.

```javascript
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});
```

Instanciamos Express y luego instanciamos el ruteador de Express. 

```javascript
const express = require('express');
const router = express.Router();
```

A continuación reemplazamos **app.** por **router.**. Esto es por prolijidad ya que estamos usando solo el Router y no toda la funcionalidad de Express.

```javascript
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});
```

Finalmente exportamos el ruteador para que esté disponible al incluir este archivo.

```javascript
module.exports = router;
```

### 5. Creamos nuestro primer archivo controlador

Nuevamente vamos a mostrar el ejemplo con las rutas de usuarios. Lo ideal es tener un archivo por entidad: usuarios, productos, etc...

Creamos el directorio **controllers** y el archivo **userControler.js**. Dentro de él deberemos llevar las funciones que se encontraban dentro de nuestras rutas. 

Vamos a exportar un objeto literal y sus métodos deberían tener nombres que indiquen qué ruta están resolviendo. 

El resultado debería ser algo como esto:

```javascript
module.exports = {
    register: (req, res) => {
        res.render('register');
    },
    login: (req, res) => {
        res.render('login');
    },
}
```

### 6. Implementamos los métodos del controlador en el archivo de rutas.

Ahora que tenemos los métodos disponibles, toca implementarlos en nuestro archivo de rutas, 

Primero deberemos importar el controlador y luego usar cada método en la ruta que corresponda. El resultado debería verse así:

```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/register', controller.register);

router.get('/login', controller.login);

module.exports = router;
```

### 7. Implementamos el archivo de rutas en nuestro **app.js**

Requerimos el archivo de rutas:

```javascript
const userRouter = require('./routes/userRouter');
```

Lo implementamos con el método **app.use()**. Recuerden que la ruta que pongamos se concatenará a las que hayan dentro del archivo de rutas.

```javascript
app.use('/', userRouter);
```

### 8. Repetimos los pasos para cada una de las entidades
