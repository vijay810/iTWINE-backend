// require('dotenv').config();

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const connectDB = require('./config/db');
// // const studentRoute = require('./routes/student.routes');
// // const schoolRoute = require('./routes/school.routes');
// const userRoute = require('./routes/user.routes');
// const clientsRoutes = require('./routes/clients.routes')
// const authRoutes = require('./routes/auth.routes')
// const leavesRoutes = require('./routes/leave.routes')
// const newsRoutes = require('./routes/news.routes')
// const teamsRoutes = require('./routes/teams.routes')
// const eventsRoutes = require('./routes/events.routes')
// const smsRoutes = require('./routes/sms.routes')

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Routes
// app.use('/auth', authRoutes);
// app.use('/user', userRoute);
// app.use('/clients', clientsRoutes);
// app.use('/leave', leavesRoutes);
// app.use('/news', newsRoutes);
// app.use('/teams', teamsRoutes)
// app.use('/events', eventsRoutes)
// app.use('/sms', smsRoutes)
// // PORT
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


// // 404 Error
// app.use((req, res, next) => {
//     res.status(404).send('Not Found');
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//     console.error(err.message);
//     res.status(err.statusCode || 500).send(err.message);
// });




// Run in Vercel

// backend/api.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoute = require('./routes/user.routes');
const clientsRoutes = require('./routes/clients.routes');
const authRoutes = require('./routes/auth.routes');
const leavesRoutes = require('./routes/leave.routes');
const newsRoutes = require('./routes/news.routes');
const teamsRoutes = require('./routes/teams.routes');
const eventsRoutes = require('./routes/events.routes');
const smsRoutes = require('./routes/sms.routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoute);
app.use('/clients', clientsRoutes);
app.use('/leave', leavesRoutes);
app.use('/news', newsRoutes);
app.use('/teams', teamsRoutes);
app.use('/events', eventsRoutes);
app.use('/sms', smsRoutes);

// 404 Error
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.statusCode || 500).send(err.message);
});

/**
 * Serverless MongoDB connection
 */
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = connectDB(); // your existing connectDB() function should return mongoose.connect promise
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

/**
 * Vercel Serverless Handler
 */
module.exports = async (req, res) => {
    await connectToDatabase();
    return app(req, res);
};
