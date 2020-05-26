const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jsonDB = require('../database/jsonDatabase');

const userModel = jsonDB('users');
const userTokenModel = jsonDB('usersTokens');

module.exports = {
    register: (req, res) => {
        res.render('users/register');
    },
    store: (req, res) => {
        // Hacemos la imagen obligatoria (podría ser un middleware ;-) )
        if (!req.file) {
            return res.render('users/register', { 
                old: req.body,
                errors: {
                    image: 'La imagen es obligatoria'
                }
            });
        }
        
        // Tomamos los datos del formulario
        const user = req.body;
        
        user.password = bcrypt.hashSync(user.password, 10);
        user.image = req.file ? req.file.filename : '';
        user.category = 'user';

        // Borramos lo que no necesitamos
        delete user.repassword;

        userModel.create(user);

        res.redirect('/');
    },
    login: (req, res) => {
        res.render('users/login');
    },
    authenticate: (req, res) => {
        const user = userModel.findByField('email', req.body.email);
        
        // Si el email existe en base...
        if (user) {
            // y la contraseña es correcta...
            if (bcrypt.compareSync(req.body.password,user.password)) {
                // Eliminamos los datos sensibles y guardamos el usuario en sesión
                delete user.password;

                req.session.user = user;

                // Si pidió que lo recordemos
                if (req.body.remember) {
                    // Generamos un token seguro, eso para que no pueda entrar cualquiera
                    // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
                    const token = crypto.randomBytes(64).toString('base64');
                    
                    // Lo guardamos en base, para poder chequearlo luego
                    userTokenModel.create({userId: user.id, token});
                    
                    // Recordamos al usuario por 3 meses         msegs  segs  mins  hs   días
                    res.cookie('rememberToken', token, { maxAge: 1000 * 60  * 60 *  24 * 90 });                
                }

                // Finalmente lo mandamos a la home
                return res.redirect('/');
            } else {
                // Si la contraseña esta mal
                return res.render('users/login', { 
                    old: req.body,
                    errors: { 
                        email: 'El email o la contraseña son inválidos'
                    }
                });
            }
        } else {
            // Si el email no existe
            return res.render('users/login', { 
                old: req.body,
                errors: { 
                    email: 'El email o la contraseña son inválidos'
                }
            });        
        }
    },
    profile: (req, res) => {
        res.render('users/profile');
    },
    logout: (req, res) => {
        // Borramos el registro de la base de datos si existe
        const token = userTokenModel.findByField('token', req.cookies.rememberToken);
        if (token) {
            userTokenModel.delete(token.id);
        }

        // Destruimos la sesión
        req.session.destroy();
        
        // Destruimos la cookie de recordar
        res.clearCookie('rememberToken');

        // Redirigimos a la home
        res.redirect('/');
    }
}