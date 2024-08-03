const express = require('express');
const passport = require('passport');
const router = express.Router();

// Facebook Authentication
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

// Twitter Authentication
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

// Instagram Authentication
router.get('/instagram', passport.authenticate('instagram'));
router.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

// LinkedIn Authentication
router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;

