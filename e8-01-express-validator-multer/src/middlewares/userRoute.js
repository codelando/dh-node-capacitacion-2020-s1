module.exports = (req, res, next) => {
    // Si el usuario no está logeado, lo enviamos al login
    if (!req.session.user) {
        return res.redirect('/users/login');
    }

    // De lo contrario que siga a donde iba
    next();
}