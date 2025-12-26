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


// Running on vercel

require('dotenv').config();

const express = require('express');
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

/* ===============================
   Middleware
================================ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   MongoDB per request (SAFE)
================================ */
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB Connection Error:', err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

/* ===============================
   Test Route
================================ */
app.get('/', (req, res) => {
    res.send('Backend running ✅');
});

/* ===============================
   Routes
================================ */
app.use('/auth', authRoutes);
app.use('/user', userRoute);
app.use('/clients', clientsRoutes);
app.use('/leave', leavesRoutes);
app.use('/news', newsRoutes);
app.use('/teams', teamsRoutes);
app.use('/events', eventsRoutes);
app.use('/sms', smsRoutes);

/* ===============================
   404 Handler
================================ */
app.use((req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
});

/* ===============================
   Global Error Handler
================================ */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

/* ===============================
   Local server ONLY
================================ */
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Local server running on port ${PORT}`);
    });
}

/* ===============================
   Export for Vercel
================================ */
module.exports = app;