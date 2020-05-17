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

### 2. Inicializamos Express y configuramos nuestra carpeta de recursos estáticos para imágenes y archivos de CSS / JS

```javascript
const express = require('express');
const app = express();
```

El método static() de Express nos permite configurar una o más carpetas donde serviremos contenido estático, es decir, contenido que se mostrará directamente al cliente sin pasar por el sistema de ruteo de Node. 

```javascript
app.use(express.static('public'));
```

### 3. Crear una carpeta **src** para nuestra aplicación con el archivo **app.js**



En este caso usamos views

```
.
├── .gitignore
├── package.json
├── package-lock.json
├── public
│   └── css
│       └── app.css
├── README.md
└── src
    ├── app.js
    └── views
        ├── index.html
        ├── login.html
        ├── productAdd.html
        ├── productCart.html
        ├── productDetail.html
        └── register.html
```