const mongoose = require('mongoose');

// Schema for bookingChildcares
const bookingChildcares = new mongoose.Schema({
    childcares: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'childcares',  // Foreign key referencing 'childcares' collection
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

module.exports = mongoose.model('bookingChildcares', bookingChildcares);
