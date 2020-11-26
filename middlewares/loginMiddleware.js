const requireLogin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ err: 'Please log in!' });
    }
    next();
};

module.exports = requireLogin;
