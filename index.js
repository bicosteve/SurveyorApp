const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Survey');
require('./services/passport');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/auth'));
app.use(require('./routes/billing'));
app.use(require('./routes/survey'));

if (process.env.NODE_ENV === 'production') {
    //serving main.css and main.js from front end
    app.use(express.static('client/build'));

    //serve index.html if route not recognized by express
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
});
