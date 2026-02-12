export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// initialization Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient(supabaseUrl, supabasePublishableKey);

export async function POST(request: Request) {
  try {
    const { device_id, temperature, humidity } = await request.json();

    // inser data to sensor_log table
    const { data, error } = await supabase
      .from("sensor_log")
      .insert([{ device_id, temperature, humidity }]);

    if (error) throw error;

    return NextResponse.json(
      { message: "Data tersimpan di Supabase!" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, ngrok-skip-browser-warning",
        },
      },
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
