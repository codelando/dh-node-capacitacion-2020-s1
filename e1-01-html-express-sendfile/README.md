# Episodio 1:  HTML Express y sendfile + Conversión a MVC

## Demo 1: Mostrando HTML y CSS con Express y res.sendFile()

Para mostrar un sitio web completo con Node hacen falta muy pocos elementos.

Para este ejemplo estaremos usando la siguiente estructura de archivos y directorios:

```
.
├── .gitignore
├── package.json
├── package-lock.json
├── public
│   └── css
│       └── app.css
└── src
    ├── app.js
    └── views
        ├── pagina-1.html
        └── etc...
```

### 1. Inicializamos el ambiente de Node e instalamos Express

```
npm init
npm i express
```

(Opcionalmente) Si vamos a usar GIT, creamos el archivo **.gitignore** e ignoramos la carpeta **node_modules**

```
node_modules
```

(Opcionalmente) Instalamos Nodemon y creamos nuestros scripts de arranque

```
npm i nodemon --save-dev
```

En este caso instalamos **nodemon** como un paquete de desarrollo, ya que no lo utilizaremos en producción.

Luego en el archivo **package.json** creamos nuestros scripts de arranque.

```
  "scripts": {
    "start": "node src/app.js",
    "startdev": "nodemon src/app.js -e js,ejs,css"
  },
```

### 2. Creamos nuestro archivo **app.js** e inicializamos Express 

Utilizaremos la carpeta **src** para todo el código de nuestra aplicación.

```javascript
const express = require('express');
const app = express();
```

### 3. Configuramos nuestra carpeta de recursos estáticos para imágenes y archivos de CSS / JS

El método static() de Express nos permite configurar una o más carpetas donde serviremos contenido estático, es decir, contenido que se mostrará directamente al cliente sin pasar por el sistema de ruteo de Node. 

Utilizaremos la carpeta **public** para todo el contenido estático.

```javascript
app.use(express.static('public'));
```

### 4. Ubicamos nuestros archivos HTML en la carpeta **views** y creamos una ruta para cada uno

Vamos a usar la librería **path** para asegurarnos que los paths funcionen sin importar el sistema operativo.

```javascript
const path = require('path');
```

Para las rutas usaremos **res.sendFile()**, que se encargará de hacer todo el trabajo necesario por nosotros en función de la extensión del archivo que estemos enviando al cliente. En este ejemplo será solo HTML.

```javascript
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
```

### 4. Iniciamos el servidor y corremos nuestra aplicación

```javascript
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
```

Para producción podemos usar:

```
npm start
```

Para desarrollo podemos usar:

```
npm run startdev
```