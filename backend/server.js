const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const DB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'sp3-secret-change-me';
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));
const FRONTEND_DIR = process.env.FRONTEND_DIR || path.join(__dirname, '..');
app.use(express.static(FRONTEND_DIR));

const uid = (p='id') => p + '_' + Math.random().toString(36).slice(2,9) + Date.now().toString(36).slice(-4);

function authMiddleware(req,res,next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({error:'No token'});
  const token = h.replace('Bearer ','');
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch(e){ res.status(401).json({error:'Invalid token'}); }
}
function requireRole(...roles){ return (req,res,next)=> roles.includes(req.user.role) ? next() : res.status(403).json({error:'Forbidden'}); }

// Auth
app.post('/api/auth/login', (req,res)=>{
  const { username, password } = req.body;
  const user = DB.findOne('users', u=>u.username===username);
  if(!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({error:'Invalid credentials'});
  const token = jwt.sign({ id:user.id, role:user.role, username:user.username }, JWT_SECRET, {expiresIn:'7d'});
  const { password:_, ...safe } = user;
  res.json({ token, user: safe });
});
app.post('/api/auth/register', (req,res)=>{
  const { username, password, name, role, email, phone } = req.body;
  if(DB.findOne('users', u=>u.username===username)) return res.status(400).json({error:'Username exists'});
  const id = uid('u');
  const user = { id, username, password: bcrypt.hashSync(password||'password123',10), role: role||'murid', name, email, phone, avatar: (name||'').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(), createdAt: new Date().toISOString() };
  DB.insert('users', user);
  const token = jwt.sign({ id, role: user.role, username }, JWT_SECRET, {expiresIn:'7d'});
  const { password:__, ...safe } = user;
  res.json({ token, user: safe });
});

// Generic CRUD
function crud(route, col, prefix, jsonFields=[]){
  app.get(`/api/${route}`, authMiddleware, (req,res)=> res.json(DB.all(col)));
  app.get(`/api/${route}/:id`, authMiddleware, (req,res)=>{ const r = DB.get(col, req.params.id); if(!r) return res.status(404).json({error:'Not found'}); res.json(r); });
  app.post(`/api/${route}`, authMiddleware, (req,res)=>{ const obj = { ...req.body, id: uid(prefix) }; DB.insert(col, obj); res.json(obj); });
  app.put(`/api/${route}/:id`, authMiddleware, (req,res)=>{ const r = DB.update(col, req.params.id, req.body); res.json(r); });
  app.delete(`/api/${route}/:id`, authMiddleware, (req,res)=>{ DB.remove(col, req.params.id); res.json({success:true}); });
}
['classes','subjects','schedule','exams','attendance','grades','assignments','submissions','materials','extracurriculars','library','loans','payments','ppdb','announcements','messages','events','gallery','notifications'].forEach(c=>{
  const prefix = c.slice(0,3);
  crud(c, c, prefix);
});

// users special
app.get('/api/users', authMiddleware, (req,res)=>{
  const users = DB.all('users').map(({password,...u})=>u);
  res.json(users);
});
app.post('/api/users', authMiddleware, requireRole('admin'), (req,res)=>{
  const { username, password, role, name, email, phone, nis, classId, studentIds } = req.body;
  if(DB.findOne('users', u=>u.username===username)) return res.status(400).json({error:'Username exists'});
  const user = { id: uid('u'), username, password: bcrypt.hashSync(password||'password123',10), role: role||'murid', name, email, phone, avatar: (name||'').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(), nis, classId, studentIds: studentIds||[], createdAt: new Date().toISOString() };
  DB.insert('users', user);
  const { password:_, ...safe } = user;
  res.json(safe);
});
app.delete('/api/users/:id', authMiddleware, requireRole('admin'), (req,res)=>{ DB.remove('users', req.params.id); res.json({success:true}); });

// school
app.get('/api/school', (req,res)=> res.json(DB.getSchool()));
app.put('/api/school', authMiddleware, requireRole('admin'), (req,res)=>{ DB.setSchool(req.body); res.json(req.body); });

// upload
const storage = multer.diskStorage({ destination: (req,file,cb)=>cb(null, UPLOAD_DIR), filename: (req,file,cb)=>cb(null, Date.now()+'-'+file.originalname) });
const upload = multer({ storage, limits: { fileSize: 5*1024*1024 } });
app.post('/api/upload', authMiddleware, upload.single('file'), (req,res)=> res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename }));

// bulk replace collection
app.put('/api/:col', authMiddleware, (req,res)=>{
  const col = req.params.col;
  const allowed = ['users','classes','subjects','schedule','exams','attendance','grades','assignments','submissions','materials','extracurriculars','library','loans','payments','ppdb','announcements','messages','events','gallery','notifications'];
  if(!allowed.includes(col)) return res.status(400).json({error:'Unknown collection'});
  // if users, hash passwords for new/changed
  if(col==='users'){
    req.body.forEach(u=>{ if(u.password && !u.password.startsWith('$2')) u.password = bcrypt.hashSync(u.password,10); });
  }
  // school handled separately
  const data = JSON.parse(JSON.stringify(req.body));
  // store in db.json under collection key
  const all = require('./db');
  // replace whole collection
  const fs = require('fs'); const path = require('path');
  const DB_FILE = path.join(__dirname,'db.json');
  const db = JSON.parse(fs.readFileSync(DB_FILE,'utf8'));
  db[col] = data;
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  res.json({ success: true, count: data.length });
});
app.get('/api/health', (req,res)=> res.json({ status:'ok', time: new Date().toISOString() }));

app.listen(PORT, ()=> console.log(`Portal backend running on http://localhost:${PORT}`));
