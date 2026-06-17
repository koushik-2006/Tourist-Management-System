const fs = require('fs');
const path = require('path');
const https = require('https');

const states = [
    {state: "Andhra Pradesh", name: "Visakhapatnam Grand Hotel", q: "Visakhapatnam hotel"},
    {state: "Arunachal Pradesh", name: "Tawang Mountain Lodge", q: "Tawang scenery"},
    {state: "Assam", name: "Kaziranga Wildlife Resort", q: "Kaziranga National Park resort"},
    {state: "Bihar", name: "Bodh Gaya Heritage Inn", q: "Bodh Gaya temple"},
    {state: "Chhattisgarh", name: "Raipur City Hotel", q: "Raipur city"},
    {state: "Goa", name: "Coastal Luxury Stay", q: "Goa beach resort"},
    {state: "Gujarat", name: "Ahmedabad Luxury Stay", q: "Ahmedabad architecture"},
    {state: "Haryana", name: "Gurugram Business Hotel", q: "Gurugram skyline"},
    {state: "Himachal Pradesh", name: "Manali Mountain Resort", q: "Manali resort snowy"},
    {state: "Jharkhand", name: "Ranchi Nature Resort", q: "Ranchi nature"},
    {state: "Karnataka", name: "Mysore Palace Hotel", q: "Mysore Palace architecture"},
    {state: "Kerala", name: "Backwater Resort", q: "Kerala backwaters houseboat resort"},
    {state: "Madhya Pradesh", name: "Bhopal Lake View Hotel", q: "Bhopal upper lake"},
    {state: "Maharashtra", name: "Mumbai Luxury Hotel", q: "Taj Mahal Palace Hotel Mumbai"},
    {state: "Manipur", name: "Imphal Valley Stay", q: "Imphal valley"},
    {state: "Meghalaya", name: "Nature Valley Stay", q: "Shillong resort"},
    {state: "Mizoram", name: "Aizawl Hill View", q: "Aizawl city view"},
    {state: "Nagaland", name: "Kohima Heritage Hotel", q: "Kohima landscape"},
    {state: "Odisha", name: "Coastal Resort", q: "Puri beach resort"},
    {state: "Punjab", name: "Amritsar Heritage Hotel", q: "Amritsar architecture"},
    {state: "Rajasthan", name: "Jaipur Heritage Palace Hotel", q: "Rajasthan palace hotel"},
    {state: "Sikkim", name: "Mountain View Resort", q: "Gangtok mountain view"},
    {state: "Tamil Nadu", name: "Chennai Heritage Hotel", q: "Chennai luxury hotel"},
    {state: "Telangana", name: "Hyderabad Royal Suites", q: "Falaknuma Palace Hyderabad"},
    {state: "Tripura", name: "Agartala Palace Stay", q: "Ujjayanta Palace"},
    {state: "Uttar Pradesh", name: "Agra View Hotel", q: "Agra hotel"},
    {state: "Uttarakhand", name: "Himalayan Retreat", q: "Rishikesh luxury resort"},
    {state: "West Bengal", name: "Darjeeling Tea Resort", q: "Darjeeling tea estate resort"},
    {state: "Andaman & Nicobar", name: "Havelock Island Resort", q: "Havelock island resort"},
    {state: "Chandigarh", name: "Chandigarh Plaza Hotel", q: "Chandigarh architecture"},
    {state: "Daman & Diu", name: "Diu Sea View Hotel", q: "Diu beach"},
    {state: "Delhi", name: "New Delhi Capital Hotel", q: "New Delhi luxury hotel"},
    {state: "Jammu & Kashmir", name: "Srinagar Houseboat Stay", q: "Srinagar houseboat dal lake"},
    {state: "Ladakh", name: "Leh Valley Resort", q: "Leh landscape"},
    {state: "Lakshadweep", name: "Agatti Coral Resort", q: "Lakshadweep island"},
    {state: "Puducherry", name: "Pondicherry French Villa", q: "Pondicherry French quarter"}
];

function toSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const headers = { 'User-Agent': 'WanderlyApp/2.0 (contact@koushik.com)' };

function fetchJson(url) {
    return new Promise((resolve) => {
        https.get(url, { headers }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(body)); } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve) => {
        https.get(url, { headers }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return downloadImage(response.headers.location, dest).then(resolve);
            }
            if (response.statusCode !== 200) return resolve(false);
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => file.close(() => resolve(true)));
        }).on('error', () => resolve(false));
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    const hotelsData = [];
    
    for (const d of states) {
        const id = `${toSlug(d.state)}-${toSlug(d.name)}`;
        const dir = path.join(__dirname, 'frontend', 'images', 'hotels', id);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        console.log(`Fetching images for ${d.name}...`);
        
        let existingFiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
        
        if (existingFiles.length < 3) {
            const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(d.q)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
            const searchRes = await fetchJson(searchUrl);
            
            if (searchRes && searchRes.query && searchRes.query.pages) {
                const pages = Object.values(searchRes.query.pages);
                const jpgs = pages.filter(p => p.title.toLowerCase().endsWith('.jpg') || p.title.toLowerCase().endsWith('.jpeg')).slice(0, 3);
                
                let i = 1;
                for (const p of jpgs) {
                    if (p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl) {
                        const imgUrl = p.imageinfo[0].thumburl;
                        const dest = path.join(dir, `${i}.jpg`);
                        if (!fs.existsSync(dest)) {
                            console.log(`  Downloading ${i}.jpg`);
                            await downloadImage(imgUrl, dest);
                            await delay(1000);
                        }
                        i++;
                    }
                }
            }
            await delay(1500);
        }
        
        // Gather actual files on disk
        const filesOnDisk = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
        
        hotelsData.push({
            id: id,
            name: d.name,
            state: d.state,
            location: d.state, // or specific city if available
            rating: (4.0 + Math.random()).toFixed(1),
            stars: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
            price: Math.floor(Math.random() * 5000) + 1500,
            images: filesOnDisk.map(f => `./images/hotels/${id}/${f}`)
        });
    }
    
    fs.writeFileSync(path.join(__dirname, 'frontend', 'hotels_generated.json'), JSON.stringify(hotelsData, null, 2));
    console.log("Done generating hotels data!");
}

run();
