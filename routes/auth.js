const express = require('express');
// const passport = require('passport');

const authRouter = express.Router();
const authController = require('../controllers/authcontroller.js');

authRouter.get('/login', redirectIfAuthenticated, authController.showLoginForm);
authRouter.post('/login', redirectIfAuthenticated, authController.login);

authRouter.get(
  '/register',
  redirectIfAuthenticated,
  authController.showRegisterForm
);
authRouter.post('/register', authController.register);

authRouter.get('/logout', authController.logout);

function redirectIfAuthenticated(req, res, next) {
  console.log('redirectIfAuthenticated');
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    return next();
  }
}

module.exports = authRouter;
