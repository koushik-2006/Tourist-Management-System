const fs = require('fs');

const indexHtmlPath = 'index.html';
const jsonPath = 'places_generated.json';

let html = fs.readFileSync(indexHtmlPath, 'utf8');
const json = fs.readFileSync(jsonPath, 'utf8');

const regex = /const PLACES = \[[^;]+;/;
html = html.replace(regex, `const PLACES = ${json};`);

fs.writeFileSync(indexHtmlPath, html);
console.log('Replaced PLACES in index.html');
