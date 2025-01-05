const mongoose = require('mongoose');

// Schema for feedback
const feedbackSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('feedback', feedbackSchema);