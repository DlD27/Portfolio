const express = require('express');
const router = express.Router();
const programs = require('../models/programs');

// API fetching all programs data
router.get('/', async (req, res) => {
    try {
        const programsData = await programs.find({serviceName: { $exists: true}});
        if (!programsData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(programsData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching progrmas data' });
    }
});

// API fetching all computer programs
router.get('/computer', async (req, res) => {
    try {
        const computerData = await programs.find({category: "Computer/Business"});
        if (!computerData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(computerData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching computer classes data' });
    }
});

// API fetching all education programs
router.get('/education', async (req, res) => {
    try {
        const educationData = await programs.find({category: "Literacy/Education"});
        if (!educationData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(educationData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching education classes data' });
    }
});

// API fetching all fun programs
router.get('/fun', async (req, res) => {
    try {
        const funData = await programs.find({category: "Craft/Hobbies/Fun"});
        if (!funData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(funData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fun classes data' });
    }
});

// API fetching all wellbeing programs
router.get('/wellbeing', async (req, res) => {
    try {
        const wellbeingData = await programs.find({category: "Exercise/Health/Wellbeing"});
        if (!wellbeingData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(wellbeingData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wellbeing classes data' });
    }
});

// API fetching specific program by serviceName
router.get('/find', async (req, res) => {
    try {
        const { serviceName } = req.query;
        const programData = await programs.findOne({ serviceName });
        if (!programData) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(programData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the program' });
    }
});

// API create a new program
router.post('/', async (req, res) => {
    const program = new programs(req.body);
    try {
        const savedProgram = await program.save();
        res.status(201).json(savedProgram);
    } catch (error) {
        res.status(400).json({ message: 'Error creating program', error });
    }
});

// API update a program through service name
router.patch('/:serviceName', async (req, res) => {
    try {
        const updatedProgram = await programs.findOneAndUpdate(
            { serviceName: req.params.serviceName },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.json(updatedProgram);
    } catch (error) {
        res.status(400).json({ message: 'Error updating program', error });
    }
});

// API delete a program by its service name
router.delete('/:serviceName', async (req, res) => {
    try {
        const deletedProgram = await programs.findOneAndDelete({ serviceName: req.params.serviceName });
        if (!deletedProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.json({ message: 'Program deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting program', error });
    }
});

module.exports = router;
