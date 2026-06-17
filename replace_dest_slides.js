const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace renderPlaceCard
const startIndex = html.indexOf('function renderPlaceCard(p) {');
if (startIndex !== -1) {
    let braceCount = 0;
    let endIndex = -1;
    for (let i = startIndex; i < html.length; i++) {
        if (html[i] === '{') braceCount++;
        else if (html[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                endIndex = i;
                break;
            }
        }
    }
    
    if (endIndex !== -1) {
        const oldFunc = html.substring(startIndex, endIndex + 1);
        
        const newFunc = `function renderPlaceCard(p) {
            const cfg = CAT_CONFIG[p.category] || { bg: 'linear-gradient(160deg,#1A2B3C,#2C4A3E)', icon: '??' };
            const img1 = p.images && p.images.length > 0 ? p.images[0] : '';
            const img2 = p.images && p.images.length > 1 ? p.images[1] : img1;
            const img3 = p.images && p.images.length > 2 ? p.images[2] : img1;
            
            return \`<div class="place-card" onclick="openPlaceModal('\${p.id}')">
    <div class="place-card-bg" style="position: absolute; inset: 0;" id="slideshow-\${p.id}">
        <img src="\${img1}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 1;">
        <img src="\${img2}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
        <img src="\${img3}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
    </div>
    <div class="place-card-overlay"></div>
    <div class="place-explore-btn"><i class="fa-solid fa-arrow-right"></i></div>
    <div class="place-card-content">
      <div class="place-cat-pill">\${cfg.icon} \${p.category}</div>
      <div class="place-card-name">\${p.name}</div>
      <div class="place-card-loc"><i class="fa-solid fa-location-dot"></i> \${p.location}</div>
      <div class="place-card-footer">
        <div class="place-rating-pill"><i class="fa-solid fa-star"></i> \${p.rating} <span style="font-weight:400;opacity:.75">rating</span></div>
        <div class="place-price-pill">\${p.price}</div>
      </div>
    </div>
  </div>\`;
        }`;
        
        html = html.replace(oldFunc, newFunc);
        console.log("Replaced renderPlaceCard function.");
    }
}

// Add the interval script for places if not already handling `slideshow-`
if (!html.includes('id="place-slideshow-script"')) {
    html = html.replace('</body>', `
<script id="place-slideshow-script">
  setInterval(() => {
    document.querySelectorAll('[id^="slideshow-"]').forEach(container => {
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
  }, 2500);
</script>
</body>`);
    console.log("Added place slideshow script.");
}

fs.writeFileSync(indexHtmlPath, html);
