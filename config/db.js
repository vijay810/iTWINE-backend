// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGO_URL);
//         console.log(`Connected to Mongo! Database name: "${connection.connections[0].name}"`);
//     } catch (err) {
//         console.error('Error connecting to mongo', err.message);
//         process.exit(1); 
//     }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = connectDB;
