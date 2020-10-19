const { User } = require('../models/models');

module.exports = {
  profile: async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate('tweets');
    /* para sugerencias */
    const users = await (await User.find({})).filter(
      item => item._id.toString() !== req.user._id.toString()
    );
    res.render('twitter/profile', { loggedUser: req.user, user, users });
  },
};
