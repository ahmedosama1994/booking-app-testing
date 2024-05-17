const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bookingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.json());
app.use(express.static('views')); // Serve static files from the 'views' directory

// Routes
app.use('/bookings', bookingRoutes);
app.use('/reservations', reservationRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
app.use(express.urlencoded({ extended: true }));

