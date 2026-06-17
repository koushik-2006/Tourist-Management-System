const fs = require('fs');
const path = require('path');
const http = require('http');

const IMAGES_ROOT = path.join(__dirname, 'frontend', 'images', 'hotels');
const DEV_SERVER_BASE = 'http://localhost:3000';

async function verifyUrl(url) {
    return new Promise((resolve) => {
        http.get(url, (res) => resolve(res.statusCode === 200)).on('error', () => resolve(false));
    });
}

async function run() {
    if (!fs.existsSync(IMAGES_ROOT)) {
        console.error('IMAGES_ROOT not found:', IMAGES_ROOT);
        return;
    }

    const jsonPath = path.join(__dirname, 'frontend', 'hotels_generated_v4.json');
    const places = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    let totalHotels = places.length;
    let imagesExpected = totalHotels * 5;
    let imagesFound = 0;
    let httpFailures = 0;
    let missing = 0;
    
    for (const p of places) {
        if (p.images.length < 5) {
            missing += (5 - p.images.length);
        }
        imagesFound += p.images.length;
        for (const imgPath of p.images) {
            const relativePath = imgPath.replace('/frontend/images/', '/frontend/images/'); // No-op since it's already absolute local
            const fullUrl = `${DEV_SERVER_BASE}${relativePath}`;
            
            const ok = await verifyUrl(fullUrl);
            if (!ok) {
                console.error(`FAILED: ${fullUrl}`);
                httpFailures++;
            }
        }
    }
    
    console.log(`HOTEL IMAGE AUDIT\n`);
    console.log(`Hotels checked: ${totalHotels}`);
    console.log(`Images expected: ${imagesExpected}`);
    console.log(`Images found: ${imagesFound}`);
    console.log(`Missing: ${missing}`);
    console.log(`HTTP failures: ${httpFailures}`);
    console.log(`STATUS: ${httpFailures === 0 && missing === 0 ? 'PASS' : 'FAIL'}`);
}

run();
