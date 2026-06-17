const fs = require('fs');
const path = require('path');
const https = require('https');

const data = [
  {state: "Andhra Pradesh", name: "Tirumala Venkateswara Temple", q: "Tirumala Venkateswara Temple"},
  {state: "Arunachal Pradesh", name: "Tawang Monastery", q: "Tawang Monastery"},
  {state: "Assam", name: "Kaziranga National Park", q: "Kaziranga National Park"},
  {state: "Bihar", name: "Mahabodhi Temple", q: "Mahabodhi Temple"},
  {state: "Chhattisgarh", name: "Chitrakoot Falls", q: "Chitrakoot Falls India"},
  {state: "Goa", name: "Goa Beaches", q: "Palolem Beach"},
  {state: "Gujarat", name: "Statue of Unity", q: "Statue of Unity"},
  {state: "Haryana", name: "Brahma Sarovar", q: "Brahma Sarovar"},
  {state: "Himachal Pradesh", name: "Manali", q: "Manali Himachal Pradesh"},
  {state: "Jharkhand", name: "Netarhat", q: "Netarhat Jharkhand"},
  {state: "Karnataka", name: "Hampi", q: "Hampi ruins"},
  {state: "Kerala", name: "Alleppey Backwaters", q: "Kerala backwaters Alleppey"},
  {state: "Madhya Pradesh", name: "Khajuraho Temples", q: "Khajuraho Group of Monuments"},
  {state: "Maharashtra", name: "Ajanta-Ellora Caves", q: "Ajanta Caves"},
  {state: "Manipur", name: "Loktak Lake", q: "Loktak Lake"},
  {state: "Meghalaya", name: "Living Root Bridges", q: "Living root bridges Meghalaya"},
  {state: "Mizoram", name: "Reiek Tlang", q: "Reiek Tlang Mizoram"},
  {state: "Nagaland", name: "Dzükou Valley", q: "Dzukou Valley"},
  {state: "Odisha", name: "Konark Sun Temple", q: "Konark Sun Temple"},
  {state: "Punjab", name: "Golden Temple", q: "Harmandir Sahib Amritsar"},
  {state: "Rajasthan", name: "Hawa Mahal & Amber Fort", q: "Hawa Mahal Jaipur"},
  {state: "Sikkim", name: "Tsomgo Lake", q: "Tsomgo Lake Sikkim"},
  {state: "Tamil Nadu", name: "Meenakshi Amman Temple", q: "Meenakshi Amman Temple"},
  {state: "Telangana", name: "Charminar", q: "Charminar Hyderabad"},
  {state: "Tripura", name: "Ujjayanta Palace", q: "Ujjayanta Palace"},
  {state: "Uttar Pradesh", name: "Taj Mahal", q: "Taj Mahal Agra"},
  {state: "Uttarakhand", name: "Rishikesh", q: "Rishikesh Ganges"},
  {state: "West Bengal", name: "Darjeeling Tea Gardens", q: "Darjeeling Tea Garden"},
  {state: "Andaman & Nicobar", name: "Radhanagar Beach", q: "Radhanagar Beach"},
  {state: "Chandigarh", name: "Rock Garden", q: "Rock Garden of Chandigarh"},
  {state: "Daman & Diu", name: "Diu Fort", q: "Diu Fort"},
  {state: "Delhi", name: "Red Fort", q: "Red Fort Delhi"},
  {state: "Jammu & Kashmir", name: "Dal Lake", q: "Dal Lake Srinagar"},
  {state: "Ladakh", name: "Pangong Lake", q: "Pangong Tso Ladakh"},
  {state: "Lakshadweep", name: "Agatti Island", q: "Agatti Island Lakshadweep"},
  {state: "Puducherry", name: "White Town", q: "Pondicherry French Quarter"}
];

function toSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const headers = {
    'User-Agent': 'WanderlyApp/1.0 (contact@koushik.com)'
};

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return resolve(false);
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(true));
            });
        }).on('error', (err) => {
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            resolve(false);
        });
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    for (const d of data) {
        const id = `${toSlug(d.state)}-${toSlug(d.name)}`;
        const dir = path.join(__dirname, 'frontend', 'images', 'destinations', id);
        
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        let existingFiles = 0;
        if (fs.existsSync(dir)) {
            existingFiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).length;
        }

        if (existingFiles >= 3) {
            console.log(`Skipping ${d.name}, already has ${existingFiles} images.`);
            continue;
        }

        console.log(`Fetching missing images for ${d.name}...`);
        try {
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
                            await delay(1000); // 1 sec delay to avoid rate limiting
                        }
                        i++;
                    }
                }
            }
        } catch (e) {
            console.error(`Error for ${d.name}:`, e.message);
        }
        await delay(2000);
    }
    console.log("Done fetching.");
}

run();
