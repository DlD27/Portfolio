const express = require('express');
const router = express.Router();
const childcares = require('../models/childcares');

// API fetching all childcare events
router.get('/', async (req, res) => {
    try {
        const childcaresData = await childcares.find({serviceName: { $exists: true }});
        if (!childcaresData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(childcaresData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching childcares data' });
    }
});

// API fetching specific childcare event by serviceName
router.get('/find', async (req, res) => {
    try {
        const { serviceName } = req.query;
        const childcaresData = await childcares.findOne({ serviceName });
        if (!childcaresData) {
            return res.status(404).json({ message: 'Childcare event not found' });
        }
        res.json(childcaresData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching childcare event data' });
    }
});

// API create a new childcare event
router.post('/', async (req, res) => {
    const childcare = new childcares(req.body);
    try {
        const savedChildcare = await childcare.save();
        res.status(201).json(savedChildcare);
    } catch (error) {
        res.status(400).json({ message: 'Error creating childcares event', error });
    }
});

// API update a childcares event through service name
router.patch('/:serviceName', async (req, res) => {
    try {
        const updatedChildcare = await childcares.findOneAndUpdate(
            { serviceName: req.params.serviceName },
            { $set: req.body},
            { new: true, runValidators: true }
        );
        if (!updatedChildcare) {
            return res.status(404).json({ message: 'Childcares event not found' });
        }
        res.json(updatedChildcare);
    } catch (error) {
        res.status(400).json({ message: 'Error updating childcares event', error });
    }
});

// API delete a childcares by its service name
router.delete('/:serviceName', async (req, res) => {
    try {
        const deletedChildcare = await childcares.findOneAndDelete({ serviceName: req.params.serviceName });
        if (!deletedChildcare) {
            return res.status(404).json({ message: 'Childcares event not found' });
        }
        res.json({ message: 'Childcares event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting childcares event', error });
    }
});

module.exports = router;