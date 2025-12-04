const mongoose = require('mongoose');


const connection = async()=>{

    try {

        const response = await mongoose.connect(process.env.MONGODB_URL)

        console.log("MongoDB connected");
        
    } catch (error) {

        console.log("MongoDB connection failed", error);
        
    }
}

module.exports = connection;