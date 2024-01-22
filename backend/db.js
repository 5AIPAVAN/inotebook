//db.js-CODE TO CONNECT TO DATABASE(to keep everything well organized)

const mongoose = require('mongoose');

// ** use 127.0.0.1 in place of localhost for latest node versions
const mongoURI="mongodb://127.0.0.1:27017/inotebook";


const connectToMongo = () =>{
    // lates mongoose version not accepting call-backfunctions can use try catch instead
       mongoose.connect(mongoURI).then(()=>console.log("CONNECTED TO MONGODB SUCCESSFULLY "))
       .catch((err)=>{console.log("SOME ERR OCCURED IN MONGO CONNECTION :"+err)})
}

//exporting function connectToMongo (to import and use wherever u want)
module.exports = connectToMongo;

