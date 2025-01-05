const mongoose = require('mongoose');

// Schema for bookingCourse
const bookingCourseSchema = new mongoose.Schema({
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
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'programs',  // Foreign key referencing 'programs' collection
    },
    uid: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('bookingCourse', bookingCourseSchema);
