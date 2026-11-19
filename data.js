const STORAGE_PREFIX = 'sp_';
function ls(key){ try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX+key) || 'null'); } catch(e){ return null; } }
function ss(key, val){ localStorage.setItem(STORAGE_PREFIX+key, JSON.stringify(val)); }
function uid(prefix='id'){ return prefix + '_' + Math.random().toString(36).slice(2,9) + Date.now().toString(36).slice(-4); }
function today(){ return new Date().toISOString().slice(0,10); }
function fmtDate(d){ if(!d) return '-'; const dt=new Date(d); return dt.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}); }
function fmtMoney(n){ return 'Rp ' + Number(n||0).toLocaleString('id-ID'); }

const SCHOOL = {
  name: 'SD Negeri Panunggangan 3 Cibodas',
  npsn: '20606564',
  status: 'Negeri',
  jenjang: 'Sekolah Dasar (SD)',
  bentuk: 'SD',
  akreditasi: 'A',
  jam: 'Senin–Sabtu, 06.00–17.00 WIB',
  alamat: 'Jl. Gunung Sari No.4 RT.02/08, Kec. Cibodas, Kota Tangerang, Prov. Banten',
  alamatLengkap: 'Jl. Gunung Sari No.4 RT.02/08, Kecamatan Cibodas, Kota Tangerang, Provinsi Banten',
  telepon: '085719402118',
  email: 'sdnpantricibodas@gmail.com',
  website: 'Belum Terisi',
  yayasan: '—',
  kurikulum: 'Kurikulum SD Merdeka',
  penyelenggaraan: 'Double Shift / 6 hari',
  semesterData: '2026/2027 Gasal',
  aksesInternet: 'Broadband',
  sumberListrik: 'PLN',
  dayaListrik: '11.000 VA',
  luasTanah: '600 m²',
  lintang: '-6.2226',
  bujur: '106.6266',
  guru: 15, siswaLaki: 142, siswaPerempuan: 135, siswaTotal: 277, rombel: 12,
  siswaPerTingkat: [ {tingkat:1,jumlah:39},{tingkat:2,jumlah:56},{tingkat:3,jumlah:41},{tingkat:4,jumlah:41},{tingkat:5,jumlah:64},{tingkat:6,jumlah:36} ],
  ruangKelas: 6, laboratorium: 0, perpustakaan: 1,
  rasioSiswaRombel: 24, rasioSiswaGuru: 19,
  persenGuruKualifikasi: '100%', persenGuruSertifikasi: '86,67%', persenGuruPNS: '100%',
  ig: 'SDN Panunggangan 3 Cibodas',
  logo: 'SP3'
};

const SEED = {
  users: [
    { id:'u_admin', username:'admin', password:'admin123', role:'admin', name:'Administrator Sekolah', email:'admin@sdn3cibodas.sch.id', phone:'085719402118', avatar:'AD' },
    { id:'u_guru1', username:'guru1', password:'password123', role:'guru', name:'Ibu Siti Aminah, S.Pd.', email:'siti@sdn3cibodas.sch.id', phone:'081234567890', avatar:'SA' },
    { id:'u_guru2', username:'guru2', password:'password123', role:'guru', name:'Bapak Andi Pratama, S.Pd.', email:'andi@sdn3cibodas.sch.id', phone:'081298765432', avatar:'AP' },
    { id:'u_murid1', username:'murid1', password:'password123', role:'murid', name:'Ahmad Fauzan', email:'ahmad@student.sdn3cibodas.sch.id', phone:'081311122233', avatar:'AF', nis:'2024001', classId:'cls_3a' },
    { id:'u_murid2', username:'murid2', password:'password123', role:'murid', name:'Nur Aisyah', email:'aisyah@student.sdn3cibodas.sch.id', phone:'081344455566', avatar:'NA', nis:'2024002', classId:'cls_3a' },
    { id:'u_murid3', username:'murid3', password:'password123', role:'murid', name:'Budi Santoso', email:'budi@student.sdn3cibodas.sch.id', phone:'081377788899', avatar:'BS', nis:'2024003', classId:'cls_4b' },
    { id:'u_ortu1', username:'ortu1', password:'password123', role:'ortu', name:'Bapak Fauzan (Ortu Ahmad)', email:'ortu.ahmad@gmail.com', phone:'085719402118', avatar:'BF', studentIds:['u_murid1'] },
    { id:'u_ortu2', username:'ortu2', password:'password123', role:'ortu', name:'Ibu Aisyah (Ortu Nur)', email:'ortu.aisyah@gmail.com', phone:'085711122233', avatar:'IA', studentIds:['u_murid2'] },
  ],
  classes: [
    { id:'cls_3a', name:'Kelas 3A', grade:3, teacherId:'u_guru1' },
    { id:'cls_4b', name:'Kelas 4B', grade:4, teacherId:'u_guru2' },
    { id:'cls_5c', name:'Kelas 5C', grade:5, teacherId:'u_guru1' },
  ],
  subjects: [
    { id:'sbj_mtk', name:'Matematika' }, { id:'sbj_ipa', name:'IPA' },
    { id:'sbj_bhs', name:'Bahasa Indonesia' }, { id:'sbj_ing', name:'Bahasa Inggris' },
    { id:'sbj_pkn', name:'PKN' }, { id:'sbj_sbd', name:'Seni Budaya' },
  ],
  schedule: [
    { id:'sch1', classId:'cls_3a', day:'Senin', time:'07:00-08:30', subjectId:'sbj_mtk', teacherId:'u_guru1' },
    { id:'sch2', classId:'cls_3a', day:'Senin', time:'08:45-10:15', subjectId:'sbj_bhs', teacherId:'u_guru1' },
    { id:'sch3', classId:'cls_3a', day:'Selasa', time:'07:00-08:30', subjectId:'sbj_ipa', teacherId:'u_guru2' },
    { id:'sch4', classId:'cls_3a', day:'Rabu', time:'07:00-08:30', subjectId:'sbj_ing', teacherId:'u_guru2' },
    { id:'sch5', classId:'cls_3a', day:'Kamis', time:'07:00-08:30', subjectId:'sbj_pkn', teacherId:'u_guru1' },
    { id:'sch6', classId:'cls_4b', day:'Senin', time:'07:00-08:30', subjectId:'sbj_mtk', teacherId:'u_guru2' },
    { id:'sch7', classId:'cls_4b', day:'Selasa', time:'07:00-08:30', subjectId:'sbj_ipa', teacherId:'u_guru2' },
  ],
  assignments: [
    { id:'asg1', title:'Latihan Soal Penjumlahan', description:'Kerjakan halaman 24-26 buku matematika. Kumpulkan foto hasil kerja.', classId:'cls_3a', subjectId:'sbj_mtk', teacherId:'u_guru1', dueDate: new Date(Date.now()+3*86400000).toISOString().slice(0,10), createdAt: today() },
    { id:'asg2', title:'Mengamati Tumbuhan', description:'Ambil foto satu tumbuhan di sekitar rumah dan tulis 3 ciri-cirinya.', classId:'cls_3a', subjectId:'sbj_ipa', teacherId:'u_guru2', dueDate: new Date(Date.now()+5*86400000).toISOString().slice(0,10), createdAt: today() },
  ],
  submissions: [],
  grades: [
    { id:'g1', studentId:'u_murid1', subjectId:'sbj_mtk', type:'UTS', score:85, semester:1, year:'2025/2026', teacherId:'u_guru1', date: today() },
    { id:'g2', studentId:'u_murid1', subjectId:'sbj_bhs', type:'UTS', score:90, semester:1, year:'2025/2026', teacherId:'u_guru1', date: today() },
    { id:'g3', studentId:'u_murid1', subjectId:'sbj_ipa', type:'UTS', score:88, semester:1, year:'2025/2026', teacherId:'u_guru2', date: today() },
    { id:'g4', studentId:'u_murid2', subjectId:'sbj_mtk', type:'UTS', score:78, semester:1, year:'2025/2026', teacherId:'u_guru1', date: today() },
  ],
  attendance: [
    { id:'att1', studentId:'u_murid1', classId:'cls_3a', date: today(), status:'Hadir', note:'' },
    { id:'att2', studentId:'u_murid2', classId:'cls_3a', date: today(), status:'Hadir', note:'' },
  ],
  announcements: [
    { id:'ann1', title:'Selamat Datang di Portal Sekolah', content:'Portal ini digunakan untuk komunikasi antara guru, murid, dan orang tua. Silakan login dengan akun masing-masing.', audience:'all', authorId:'u_guru1', createdAt: new Date().toISOString(), pinned:true },
    { id:'ann2', title:'Libur Nasional', content:'Sekolah libur pada tanggal 10 November 2026 (Hari Pahlawan).', audience:'all', authorId:'u_guru1', createdAt: new Date(Date.now()-86400000).toISOString(), pinned:false },
  ],
  materials: [
    { id:'mat1', title:'Pengenalan Penjumlahan', subjectId:'sbj_mtk', classId:'cls_3a', teacherId:'u_guru1', type:'link', url:'https://example.com/materi-mtk', createdAt: today() },
    { id:'mat2', title:'Ciri-ciri Makhluk Hidup', subjectId:'sbj_ipa', classId:'cls_3a', teacherId:'u_guru2', type:'text', content:'Makhluk hidup memiliki ciri: bernapas, tumbuh, berkembang biak, bergerak, dan membutuhkan makanan.', createdAt: today() },
  ],
  events: [
    { id:'ev1', title:'Ujian Tengah Semester', date: new Date(Date.now()+7*86400000).toISOString().slice(0,10), type:'akademik', description:'UTS Ganjil 2025/2026' },
    { id:'ev2', title:'Hari Guru', date: new Date(Date.now()+14*86400000).toISOString().slice(0,10), type:'acara', description:'Perayaan Hari Guru Nasional' },
    { id:'ev3', title:'Pembagian Rapor', date: new Date(Date.now()+30*86400000).toISOString().slice(0,10), type:'akademik', description:'Rapor Semester Ganjil' },
  ],
  messages: [],
  gallery: [
    { id:'gal1', url:'https://placehold.co/400x300/3b82f6/ffffff?text=Kegiatan+Belajar', caption:'Kegiatan belajar di kelas 3A', createdAt: today() },
    { id:'gal2', url:'https://placehold.co/400x300/f59e0b/ffffff?text=Upacara+Bendera', caption:'Upacara bendera Senin', createdAt: today() },
    { id:'gal3', url:'https://placehold.co/400x300/10b981/ffffff?text=Lomba+Seni', caption:'Lomba seni antar kelas', createdAt: today() },
  ],
  extracurriculars: [
    { id:'ex1', name:'Pramuka', schedule:'Sabtu 09:00-11:00', coach:'Bapak Andi', quota:30, members:['u_murid1'] },
    { id:'ex2', name:'Seni Tari', schedule:'Jumat 13:00-15:00', coach:'Ibu Siti', quota:20, members:[] },
    { id:'ex3', name:'Futsal', schedule:'Rabu 15:00-17:00', coach:'Bapak Andi', quota:25, members:['u_murid2'] },
  ],
  library: [
    { id:'bk1', title:'Matematika Kelas 3', author:'Kemendikbud', category:'Pelajaran', stock:5, borrowed:1 },
    { id:'bk2', title:'Cerita Rakyat Nusantara', author:'Tim Penulis', category:'Cerita', stock:3, borrowed:0 },
    { id:'bk3', title:'Ensiklopedia Sains Anak', author:'Sains Kids', category:'Sains', stock:2, borrowed:0 },
  ],
  loans: [],
  payments: [
    { id:'pay1', studentId:'u_murid1', title:'SPP Januari 2026', amount:150000, dueDate:'2026-01-10', status:'Lunas', paidAt:'2026-01-05' },
    { id:'pay2', studentId:'u_murid1', title:'SPP Februari 2026', amount:150000, dueDate:'2026-02-10', status:'Belum Lunas', paidAt:null },
    { id:'pay3', studentId:'u_murid2', title:'SPP Januari 2026', amount:150000, dueDate:'2026-01-10', status:'Lunas', paidAt:'2026-01-08' },
  ],
  ppdb: [],
  notifications: [
    { id:'nt1', userId:'all', title:'Selamat Datang', content:'Selamat datang di Portal Sekolah premium.', createdAt: new Date().toISOString(), read:false },
  ],
  exams: [
    { id:'exm1', title:'Ujian Tengah Semester Ganjil', classId:'cls_3a', subjectId:'sbj_mtk', date: new Date(Date.now()+10*86400000).toISOString().slice(0,10), time:'07:00-09:00', room:'Ruang 1' },
  ],
  settings: { theme:'light', schoolName: SCHOOL.name },
};

// db/dbSet are cache-aware (backend or localStorage)
window.__cache = window.__cache || {};
window.__apiMode = window.__apiMode || false;
function db(key){ if(window.__apiMode && window.__cache[key] !== undefined) return window.__cache[key]; return ls(key) || (SEED[key] || []); }
function dbSet(key, val){ if(window.__apiMode){ window.__cache[key] = val; fetch((window.API_BASE||'http://localhost:3000')+'/api/'+key, { method:'PUT', headers:{'Content-Type':'application/json','Authorization':'Bearer '+(localStorage.getItem('sp_token')||'')}, body: JSON.stringify(val) }).catch(e=>console.warn('sync failed',e)); } else { ss(key, val); } }
function schoolInfo(){ const s = window.__apiMode ? (window.__cache.school || {}) : (ls('school') || SCHOOL); if(!s || !s.name){ return SCHOOL; } if(!s.siswaPerTingkat){ s.siswaPerTingkat = SCHOOL.siswaPerTingkat; s.siswaTotal = SCHOOL.siswaTotal; } return s; }

// (removed duplicate)
function findById(arr, id){ return (arr||[]).find(x=>x.id===id); }
function findUser(id){ return (db('users')).find(u=>u.id===id); }
function className(id){ const c = findById(db('classes'), id); return c?c.name:'-'; }
function subjectName(id){ const s = findById(db('subjects'), id); return s?s.name:'-'; }
function userName(id){ const u = findUser(id); return u?u.name:'-'; }
function studentsInClass(classId){ return db('users').filter(u=>u.role==='murid' && u.classId===classId); }
function childrenOf(parentId){ const u = findUser(parentId); if(!u) return []; return (u.studentIds||[]).map(id=>findUser(id)).filter(Boolean); }
// (removed duplicate)
function roleLabel(r){ return r==='admin'?'Admin': r==='guru'?'Guru': r==='murid'?'Murid':'Orang Tua'; }
function unreadNotifCount(uid){ return db('notifications').filter(n=>(n.userId===uid||n.userId==='all') && !n.read).length; }
