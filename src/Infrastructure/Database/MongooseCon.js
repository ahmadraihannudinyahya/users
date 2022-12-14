const mongoose = require('mongoose');

const url = process.env.NODE_ENV === 'test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

const con = mongoose.createConnection(url);

module.exports = con;