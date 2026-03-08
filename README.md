# 🌡️ ThermoSync IoT Dashboard

A high-performance, full-stack IoT monitoring system that bridges the gap between hardware and the web. This project demonstrates a real-time data pipeline from an **ESP32** microcontroller to a **Next.js** dashboard via **Supabase**.



## 🚀 Key Features

- **Real-time Synchronization**: Uses Supabase Realtime (WebSockets) to update the UI instantly without page refreshes.
- **Glassmorphism UI**: A modern, sleek dashboard built with Tailwind CSS and Framer Motion.
- **Hybrid Data Fetching**: Optimized performance using Next.js Route Handlers for initial data hydration.
- **Robust Hardware Integration**: ESP32 firmware with auto-reconnect logic and sensor error handling (DHT22).
- **Secure Architecture**: Row Level Security (RLS) enabled on the database to prevent unauthorized access.

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS, TypeScript.
- **Backend**: Next.js Route Handlers (API).
- **Database**: Supabase (PostgreSQL + Realtime).
- **Hardware**: ESP32, DHT22 Temperature & Humidity Sensor.
- **Deployment**: Vercel.

## 🔌 Hardware Circuit (Tested on Wokwi)

- **VCC** -> 3.3V
- **GND** -> GND
- **Data** -> GPIO 15

## 📖 How it Works

1. **The ESP32** reads temperature data from the DHT22 sensor every 10 seconds.
2. **Data Transmission**: The ESP32 sends a JSON payload via a `POST` request to the Next.js API Route.
3. **Database Storage**: The API Route validates the data and inserts it into Supabase.
4. **Instant Update**: The Next.js dashboard, which is "listening" to database changes via a Realtime Channel, updates the UI immediately as soon as a new row is inserted.

---
Built with ❤️ by **Evan**