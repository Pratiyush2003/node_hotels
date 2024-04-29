const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
        try {
            const connect = await mongoose.connect(process.env.DB_URL);
            if(connect){
                console.log('mongoose is connected on localhost')
            }
        } catch (error) {
            console.log(error)
        }
}

module.exports = connectDB;