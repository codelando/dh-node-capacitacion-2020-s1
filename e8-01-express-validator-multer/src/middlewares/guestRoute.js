module.exports = (req, res, next) => {
    // Si el usuario está logeado, lo enviamos a la home
    if (req.session.user) {
        return res.redirect('/');
    }

    // De lo contrario que siga a donde iba
    next();
}