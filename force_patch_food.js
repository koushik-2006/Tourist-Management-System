const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Find the exact renderFoodCard function
const startIndex = html.indexOf('function renderFoodCard(f) {');
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
        const newFunc = `function renderFoodCard(f) {
            return \`<div class="food-card" style="display: flex; flex-direction: column; height: 100%;">
      <div class="food-img" style="position: relative; overflow: hidden; padding: 0; background: none; height: 200px;" id="food-slideshow-\${f.id}">
        <img src="\${f.images && f.images[0] ? f.images[0] : ''}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 1;">
        <img src="\${f.images && f.images[1] ? f.images[1] : ''}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
        <img src="\${f.images && f.images[2] ? f.images[2] : ''}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
      </div>
      <div class="food-body" style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
        <div class="food-name" style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-main);">\${f.name}</div>
        <div class="food-state" style="color: var(--sage-600); font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">\${f.state}</div>
        <div class="food-type" style="color: var(--text-light); font-size: 0.85rem; margin-bottom: 0.5rem;">🍴 \${f.restaurant} &nbsp;•&nbsp; \${f.category}</div>
        <div class="food-rating" style="color: #f59e0b; font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">⭐ \${f.rating}</div>
        <div class="food-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
          <div class="food-price" style="font-weight: 700; font-size: 1.1rem; color: var(--sage-800);">₹\${f.price}</div>
          <button class="btn-book sage" onclick="showToast('\${f.name} added to cart! 🛒','success')">Order</button>
        </div>
      </div>
    </div>\`;
        }`;
        
        html = html.replace(oldFunc, newFunc);
        console.log("Successfully replaced renderFoodCard function!");
    }
} else {
    console.log("Could not find function renderFoodCard(f)");
}

// Ensure the javascript interval is included
if (!html.includes('id="food-slideshow-script"')) {
    html = html.replace('</body>', `
<script id="food-slideshow-script">
  setInterval(() => {
    document.querySelectorAll('[id^="food-slideshow-"]').forEach(container => {
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
    console.log("Added food slideshow javascript script.");
}

fs.writeFileSync(indexHtmlPath, html);
