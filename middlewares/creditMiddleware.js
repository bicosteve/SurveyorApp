const requireCredit = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ err: 'Not enought credits!' });
    }
    next();
};

module.exports = requireCredit;
