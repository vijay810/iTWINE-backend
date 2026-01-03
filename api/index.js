require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const connectDB = require('../config/db');

const userRoute = require('../routes/user.routes');
const clientsRoutes = require('../routes/clients.routes');
const authRoutes = require('../routes/auth.routes');
const leavesRoutes = require('../routes/leave.routes');
const newsRoutes = require('../routes/news.routes');
const teamsRoutes = require('../routes/teams.routes');
const eventsRoutes = require('../routes/events.routes');
const smsRoutes = require('../routes/sms.routes');

const app = express();

/* Middleware */
app.use(cors());
app.use(bodyParser.json());

/* Routes */
app.use('/auth', authRoutes);
app.use('/user', userRoute);
app.use('/clients', clientsRoutes);
app.use('/leave', leavesRoutes);
app.use('/news', newsRoutes);
app.use('/teams', teamsRoutes);
app.use('/events', eventsRoutes);
app.use('/sms', smsRoutes);

/* DB connection ONCE */
let isConnected = false;
async function dbConnect() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    await dbConnect();
    return handler(req, res);
  } catch (err) {
    console.error('❌ Serverless error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
