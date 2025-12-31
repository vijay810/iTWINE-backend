require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('../config/db');

const app = express();

/* =======================
   Middleware
======================= */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* =======================
   Health Check
======================= */
app.get('/', (req, res) => {
   res.status(200).json({ message: 'Backend is running 🚀' });
});

/* =======================
   Routes
======================= */
try {
   const authRoutes = require('../routes/auth.routes');
   const userRoute = require('../routes/user.routes');
   const clientsRoutes = require('../routes/clients.routes');
   const leavesRoutes = require('../routes/leave.routes');
   const newsRoutes = require('../routes/news.routes');
   const teamsRoutes = require('../routes/teams.routes');
   const eventsRoutes = require('../routes/events.routes');
   const smsRoutes = require('../routes/sms.routes');

   app.use('/auth', authRoutes);
   app.use('/user', userRoute);
   app.use('/clients', clientsRoutes);
   app.use('/leave', leavesRoutes);
   app.use('/news', newsRoutes);
   app.use('/teams', teamsRoutes);
   app.use('/events', eventsRoutes);
   app.use('/sms', smsRoutes);
} catch (err) {
   console.error('❌ Route import failed:', err.message);
}

/* =======================
   404 Handler
======================= */
app.use((req, res) => {
   res.status(404).json({ message: 'Route not found' });
});

/* =======================
   Error Handler
======================= */
app.use((err, req, res, next) => {
   console.error('❌ Error:', err);
   res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error',
   });
});

/* =======================
   Serverless Handler
======================= */
const handler = serverless(app);

module.exports = async (req, res) => {
   try {
      // Connect to MongoDB if not connected
      await connectDB();
      return handler(req, res);
   } catch (err) {
      console.error('❌ Serverless Function Error:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
   }
};
