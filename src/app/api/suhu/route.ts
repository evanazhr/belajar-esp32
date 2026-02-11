import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ini bakal muncul di terminal tempat lu jalanin 'npm run dev'
    console.log("=== DATA MASUK DARI ESP32 ===");
    console.log("Device ID:", body.device_id);
    console.log("Suhu     :", body.temperature, "°C");
    console.log("Waktu    :", new Date().toLocaleTimeString());
    console.log("=============================");

    return NextResponse.json(
      {
        status: "success",
        message: "Data ketangkep, Van!",
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error },
      { status: 400 },
    );
  }
}
