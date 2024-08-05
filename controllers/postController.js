const User = require('../models/User');
const twitterService = require('../services/twitterService');
// WIll import other platform services here

exports.createPost = async (req, res, next) => {
  try {
    const { content, platforms } = req.body;
    const user = await User.findById(req.user.id);

    const results = [];

    for (const platform of platforms) {
      const account = user.socialAccounts.find(acc => acc.platform === platform);
      if (!account) {
        results.push({ platform, error: 'Not connected' });
        continue;
      }

      try {
        let result;
        switch (platform) {
          case 'twitter':
            result = await twitterService.postTweet(account.accessToken, account.refreshToken, content);
            break;
          // We will add cases for other platforms here
          default:
            throw new Error(`Unsupported platform: ${platform}`);
        }
        results.push({ platform, result });
      } catch (error) {
        results.push({ platform, error: error.message });
      }
    }

    res.json({ message: 'Post creation completed', results });
  } catch (error) {
    next(error);
  }
};