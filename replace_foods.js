const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
const jsonPath = 'frontend/foods_generated.json';

let html = fs.readFileSync(indexHtmlPath, 'utf8');
const json = fs.readFileSync(jsonPath, 'utf8');

// 1. Update FOODS array
const regex = /const FOODS = \[[^;]+;/s;
html = html.replace(regex, `const FOODS = ${json};`);

// 2. Rewrite renderFoodCard to use a slideshow of 3 images and remove placeholders
const oldRenderFood = /function renderFoodCard\(f\) \{.*?return `<div class="food-card">.*?<\/div>`;\n          \}/s;

const newRenderFood = `function renderFoodCard(f) {
            return \`<div class="food-card">
      <div class="food-img" style="position: relative; overflow: hidden; padding: 0; background: none;" id="food-slideshow-\${f.id}">
        <img src="\${f.images[0]}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 1;">
        <img src="\${f.images[1]}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
        <img src="\${f.images[2]}" class="slide" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: opacity 0.5s ease-in-out; opacity: 0;">
      </div>
      <div class="food-body">
        <div class="food-name">\${f.name}</div>
        <div class="food-type">🍽️ \${f.restaurant} &nbsp;•&nbsp; \${f.category || f.type}</div>
        <div class="food-footer">
          <div class="food-price">₹\${f.price}</div>
          <button class="btn-book sage" onclick="showToast('\${f.name} added to cart! 🛒','success')">Order</button>
        </div>
      </div>
    </div>\`;
          }`;

if (html.match(oldRenderFood)) {
    html = html.replace(oldRenderFood, newRenderFood);
}

// 3. Inject global vanilla JS interval for 2500ms rotation for foods if not already injected
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
}

// 4. Update the initialization logic so it maps all foods if home-foods doesn't exist, or just makes sure it renders perfectly.
// Let's check how FOODS is mapped. "document.getElementById('home-foods').innerHTML = FOODS.map(renderFoodCard).join('');"
// Let's make sure it slices or maps correctly. The prompt just says "Continue until 100+ food cards... Keep existing UI...". So we don't need to change the mapping logic if it already works.

fs.writeFileSync(indexHtmlPath, html);
console.log('Replaced FOODS and renderFoodCard in index.html, with 2500ms loop.');
