const jsonDB = require('../database/jsonDatabase');
const userModel = jsonDB('users');
const userTokenModel = jsonDB('usersTokens');

module.exports = (req, res, next) => {
    // Por defecto el usuario no está logeado
    res.locals.user = false;

    // Si existe el usuario en session
    if (req.session.user) {
        // Se lo pasamos a la vista
        res.locals.user = req.session.user;

        next();

    // O si tiene la cookie de recordar
    } else if (req.cookies.rememberToken) {     
        const userToken = userTokenModel.findByField('token', req.cookies.rememberToken);

        // y existe el token en nuestra base
        if (userToken) {       
            const user = userModel.find(userToken.userId);

            // y existe el usuario en nuestra base
            if(user) {
                delete user.password;
                
                // Se lo pasamos a la sesión a la vista
                req.session.user = user;
                res.locals.user = user;
            }
        }
    }

    next();
}