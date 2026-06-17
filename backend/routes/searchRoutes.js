const express = require('express');
const router = express.Router();
const googlePlaces = require('../googlePlaces');
const { searchDestinations, getDestinationDetails, getItinerary } = require('../controllers/searchController');

// Search destinations across India
router.post('/destinations/search', searchDestinations);

// Get detailed information about a destination
router.get('/destinations/:placeId', getDestinationDetails);

// Generate travel itinerary
router.post('/itinerary/generate', getItinerary);

// Filter by category
router.get('/destinations/filter/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { location, radius } = req.query;
    
    const query = `${category} in ${location || 'India'}`;
    const results = await googlePlaces.searchPlaces(query, {
      radius: radius || 5000,
      types: mapCategoryToTypes(category)
    });
    
    res.json({
      success: true,
      category,
      results: results.slice(0, 8)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function mapCategoryToTypes(category) {
  const categoryMap = {
    'places': ['point_of_interest', 'tourist_attraction'],
    'hotels': ['lodging', 'hotel'],
    'restaurants': ['restaurant', 'food'],
    'attractions': ['museum', 'art_gallery', 'tourist_attraction'],
    'beaches': ['natural_feature', 'beach']
  };
  return categoryMap[category.toLowerCase()] || [];
}

module.exports = router;
