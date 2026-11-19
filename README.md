# Portal Sekolah — SD Negeri Panunggangan 3 Cibodas (Siap Jual)

## Struktur
- Frontend: `index.html`, `styles.css`, `data.js`, `app.js`, `portal-lengkap.html` (single-file)
- Backend: folder `backend/` (Node.js + Express + JSON file DB)
- PWA: `manifest.json`, `sw.js`, ikon
- Native: `capacitor.config.json`, `package.json`

## Menjalankan Frontend (Demo / Offline)
- Buka `portal-lengkap.html` (double-click), atau
- `python -m http.server 8080` → `http://localhost:8080/index.html`

## Menjalankan Backend (Produksi)
```bash
cd backend
npm install
node seed.js          # isi data awal
node server.js        # API di http://localhost:3000
```
Frontend akan otomatis mendeteksi backend (health check) dan memakai API + JWT auth. Jika backend tidak tersedia, fallback ke localStorage (mode demo).

## Akun Demo (backend)
- Admin: `admin` / `admin123`
- Guru: `guru1`, `guru2` / `password123`
- Murid: `murid1`, `murid2`, `murid3` / `password123`
- Orang Tua: `ortu1`, `ortu2` / `password123`

## Deploy Produksi
- Backend: deploy ke VPS/Render/Railway/Heroku. Set env `PORT`, `JWT_SECRET`.
- Ganti JSON file DB dengan PostgreSQL/MySQL untuk skala besar (skema di server.js).
- Frontend: deploy ke Netlify/Vercel/GitHub Pages; set `API_BASE` (window.API_BASE) ke URL backend.
- Aktifkan HTTPS (wajib untuk PWA install & service worker).

## Fitur
Dashboard per peran, profil sekolah (data Kemendikdasmen), manajemen pengguna/kelas/mapel, jadwal pelajaran & ujian, absensi + rekap, nilai & rapor cetak, tugas online, materi, ekstrakurikuler, perpustakaan, SPP, PPDB online, pengumuman, pesan, notifikasi, kalender, galeri, pengaturan, tema gelap/terang, ekspor CSV, pencarian, PWA install, native build (Capacitor).

## Reset Data
- Frontend: Pengaturan → Reset Semua Data.
- Backend: hapus `backend/db.json` lalu `node seed.js`.

## Deploy dengan GitHub

### Render.com (gratis, satu klik)
1. Buat repo GitHub baru, push semua file folder ini.
2. Di Render → New → Web Service → pilih repo (auto-detect `render.yaml`).
3. Set env `JWT_SECRET` (atau biarkan auto-generate).
4. Klik "Create Web Service". Render build Docker image & deploy.
5. URL publik: `https://portal-sdn-panunggangan-3.onrender.com`

### GitHub Actions → GHCR
1. Push tag `v1.0.0` → workflow `docker.yml` build & push image ke `ghcr.io/<user>/sdn-panunggangan-portal:latest`.
2. Deploy image ke VPS: `docker pull ghcr.io/<user>/sdn-panunggangan-portal:latest && docker run -d -p 3000:3000 -e JWT_SECRET=... ghcr.io/...`

### Langkah push ke GitHub
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```
