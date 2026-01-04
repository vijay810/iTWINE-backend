const express = require('express');
const connectDB = require('../config/db');

const app = express();
app.use(express.json());

/* ---------- DB CONNECT ---------- */
connectDB();

/* ---------- HEALTH ---------- */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    mongo: 'connected',
    env: process.env.NODE_ENV
  });
});

/* ---------- ROUTES ---------- */
app.use('/auth', require('../routes/auth.routes'));
app.use('/leave', require('../routes/leave.routes'));
app.use('/clients', require('../routes/clients.routes'));
app.use('/user', require('../routes/user.routes'));
app.use('/news', require('../routes/news.routes'));

module.exports = app;
