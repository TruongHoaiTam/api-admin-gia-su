const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://Hatomia:hatomiatruong@admin-gia-su-m4ekp.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });


const schema = new mongoose.Schema({
    tag: String
});

module.exports = mongoose.model('tags', schema);