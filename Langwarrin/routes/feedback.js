const express = require('express');
const router = express.Router();
const feedback = require('../models/feedback');
const {
    sendMail,
    managerEmail
} = require('../common/common');

const generateOrderID = async () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const id = `${timestamp}${randomNum}`.slice(-6);
    let uid = await isRepeated(id);
    if (uid) {
        return generateOrderID();
    }
    return id;
};
const isRepeated = async (id) => {
    const item = await feedback.findOne({
        uid: id
    });
    return item;
}

// API to retrieve all feedback records
router.get('/', async (req, res) => {
    let pageNum = 1;
    let pageSize = 10;
    let {
        all,
        uid,
        id
    } = req.query;
    let where = {};
    if (req.query.index) {
        pageNum = Number(req.query.index);
    }
    if (req.query.limit) {
        pageSize = Number(req.query.limit);
    }
    if (uid) {
        where.uid = uid;
    }
    if (id) {
        where._id = id;
    }
    try {
        const total = await feedback.find({
            ...where
        }).countDocuments();
        let data = [];
        if (all) {
            data = await feedback.find({
                ...where
            });
            res.json({
                code: 200,
                msg: "The operation was successful!",
                data
            });
        } else {
            data = await feedback.find({
                ...where
            }).skip((pageNum - 1) * pageSize).limit(pageSize);
            res.json({
                code: 200,
                msg: "The operation was successful!",
                data: {
                    count: total,
                    rows: data
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: error.message,
        });
    }

})

// API to retrieve a specific feedback record
router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const data = await feedback.findOne({
            _id: id
        });
        if (!data) {
            return res.status(404).json({
                message: 'Non-existent ID'
            });
        }
        res.json({
            code: 200,
            msg: "The operation was successful!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: error.message,
        });
    }
})

// API update a feedback record
router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const row = await feedback.findOne({
            _id: id
        });
        if (!row) {
            return res.status(404).json({
                message: 'Non-existent ID'
            });
        }
        const data = await feedback.updateOne({
            _id: id
        }, req.body);
        res.json({
            code: 200,
            msg: "The operation was successful!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: error.message,
        });
    }

})

// API delete a feedback record
router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const row = await feedback.findOne({
            _id: id
        });
        if (!row) {
            return res.status(404).json({
                message: 'Non-existent ID'
            });
        }
        const data = await feedback.deleteOne({
            _id: id
        });
        res.json({
            code: 200,
            msg: "The operation was successful!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: error.message,
        });
    }

})

// API create a new feedback record
router.post('/', async (req, res, next) => {
    try {
        let uid = await generateOrderID();
        let item = new feedback({
            ...req.body,
            uid
        });
        const data = await item.save();
        let mSubject = `Received a feedback！`;
        let mText = `User:${req.body.firstName} ${req.body.lastName}\nUid:${uid}\nTopic:${req.body.topic}\nComments:${req.body.comments}`;
        await sendMail(managerEmail, mSubject, mText);
        let uSubject = `The feedback you submitted has been successfully sent！`;
        await sendMail(req.body.email, uSubject, mText);
        res.json({
            code: 200,
            msg: "The operation was successful!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: error.message,
        });
    }
})

module.exports = router;