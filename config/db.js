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



// config/db.js
const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(mongoose => mongoose);
    }

    cached.conn = await cached.promise;
    console.log(`Connected to Mongo! Database name: "${cached.conn.connections[0].name}"`);
    return cached.conn;
};

module.exports = connectDB;

