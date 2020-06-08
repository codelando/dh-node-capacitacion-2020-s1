## Episodio 8:  Validaciones de backend 

## Demo 1: Validando con Express Validator y Multer

Partimos del ejemplo del último encuentro y agregamos algunas validaciones.

### 1. Instalamos Express Validator

```npm i express-validator```

### 2. Creamos nuestros validadores

Para esto podemos crear la carpeta **validators** y dentro de ella un archivo por cada entidad, ej.: **usersValidators.js**.

Requerimos el módulo y destructuramos el método que necesitemos usar, en este caso será **check()**.

```const { check } = require('express-validator');```

Dentro de cada validador tendremos un objeto literal con una propiedad por validador.

```
module.exports = {
    userLogin: [
        check('email')
            .notEmpty().withMessage('Debes completar el email').bail()
            .isEmail().withMessage('El email no es válido'),
        check('password', 'La contraseña debe ser de al menos 8 caracteres')
        .notEmpty().withMessage('Debes completar el password')
    ],
    userCreate: [ 
        ...
    ]
}
```

### 3. Implementamos las validaciones en las rutas

```const validate = require('../validators/usersValidators');```

```router.post('/login', guestRoute, validate.userLogin, controller.autenticate);```

### 4. Procesamos los errores en el controlador

```const { validationResult } = require('express-validator');```

```
const { validationResult } = require('express-validator');

if(!errors.isEmpty()) {
    return res.render('users/register', { 
        old: req.body, 
        errors: betterErrors 
    });
}
```

### 5. Presentamos los errores en la vista

Los errores generados por Express Validator tendrán el siguiente formato (usando errors.mapped()):

```
{
    errors: {
        email: {
        value: 'noEsUnEmail',
        msg: 'El email no es válido',
        param: 'email',
        location: 'body'
        },
    }
}
```

Con esto podemos trabajar la vista:

```
<div class="field">
    <label for="email">Email</label>
    <div class="control">
        <input type="text" name="email" id="email" class="<%= locals.errors && errors.email ? 'is-danger' : '' %> " value="<%= errors.value('email') %>">
    </div>
    <% if(locals.errors && errors.has('email')) { %>
        <p class="feedback is-danger"><%= errors.msg('email') %> </p>
    <% } %>
</div>
```

### 6. Implementamos fileFilter en la subida de archivos con multer

Dentro de la ejecución de **Multer**, utilizamos el método **fileFilter**.

```
const upload = multer({ 
    storage,
    limits: { fileSize: 1024 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png') {
            file.error = "type";
            req.file = file;

            return cb(null, false, new Error('Está mal el mimeType'));
        }
        return cb(null, true);
    }
});
```

Luego tomamos el objeto file para validar con **Express Validator**

```
check('image')
    .custom((value, { req }) => {
        if (req.file.error === 'type') {
            throw new Error('La imagen debe ser de tipo PNG');
        }
        return true;
    })
```