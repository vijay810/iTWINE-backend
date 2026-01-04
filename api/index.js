const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

const app = express();

/* -------- CORS (THIS FIXES AUTH) -------- */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app' // change this
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

/* Handle preflight explicitly (important for Vercel) */
app.options('*', cors());

app.use(express.json());

/* -------- DB -------- */
connectDB();

/* -------- HEALTH -------- */
app.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

/* -------- ROUTES -------- */
app.use('/auth', require('../routes/auth.routes'));
app.use('/leave', require('../routes/leave.routes'));
app.use('/clients', require('../routes/clients.routes'));
app.use('/user', require('../routes/user.routes'));
app.use('/news', require('../routes/news.routes'));

/* -------- ERROR HANDLER -------- */
app.use((err, req, res, next) => {
  console.error('🔥 ERROR:', err);
  res.status(500).json({ msg: 'Internal server error' });
});

module.exports = app;
