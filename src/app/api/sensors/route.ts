export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import { pool } from "@/lib/db";

const tokenCache = new LRUCache<string, number[]>({
  max: 500, // Maksimal 500 IP unik yang dilacak
  ttl: 60 * 1000, // Time to live: 60 detik
});

export async function POST(request: Request) {
  try {
    // Ambil IP Address pengirim buat jadi pengenal
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    
    // Cek jumlah request dari IP ini
    const tokenCount = (tokenCache.get(ip) as number[]) || [0];
    if (tokenCount[0] === 0) {
      tokenCache.set(ip, [1]);
    } else {
      tokenCount[0] += 1;
      tokenCache.set(ip, tokenCount);
    }

    // Batasan 20 request per menit
    if (tokenCount[0] > 20) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { device_id, temperature, humidity } = await request.json();

    const query = `
      INSERT INTO sensor_log (device_id, temperature, humidity)
      VALUES ($1, $2, $3)
    `;
    await pool.query(query, [device_id, temperature, humidity]);

    return NextResponse.json(
      { message: "Data tersimpan!" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
  } catch (error: any) {
    console.error("Database POST Error:", error);
    return NextResponse.json(
      { error: error?.message || String(error) || "Koneksi database gagal" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM sensor_log ORDER BY created_at DESC LIMIT 20"
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Database GET Error:", error);
    return NextResponse.json(
      { error: error?.message || String(error) || "Koneksi database gagal" },
      { status: 500 }
    );
  }
}
