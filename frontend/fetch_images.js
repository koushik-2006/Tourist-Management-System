const fs = require('fs');
const path = require('path');
const https = require('https');

const data = [
  {state: "Andhra Pradesh", name: "Tirumala Venkateswara Temple", loc: "Tirupati", cat: "Spiritual", featured: false, q: "Tirumala Venkateswara Temple"},
  {state: "Arunachal Pradesh", name: "Tawang Monastery", loc: "Tawang", cat: "Heritage", featured: false, q: "Tawang Monastery"},
  {state: "Assam", name: "Kaziranga National Park", loc: "Golaghat", cat: "Wildlife", featured: false, q: "Kaziranga National Park"},
  {state: "Bihar", name: "Mahabodhi Temple", loc: "Bodh Gaya", cat: "Spiritual", featured: false, q: "Mahabodhi Temple"},
  {state: "Chhattisgarh", name: "Chitrakoot Falls", loc: "Bastar", cat: "Nature", featured: false, q: "Chitrakoot Falls India"},
  {state: "Goa", name: "Goa Beaches", loc: "Panaji", cat: "Beach", featured: true, q: "Palolem Beach"},
  {state: "Gujarat", name: "Statue of Unity", loc: "Kevadia", cat: "Heritage", featured: false, q: "Statue of Unity"},
  {state: "Haryana", name: "Brahma Sarovar", loc: "Kurukshetra", cat: "Spiritual", featured: false, q: "Brahma Sarovar"},
  {state: "Himachal Pradesh", name: "Manali", loc: "Kullu", cat: "Adventure", featured: false, q: "Manali Himachal Pradesh"},
  {state: "Jharkhand", name: "Netarhat", loc: "Latehar", cat: "Nature", featured: false, q: "Netarhat Jharkhand"},
  {state: "Karnataka", name: "Hampi", loc: "Vijayanagara", cat: "Heritage", featured: false, q: "Hampi ruins"},
  {state: "Kerala", name: "Alleppey Backwaters", loc: "Alappuzha", cat: "Nature", featured: true, q: "Kerala backwaters Alleppey"},
  {state: "Madhya Pradesh", name: "Khajuraho Temples", loc: "Khajuraho", cat: "Heritage", featured: false, q: "Khajuraho Group of Monuments"},
  {state: "Maharashtra", name: "Ajanta-Ellora Caves", loc: "Aurangabad", cat: "Heritage", featured: false, q: "Ajanta Caves"},
  {state: "Manipur", name: "Loktak Lake", loc: "Moirang", cat: "Nature", featured: false, q: "Loktak Lake"},
  {state: "Meghalaya", name: "Living Root Bridges", loc: "Cherrapunji", cat: "Nature", featured: false, q: "Living root bridges Meghalaya"},
  {state: "Mizoram", name: "Reiek Tlang", loc: "Reiek", cat: "Adventure", featured: false, q: "Reiek Tlang Mizoram"},
  {state: "Nagaland", name: "Dzükou Valley", loc: "Kohima", cat: "Nature", featured: false, q: "Dzukou Valley"},
  {state: "Odisha", name: "Konark Sun Temple", loc: "Konark", cat: "Heritage", featured: false, q: "Konark Sun Temple"},
  {state: "Punjab", name: "Golden Temple", loc: "Amritsar", cat: "Spiritual", featured: true, q: "Harmandir Sahib Amritsar"},
  {state: "Rajasthan", name: "Hawa Mahal & Amber Fort", loc: "Jaipur", cat: "Heritage", featured: true, q: "Hawa Mahal Jaipur"},
  {state: "Sikkim", name: "Tsomgo Lake", loc: "Gangtok", cat: "Nature", featured: false, q: "Tsomgo Lake Sikkim"},
  {state: "Tamil Nadu", name: "Meenakshi Amman Temple", loc: "Madurai", cat: "Heritage", featured: false, q: "Meenakshi Amman Temple"},
  {state: "Telangana", name: "Charminar", loc: "Hyderabad", cat: "Heritage", featured: false, q: "Charminar Hyderabad"},
  {state: "Tripura", name: "Ujjayanta Palace", loc: "Agartala", cat: "Heritage", featured: false, q: "Ujjayanta Palace"},
  {state: "Uttar Pradesh", name: "Taj Mahal", loc: "Agra", cat: "Heritage", featured: true, q: "Taj Mahal Agra"},
  {state: "Uttarakhand", name: "Rishikesh", loc: "Rishikesh", cat: "Adventure", featured: false, q: "Rishikesh Ganges"},
  {state: "West Bengal", name: "Darjeeling Tea Gardens", loc: "Darjeeling", cat: "Nature", featured: false, q: "Darjeeling Tea Garden"},
  {state: "Andaman & Nicobar", name: "Radhanagar Beach", loc: "Havelock Island", cat: "Beach", featured: false, q: "Radhanagar Beach"},
  {state: "Chandigarh", name: "Rock Garden", loc: "Chandigarh", cat: "Heritage", featured: false, q: "Rock Garden of Chandigarh"},
  {state: "Daman & Diu", name: "Diu Fort", loc: "Diu", cat: "Heritage", featured: false, q: "Diu Fort"},
  {state: "Delhi", name: "Red Fort", loc: "New Delhi", cat: "Heritage", featured: false, q: "Red Fort Delhi"},
  {state: "Jammu & Kashmir", name: "Dal Lake", loc: "Srinagar", cat: "Nature", featured: false, q: "Dal Lake Srinagar"},
  {state: "Ladakh", name: "Pangong Lake", loc: "Leh", cat: "Adventure", featured: true, q: "Pangong Tso Ladakh"},
  {state: "Lakshadweep", name: "Agatti Island", loc: "Agatti", cat: "Beach", featured: false, q: "Agatti Island Lakshadweep"},
  {state: "Puducherry", name: "White Town", loc: "Puducherry", cat: "Heritage", featured: false, q: "Pondicherry French Quarter"}
];

function toSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'WanderlyBot/1.0' } }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'WanderlyBot/1.0' } }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    const finalPlaces = [];
    let placeId = 1;

    for (const d of data) {
        const id = `${toSlug(d.state)}-${toSlug(d.name)}`;
        const dir = path.join(__dirname, 'images', 'destinations', id);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const images = [];
        console.log(`Fetching for ${d.name}...`);
        
        try {
            // Search Wikimedia Commons
            const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(d.q)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
            const searchRes = await fetchJson(searchUrl);
            
            if (searchRes.query && searchRes.query.pages) {
                const pages = Object.values(searchRes.query.pages);
                // Filter out non-jpgs (to keep it clean)
                const jpgs = pages.filter(p => p.title.toLowerCase().endsWith('.jpg') || p.title.toLowerCase().endsWith('.jpeg')).slice(0, 5);
                
                let i = 1;
                for (const p of jpgs) {
                    if (p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl) {
                        const imgUrl = p.imageinfo[0].thumburl;
                        const dest = path.join(dir, `${i}.jpg`);
                        console.log(`  Downloading ${i}.jpg`);
                        await downloadImage(imgUrl, dest);
                        images.push(`/images/destinations/${id}/${i}.jpg`);
                        i++;
                    }
                }
            }
        } catch (e) {
            console.error(`Error fetching images for ${d.name}:`, e);
        }
        
        finalPlaces.push({
            id: placeId++,
            slugId: id, // Adding this so it matches the requested `id` type but keeps the numeric `id` for `onclick="openPlaceModal(1)"` backwards compatibility
            name: d.name,
            state: d.state,
            location: d.location || `${d.loc}, ${d.state}`,
            category: d.cat,
            rating: (Math.random() * (4.9 - 4.3) + 4.3).toFixed(1),
            price: d.featured ? '₹50' : 'Free',
            featured: d.featured,
            images: images,
            emoji: '🌍'
        });
    }

    fs.writeFileSync(path.join(__dirname, 'places_generated.json'), JSON.stringify(finalPlaces, null, 2));
    console.log("Done! Check places_generated.json");
}

run();
