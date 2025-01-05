// Require
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 300 // Limit each IP to 100 requests per windowMs
});
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const options = {
    ssl: true,
    tls: true
};

const programsRouter = require('./routes/programs');
const communitiesRouter = require('./routes/communities');
const childcaresRouter = require('./routes/childcares');
const roomsRouter = require('./routes/rooms');
const managerRouter = require('./routes/manager');
const membersRouter = require('./routes/members');
const feedbackRouter = require('./routes/feedback');
const bookingRoomRouter = require('./routes/bookingRoom');
const bookingCourseRouter = require('./routes/bookingCourse');
const bookingChildcaresRouter = require('./routes/bookingChildcares');
const bookingCommunitiesRouter = require('./routes/bookingCommunities');

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

// Connect to MongoDB Atlas Database
mongoose.connect(databaseUrl, options);
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected'))

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());

app.use(express.static(path.join(__dirname, 'source'))); 
app.use('/script', express.static(path.join(__dirname, 'source', 'script')));
app.use('/style', express.static(path.join(__dirname, 'source', 'style')));
app.use('/image', express.static(path.join(__dirname, 'image')));

app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "img-src 'self' https://storage.googleapis.com data:;"
    );
    next();
});  

// Routers
app.use('/api/programs', programsRouter);
app.use('/api/communities', communitiesRouter);
app.use('/api/childcares', childcaresRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/login', managerRouter);
app.use('/api/members', membersRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/bookingRoom', bookingRoomRouter);
app.use('/api/bookingCourse', bookingCourseRouter);
app.use('/api/bookingChildcares', bookingChildcaresRouter);
app.use('/api/bookingCommunities', bookingCommunitiesRouter);

// Open default home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'source', 'homePage.html'));
});

// Start the Server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});