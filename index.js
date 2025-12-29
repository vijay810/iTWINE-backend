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

/* =========================
   GLOBAL ERROR LISTENERS
========================= */
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});

/* =========================
   DATABASE CONNECTION
========================= */
connectDB()
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
    });

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Backend running successfully",
    });
});

app.use("/auth", authRoutes);
app.use("/user", userRoute);
app.use("/clients", clientsRoutes);
app.use("/leave", leavesRoutes);
app.use("/news", newsRoutes);
app.use("/teams", teamsRoutes);
app.use("/events", eventsRoutes);
app.use("/sms", smsRoutes);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

/* =========================
   LOCAL SERVER ONLY (DEV)
========================= */
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

/* =========================
   EXPORT FOR VERCEL
========================= */
module.exports = app;
