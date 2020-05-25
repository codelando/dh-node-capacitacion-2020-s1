# Encuentros de capacitación en Digital House

Nos juntamos a ver diferentes temas relacionados con la cursada de Node y su implementación en clase.

## Episodio 1:  HTML Express y sendfile + Conversión a MVC

¿De que manera podemos mostrar HTML en nuestro servidor con Node?

### [Demo 1: Mostrando HTML y CSS con Express y res.sendFile()](e1-01-html-express-sendfile)

La versión más simple de todas, Express, **express.static()** y **res.sendFile()**, no se necesita mucho más :wink:

### [Demo 2: Organizando el código con una estructura MVC y vistas EJS](e1-02-pasaje-a-mvc)

Partimos del ejemplo anterior, implementamos EJS y reemplazamos **res.sendFile()** por un mucho mejor **res.render()**.

Luego creamos archivos para rutas y controladores para organizar mejor nuestro código.

## Episodio 2:  Métodos de HTTP - CRUD vs BREAD

Manipulación de entidades con Node, rutas, controladores, modelos: ¡MVC en acción!

### [Demo 1: ~~CRUD~~ BREAD implementado con JSON](e2-01-json-crud)

Partimos del ejemplo del último encuentro y armamos un BREAD completo usando una fuente de datos de JSON.

## Episodio 3:  Middlewares y subida de archivos con Multer

¿Qué son los middlewares y para qué se usan? ¿Cómo podemos manejar subidas de archivos?

### [Demo 1: Middlewares de aplicación y de rutas](e3-01-middlewares)

Partimos del ejemplo anterior e implementamos middlewares de aplicación y de rutas.

### [Demo 2: Subida de archivos con Multer](e3-02-multer)

Partimos del ejemplo del último encuentro y agregamos subida de archivos.

### [Demo 3: Anidación de middlewares](e3-03-anidado-de-middlewares)

Una demostración de que los middlewares se ejecutan uno dentro del otro y lugar de ejecutarse uno después del otro.

## Episodio 4:  Sesiones, cookies, registro y login

Vamos a ver cómo funcionan las sessiones las cookies y cómo podemos armar un registro y login completo con ellas.

### [Demo 1: Registro y login con todos los chiches](e4-01-session-cookies-login)

Demostración funcional de login, registro y funcionalidad de recordar al usuario usando JSON como fuente de datos.