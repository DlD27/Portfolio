const express = require('express');
const router = express.Router();
const rooms = require('../models/rooms');
const bookingRoom = require('../models/bookingRoom');
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
    const item = await bookingRoom.findOne({
        uid: id
    });
    return item;
}

// API to retrieve all room booking records
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
        const total = await bookingRoom.find({
            ...where
        }).countDocuments();
        let data = [];
        if (all) {
            data = await bookingRoom.find({
                ...where
            }).populate('room');
            res.json({
                code: 200,
                msg: "The operation was successful!",
                data
            });
        } else {
            data = await bookingRoom.find({
                ...where
            }).populate('room').skip((pageNum - 1) * pageSize).limit(pageSize);
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

// API to retrieve a specific room booking record
router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const data = await bookingRoom.findOne({
            _id: id
        }).populate('room');
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

// API to update a room booking record
router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const row = await bookingRoom.findOne({
            _id: id
        });
        if (!row) {
            return res.status(404).json({
                message: 'Non-existent ID'
            });
        }
        const data = await bookingRoom.updateOne({
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

// API to delete a room booking records
router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const row = await bookingRoom.findOne({
            _id: id
        });
        if (!row) {
            return res.status(404).json({
                message: 'Non-existent ID'
            });
        }
        const data = await bookingRoom.deleteOne({
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

// API to create a room booking records
router.post('/', async (req, res, next) => {
    try {
        let uid = await generateOrderID();
        let item = new bookingRoom({
            ...req.body,
            uid
        });
        const data = await item.save();

        const roomData = await rooms.findOne({
            _id: req.body.room
        });

        let mSubject = `Received a booking room！`;
        let mText = `User:${req.body.firstName} ${req.body.lastName}\nUid:${uid}\nRoom Type:${roomData.roomType}\nDate From: ${req.body.dateFrom}\nDate To: ${req.body.dateTo}\nTotal Hours: ${req.body.totalHours}\nPhoneNumber:${req.body.phoneNumber}\nNotes:${req.body.notes}`;
        await sendMail(managerEmail, mSubject, mText);
        let uSubject = `The bookingRoom you submitted has been successfully sent！`;
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