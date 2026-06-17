// search.js

const indiaPlaces = [
    {
        id: "taj-mahal",
        name: "Taj Mahal",
        type: "places",
        city: "Agra",
        state: "Uttar Pradesh",
        rating: 4.9,
        photo: "",
        description: "World famous monument"
    },
    {
        id: "red-fort",
        name: "Red Fort",
        type: "attractions",
        city: "Delhi",
        state: "Delhi",
        rating: 4.7,
        photo: "",
        description: "Historic fort"
    },
    {
        id: "marina-beach",
        name: "Marina Beach",
        type: "places",
        city: "Chennai",
        state: "Tamil Nadu",
        rating: 4.6,
        photo: "",
        description: "Popular beach"
    },
    {
        id: "meenakshi-temple",
        name: "Meenakshi Temple",
        type: "attractions",
        city: "Madurai",
        state: "Tamil Nadu",
        rating: 4.8,
        photo: "",
        description: "Ancient temple"
    },
    {
        id: "goa",
        name: "Goa Beaches",
        type: "places",
        city: "Goa",
        state: "Goa",
        rating: 4.8,
        photo: "",
        description: "Beach destination"
    },
    {
        id: "gateway-india",
        name: "Gateway of India",
        type: "places",
        city: "Mumbai",
        state: "Maharashtra",
        rating: 4.7,
        photo: "",
        description: "Famous landmark"
    },
    {
        id: "kerala",
        name: "Kerala Backwaters",
        type: "places",
        city: "Alappuzha",
        state: "Kerala",
        rating: 4.8,
        photo: "",
        description: "Natural beauty"
    },
    {
        id:"mysore-palace",
        name:"Mysore Palace",
        type:"attractions",
        city:"Mysore",
        state:"Karnataka",
        rating:4.7,
        photo:"",
        description:"Royal palace"
    },
    {
        id:"golden-temple",
        name:"Golden Temple",
        type:"places",
        city:"Amritsar",
        state:"Punjab",
        rating:4.9,
        photo:"",
        description:"Sacred temple"
    },
    {
        id:"charminar",
        name:"Charminar",
        type:"attractions",
        city:"Hyderabad",
        state:"Telangana",
        rating:4.7,
        photo:"",
        description:"Historic monument"
    },
    {
        id:"hotel-chennai",
        name:"Chennai Heritage Hotel",
        type:"hotels",
        city:"Chennai",
        state:"Tamil Nadu",
        rating:4.5,
        photo:"",
        description:"Luxury hotel"
    },
    {
        id:"south-indian-food",
        name:"South Indian Restaurant",
        type:"restaurants",
        city:"Coimbatore",
        state:"Tamil Nadu",
        rating:4.6,
        photo:"",
        description:"Local food"
    }
];

export function renderSearchBar(){
return `
<div class="search-bar">
<input
type="text"
id="search-input"
placeholder="Where would you like to go?"
/>
<select id="search-category">
<option value="all">
All Types
</option>
<option value="places">
Places
</option>
<option value="hotels">
Hotels
</option>
<option value="restaurants">
Restaurants
</option>
<option value="attractions">
Attractions
</option>
</select>
<button
id="search-btn"
onclick="window.appUtils.performSearch()">
Search
</button>
</div>
<div
id="search-error"
class="error-message"
style="color:red;display:none;margin-top:10px">
</div>
`;
}

export function performSearch(){
const input =
document.getElementById("search-input")
.value
.toLowerCase()
.trim();

const category =
document.getElementById("search-category")
.value;

const error =
document.getElementById("search-error");

if(input===""){
error.innerHTML =
"Please enter a place name";
error.style.display="block";
return;
}

error.style.display="none";

const results =
indiaPlaces.filter(place=>{
let searchMatch =
place.name
.toLowerCase()
.includes(input)
||
place.city
.toLowerCase()
.includes(input)
||
place.state
.toLowerCase()
.includes(input);

let categoryMatch =
category==="all"
||
place.type===category;

return searchMatch && categoryMatch;
});

const container =
document.getElementById("search-results");

if(container){
container.innerHTML =
renderSearchResults(results);
}
}

export function renderSearchResults(results){
if(!results || results.length===0){
return `
<div class="empty-state"
style="text-align:center;padding:2rem">
No Indian places found
</div>
`;
}

return `
<div class="results-container">
<div class="places-grid">
${results.map(place=>`
<div class="place-card"
onclick="window.appUtils.showSearchResultDetails('${place.id}')">
<div class="place-card-bg"
style="background-color:var(--sand);">
${place.photo ?
`
<img
src="${place.photo}"
style="width:100%;height:100%;object-fit:cover;">
`
:
"📍"
}
</div>
<div class="place-card-overlay"></div>
<div class="place-card-content">
<div class="place-cat-pill">
${place.type}
</div>
<h3 class="place-card-name">
${place.name}
</h3>
<div class="place-card-loc">
<i class="fa-solid fa-location-dot"></i>
${place.city}, ${place.state}
</div>
<div class="place-card-footer">
<div class="place-rating-pill">
<i class="fa-solid fa-star"></i>
${place.rating}
</div>
</div>
</div>
</div>
`).join("")}
</div>
</div>
`;
}

// Kept this so the detail modal still functions when clicking the cards
export function showSearchResultDetails(placeId) {
    const place = indiaPlaces.find(p => p.id === placeId);
    if (!place) return;
    
    const contentHtml = `
        <div style="height: 200px; background-color: var(--sand); position: relative; margin: -1.5rem -1.5rem 1.5rem -1.5rem; overflow: hidden; display:flex; align-items:center; justify-content:center; font-size:4rem;">
            ${place.photo ? `<img src="${place.photo}" style="width:100%; height:100%; object-fit:cover;">` : '📍'}
        </div>
        <div class="modal-detail-row"><span class="modal-detail-label">Location</span><span class="modal-detail-value">${place.city}, ${place.state}</span></div>
        <div class="modal-detail-row"><span class="modal-detail-label">Type</span><span class="modal-detail-value">${place.type}</span></div>
        <div class="modal-detail-row"><span class="modal-detail-label">Rating</span><span class="modal-detail-value">${place.rating}</span></div>
        <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">${place.description}</p>
    `;
    window.appUtils.showModal(place.name, contentHtml, '<button class="btn-book" onclick="window.appUtils.closeModal()">Close</button>');
}
