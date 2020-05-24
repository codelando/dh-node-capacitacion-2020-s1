module.exports = (req, res, next) => {
    if (process.env.MAINTENANCE_MODE === '1') {
        return res.status(503).render('503');
    }

    next();
};