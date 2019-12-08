const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    avatar: String,
    username: String,
    password: String,
    fullname: String
});

module.exports = mongoose.model('admins', schema);