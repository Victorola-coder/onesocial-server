require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('./config/passport');
const session = require('express-session');
const result = dotenv.config();
const authRoutes = require('./routes/authRoutes');

if (result.error) {
  throw result.error;
}

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
// for twitter
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes (we'll add these later)
app.use('/api/auth', require('./routes/twitterAuthRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/auth', authRoutes);
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));