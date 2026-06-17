const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
const jsonPath = 'frontend/hotels_generated_v4.json';

let html = fs.readFileSync(indexHtmlPath, 'utf8');
const json = fs.readFileSync(jsonPath, 'utf8');

// 1. Update HOTELS array
const regex = /const HOTELS = \[[^;]+;/s;
html = html.replace(regex, `const HOTELS = ${json};`);

// 2. Change 3000 to 2500 in interval
html = html.replace(/setInterval\(\(\) => \{.*?\}, 3000\);/s, match => match.replace('3000', '2500'));

fs.writeFileSync(indexHtmlPath, html);
console.log('Replaced HOTELS array and set slideshow interval to 2500ms.');
