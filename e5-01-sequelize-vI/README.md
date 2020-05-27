# Episodio 5:  Sequelize vI

## Demo 1: Configuración, modelos y operadores

Arrancamos desde cero, focalizándonos particularmente en la implementación de Sequelize dentro de un proyecto de Express.

---

## Temario
1. [sequelize-cli](#seq-cli)
2. [Inicialización del proyecto](#init)
3. [Creación del primer modelo](#model)
4. [Estructura de un modelo](#model)

---

## 1. sequelize-cli <a name="seq-cli"></a>
Lo primero que se debe tener listo es el comando `sequelize` habilitado en nuestra terminal. Para ello instalaremos dicho paquete de **npm** de manera global en nuestra máquina para tenerlo siempre a disposición.

```
npm install -g sequelize-cli
```

Para corroborar que se instalo efectivamente el paquete, escribiremos en la terminal ```sequelize``` a lo cual se deberá mostrar algo así:

```
Sequelize CLI [Node: 12.14.1, CLI: 5.5.1, ORM: 5.21.3]

sequelize [command]

Commands:
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file                       [aliases: migration:create]
  sequelize model:generate                    Generates a model and its migration                      [aliases: model:create]
  sequelize seed:generate                     Generates a new seed file
```

---

## 2. Inicialización del proyecto <a name="init"></a>
Ahora, inicializaremos las carpetas y archivos base que necesitamos para comenzar a trabajar. Para ello tomaremos el siguiente código:

```
const path = require('path');

module.exports = {
	config: path.resolve('./src/database/config'),
	'models-path': path.resolve('./src/database/models'),
	'seeders-path': path.resolve('./src/database/seeders'),
	'migrations-path': path.resolve('./src/database/migrations'),
};
```

Y guardaremos en mismo en un archivo llamado ```.sequelizrc```, el cual deberá estar ubicado en la raíz de nuestro proyecto de NODE + EXPRESS.

```
.
├── node_modules
├── public
├── src
│   ├── app.js
│   └── etc...
├── .sequelizerc ← ¡ARCHIVO NECESARIO!
├── package.json
└── ...
```

Con dicho archivo listo, podremos ejecutar en la terminal el siguiente comando:

```
sequelize init
```

Este comando creará dentro de la carpeta `/src` una sub-carpeta llamada `/database`, la cual tendrá la siguiente estructura:

```
.
├── src
│   ├── app.js
│   └── database
│       └── config
│           └── config.json
│       └── migrations
│       └── models
│           └── index.js
│       └── seeders
├── .sequelizerc
└── ...
```

Entendiendo que las carpetas **migrations** y **seeders** estarán vacías. Dentro del archivo `config.js` la estructura del mismo deberá configurarse así:

```js
{
  "development": {
    "username": DB_USER, // ← Usuario de la DB
    "password": DB_PASS, // ← Contraseña del usuario de la DB
    "database": DB_NAME, // ← Nombre de la DB previamente creada
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Si hasta aquí todo salió bien, con estos pasos ya tendremos conexión a nuestra base de datos.

---

## 3. Creación del primer modelo <a name="model"></a>
Al crear un modelo con la terminal, `sequelize` creará a su vez la correspondiente *migration* del mismo. 

Para crear un modelo basta con ejecutar en la terminal el siguiente comando:

```
sequelize model:generate --name User --attributes firstName:string,lastName:string
```

Deshilvanemos el mismo para entenderlo un poco más a fondo:

* `model:generate`: indica a `sequelize` que deberá crear un modelo y su respectiva *migration*.
* `--name User`: creará el modelo `user.js` dentro de la carpeta `/database/models` y la *migration* para crear la tabla `Users` dentro de la carpeta `/database/migrations`. El nombre del archivo de migración tendrá un *timestamp* y el texto *create-user*, se verá algo así: `20200420214736-create-user.js`.
* `--attributes`: permite definir las columnas de la tabla y atributos del modelo. No es necesario definir todas las columnas/atributos, pues las mismas se podrán especificar una vez los archivos estén creados.

Con esto hecho, la estructura de archivos dentro de la carpeta `/database` deberá verse algo así:

```
.
├── database
│   └── config
│       └── config.js
│   └── migrations
│       └── 20200420214736-create-user.js
│   └── models
│       └── index.js
│       └── user.js
│   └── seeders
└── ...
```

## 4. Estructura del modelo <a name="model"></a>
Como bien es sabido, un modelo es la representación que el ORM tiene de una tabla en la base de datos. Generalmente un modelo se ve de la siguiente manera:

```js
'use strict';
module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
   }, {});

   User.associate = function(models) {
      // associations can be defined here
   };

   return User;
};
```

En este caso, dentro de éste archivo lo único que se debe definir son las columnas que se desean obtener de la tabla (*la columna id no es necesaria, viene implícita*), pues las mismas quedarán disponibles para lectura y escritura. Cualquier columna existente en la tabla y no referenciada en el modelo será ignorada.