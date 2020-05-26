# Episodio 4:  Sesiones, cookies, registro y login

## Demo 1: Registro y login con todos los chiches

Partimos del ejemplo del último encuentro y agregamos la funcionalidad de login y registro.

### 1. Entidad de usuarios

- Implementamos la entidad de usuarios replicando la de productos
    - Rutas: **src/routes/user.js**
    - Controlador: **src/controllers/userController.js**
    - Vistas: **src/views/users/**
    - Directorio para imágenes: **public/images/users/**
    - Coleccion: **src/data/users.json**

### 2. Login y perfil

- Implementamos las vistas de registro (usamos el create que ya teníamos) y login

- Implementamos las rutas correspondientes 
    - **/users/login** (GET y POST)
    - **/users/logout** (GET)

- Implementamos en el modelo, el método que nos permitirá buscar usuarios por email (o cualquier otro campo)

- Implementamos la encriptación de contraseñas
    - `npm i bcryptjs`
    - Lo requerimos en el controlador de usuarios
    - Lo implementamos en el método **create**, `bcrypt.hashSync(...)`
    - Lo implementamos en el método **login**, `bcrypt.compareSync(...)`

- Implementamos el uso de sesiones
    - `npm i express-session`
    - Lo requerimos en **src/app.js**
    - Lo inicializamos con la configuración mínima sugerida `{ secret..., resave..., saveUninitialized...}`
    - Creamos la sesión al hacer el login y guardamos los datos del usuario en ella.
    - Destruimos la sesión al hacer logout

### 3. Middlewares de autenticación, rutas de huésped y rutas de usuario

- Implementamos un middleware de autenticación. Él se encargará de verificar si existe un usuario en sesión y en ese caso hará disponible su información para las vistas.
    - Creamos la carpeta **src/middlewares**
    - Creamos el middleware **src/middlewares/auth**
    - Lo implementamos en **src/app.js**
    - Modificamos la barra de navegación para que muestre los enlaces que correspondan según el usuario esté logeado o no.

- Implementamos dos middlewares para tener rutas de usuarios y de huéspedes
    - Creamos el middleware **src/middlewares/guestRoute**
        - Si un usuario accede a esta ruta, lo redirigimos
    - Creamos el middleware **src/middlewares/userRoute**
        - Si un huésped (alquien no logeado) accede a esta ruta, lo redirigimos
    - Los implementamos en **src/routes/users.js**

### 4. Implementamos la funcionalidad de recordar al usuario

- Implementamos el módulo de manejo de cookies
    - `npm i cookie-parser`
    - Lo requerimos en **src/app.js**
    - Lo inicializamos con **app.use(...)**

- Implementamos la funcionalidad para recordar al usuario
    - Modelo
        - Implementamos el método para traer todos los registros por campo
    - Controlador
        - Utilizamos el modulo **crypto** para generar un token seguro
        - Creamos la cookie con el token si llega el campo **remember** durante el **login**
        - Destruimos la cookie y el documento durante el **logout**
    - Coleccion: **src/data/userTokens.json**

- Modificamos nuestro middleware de autenticación para que detecte la cookie y loguee al usuario