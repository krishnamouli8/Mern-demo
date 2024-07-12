const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://user_31:mongo_user_31@people.ayeokiz.mongodb.net/');
        console.log("MongoDB connected!");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;