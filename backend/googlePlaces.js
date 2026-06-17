const axios = require("axios");
const key = process.env.GOOGLE_API_KEY;

async function searchPlace(place) {
    const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchText",
        {
            textQuery: place
        },
        {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": key,
                "X-Goog-FieldMask": "places.displayName,places.photos,places.rating,places.formattedAddress"
            }
        }
    );
    if (!response.data.places || response.data.places.length === 0) {
        return [];
    }

    return response.data.places.map(p => {
        let image = null;
        if (p.photos && p.photos.length > 0) {
            image = `https://places.googleapis.com/v1/${p.photos[0].name}/media?key=${key}&maxHeightPx=500`;
        }
        return {
            name: p.displayName ? p.displayName.text : place,
            location: p.formattedAddress || '',
            rating: p.rating || 0,
            image: image
        };
    });
}

module.exports = searchPlace;
