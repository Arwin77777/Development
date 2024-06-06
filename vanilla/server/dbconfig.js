const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Arwin:Arwin123%40%23%24@proje.y4a2ndo.mongodb.net/?retryWrites=true&w=majority&appName=proje", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to db");
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
    }
};

module.exports = connectDB;