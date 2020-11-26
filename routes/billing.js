const keys = require('../config/keys');

const express = require('express');
const stripe = require('stripe')(keys.stripeSecretKey);

const requireLogin = require('../middlewares/loginMiddleware');

const route = express();

route.post('/api/stripe', requireLogin, async (req, res) => {
    try {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '500 cents for 5 credits',
            source: req.body.id,
        });

        if (!charge) return res.status(400).send({ err: 'An error occured!' });

        req.user.credits += 5;

        const user = await req.user.save();
        res.status(200).send(user);
    } catch {
        (err) => {
            return res.status(500).send(err.message);
        };
    }
});

module.exports = route;
