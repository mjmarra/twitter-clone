require('dotenv').config();

const APP_PORT = process.env.APP_PORT || 3000;
const express = require('express');
const passport = require('passport');

const session = require('express-session');
const flash = require('express-flash');
const path = require('path');

const app = express();
const seeds = require('./seeds/seeds');

app.locals.moment = require('moment');

seeds();

const initializePassport = require('./passport-config');

initializePassport(passport);

app.locals.moment = require('moment');

app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));
// app.set('view engine', 'ejs');

/* HAY QUE PASAR ESTO ASÍ PARA QUE FUNCIONE VERCEL */
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(flash());

app.use(
  session({
    secret: 'AlgúnTextoSuperSecreto',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes')(app);

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
  console.log(`Enter http://localhost:${APP_PORT}`);
});
