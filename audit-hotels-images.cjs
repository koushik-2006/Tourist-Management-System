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

    const jsonPath = path.join(__dirname, 'frontend', 'hotels_generated_v2.json');
    const places = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    let totalHotels = places.length;
    let totalImages = 0;
    let verified = 0;
    let failed = 0;
    
    for (const p of places) {
        totalImages += p.images.length;
        for (const imgPath of p.images) {
            const relativePath = imgPath.replace('./images/', '/images/');
            const fullUrl = `${DEV_SERVER_BASE}/frontend${relativePath}`;
            
            const ok = await verifyUrl(fullUrl);
            if (!ok) {
                console.error(`FAILED: ${fullUrl}`);
                failed++;
            } else {
                verified++;
            }
        }
    }
    
    console.log(`HOTEL IMAGE AUDIT`);
    console.log(`Hotels Found: ${totalHotels}`);
    console.log(`Images Found: ${totalImages}`);
    console.log(`URLs Verified: ${verified}`);
    console.log(`Failed: ${failed}`);
}

run();
