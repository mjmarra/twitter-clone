const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('./models/models');

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password', session: true },
      function(email, password, done) {
        User.findOne({ email }).then(async function(user) {
          if (!user) {
            return done(null, false, { message: 'Datos incorrectos 1.' });
          }
          const resultado = await bcrypt.compare(password, user.password);

          if (!resultado) {
            return done(null, false, { message: 'Datos incorrectos 2.' });
          }
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(error => {
        done(error);
      });
  });
}

module.exports = initialize;
