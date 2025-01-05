const mongoose = require('mongoose');

// Schema for bookingRoom
const bookingRoomSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
    },
    appointment: {
        type: String,
    },
    totalHours: {
        type: String,
    },
    dateFrom: {
        type: Date,
    },
    dateTo: {
        type: Date,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
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
});

module.exports = mongoose.model('bookingRoom', bookingRoomSchema);