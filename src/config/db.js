
const mongoose = require('mongoose');
const {mongoURI}=require('./server-config')

const connect = () => {
    console.log("Mongodb connected");
    return mongoose.connect(mongoURI);
}

module.exports = connect;