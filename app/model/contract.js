const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://Hatomia:hatomiatruong@admin-gia-su-m4ekp.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
    id: String,
    current_learner: {
        _id: String,
        fullname: String,
        phone: String,
        birthday: String,
        address: String,
        email: String,
        avatar: String
    },
    current_teacher: {
        _id: String,
        fullname: String,
        phone: String,
        birthday: String,
        address: String,
        email: String,
        avatar: String
    },
    status: String,
    content: {
        price_per_hour: String,
        teaching_address: String,
        tags: [String],
    }
});

module.exports = mongoose.model('contracts', schema);