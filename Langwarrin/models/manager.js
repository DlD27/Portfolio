const mongoose = require('mongoose');

// Schema for manager
const managerSchema = new mongoose.Schema({
    managerId: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('manager', managerSchema, 'manager');