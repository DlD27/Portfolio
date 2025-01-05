const express = require('express');
const router = express.Router();
const members = require('../models/members');

// API fetching all members
router.get('/', async (req, res) => {
    try {
        const memberData = await members.find();
        if (!memberData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(memberData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member data' });
    }
});

// API fetch a member by first name and last name
router.get('/find', async (req, res) => {
    try {
        const { firstName, lastName } = req.query;
        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First name and last name are required' });
        }
        // Find the member by matching first name and last name
        const member = await members.findOne({ firstName, lastName });
        // Check if the member was found
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        // Respond with the found member
        res.json(member);
    } catch (error) {
        console.error(error); // Log the error details
        res.status(500).json({ message: 'Error fetching member data', error });
    }
});

// API create a new member
router.post('/', async (req, res) => {
    const member = new members(req.body);
    try {
        const savedMember = await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(400).json({ message: 'Error creating member', error });
    }
});

// API update a member
router.patch('/', async (req, res) => {
    try {
        const { firstName, lastName } = req.body; 
        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First name and last name are required' });
        }
        // Update the member by matching first name and last name
        const updatedMember = await members.findOneAndUpdate(
            { firstName: firstName, lastName: lastName }, // Match criteria
            { $set: req.body }, // Fields to update
            { new: true, runValidators: true } // Return the updated document and run validators
        );
        // Check if the member was found and updated
        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }
        // Respond with the updated member
        res.json(updatedMember);
    } catch (error) {
        res.status(400).json({ message: 'Error updating member', error });
    }
});

// API delete a member
router.delete('/', async (req, res) => {
    try {
        const { firstName, lastName } = req.query;
        // Ensure firstName and lastName are provided
        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First name and last name are required' });
        }
        // Delete the member by matching first name and last name
        const deletedMember = await members.findOneAndDelete({
            firstName: firstName,
            lastName: lastName
        });
        // Check if the member was found and deleted
        if (!deletedMember) {
            return res.status(404).json({ message: 'Member not found' });
        }
        // Respond with a success message
        res.json({ message: 'Member deleted successfully', deletedMember });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting member', error });
    }
});

module.exports = router;
