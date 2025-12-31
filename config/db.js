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



// config/db.js
const mongoose = require('mongoose');

let cached = global.mongoose; // global cache for serverless
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
    if (cached.conn) return cached.conn; // reuse existing connection

    if (!cached.promise) {
        if (!process.env.MONGO_URL) throw new Error('MONGO_URL not defined');
        cached.promise = mongoose.connect(process.env.MONGO_URL).then(mongoose => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = connectDB;
