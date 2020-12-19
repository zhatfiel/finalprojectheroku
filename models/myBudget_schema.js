const mongoose = require('mongoose');

const myBudgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        maxLength: 6
    }
}, {collection: 'budget'});

module.exports = mongoose.model('budget', myBudgetSchema);