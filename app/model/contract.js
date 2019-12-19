const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://Hatomia:hatomiatruong@admin-gia-su-m4ekp.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
    current_learner: String,
    current_teacher: String,
    content: {
        price_per_hour: String,
        teaching_address: String,
        tags: [String],
    }
});

module.exports = mongoose.model('contracts', schema);