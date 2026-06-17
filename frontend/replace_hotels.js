const fs = require('fs');

const indexHtmlPath = 'index.html';
const jsonPath = 'hotels_generated.json';

let html = fs.readFileSync(indexHtmlPath, 'utf8');
const json = fs.readFileSync(jsonPath, 'utf8');

const regex = /const HOTELS = \[[^;]+;/s;
html = html.replace(regex, `const HOTELS = ${json};`);

// Update renderHotelCard logic to use <image-slideshow>
const oldRenderHotel = /function renderHotelCard\(h\) \{.*?return `.*?`;\n        \}/s;

const newRenderHotel = `function renderHotelCard(h) {
            return \`
                <div class="card fade-in" style="animation-delay: \${h.id * 0.1}s">
                    <div class="card-img">
                        <image-slideshow 
                            data-images='\${JSON.stringify(h.images).replace(/'/g, "&#39;")}' 
                            data-alt="\${h.name}"
                            data-bg="linear-gradient(135deg, #2c3e50, #3498db)"
                        ></image-slideshow>
                        <div class="card-badge rating-badge">
                            <i class="fas fa-star"></i> \${h.rating}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="flex-between" style="margin-bottom:0.5rem">
                            <div class="stars">\${'★'.repeat(h.stars)}</div>
                            <span class="price">₹\${h.price.toLocaleString()}</span>
                        </div>
                        <h3>\${h.name}</h3>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> \${h.location}</p>
                        <div class="amenities">
                            <span><i class="fas fa-wifi"></i> Free WiFi</span>
                            <span><i class="fas fa-swimming-pool"></i> Pool</span>
                        </div>
                        <button class="btn btn-primary" style="width:100%;margin-top:1rem" onclick="bookHotel('\${h.id}')">Book Now</button>
                    </div>
                </div>
            \`;
        }`;

html = html.replace(oldRenderHotel, newRenderHotel);

fs.writeFileSync(indexHtmlPath, html);
console.log('Replaced HOTELS and renderHotelCard in index.html');
