const express = require('express');
const tweetController = require('../controllers/tweetController');
const userController = require('../controllers/userController');

const twitterRouter = express.Router();

twitterRouter.get('/', redirectIfNotAuthenticated, tweetController.home);
twitterRouter.get(
  '/profile/:username',
  redirectIfNotAuthenticated,
  userController.profile
);
twitterRouter.post(
  '/tweet',
  redirectIfNotAuthenticated,
  tweetController.newTweet
);

twitterRouter.get(
  '/delete/:id',
  redirectIfNotAuthenticated,
  tweetController.destroy
);

twitterRouter.get(
  '/like/:id',
  redirectIfNotAuthenticated,
  tweetController.like
);

// twitterRouter.get(
//   '/unlike/:id',
//   redirectIfNotAuthenticated,
//   tweetController.unLike
// );

twitterRouter.post('/following', tweetController.userToFollow);

twitterRouter.post('/unfollow', tweetController.unfollow);

function redirectIfNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/admin/login');
  } else {
    return next();
  }
}

module.exports = twitterRouter;
