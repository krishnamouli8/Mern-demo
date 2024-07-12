const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected!");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
