const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Create a new reservation
router.post('/', async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json({ success: true, data: reservation });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({ success: true, data: reservations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get a single reservation by ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ success: false, error: 'Reservation not found' });
        }
        res.status(200).json({ success: true, data: reservation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update a reservation by ID
router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) {
            return res.status(404).json({ success: false, error: 'Reservation not found' });
        }
        res.status(200).json({ success: true, data: reservation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete a reservation by ID
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ success: false, error: 'Reservation not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

