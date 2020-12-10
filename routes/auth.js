const passport = require('passport');
const express = require('express');

const route = express();

route.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

route.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/surveys');
    }
);

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
