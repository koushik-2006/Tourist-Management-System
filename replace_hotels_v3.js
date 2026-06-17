const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
const jsonPath = 'frontend/hotels_generated_v3.json';

let html = fs.readFileSync(indexHtmlPath, 'utf8');
const json = fs.readFileSync(jsonPath, 'utf8');

// 1. Update HOTELS array
const regex = /const HOTELS = \[[^;]+;/s;
html = html.replace(regex, `const HOTELS = ${json};`);

// 2. Rewrite renderHotelCard to use vanilla <img> tags for the slideshow
const oldRenderHotel = /function renderHotelCard\(h\) \{.*?return `.*?`;\n        \}/s;

const newRenderHotel = `function renderHotelCard(h) {
            return \`
                <div class="card fade-in" style="animation-delay: \${0.1}s">
                    <div class="card-img" style="position: relative; overflow: hidden; height: 200px;" id="hotel-slideshow-\${h.id}">
                        <img src="\${h.images[0]}" class="slide" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 1;">
                        <img src="\${h.images[1]}" class="slide" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
                        <img src="\${h.images[2]}" class="slide" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
                        <div class="card-badge rating-badge" style="position: absolute; top: 1rem; right: 1rem; z-index: 10;">
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

if (html.match(oldRenderHotel)) {
    html = html.replace(oldRenderHotel, newRenderHotel);
}

// 3. Inject global vanilla JS interval for 3000ms rotation if not already injected
if (!html.includes('id="hotel-slideshow-script"')) {
    html = html.replace('</body>', `
<script id="hotel-slideshow-script">
  setInterval(() => {
    document.querySelectorAll('[id^="hotel-slideshow-"]').forEach(container => {
       const slides = container.querySelectorAll('img.slide');
       if(slides.length === 0) return;
       let activeIdx = 0;
       slides.forEach((s, i) => { 
           if(s.style.opacity === "1") activeIdx = i; 
           s.style.opacity = "0"; 
       });
       activeIdx = (activeIdx + 1) % slides.length;
       slides[activeIdx].style.opacity = "1";
    });
  }, 3000);
</script>
</body>`);
}

fs.writeFileSync(indexHtmlPath, html);
console.log('Replaced HOTELS and renderHotelCard in index.html to use pure standard IMG tags and 3000ms loop.');
