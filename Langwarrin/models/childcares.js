const mongoose = require("mongoose");

// Schema for childscares
const childcaresSchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true 
    },
    serviceName: { 
        type: String, 
        required: true 
    },
    brief: { 
        type: String, 
        required: true 
    },
    age: { 
        type: String, 
        required: true 
    },
    dates: { 
        type: String, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: String, 
        required: true 
    },
    cost: { 
        type: Number, 
        required: true 
    },
    adminFee: { 
        type: Number, 
        required: true 
    },
    details: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    }
},{timestamps: true});

module.exports = mongoose.model('childcares', childcaresSchema);