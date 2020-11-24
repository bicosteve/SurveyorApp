const passport = require('passport');
const express = require('express');

const route = express();

route.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

route.get('/auth/google/callback', passport.authenticate('google'));

route.get('/api/logout', (req, res) => {
    req.logout();
    res.send({ msg: 'User logged out!' });
});

route.get('/api/user', (req, res) => {
    res.send(req.user);
});

module.exports = route;
