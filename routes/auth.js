const passport = require('passport');
const express = require('express');

const route = express();

route.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

route.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys');
});

route.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

route.get('/api/auth_user', (req, res) => {
    res.send(req.user);
});

module.exports = route;
