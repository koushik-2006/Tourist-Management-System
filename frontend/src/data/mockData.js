export const PLACES = [
  {id:1,  name:'Taj Mahal',           location:'Agra, Uttar Pradesh',        desc:'The ivory-white marble mausoleum built by Mughal emperor Shah Jahan.', emoji:'🕌', image:'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', category:'Heritage',   rating:4.9, price:'₹50'},
  {id:2,  name:'Goa Beaches',         location:'Panaji, Goa',                 desc:'Sun-kissed coastlines stretching 100 km along the Arabian Sea.', emoji:'🏖️', image:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800', category:'Beach',      rating:4.7, price:'Free'},
  {id:3,  name:'Leh-Ladakh',          location:'Leh, Jammu & Kashmir',        desc:'High-altitude cold desert at 3,500 m.', emoji:'⛰️', image:'https://images.unsplash.com/photo-1626084477546-778ea2299878?auto=format&fit=crop&q=80&w=800', category:'Adventure',  rating:4.8, price:'₹50'},
  {id:4,  name:'Jaipur',              location:'Jaipur, Rajasthan',           desc:'The royal Pink City.', emoji:'🏯', image:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800', category:'Heritage',   rating:4.7, price:'₹200'},
  {id:5,  name:'Kerala Backwaters',   location:'Alleppey, Kerala',            desc:'A 900 km network of tranquil lagoons.', emoji:'🛶', image:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', category:'Nature',     rating:4.8, price:'₹1,500+'},
  {id:6,  name:'Varanasi Ghats',      location:'Varanasi, Uttar Pradesh',     desc:'One of the world\'s oldest continuously inhabited cities.', emoji:'🛕', image:'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800', category:'Spiritual',  rating:4.6, price:'Free'}
];

export const HOTELS = [
  {id:1, name:'The Grand Palace', location:'Jaipur, Rajasthan', rating:4.8, price:4200, amenities:['Pool', 'Spa', 'Wifi']},
  {id:2, name:'Seashore Resort', location:'Goa', rating:4.6, price:8700, amenities:['Beachfront', 'Bar', 'Wifi']},
  {id:3, name:'Himalayan Retreat', location:'Leh, J&K', rating:4.7, price:3500, amenities:['Heater', 'Breakfast', 'Views']}
];

export const TRANSPORT = [
  {id:1, type:'Bus', source:'Delhi', dest:'Agra', time:'06:00 AM', price:450, seats:12},
  {id:2, type:'Train', source:'Mumbai', dest:'Goa', time:'10:30 PM', price:1200, seats:4},
  {id:3, type:'Cab', source:'Airport', dest:'Hotel', time:'Anytime', price:850, seats:3}
];

export const FOOD = [
  {id:1, name:'Butter Chicken', type:'North Indian', price:350, restaurant:'Punjabi Dhaba'},
  {id:2, name:'Masala Dosa', type:'South Indian', price:150, restaurant:'MTR'},
  {id:3, name:'Chow Mein', type:'Chinese', price:200, restaurant:'Wok Express'}
];
