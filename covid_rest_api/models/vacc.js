const mongoose = require('mongoose');

const vaccSchema = mongoose.Schema({
    Name: String,
});

module.exports = mongoose.model('Vacc',vaccSchema);