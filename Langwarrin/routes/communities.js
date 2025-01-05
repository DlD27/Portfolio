const express = require('express');
const router = express.Router();
const communities = require('../models/communities');

// API fetching all community events
router.get('/', async (req, res) => {
    try {
        const communitiesData = await communities.find({serviceName: { $exists: true }});
        if (!communitiesData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(communitiesData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching communities data' });
    }
});

// API fetching all groups in communities
router.get('/group', async (req, res) => {
    try {
        const groupData = await communities.find({category: "Groups"});
        if (!groupData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(groupData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching groups data' });
    }
});

// API fetching all services in communities
router.get('/service', async (req, res) => {
    try {
        const serviceData = await communities.find({category: "Services"});
        if (!serviceData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(serviceData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services data' });
    }
});

// API fetching all events in communities
router.get('/event', async (req, res) => {
    try {
        const eventData = await communities.find({category: "Events"});
        if (!eventData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(eventData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events data' });
    }
});

// API fetching specific community by serviceName
router.get('/find', async (req, res) => {
    try {
        const { serviceName } = req.query;
        const communityData = await communities.findOne({ serviceName });
        if (!communityData) {
            return res.status(404).json({ message: 'Community event not found' });
        }
        res.json(communityData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching community event data' });
    }
});


// API create a new community event
router.post('/', async (req, res) => {
    const community = new communities(req.body);
    try {
        const savedCommunity = await community.save();
        res.status(201).json(savedCommunity);
    } catch (error) {
        res.status(400).json({ message: 'Error creating community event', error });
    }
});

// API update a community event through service name
router.patch('/:serviceName', async (req, res) => {
    try {
        const updatedCommunity = await communities.findOneAndUpdate(
            { serviceName: req.params.serviceName },
            { $set: req.body},
            { new: true, runValidators: true }
        );
        if (!updatedCommunity) {
            return res.status(404).json({ message: 'Community event not found' });
        }
        res.json(updatedCommunity);
    } catch (error) {
        res.status(400).json({ message: 'Error updating community event', error });
    }
});

// API delete a community event by its service name
router.delete('/:serviceName', async (req, res) => {
    try {
        const deletedCommunity = await communities.findOneAndDelete({ serviceName: req.params.serviceName });
        if (!deletedCommunity) {
            return res.status(404).json({ message: 'Community event not found' });
        }
        res.json({ message: 'Community event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting community event', error });
    }
});

module.exports = router;