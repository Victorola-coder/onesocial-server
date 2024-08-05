const OAuth = require('oauth').OAuth;

const oa = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.TWITTER_API_KEY,
  process.env.TWITTER_API_SECRET,
  "1.0A",
  null,
  "HMAC-SHA1"
);

exports.postTweet = (accessToken, accessTokenSecret, status) => {
  return new Promise((resolve, reject) => {
    oa.post(
      "https://api.twitter.com/1.1/statuses/update.json",
      accessToken,
      accessTokenSecret,
      { status },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data));
        }
      }
    );
  });
};