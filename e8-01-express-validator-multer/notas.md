## Pasos:

```npm i express-validator```

- validators
    - Carpeta
    - require express-validator
    - Primer validator
- Rutas
    - require del validador
    - implementación en la ruta

- Controller
    - validationResult(req) -> errors

- default message / withMessage()
- custom
    - return true / Promise.reject()

Files
- multer()
    - limits
    - filefilter

## Enlaces útiles:

**Validation chain**

https://express-validator.github.io/docs/validation-chain-api.html

**check() vs body()**

https://express-validator.github.io/docs/check-api.html
https://express-validator.github.io/docs/whole-body-validation.html

**Validators**

https://github.com/validatorjs/validator.js#validators

**File Filter**

https://www.npmjs.com/package/multer#limits
https://www.npmjs.com/package/multer#filefilter