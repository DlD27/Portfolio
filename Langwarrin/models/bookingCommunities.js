const mongoose = require('mongoose');

// Schema for bookingCommunities
const bookingCommunities = new mongoose.Schema({
    communities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'communities',  // Foreign key referencing 'communities' collection
    },
    appointment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    uid: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('bookingCommunities', bookingCommunities);
