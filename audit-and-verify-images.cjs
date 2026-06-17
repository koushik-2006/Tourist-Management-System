const fs = require('fs');
const path = require('path');
const http = require('http');

const IMAGES_ROOT = path.join(__dirname, 'frontend', 'images', 'destinations');
const URL_PREFIX = '/frontend/images/destinations';
const DEV_SERVER_BASE = 'http://localhost:3000';

async function verifyUrl(url) {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            resolve(res.statusCode === 200);
        }).on('error', () => {
            resolve(false);
        });
    });
}

async function run() {
    console.log('--- PART A: Ground Truth from Disk ---');
    if (!fs.existsSync(IMAGES_ROOT)) {
        console.error('IMAGES_ROOT not found:', IMAGES_ROOT);
        return;
    }

    const destFolders = fs.readdirSync(IMAGES_ROOT).filter(f => fs.statSync(path.join(IMAGES_ROOT, f)).isDirectory());
    
    const diskData = {};
    for (const folder of destFolders) {
        const files = fs.readdirSync(path.join(IMAGES_ROOT, folder)).filter(f => f.endsWith('.jpg'));
        diskData[folder] = files.sort();
        console.log(`[${folder}] found: ${files.join(', ') || 'NONE'}`);
    }

    console.log('\n--- UPDATE JSON DATA ---');
    const jsonPath = path.join(__dirname, 'frontend', 'places_generated.json');
    const places = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    let updatedCount = 0;
    for (const p of places) {
        if (diskData[p.slugId]) {
            p.images = diskData[p.slugId].map(f => `./images/destinations/${p.slugId}/${f}`);
            updatedCount++;
        } else {
            p.images = [];
        }
    }
    
    fs.writeFileSync(jsonPath, JSON.stringify(places, null, 2));
    console.log(`Updated images arrays for ${updatedCount} places in places_generated.json`);
    
    // Also run replace_places.js to inject it into index.html
    const replaceScript = path.join(__dirname, 'frontend', 'replace_places.js');
    if (fs.existsSync(replaceScript)) {
        require('child_process').execSync(`node "${replaceScript}"`, { cwd: path.join(__dirname, 'frontend') });
        console.log('Ran replace_places.js to update index.html');
    }

    console.log('\n--- PART B: Verify via Dev Server ---');
    let total = 0;
    let failed = 0;
    
    for (const p of places) {
        for (const imgPath of p.images) {
            total++;
            // convert ./images/destinations/... to /frontend/images/destinations/...
            const relativePath = imgPath.replace('./images/', '/images/');
            const fullUrl = `${DEV_SERVER_BASE}/frontend${relativePath}`;
            
            const ok = await verifyUrl(fullUrl);
            if (!ok) {
                console.error(`FAILED: ${fullUrl}`);
                failed++;
            }
        }
    }
    
    console.log(`\nRESULT: ${total - failed}/${total} image URLs verified 200 OK, ${failed} failures.`);
}

run();
