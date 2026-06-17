const fs = require('fs');
const path = require('path');
const https = require('https');

const foodsRaw = [
    { state: "andhra-pradesh", name: "Andhra Meals" },
    { state: "andhra-pradesh", name: "Gongura Rice" },
    { state: "andhra-pradesh", name: "Pulihora" },
    { state: "andhra-pradesh", name: "Pesarattu" },
    { state: "andhra-pradesh", name: "Bobbatlu" },
    { state: "arunachal-pradesh", name: "Thukpa" },
    { state: "arunachal-pradesh", name: "Momos" },
    { state: "arunachal-pradesh", name: "Zan" },
    { state: "arunachal-pradesh", name: "Bamboo Shoot Curry" },
    { state: "assam", name: "Assam Thali" },
    { state: "assam", name: "Masor Tenga" },
    { state: "assam", name: "Pitha" },
    { state: "assam", name: "Khar" },
    { state: "bihar", name: "Litti Chokha" },
    { state: "bihar", name: "Sattu Paratha" },
    { state: "bihar", name: "Thekua" },
    { state: "chhattisgarh", name: "Chila" },
    { state: "chhattisgarh", name: "Faraa" },
    { state: "chhattisgarh", name: "Bafauri" },
    { state: "goa", name: "Fish Curry Rice" },
    { state: "goa", name: "Bebinca" },
    { state: "goa", name: "Prawn Curry" },
    { state: "goa", name: "Vindaloo" },
    { state: "gujarat", name: "Dhokla" },
    { state: "gujarat", name: "Fafda" },
    { state: "gujarat", name: "Khandvi" },
    { state: "gujarat", name: "Undhiyu" },
    { state: "haryana", name: "Bajra Roti" },
    { state: "haryana", name: "Kadhi" },
    { state: "haryana", name: "Lassi" },
    { state: "himachal-pradesh", name: "Dham" },
    { state: "himachal-pradesh", name: "Siddu" },
    { state: "himachal-pradesh", name: "Momos" },
    { state: "jharkhand", name: "Dhuska" },
    { state: "jharkhand", name: "Rugra" },
    { state: "jharkhand", name: "Thekua" },
    { state: "karnataka", name: "Mysore Masala Dosa" },
    { state: "karnataka", name: "Bisi Bele Bath" },
    { state: "karnataka", name: "Ragi Mudde" },
    { state: "karnataka", name: "Neer Dosa" },
    { state: "kerala", name: "Kerala Sadya" },
    { state: "kerala", name: "Appam" },
    { state: "kerala", name: "Puttu" },
    { state: "kerala", name: "Fish Curry" },
    { state: "kerala", name: "Beef Roast" },
    { state: "madhya-pradesh", name: "Poha" },
    { state: "madhya-pradesh", name: "Bhutte Ka Kees" },
    { state: "madhya-pradesh", name: "Dal Bafla" },
    { state: "maharashtra", name: "Vada Pav" },
    { state: "maharashtra", name: "Misal Pav" },
    { state: "maharashtra", name: "Pav Bhaji" },
    { state: "maharashtra", name: "Puran Poli" },
    { state: "maharashtra", name: "Bhel Puri" },
    { state: "maharashtra", name: "Panipuri" },
    { state: "manipur", name: "Eromba" },
    { state: "manipur", name: "Singju" },
    { state: "meghalaya", name: "Jadoh" },
    { state: "meghalaya", name: "Dohneiihong" },
    { state: "mizoram", name: "Bai" },
    { state: "mizoram", name: "Vawksa Rep" },
    { state: "nagaland", name: "Smoked Pork" },
    { state: "nagaland", name: "Axone Curry" },
    { state: "odisha", name: "Dalma" },
    { state: "odisha", name: "Pakhala Bhata" },
    { state: "odisha", name: "Chhena Poda" },
    { state: "punjab", name: "Butter Chicken" },
    { state: "punjab", name: "Amritsari Kulcha" },
    { state: "punjab", name: "Sarson Saag" },
    { state: "rajasthan", name: "Dal Baati Churma" },
    { state: "rajasthan", name: "Ghewar" },
    { state: "rajasthan", name: "Laal Maas" },
    { state: "sikkim", name: "Momos" },
    { state: "sikkim", name: "Thukpa" },
    { state: "tamil-nadu", name: "Dosa" },
    { state: "tamil-nadu", name: "Idli" },
    { state: "tamil-nadu", name: "Pongal" },
    { state: "tamil-nadu", name: "Chettinad Chicken" },
    { state: "tamil-nadu", name: "Filter Coffee" },
    { state: "telangana", name: "Hyderabadi Biryani" },
    { state: "telangana", name: "Haleem" },
    { state: "tripura", name: "Mui Borok" },
    { state: "tripura", name: "Bamboo Shoot Curry" },
    { state: "uttar-pradesh", name: "Awadhi Biryani" },
    { state: "uttar-pradesh", name: "Tunday Kabab" },
    { state: "uttar-pradesh", name: "Petha" },
    { state: "uttarakhand", name: "Kafuli" },
    { state: "uttarakhand", name: "Aloo Ke Gutke" },
    { state: "west-bengal", name: "Rasgulla" },
    { state: "west-bengal", name: "Fish Curry" },
    { state: "west-bengal", name: "Mishti Doi" },
    { state: "west-bengal", name: "Sandesh" },
    { state: "delhi", name: "Chole Bhature" },
    { state: "delhi", name: "Paratha" },
    { state: "delhi", name: "Kebabs" },
    { state: "delhi", name: "Butter Chicken" },
    { state: "delhi", name: "Dal Makhani" },
    { state: "jammu-kashmir", name: "Rogan Josh" },
    { state: "jammu-kashmir", name: "Kahwa" },
    { state: "ladakh", name: "Skyu" },
    { state: "ladakh", name: "Thukpa" },
    { state: "puducherry", name: "French Indian Cuisine" },
    { state: "puducherry", name: "Seafood" },
    { state: "andaman", name: "Seafood Platter" },
    { state: "lakshadweep", name: "Tuna Curry" }
];

function toSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const headers = { 'User-Agent': 'WanderlyApp/Foods (contact@koushik.com)' };

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
    const foodsData = [];
    
    // Process serially with a tiny delay to avoid hitting limits
    for (let i = 0; i < foodsRaw.length; i++) {
        const d = foodsRaw[i];
        const foodSlug = toSlug(d.name);
        const dir = path.join(__dirname, 'frontend', 'images', 'foods', d.state, foodSlug);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        let existingFiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
        
        if (existingFiles.length < 3) {
            console.log(`Fetching: ${d.name}`);
            const searchUrl = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=" + encodeURIComponent(d.name + ' food') + "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json";
            const searchRes = await fetchJson(searchUrl);
            
            if (searchRes && searchRes.query && searchRes.query.pages) {
                const pages = Object.values(searchRes.query.pages);
                const jpgs = pages.filter(p => p.title.toLowerCase().endsWith('.jpg') || p.title.toLowerCase().endsWith('.jpeg')).slice(0, 3);
                
                let idx = 1;
                for (const p of jpgs) {
                    if (p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl) {
                        const imgUrl = p.imageinfo[0].thumburl;
                        const dest = path.join(dir, `${idx}.jpg`);
                        if (!fs.existsSync(dest)) {
                            await downloadImage(imgUrl, dest);
                        }
                        idx++;
                    }
                }
            }
            
            existingFiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
            
            // Pad to exactly 3 images
            if (existingFiles.length > 0 && existingFiles.length < 3) {
                let j = existingFiles.length + 1;
                while (j <= 3) {
                    const src = existingFiles[(j - 1) % existingFiles.length];
                    fs.copyFileSync(path.join(dir, src), path.join(dir, `${j}.jpg`));
                    j++;
                }
            } else if (existingFiles.length === 0) {
                // Universal fallback image to guarantee 3 images
                const destDir = path.join(__dirname, 'frontend', 'images', 'destinations', 'kerala-alleppey-backwaters');
                if (fs.existsSync(path.join(destDir, '1.jpg'))) {
                    for(let k=1; k<=3; k++){
                        fs.copyFileSync(path.join(destDir, '1.jpg'), path.join(dir, `${k}.jpg`));
                    }
                }
            }
            await delay(200); // Wait 200ms between foods to be safe
        }
        
        const filesOnDisk = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
        
        foodsData.push({
            id: foodSlug,
            name: d.name,
            state: d.state.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            restaurant: "Local Restaurant",
            category: "Regional Cuisine",
            rating: (4.0 + Math.random()).toFixed(1),
            price: Math.floor(Math.random() * 400) + 100,
            images: filesOnDisk.map(f => `/frontend/images/foods/${d.state}/${foodSlug}/${f}`)
        });
    }
    
    fs.writeFileSync(path.join(__dirname, 'frontend', 'foods_generated.json'), JSON.stringify(foodsData, null, 2));
    console.log("Done generating 100+ perfectly padded 3-image foods data!");
}

run();
