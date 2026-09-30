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
    const { 
        user_id, item_type, item_id, booking_date, 
        hotel_name, hotel_image, price, check_in, check_out, guests, place_name 
    } = req.body;
    
    try {
        let query = '';
        let params = [];

        if (item_type === 'hotel') {
            // New hotel booking flow
            query = `INSERT INTO Bookings (user_id, item_type, item_id, booking_date, hotel_name, hotel_image, price, check_in, check_out, guests, place_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            params = [user_id, 'hotel', item_id || null, booking_date, hotel_name, hotel_image, price, check_in, check_out, guests, place_name];
        } else if (item_type === 'tour') {
            const { tour_tier, tour_pax, special_requests, booking_ref } = req.body;
            query = `INSERT INTO Bookings (user_id, item_type, item_id, booking_date, place_name, price, tour_tier, tour_pax, special_requests, booking_ref, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`;
            params = [user_id, 'tour', item_id || null, booking_date, place_name, price, tour_tier, tour_pax, special_requests, booking_ref];
        } else {
            // Fallback for older booking calls if they still exist
            const { hotel_id, transport_id } = req.body;
            query = `INSERT INTO Bookings (user_id, item_type, item_id, booking_date) VALUES (?, ?, ?, ?)`;
            params = [user_id, hotel_id ? 'hotel' : (transport_id ? 'transport' : 'place'), hotel_id || transport_id || item_id, booking_date];
        }

        const [result] = await db.query(query, params);
        res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
    } catch (err) {
        // Simple fallback if columns aren't there yet
        if (err.code === 'ER_BAD_FIELD_ERROR') {
             try {
                const [result] = await db.query('INSERT INTO Bookings (user_id, item_type, item_id, booking_date) VALUES (?, ?, ?, ?)', [user_id, 'hotel', null, booking_date]);
                res.status(201).json({ message: 'Booking successful (fallback)', bookingId: result.insertId });
             } catch (fallbackErr) {
                res.status(500).json({ error: 'Database error', details: fallbackErr.message });
             }
        } else {
             res.status(500).json({ error: 'Database error', details: err.message });
        }
    }
});

// --- Food Order APIs ---
router.post('/food-order', async (req, res) => {
    const { user_id, booking_date, items, total_price } = req.body;
    try {
        // Items is an array of cart items. We can insert them as separate bookings or just pick the first for simple mapping
        for (const item of items) {
            await db.query(
                `INSERT INTO Bookings (user_id, item_type, booking_date, food_image, restaurant, quantity, total_price, status, hotel_name) 
                 VALUES (?, 'food', ?, ?, ?, ?, ?, 'confirmed', ?)`,
                [user_id, booking_date, item.image, item.restaurant || 'Wanderly Foods', item.quantity, item.price * item.quantity, item.name]
            );
        }
        res.status(201).json({ message: 'Food order placed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/bookings/:userId', async (req, res) => {
    try {
        // We will just fetch everything from Bookings table
        const [bookings] = await db.query(`SELECT * FROM Bookings WHERE user_id = ? ORDER BY booking_date DESC`, [req.params.userId]);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

module.exports = router;
