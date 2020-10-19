const passport = require('passport');
const bcrypt = require('bcryptjs');

const { User } = require('../models/models');

module.exports = {
  showLoginForm: (req, res) => {
    res.render('admin/login');
  },

  showRegisterForm: (req, res) => {
    res.render('admin/register');
  },

  register: async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.redirect('/admin/login');
      }
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        image: '/img/profile-img.png',
        password: hashedPassword,
      });
      newUser.save();
      res.redirect('/');
    });
  },

  login: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/admin/login',
    failureFlash: true,
  }),

  logout: (req, res) => {
    req.logOut();
    res.redirect('/admin/login');
  },
};
