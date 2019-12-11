const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://Hatomia:hatomiatruong@user-gia-su-pmqxm.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });


const schema = new mongoose.Schema({
    avatar: String,
    email: String,
    username: String,
    fullname: String,
    phone: String,
    birthday: String,
    address: String,
    strategy: String,


    introduce: String,
    teaching_address: String,
    price_per_hour: String,
    tags: [String]
});

module.exports = mongoose.model('users', schema);