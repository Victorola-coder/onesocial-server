const User = require('../models/User');
const twitterService = require('../services/twitterService');

exports.createPost = async (req, res) => {
  try {
    const { content, platforms } = req.body;
    const user = await User.findById(req.user.id);

    const results = [];

    if (platforms.includes('twitter')) {
      const twitterAccount = user.socialAccounts.find(account => account.platform === 'twitter');
      if (twitterAccount) {
        const tweet = await twitterService.postTweet(twitterAccount.accessToken, twitterAccount.refreshToken, content);
        results.push({ platform: 'twitter', result: tweet });
      }
    }

    // will add similar blocks for other platforms

    res.json({ message: 'Post created successfully', results });
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};