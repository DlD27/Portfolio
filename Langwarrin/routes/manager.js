const express = require('express');
const router = express.Router();
const manager = require('../models/manager');
const bcrypt = require('bcrypt');

// API to log in a manager
router.post('/', async (req, res) => {
    try {
        const { id, password } = req.body;
        // Check if id and password are provided
        if (!id || !password) {
            return res.status(400).json({ message: 'ID and password are required' });
        }
        // Find the manger by ID
        const mng = await manager.findOne({ managerId: id });
        if (!mng) {
            return res.status(400).json({ message: 'Manager not found' });
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, mng.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        // If successful, return a success message
        res.json({ message: 'Login successful', userId: mng.managerId });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;