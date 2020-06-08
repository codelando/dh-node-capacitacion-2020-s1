const db = require('../database/models');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');

module.exports = {
    userLogin: [
        check('email')
            .notEmpty().withMessage('Debes completar el email').bail()
            .isEmail().withMessage('El email no es válido').bail()
            // Acá solamente para mostrarles cómo validar con Sequelize
            // En mi opinión esto debe ir en el controlador, no es responsabilidad
            // de Express Validator
            .custom((value) => {
                return db.user
                    .findOne({ where: { email: value} })
                    .then(user => {
                        if (!user) {
                            return Promise.reject('El email no se encuentra registrado')
                        }
                    })
            }),
        check('password', 'La contraseña debe ser de al menos 8 caracteres')
            .notEmpty().withMessage('Debes completar el password')
    ],
    userCreate: [
        check('email')
            .notEmpty().withMessage('Debes completar el email').bail()
            .isEmail().withMessage('El email no es válido'),
        check('password', 'La contraseña debe ser de al menos 8 caracteres')
            .notEmpty().withMessage('Debes completar el password').bail()
            .isLength({ min: 8 }),
        // Utilizamos el req.file que enviamos desde las rutas para validar las imágenes
        check('image')
            .custom((value, { req }) => {
                if (req.file.error === 'type') {
                    throw new Error('La imagen debe ser de tipo PNG');
                }
                return true;
            })
    ]
}