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



// using vercel ---/

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

const app = express();

// ✅ MongoDB connection
connectDB();

// ✅ Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Root test route (IMPORTANT)
app.get('/', (req, res) => {
    res.send('Backend is running on Vercel ✅');
});

// ✅ API Routes
app.use('/auth', authRoutes);
app.use('/user', userRoute);
app.use('/clients', clientsRoutes);
app.use('/leave', leavesRoutes);
app.use('/news', newsRoutes);
app.use('/teams', teamsRoutes);
app.use('/events', eventsRoutes);

// ❌ REMOVE app.listen (VERY IMPORTANT)
// app.listen(port, ...);

// ✅ Export app for Vercel
module.exports = app;

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.statusCode || 500).json({
        error: err.message
    });
});
