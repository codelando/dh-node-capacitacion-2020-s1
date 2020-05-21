# Episodio 2:  Métodos de HTTP - CRUD vs BREAD

## Demo 1: ~~CRUD~~ BREAD implementado con JSON

Partimos del ejemplo del último encuentro y armamos un BREAD completo usando una fuente de datos de JSON.

### 1. Agregamos la entidad de productos

Vamos a crear todos los archivos necesarios para nuestra estructura MVC de productos

- Archivo de rutas routes/productsRouter.js, de momento solo la ruta del listado /.
- Archivo de controllador controllers/productsController.js, de momento sólo el método index.
- Carpeta de vistas views/products con la vista del listado index.ejs.
- Estilos básicos para la vista
- app.use() en src/app.js con las rutas de productos.

### 2. Colecciones de productos en formato JSON

Necesitamos una fuente de datos y para este ejemplo va a ser JSON.

- Creamos la carpeta src/data donde pondremos nuestras colecciones en formato JSON.
- Creamos el archivo products.json en la carpeta anterior, de momento con algunos productos agregados manualmente.
- Creamos la carpeta models que guardará nuestros modelos, ellos interactuarán con las colecciones.
- Creamos el modelo genérico para JSON models/jsonModel.js, en él tendremos dos métodos iniciales:
    - Lectura del archivo JSON
    - Traer todos los elementos
- Actualizamos el controlador de productos para que utilize nuestro nuevo modelo y envíe los productos a la vista.
- Actualizamos la vista para que muestre los productos de manera dinámica.

### 3. Detalle de productos

Vamos con el detalle de un producto particular, muy similar a la parte del listado solo que trayendo 1 elemento:

- Modelo: método **find()**
- Ruta: **/products/:id** (GET)
- Controlador: método **show()**
- Vista: **products/detail.ejs**
- Error: **products/404.ejs**

### 4. Creación de productos

Como vamos a trabajar con formularios, necesitamos implementar un middleware de Express en el **app.js**

```
app.use(express.urlencoded({extended: false}));
```

Para el formulario de nuevo producto:
- Ruta: **/products/create** (GET)
- Controlador: método **create()**
- Vista: **products/create.ejs**

Para trabajar con la colección de productos:
- Modelo: método **nextId()** y **create()**
- Ruta: **/products** (POST)
- Controlador: método **store()**

### 5. Edición de productos

Formulario de edición producto:
- Ruta: **/products/:id/editar** (GET)
- Controlador: método **edit()**
- Vista: **products/edit.ejs**

Almacenamiento en la colección de productos:
- Modelo: método **update()**
- Ruta: **/products** (PUT)
- Controlador: método **update()**

Como vamos a trabajar con métodos HTTP no soportados por el navegador (primero PUT y luego DELETE) necesitamos implementar un nuevo módulo:
```
npm i method-override
```

- Lo requerimos en nuestro src/app.js
- Lo implementamos como middleware de aplicación. 
```
app.use(methodOverride('_method'));
```
- Lo implementamos en el formulario a través del query string del request `?_method=PUT`

### 6. Eliminación de productos

Eliminando en la colección de productos:
- Modelo: método **destroy()**
- Ruta: **/products/:id** (DELETE)
- Controlador: método **destroy()**
- Vista: **products/detail.ejs,** formulario apuntando a la ruta correspondiente.