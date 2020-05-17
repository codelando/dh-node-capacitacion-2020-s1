# Episodio 1:  HTML Express y sendfile + Conversión a MVC

## Demo 2: Organizando el código con una estructura MVC y vistas EJS

Vamos a partir de la demo anterior y mejorar su estructura con el patrón MVC y vistas usando EJS.

Al terminar deberíamos tener la siguiente estructura de archivos y directorios:

```
.
├── package.json
├── package-lock.json
├── public
│   └── css
│       └── app.css
├── README.md
└── src
    ├── app.js
    └── views
        ├── pagina-1.ejs
        └── etc...
```

### 1. Instalamos EJS y lo configuramos

```
npm i ejs
```

Configuramos **EJS** como motor de vistas y la carpeta donde buscar los archivos **.ejs**

```javascript
app.set('view engine', 'ejs');
app.set('views', 'src/views');
```

### 2. Pasamos nuestras vistas a EJS y cambiamos **res.sendFile()** por **res.render()**

Para arrancar simplemente con cambiar la extensión **.html** por **.ejs** es suficiente para probar nuestras vistas

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


