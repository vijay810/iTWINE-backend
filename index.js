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
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}


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

const app = express();

/* =======================
   MongoDB Connection
======================= */
connectDB();

/* =======================
   Middleware
======================= */
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* =======================
   Health Check
======================= */
app.get('/', (req, res) => {
    res.status(200).send('Backend running on Vercel ✅');
});

/* =======================
   Routes
======================= */
app.use('/auth', authRoutes);
app.use('/user', userRoute);
app.use('/clients', clientsRoutes);
app.use('/leave', leavesRoutes);
app.use('/news', newsRoutes);
app.use('/teams', teamsRoutes);
app.use('/events', eventsRoutes);

/* =======================
   404 Handler
======================= */
app.use((req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
});

/* =======================
   Error Handler
======================= */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

/* =======================
   EXPORT FOR VERCEL
======================= */
module.exports = app;

