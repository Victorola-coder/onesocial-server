const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/api/auth/facebook/callback'
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              facebookId: profile.id,
              name: profile.displayName,
              accessToken: accessToken
            });
            newUser.save((err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: '/api/auth/twitter/callback'
      },
      (token, tokenSecret, profile, done) => {
        User.findOne({ twitterId: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              twitterId: profile.id,
              name: profile.displayName,
              accessToken: token,
              accessTokenSecret: tokenSecret
            });
            newUser.save((err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    new InstagramStrategy(
      {
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        callbackURL: '/api/auth/instagram/callback'
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ instagramId: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              instagramId: profile.id,
              name: profile.displayName,
              accessToken: accessToken
            });
            newUser.save((err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: '/api/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_liteprofile']
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ linkedinId: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              linkedinId: profile.id,
              name: profile.displayName,
              accessToken: accessToken
            });
            newUser.save((err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

