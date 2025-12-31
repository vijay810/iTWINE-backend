require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

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
   app.use('/auth', require('../routes/auth.routes'));
   app.use('/user', require('../routes/user.routes'));
   app.use('/clients', require('../routes/clients.routes'));
   app.use('/leave', require('../routes/leave.routes'));
   app.use('/news', require('../routes/news.routes'));
   app.use('/teams', require('../routes/teams.routes'));
   app.use('/events', require('../routes/events.routes'));
   app.use('/sms', require('../routes/sms.routes'));
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
   MongoDB Connection
======================= */
let isConnected = false;

const connectDB = async () => {
   if (isConnected) return;
   if (!process.env.MONGO_URL) throw new Error('MONGO_URL not defined');

   await mongoose.connect(process.env.MONGO_URL); // modern Mongoose v6+ connection
   isConnected = true;
   console.log('✅ MongoDB connected');
};

/* =======================
   Local Dev Server
======================= */
if (process.env.NODE_ENV !== 'production') {
   connectDB()
      .then(() => {
         const PORT = process.env.PORT || 4000;
         app.listen(PORT, () => {
            console.log(`✅ Server running locally on port ${PORT}`);
         });
      })
      .catch(err => console.error('❌ MongoDB connection error:', err.message));
}

/* =======================
   Serverless Export (Vercel)
======================= */
const handler = serverless(app);

module.exports = async (req, res) => {
   try {
      await connectDB(); // Ensure DB is connected for serverless
      return handler(req, res);
   } catch (err) {
      console.error('❌ Serverless Function Error:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
   }
};
