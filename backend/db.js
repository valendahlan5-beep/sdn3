const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

function load(){ try { return JSON.parse(fs.readFileSync(DB_FILE,'utf8')); } catch(e){ return {}; } }
function save(data){ fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }

function ensure(col){ const data = load(); if(!data[col]) { data[col]=[]; save(data); } return data; }

module.exports = {
  all: (col) => { const d = load(); return d[col] || []; },
  get: (col, id) => { const d = load(); return (d[col]||[]).find(x=>x.id===id) || null; },
  insert: (col, obj) => { const d = load(); if(!d[col]) d[col]=[]; d[col].push(obj); save(d); return obj; },
  update: (col, id, patch) => { const d = load(); const arr = d[col]||[]; const idx = arr.findIndex(x=>x.id===id); if(idx<0) return null; arr[idx] = { ...arr[idx], ...patch }; save(d); return arr[idx]; },
  remove: (col, id) => { const d = load(); d[col] = (d[col]||[]).filter(x=>x.id!==id); save(d); return true; },
  findOne: (col, pred) => { const d = load(); return (d[col]||[]).find(pred) || null; },
  filter: (col, pred) => { const d = load(); return (d[col]||[]).filter(pred); },
  setSchool: (info) => { const d = load(); d.school = info; save(d); },
  getSchool: () => { const d = load(); return d.school || {}; },
};
