# 🌡️ ThermoSync - Dashboard IoT Sederhana (Gaya Neobrutalism)

Sebuah dashboard pemantauan IoT sederhana dengan performa tinggi yang memvisualisasikan log data sensor secara real-time dari mikrokontroler **ESP32**. Dibangun menggunakan **Next.js**, **Supabase**, **pg (node-postgres)**, dan **node-pg-migrate** dengan estetika antarmuka **Neobrutalism** yang tebal dan kontras tinggi.

## 🚀 Fitur Utama

- **Desain Neobrutalism**: Tampilan visual premium dengan batas garis tebal (thick borders), bayangan datar (flat offset shadows), pilihan warna aksen yang dinamis, serta tipografi geometris (Space Grotesk & Space Mono).
- **Sinkronisasi Real-time**: Menggunakan Supabase Realtime (PostgreSQL Changes) untuk memperbarui tampilan dashboard secara instan begitu log data baru dikirim oleh ESP32.
- **Migrasi Relasional**: Skema tabel database dikelola menggunakan `node-pg-migrate` agar pelacakan dan perubahan struktur tabel terdokumentasi dengan rapi.
- **Koneksi Database Optimal**: Menggunakan *connection pool* (`pg.Pool`) dengan pola *singleton* untuk menangani query serta penyisipan (insert) data secara efisien.
- **Pemantauan Sederhana**: Fokus memantau parameter suhu (temperature) dan kelembapan udara (humidity) secara rapi.

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS v4, TypeScript, Google Fonts (Space Grotesk & Space Mono).
- **Database Access & ORM**: `pg` (node-postgres).
- **Migrasi**: `node-pg-migrate`.
- **Realtime Sync**: Supabase Realtime Client.
- **Hardware**: ESP32, Sensor Suhu & Kelembapan DHT22.

## 🔌 Rangkaian Hardware

- **VCC** -> 3.3V
- **GND** -> GND
- **Data** -> GPIO 15

## 🔧 Panduan Memulai

### 1. Konfigurasi Environment

Buat berkas `.env` di direktori utama (root) proyek dan isi variabel berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=https://id-proyek-anda.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=kunci-anon-supabase-anda
DATABASE_URL="postgresql://postgres.id-proyek-anda:[PASSWORD]@aws-1-[region].pooler.supabase.com:6543/postgres"
```

> [!IMPORTANT]
> Karena database Supabase menggunakan alamat IPv6-only untuk koneksi langsung (*direct connection*), sangat disarankan untuk menggunakan **Connection Pooler URL** (port 6543) di dalam `DATABASE_URL` Anda untuk mendukung koneksi dari jaringan yang hanya memiliki IPv4.

### 2. Jalankan Migrasi Database

Terapkan tabel `sensor_log` ke database PostgreSQL Anda:

```bash
pnpm migrate:up
```

### 3. Jalankan Server Pengembangan

Mulai server lokal Next.js:

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat dashboard.

---
Dibuat dengan ❤️ oleh **evanazhr**