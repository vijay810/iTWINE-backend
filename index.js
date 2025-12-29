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



require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const userRoute = require("./routes/user.routes");
const clientsRoutes = require("./routes/clients.routes");
const authRoutes = require("./routes/auth.routes");
const leavesRoutes = require("./routes/leave.routes");
const newsRoutes = require("./routes/news.routes");
const teamsRoutes = require("./routes/teams.routes");
const eventsRoutes = require("./routes/events.routes");
const smsRoutes = require("./routes/sms.routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ status: "OK", message: "Backend running" });
});

// API routes
app.use("/auth", authRoutes);
app.use("/user", userRoute);
app.use("/clients", clientsRoutes);
app.use("/leave", leavesRoutes);
app.use("/news", newsRoutes);
app.use("/teams", teamsRoutes);
app.use("/events", eventsRoutes);
app.use("/sms", smsRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route Not Found" }));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
});

/* =========================
   LOCAL DEV ONLY
========================= */
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;
    connectDB()
        .then(() => {
            console.log("MongoDB Connected");
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch((err) => console.error("MongoDB connection error:", err));
}

/* =========================
   EXPORT FOR VERCEL
========================= */
module.exports = async (req, res) => {
    try {
        await connectDB(); // connect once per function
        return app(req, res);
    } catch (err) {
        console.error("MongoDB error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};
