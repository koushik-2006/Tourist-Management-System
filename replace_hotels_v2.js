const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
const jsonPath = 'frontend/hotels_generated_v2.json';

let html = fs.readFileSync(indexHtmlPath, 'utf8');
const json = fs.readFileSync(jsonPath, 'utf8');

// 1. Update HOTELS array
const regex = /const HOTELS = \[[^;]+;/s;
html = html.replace(regex, `const HOTELS = ${json};`);

// 2. Ensure homepage slices to 6
html = html.replace(/document\.getElementById\('home-hotels'\)\.innerHTML = HOTELS\.slice\(0, 3\)/g, "document.getElementById('home-hotels').innerHTML = HOTELS.slice(0, 6)");
html = html.replace(/document\.getElementById\('home-hotels'\)\.innerHTML = HOTELS\.slice\(0,3\)/g, "document.getElementById('home-hotels').innerHTML = HOTELS.slice(0, 6)");
// Fallback in case it wasn't exactly 'slice(0, 3)'
if (!html.includes("HOTELS.slice(0, 6)")) {
    // try finding HOTELS.slice and replace it
    html = html.replace(/HOTELS\.slice\(0,\s*\d+\)/g, "HOTELS.slice(0, 6)");
}

// 3. Update the See All Hotels rendering logic to group by state
const oldRenderAllHotels = /function renderAllHotels\(\) \{.*?document\.getElementById\('all-hotels'\)\.innerHTML = HOTELS\.map\(renderHotelCard\)\.join\(''\);\n        \}/s;

const newRenderAllHotels = `function renderAllHotels() {
            // Group hotels by state
            const grouped = {};
            HOTELS.forEach(h => {
                if(!grouped[h.state]) grouped[h.state] = [];
                grouped[h.state].push(h);
            });
            
            let htmlStr = '';
            for (const state of Object.keys(grouped).sort()) {
                htmlStr += \`<div style="width:100%; grid-column: 1 / -1; margin-top:2rem; margin-bottom:1rem; border-bottom:1px solid #334155; padding-bottom:0.5rem;">
                    <h2 style="color:#f8fafc; font-size:1.5rem;">\${state}</h2>
                </div>\`;
                htmlStr += grouped[state].map(renderHotelCard).join('');
            }
            
            document.getElementById('all-hotels').innerHTML = htmlStr;
        }`;

if (html.match(oldRenderAllHotels)) {
    html = html.replace(oldRenderAllHotels, newRenderAllHotels);
} else {
    // Fallback if regex fails, replace just the innerHTML line inside renderAllHotels
    html = html.replace(/document\.getElementById\('all-hotels'\)\.innerHTML = HOTELS\.map\(renderHotelCard\)\.join\(''\);/g, `
            const grouped = {};
            HOTELS.forEach(h => {
                if(!grouped[h.state]) grouped[h.state] = [];
                grouped[h.state].push(h);
            });
            
            let htmlStr = '';
            for (const state of Object.keys(grouped).sort()) {
                htmlStr += \`<div style="width:100%; grid-column: 1 / -1; margin-top:2rem; margin-bottom:1rem; border-bottom:1px solid #334155; padding-bottom:0.5rem;">
                    <h2 style="color:#f8fafc; font-size:1.5rem;">\${state}</h2>
                </div>\`;
                htmlStr += grouped[state].map(renderHotelCard).join('');
            }
            document.getElementById('all-hotels').innerHTML = htmlStr;
    `);
}

// 4. Update ImageSlideshow to 3 seconds
html = html.replace(/this\.interval = 2800;/g, "this.interval = 3000;");

// 5. Remove the SVG placeholder from ImageSlideshow to guarantee NO placeholders or gradients.
// Wait, if images=[this.placeholder], it previously showed a gradient SVG.
// The user strictly says: "DO NOT use: Emoji placeholders, SVG placeholders, Icon placeholders, Gradient placeholders... Every hotel image MUST exist locally on disk."
// Because I ensure exactly 5 valid JPGs exist for every hotel, I can just rip out the placeholder fallback entirely.
// Let's replace the connectedCallback logic that renders placeholders with a strict requirement.
const oldPlaceholderCheck = /if \(this\.images\.length === 1 && this\.images\[0\] === this\.placeholder\) \{.*?return;\n                \}/s;
html = html.replace(oldPlaceholderCheck, `// Strict mode: No placeholders allowed.`);

fs.writeFileSync(indexHtmlPath, html);
console.log('Replaced HOTELS, sliced homepage to 6, grouped by state, and enforced 3s timing in index.html');
