const { use } = require('passport');
const { Tweet, User } = require('../models/models');

module.exports = {
  /* HOME */
  home: async (req, res) => {
    /* para mostrar sugerencias */
    const users = await (await User.find({})).filter(
      item => item._id.toString() !== req.user._id.toString()
    );

    User.findById(req.user._id).then(loggedUser => {
      Tweet.find({ author: loggedUser })
        .populate('author')
        .then(tweetsUser => {
          Tweet.find({ author: { $in: loggedUser.following } })
            .populate('author')
            .limit(20)
            .sort('-dateOfCreation')
            // .populate('likes')
            .then(tweets => {
              console.log(tweetsUser);
              tweets = [...tweets, ...tweetsUser];
              res.render('twitter/home', { loggedUser, tweets, users });
            });
        });
    });
  },

  /* NEW TWEET */
  newTweet: async (req, res) => {
    const { content } = req.body;
    const newTweet = new Tweet({
      author: req.user._id,
      content,
      date: Date.now(),
      likes: 0,
    });
    await newTweet.save();

    User.findById(req.user._id).then(user => {
      const { tweets } = user;
      tweets.push(`${newTweet._id}`);
      user.save();
    });
    res.redirect('back');
  },

  /* DELETE TWEET */
  destroy: async (req, res) => {
    Tweet.findById(req.params.id).then(tweet => {
      tweet.remove();
      res.redirect('back');
    });
  },

  /* TO FOLLOW */
  userToFollow: (req, res) => {
    const { id } = req.body;
    const userId = req.user._id;

    User.findById(userId).then(user => {
      if (!user.following.includes(id)) {
        user.following.push(id);
        user.save();

        User.findById(id).then(userToFollow => {
          userToFollow.followers.push(userId);
          userToFollow.save();
          console.log(`Sigo a: ${userToFollow}`);
          console.log(user.following);
        });
      }
      res.redirect('back');
    });
  },

  /* TO UNFOLLOW */
  unfollow: async (req, res) => {
    const { id } = req.body;
    req.user.following = req.user.following.filter(
      item => item.toString() !== id.toString()
    );
    await req.user.save();

    const userToUnfollow = await User.findById(id);

    userToUnfollow.followers = userToUnfollow.followers.filter(
      item => item.toString() !== req.user._id.toString()
    );
    await userToUnfollow.save();
    res.redirect('back');

    console.log(`Dejo de seguir a: ${userToUnfollow}`);
    console.log(req.user.following);
  },

  /* LIKES (en realidad creo que debería ser un array) */
  like: (req, res) => {
    Tweet.findById(req.params.id).then(tweet => {
      tweet.likes += 1;
      tweet.save();
      res.redirect('back');
    });
  },

  /* UNLIKE */
  // unLike: (req, res) => {
  //   Tweet.findById(req.params.id).then(tweet => {
  //     tweet.likes -= 1;
  //     tweet.save();
  //     res.redirect('back');
  //   });
  // },
};
