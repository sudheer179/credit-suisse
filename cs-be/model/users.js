const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
    name: String,
    mobile: Number,
    email: String,
    password: String,
});

module.exports = mongoose.model('Users', userScema);