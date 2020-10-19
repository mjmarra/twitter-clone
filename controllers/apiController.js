const { Tweet, User } = require('../models/models');

module.exports = {
  // muestra usuarios
  users: (req, res) => {
    User.find().then(users => {
      res.json(users);
    });
  },
  // muestra tweets
  tweets: (req, res) => {
    Tweet.find().then(tweets => {
      res.json(tweets);
    });
  },
};
