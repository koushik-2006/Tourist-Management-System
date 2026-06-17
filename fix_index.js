const fs = require('fs');

const indexHtmlPath = 'frontend/index.html';
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Fix image paths
html = html.replace(/"\/images\/destinations\//g, '"./images/destinations/');

// Replace the fallback placeholder logic inside connectedCallback
const oldFallback = `this.innerHTML = \`<span style="font-size:4rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2">\${this.emoji}</span><div style="position:absolute;inset:0;background:\${this.bg};"></div>\`;`;
const newFallback = `this.innerHTML = \`<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(to bottom right, #334155, #0f172a);display:flex;align-items:center;justify-content:center;z-index:2;"><div style="text-align:center;padding:0 1rem;max-width:100%;"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" style="margin:0 auto 0.5rem;opacity:0.6;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><p style="color:rgba(255,255,255,0.7);font-size:0.875rem;font-weight:500;line-height:1.375;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;">\${this.altText}</p></div></div>\`;`;

html = html.replace(oldFallback, newFallback);

// Replace the onerror fallback span
const oldErrorSpan = `<span style="display:none;font-size:4rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;">\${this.emoji}</span>`;
const newErrorSpan = `<div style="display:none;position:absolute;inset:0;overflow:hidden;background:linear-gradient(to bottom right, #334155, #0f172a);align-items:center;justify-content:center;z-index:2;"><div style="text-align:center;padding:0 1rem;max-width:100%;"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" style="margin:0 auto 0.5rem;opacity:0.6;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><p style="color:rgba(255,255,255,0.7);font-size:0.875rem;font-weight:500;line-height:1.375;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;">\${this.altText}</p></div></div>`;

html = html.replace(oldErrorSpan, newErrorSpan);

// Also need to change the onerror logic to display flex instead of block for the new error div
html = html.replace(/this\.nextElementSibling\.style\.display='block';/g, "this.nextElementSibling.style.display='flex';");

fs.writeFileSync(indexHtmlPath, html);
console.log('Fixed paths and placeholder in index.html');
