const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const searchPlace = require('./googlePlaces');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const apiRoutes = require('./routes/api');
const searchRoutes = require('./routes/searchRoutes');

// Use Routes
app.use('/api', apiRoutes);
app.use('/api/search', searchRoutes);

app.get('/api/place/:name', async (req, res) => {
    try {
        const data = await searchPlace(req.params.name);
        res.json(data);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Test root endpoint
app.get('/', (req, res) => {
    res.send('Tourist Management System API is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
