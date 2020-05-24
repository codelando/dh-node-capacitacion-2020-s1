# Episodio 3:  Middlewares y subida de archivos con Multer

## Demo 1: Middlewares de aplicación y de rutas

Partimos del ejemplo del último encuentro.

Vamos a crear un middleware que muestre una página de mantenimiento para todo el sitio o una ruta en particular.

### 1. Agregamos la carpeta de middlewares y el archivo donde escribiremos el código

```
.
├── app.js
├── ...
└── src
    ├── ...
    └── middlewares
        └── maintenance.js
```

### 2. Escribimos nuestro middleware

En este caso vamos a estar enviando un estado 503 (servicio no disponible / en mantenimento) y devolviendo una vista con EJS.

El return es importante en este caso particular para cortar la ejecución de otros middlewares que vengan después.

```javascript
module.exports = (req, res, next) => {
    return res.status(503).render('503');
};
```

### 3. Agregamos la vista 

Será la vista que nuestro visitante vea cuando el sitio esté en mantenimiento.

```
.
├── app.js
├── ...
└── src
    ├── ...
    └── views
        ├── 503.ejs
        └── ...
```

### 4. Implementamos el middleware para toda la aplicación

Requerimos el módulo y utilizamos `app.use()` para implementarlo. 

**Importante:** como nuestra vista require imágenes y CSS, debemos implementar nuestro middleware después de el middleware de `express.static()`.

```javascript
...

const maintenance = require('./middlewares/maintenance');

// Vistas y recursos estáticos
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(maintenance);

...
```

### 5. Implementamos el middleware para una ruta en particular

En este caso por ejemplo para el formulario de creación de productos.


```javascript
...



...
```