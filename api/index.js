require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('../config/db');

/* ROUTES */
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const clientsRoutes = require('../routes/clients.routes');
const leavesRoutes = require('../routes/leave.routes');
const newsRoutes = require('../routes/news.routes');
const teamsRoutes = require('../routes/teams.routes');
const eventsRoutes = require('../routes/events.routes');
const smsRoutes = require('../routes/sms.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* HEALTH CHECK (VERY IMPORTANT) */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend running 🚀' });
});

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/clients', clientsRoutes);
app.use('/leave', leavesRoutes);
app.use('/news', newsRoutes);
app.use('/teams', teamsRoutes);
app.use('/events', eventsRoutes);
app.use('/sms', smsRoutes);

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error('❌ API Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

/* ---------- SERVERLESS WRAPPER ---------- */

let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log('✅ MongoDB connected (serverless)');
  }
}

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    await ensureDB();
    return handler(req, res);
  } catch (err) {
    console.error('❌ Function crash:', err.message);
    res.status(500).json({ message: 'Server crashed' });
  }
};
