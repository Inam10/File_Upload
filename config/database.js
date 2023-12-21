const mongoose = require("mongoose");

require("dotenv").config();

exports.connnect = () =>{
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(console.log("DB connectionn successfull"))
    .catch((error)=>{
        console.log("DB connection issues");
        console.error(error)
        process.exit(1);  
    })
}