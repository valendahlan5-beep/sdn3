const DB = require('./db');
const bcrypt = require('bcryptjs');
const uid = (p='id') => p + '_' + Math.random().toString(36).slice(2,9) + Date.now().toString(36).slice(-4);
const today = () => new Date().toISOString().slice(0,10);

const users = [
  { id:'u_admin', username:'admin', password:bcrypt.hashSync('admin123',10), role:'admin', name:'Administrator Sekolah', email:'admin@sdn3cibodas.sch.id', phone:'085719402118', avatar:'AD', createdAt:new Date().toISOString() },
  { id:'u_guru1', username:'guru1', password:bcrypt.hashSync('password123',10), role:'guru', name:'Ibu Siti Aminah, S.Pd.', email:'siti@sdn3cibodas.sch.id', phone:'081234567890', avatar:'SA', createdAt:new Date().toISOString() },
  { id:'u_guru2', username:'guru2', password:bcrypt.hashSync('password123',10), role:'guru', name:'Bapak Andi Pratama, S.Pd.', email:'andi@sdn3cibodas.sch.id', phone:'081298765432', avatar:'AP', createdAt:new Date().toISOString() },
  { id:'u_murid1', username:'murid1', password:bcrypt.hashSync('password123',10), role:'murid', name:'Ahmad Fauzan', email:'ahmad@student.sdn3cibodas.sch.id', phone:'081311122233', avatar:'AF', nis:'2024001', classId:'cls_3a', createdAt:new Date().toISOString() },
  { id:'u_murid2', username:'murid2', password:bcrypt.hashSync('password123',10), role:'murid', name:'Nur Aisyah', email:'aisyah@student.sdn3cibodas.sch.id', phone:'081344455566', avatar:'NA', nis:'2024002', classId:'cls_3a', createdAt:new Date().toISOString() },
  { id:'u_murid3', username:'murid3', password:bcrypt.hashSync('password123',10), role:'murid', name:'Budi Santoso', email:'budi@student.sdn3cibodas.sch.id', phone:'081377788899', avatar:'BS', nis:'2024003', classId:'cls_4b', createdAt:new Date().toISOString() },
  { id:'u_ortu1', username:'ortu1', password:bcrypt.hashSync('password123',10), role:'ortu', name:'Bapak Fauzan (Ortu Ahmad)', email:'ortu.ahmad@gmail.com', phone:'085719402118', avatar:'BF', studentIds:['u_murid1'], createdAt:new Date().toISOString() },
  { id:'u_ortu2', username:'ortu2', password:bcrypt.hashSync('password123',10), role:'ortu', name:'Ibu Aisyah (Ortu Nur)', email:'ortu.aisyah@gmail.com', phone:'085711122233', avatar:'IA', studentIds:['u_murid2'], createdAt:new Date().toISOString() },
];
users.forEach(u=>DB.insert('users', u));

DB.insert('classes', { id:'cls_3a', name:'Kelas 3A', grade:3, teacherId:'u_guru1' });
DB.insert('classes', { id:'cls_4b', name:'Kelas 4B', grade:4, teacherId:'u_guru2' });
DB.insert('classes', { id:'cls_5c', name:'Kelas 5C', grade:5, teacherId:'u_guru1' });

['Matematika','IPA','Bahasa Indonesia','Bahasa Inggris','PKN','Seni Budaya'].forEach((n,i)=> DB.insert('subjects', { id:'sbj_'+i, name:n }));

DB.setSchool({ name:'SD Negeri Panunggangan 3 Cibodas', npsn:'20606564', status:'Negeri', bentuk:'SD', akreditasi:'A', jam:'Senin–Sabtu, 06.00–17.00 WIB', telepon:'085719402118', email:'sdnpantricibodas@gmail.com' });

console.log('Seed complete');
