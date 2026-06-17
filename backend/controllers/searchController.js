const googlePlaces = require('../googlePlaces');
const db = require('../config/db');

exports.searchDestinations = async (req, res) => {
  try {
    const { query, type = 'all', region = 'India' } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Search query required' });
    }

    // Construct search query
    const searchQuery = `${query} ${type === 'all' ? '' : type} ${region}`;
    
    // Search using Google Places API
    // Ensure googlePlaces.searchPlaces is a defined function in your googlePlaces.js
    const searchResults = await googlePlaces.searchPlaces(searchQuery);

    // Process and format results
    const formattedResults = searchResults.map(place => ({
      id: place.place_id,
      name: place.name,
      type: categorizePlace(place),
      address: place.formatted_address,
      city: extractCity(place.formatted_address),
      rating: place.rating || 'N/A',
      reviews: place.user_ratings_total || 0,
      photo: place.photos?.[0]?.photo_reference,
      coordinates: {
        lat: place.geometry?.location?.lat,
        lng: place.geometry?.location?.lng
      },
      openNow: place.opening_hours?.open_now,
      types: place.types
    })).slice(0, 8);

    // Save search to database for analytics
    await db.query(
      'INSERT INTO search_history (query, results_count, timestamp) VALUES (?, ?, NOW())',
      [query, formattedResults.length]
    );

    res.json({
      success: true,
      query,
      resultCount: formattedResults.length,
      results: formattedResults
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Search failed',
      message: error.message 
    });
  }
};

exports.getDestinationDetails = async (req, res) => {
  try {
    const { placeId } = req.params;

    const details = await googlePlaces.getPlaceDetails(placeId);

    const enrichedDetails = {
      ...details,
      nearbyHotels: await googlePlaces.searchNearby(details.geometry.location, 'lodging'),
      nearbyRestaurants: await googlePlaces.searchNearby(details.geometry.location, 'restaurant'),
      nearbyAttractions: await googlePlaces.searchNearby(details.geometry.location, 'tourist_attraction'),
      bestTimeToVisit: getSeasonalInfo(details.name),
      estimatedDuration: estimateVisitDuration(details.types),
      budget: estimateBudget(details.name, details.rating)
    };

    res.json({
      success: true,
      destination: enrichedDetails
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItinerary = async (req, res) => {
  try {
    const { destinations, duration, travelerType = 'general' } = req.body;

    if (!destinations || destinations.length === 0) {
      return res.status(400).json({ error: 'Destinations required' });
    }

    // Generate day-by-day itinerary
    const itinerary = generateItinerary(destinations, duration, travelerType);

    res.json({
      success: true,
      itinerary,
      estimatedCost: calculateTotalCost(itinerary),
      transportSuggestions: getTransportOptions(destinations)
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper Functions
function categorizePlace(place) {
  const types = place.types || [];
  if (types.includes('lodging')) return 'Hotels';
  if (types.includes('restaurant') || types.includes('food')) return 'Restaurants';
  if (types.includes('museum') || types.includes('art_gallery')) return 'Attractions';
  if (types.includes('natural_feature')) return 'Natural';
  return 'Places';
}

function extractCity(address) {
  if (!address) return 'India';
  const parts = address.split(',');
  return parts.length > 2 ? parts[parts.length - 2].trim() : 'India';
}

function getSeasonalInfo(destinationName) {
  if (!destinationName) return 'October - March';
  const seasonMap = {
    'goa': 'November - February',
    'kerala': 'July - September, October - May',
    'jaipur': 'October - February',
    'delhi': 'October - March',
    'ladakh': 'July - September',
    'himalaya': 'April - June, September - October',
    'rajasthan': 'October - February',
    'agra': 'October - February'
  };

  for (let key in seasonMap) {
    if (destinationName.toLowerCase().includes(key)) {
      return seasonMap[key];
    }
  }
  return 'October - March';
}

function estimateVisitDuration(types) {
  if (!types) return '4-6 hours';
  const typeMap = {
    'museum': '2-3 hours',
    'natural_feature': '1 full day',
    'tourist_attraction': '4-6 hours',
    'temple': '2-4 hours',
    'beach': '1 full day',
    'point_of_interest': '3-4 hours'
  };

  for (let type of types) {
    if (typeMap[type]) return typeMap[type];
  }
  return '4-6 hours';
}

function estimateBudget(name, rating) {
  // Budget estimation based on popularity and rating
  const basebudget = rating > 4.5 ? 1000 : 500;
  return {
    low: basebudget,
    medium: basebudget * 1.5,
    high: basebudget * 2.5,
    currency: 'INR'
  };
}

function generateItinerary(destinations, duration, travelerType) {
  // Generate day-by-day itinerary
  const daysPerDestination = Math.floor(duration / destinations.length);
  const itinerary = [];

  destinations.forEach((dest, index) => {
    itinerary.push({
      day: (index * daysPerDestination) + 1,
      destination: dest.name,
      activities: generateActivities(dest, travelerType),
      accommodation: dest.nearbyHotels?.[0],
      dining: dest.nearbyRestaurants?.slice(0, 3)
    });
  });

  return itinerary;
}

function generateActivities(destination, travelerType) {
  const activityMap = {
    'adventure': ['Trekking', 'Water Sports', 'Paragliding', 'Rock Climbing'],
    'cultural': ['Temple Visit', 'Museum Tour', 'Local Market', 'Cultural Show'],
    'family': ['Zoo', 'Park', 'Shopping', 'Water Park'],
    'romantic': ['Sunset View', 'Fine Dining', 'Spa', 'Boating'],
    'general': ['Sightseeing', 'Local Food', 'Shopping', 'Photography']
  };

  return activityMap[travelerType] || activityMap['general'];
}

function calculateTotalCost(itinerary) {
  return itinerary.reduce((total, day) => {
    return total + 3000; // Base daily cost
  }, 0);
}

function getTransportOptions(destinations) {
  return {
    flight: 'Best for long distances between states',
    train: 'Most economical, scenic views',
    road: 'Flexible, explore at own pace',
    recommendation: 'Combination of all for optimal experience'
  };
}

module.exports = exports;
