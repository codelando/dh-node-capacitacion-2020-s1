# Episodio 3:  Middlewares y subida de archivos con Multer

## Demo 2: Subida de archivos con Multer

Partimos del ejemplo del último encuentro y agregamos subida de archivos.

### 1. Instalamos multer

No es posible realizar la subida de archivos en Express sin un middleware que se encargue de ello. Nosotros vamos a usar Multer.

> In Express 4, req.files is no longer available on the req object by default. To access uploaded fileson the req.files object, use multipart-handling middleware like busboy, multer,formidable,multiparty,connect-multiparty,or pez.

```
npm i multer
```

### 2. Agregamos el enctype a nuestros formularios

Indispensable para que los archivos que enviemos desde los formularios lleguen al servidor.

En este caso vamos a implementarlo en el formulario de creación y edición.

```html
<form action="/products" method="POST" enctype="multipart/form-data">
```

```html
<form action="/products/<%= locals.product && product.id %>?_method=PUT" method="POST" enctype="multipart/form-data">
```

### 3. Implementamos Multer en las rutas de productos

Todo lo que viene a continuación lo haremos en nuestro archivo de rutas **src/routes/productRouter.js**. Y eso es porque Multer es un middleware que solo aplica a rutas específicas.

#### 3.1. Requerimos el modulo de Multer y de Path. Path lo utilizaremos para formar las rutas a los directorios y archivos.

```javascript
const path = require('path');
const multer = require('multer');
```

#### 3.2. Escribimos la configuración de almacenamiento de Multer. Necesitamos el destino del archivo (destination) y la manera en que se generará su nombre (filename).

```javascript
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images/products'),
    filename: (req, file, cb) => {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname));
    }
});
```

**Es importante** que la carpeta de destino exista y tenga los permisos adecuados para que Node pueda escribir en ella.

#### 3.3. Ejecutamos el middleware con la configuración anterior:

```javascript
const upload = multer({ storage });
```

#### 3.4. Lo aplicamos a las rutas que reciban formularios con archivos:

```javascript
router.post('/', upload.single('image'), controller.store);

...

router.put('/:id', upload.single('image'), controller.update);
```

Por lo general, si hay más de un middleware para la ruta, Multer debe ir primero ya que es quien se encarga de que la información del formulario esté disponible.