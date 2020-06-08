const db = require('../database/models');

// Queremos que todo esto pase antes de seguir adelante, por eso necesitamos async
module.exports = async (req, res, next) => {

    // Si el usuario está en sesion le pasamos la información a las vistas
    if (req.session.user) {

        res.locals.user = req.session.user;
        return next();
    // Si el usuario tiene la cookie de recordar
    } else if (req.cookies.rememberToken) {

        const token = await db.token.findOne({
            where: {
                token: req.cookies.rememberToken
            }
        })

        // ...y la token existe en nuestra base
        if (token) {
           
            const user = await db.user.findOne({
                where: {
                    id: token.userId
                }
            })

            // ...y el usuario existe en base, lo logeamos
            if (user) {
                userData = user.dataValues;
                delete userData.password;

                req.session.user = userData;
                res.locals.user = userData;               
            }
        }
    }

    next();
}