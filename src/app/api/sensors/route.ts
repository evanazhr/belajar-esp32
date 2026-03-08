export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { LRUCache } from "lru-cache";

const tokenCache = new LRUCache({
  max: 500, // Maksimal 500 IP unik yang dilacak
  ttl: 60 * 1000, // Time to live: 60 detik
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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

    const { device_id, temperature, humidity, moisture, pump } = await request.json();

    const { error } = await supabase
      .from("sensor_log")
      .insert([{ device_id, temperature, humidity, moisture, pump }]);

    if (error) throw error;

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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { data, error } = await supabase
    .from("sensor_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
