const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ 'socialAccounts.platformId': profile.id });
      
      if (!user) {
        user = new User({
          username: profile.username,
          email: profile.emails[0].value,
          socialAccounts: [{
            platform: 'twitter',
            platformId: profile.id,
            accessToken: token,
            refreshToken: tokenSecret
          }]
        });
        await user.save();
      } else {
        // Update tokens if user already exists
        user.socialAccounts.find(account => account.platform === 'twitter').accessToken = token;
        user.socialAccounts.find(account => account.platform === 'twitter').refreshToken = tokenSecret;
        await user.save();
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;