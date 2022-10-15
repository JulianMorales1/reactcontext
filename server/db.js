const dbString = `mongodb+srv://JulianMorales:snow93@cluster0.skdcvj1.mongodb.net/reactContext?retryWrites=true&w=majority`;
const mongoose = require('mongoose')
const connectDB = async () => {
    const conn = await mongoose.connect(dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`Mongodb connected: ${conn.connection.host}`)
};

module.exports = connectDB;