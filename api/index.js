const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

const app = express();

/* ---------- CORS ---------- */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app' // change this
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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
