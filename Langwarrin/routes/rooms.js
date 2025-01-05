const express = require('express');
const router = express.Router();
const rooms = require('../models/rooms');

// API fetching all rooms
router.get('/', async (req, res) => {
    try {
        const roomData = await rooms.find({roomType: { $exists: true}});
        if (!roomData) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(roomData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rooms data' });
    }
});

// API fetching specific room by roomType
router.get('/:roomType', async (req, res) => {
    try {
        const roomData = await rooms.findOne({ roomType: req.params.roomType });
        if (!roomData) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(roomData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching room data' });
    }
});

// API create a new room
router.post('/', async (req, res) => {
    const room= new rooms(req.body);
    try {
        const savedRoom = await room.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(400).json({ message: 'Error creating room', error });
    }
});

// API update a room through name
router.patch('/:roomType', async (req, res) => {
    try {
        const updatedRoom = await rooms.findOneAndUpdate(
            { roomType: req.params.roomType },
            { $set: req.body},
            { new: true, runValidators: true }
        );
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(updatedRoom);
    } catch (error) {
        res.status(400).json({ message: 'Error updating room', error });
    }
});

// API delete a room by name
router.delete('/:roomType', async (req, res) => {
    try {
        const deletedRoom = await rooms.findOneAndDelete({ roomType: req.params.roomType });
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting room', error });
    }
});

module.exports = router;