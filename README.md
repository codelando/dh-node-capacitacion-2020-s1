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

## Episodio 5:  Sequelize vI - Configuración, modelos y operadores

Cómo se configura Sequelize dentro de un proyecto de express. Creando modelos y entendiendo los operadores.

### [Demo 1: Configuración inicial de Sequelize](e5-01-sequelize-vI)

Demostración funcional de Sequelize con nuestra DB MySQL.

## Episodio 6:  Sequelize vII - Relations - belongsTo y hasMany

Demostración de como trabajar con relaciones y la importancia de las mismas

### [Demo 1: Relaciones belongsTo, hasMany, belongsToMany](e6-01-sequelize-vII)

Demostración funcional de las relaciones en Sequelize.

## Episodio 7:  Sequelize vIII - Relations - Migrations + Seeders

Como crear tablas y popular las mismas con Sequelize

### [Demo 1: Haciendo migraciones y seeders con Sequelize](e7-01-sequelize-vIII)

Creando tablas e insertando datos desde la terminal con Sequelize

## Episodio 8:  Validaciones de backend

Validación de formularios con Express Validator y Multer

### [Demo 1: Validando con Express Validator y Multer](e8-01-express-validator-multer)

Ejemplo de validación usando Express Validator y Multer

## Episodio 9 y 10: Introducción a React + Stateful components

Setup inicial. Trabajando con componentes stateless y sus props
Stateful components: state & setState()
Event Handlers: Manejo y seteo de eventos dentro de un stateful components

### [Demo 1: React App](e9-10-01-react-vI-vII)

Ejemplo de creación de aplicación de React, componentes y props
Ejemplo de stateful components & event handlers

## Episodio 11: Life Cycle & API's Request

Ciclo de vida de componentes
API's request

### [Demo 1: Star Wars App](e11-01-react-vIII)

Ejemplo de ciclo de vida con llamado a la API [http://swapi.dev](http://swapi.dev)