const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

/* -------- HEALTH CHECK -------- */
app.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }
    res.status(200).json({
      status: 'OK',
      mongo: 'connected',
      env: process.env.NODE_ENV
    });
  } catch (err) {
    console.error('Mongo Error:', err.message);
    res.status(500).json({ mongoError: err.message });
  }
});

/* -------- ROUTES (ENABLE AFTER TEST PASSES) -------- */
// const authRoutes = require('../routes/auth.routes');
// app.use('/auth', authRoutes);
// app.use('/auth', require('../routes/auth.routes'));
app.use('/leave', require('../routes/leave.routes'));
app.use('/clients', require('../routes/clients.routes'));
// app.use('/user', require('../routes/user.routes'));
// app.use('/news', require('../routes/news.routes'));

module.exports = app;
