const mongoose = require('mongoose');

// Schema for rooms
const roomsSchema = new mongoose.Schema({
    roomType: { 
        type: String, 
        required: true 
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    cost: {
        nonCommunity: { 
            type: mongoose.Schema.Types.Mixed, // Allows for either a number or an object with price and duration
            required: false 
        },
        community: { 
            type: mongoose.Schema.Types.Mixed, // Allows for either a number or an object with price and duration
            required: false 
        },
        casual: { type: Number },   
        permanent: { type: Number }  
    },
    image: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('rooms', roomsSchema);