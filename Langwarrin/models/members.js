const mongoose = require('mongoose');

// Schema for members
const membersSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    occupation: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    memberFee: { 
        type: Boolean, 
        required: true 
    }
});

module.exports = mongoose.model('member', membersSchema);