const express = require('express');
const router = express.Router();
const db = require('../config/db');

// --- Auth APIs ---
router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Users (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, password, phone]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password]);
        if (users.length > 0) {
            res.json({ message: 'Login successful', user: users[0] });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

// --- Tourist Places APIs ---
router.get('/places', async (req, res) => {
    try {
        const [places] = await db.query('SELECT * FROM Places');
        res.json(places);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/places/:id', async (req, res) => {
    try {
        const [places] = await db.query('SELECT * FROM Places WHERE place_id = ?', [req.params.id]);
        if (places.length > 0) {
            res.json(places[0]);
        } else {
            res.status(404).json({ error: 'Place not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

// --- Hotel APIs ---
router.get('/hotels', async (req, res) => {
    try {
        const [hotels] = await db.query('SELECT * FROM Hotels');
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

// --- Transport APIs ---
router.get('/transport', async (req, res) => {
    try {
        const [transport] = await db.query('SELECT * FROM Transport');
        res.json(transport);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

// --- Booking APIs ---
router.post('/booking', async (req, res) => {
    const { user_id, hotel_id, transport_id, booking_date } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Bookings (user_id, hotel_id, transport_id, booking_date) VALUES (?, ?, ?, ?)',
            [user_id, hotel_id, transport_id, booking_date]
        );
        res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/bookings/:userId', async (req, res) => {
    try {
        const [bookings] = await db.query(`
            SELECT b.booking_id, b.booking_date, h.hotel_name, t.type as transport_type, t.source, t.destination 
            FROM Bookings b
            LEFT JOIN Hotels h ON b.hotel_id = h.hotel_id
            LEFT JOIN Transport t ON b.transport_id = t.transport_id
            WHERE b.user_id = ?
        `, [req.params.userId]);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

module.exports = router;
