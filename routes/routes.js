const twitterRouter = require('./twitter');
const authRouter = require('./auth');
const apiRouter = require('./api');

module.exports = app => {
  app.use(twitterRouter);
  app.use('/admin', authRouter);
  app.use('/api', apiRouter);
};
