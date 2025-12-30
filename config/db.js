// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGO_URL);
//         console.log(`Connected to Mongo! Database name: "${connection.connections[0].name}"`);
//     } catch (err) {
//         console.error('Error connecting to mongo', err.message);
//         process.exit(1); // Exit process with failure
//     }
// };

// module.exports = connectDB;



const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not defined');
    }

    // Prevent multiple connections in serverless
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

module.exports = connectDB;

