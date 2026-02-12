"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
  const [sensorLogs, setSensorLogs] = useState<any[]>([]);
  const supabase = createClient();

  // get current temp
  const latestTemp = sensorLogs[0]?.temperature || "--";
  const latestHumidity = sensorLogs[0]?.humidity || "--";

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/suhu");
        const result = await response.json();
        setSensorLogs(result);
      } catch (error) {
        console.error({ "Gagal ambil data": error });
      }
    };

    loadData();

    const channel = supabase
      .channel("perubahan-suhu")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sensor_log" },
        (payload) => {
          setSensorLogs((prev) => [payload.new, ...prev.slice(0, 19)]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen w-full text-white font-sans p-4 md:p-8 relative ">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <main className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Dashboard Suhu dan Kelembapan
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Data selalu real-time dengan integrasi{" "}
            <span className="text-blue-400">ESP32</span>,
            <span className="text-emerald-400"> Supabase</span>, dan{" "}
            <span className="text-white">Vercel</span>.
          </p>
        </section>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl">
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Suhu Saat Ini
            </p>
            <h2 className="text-5xl font-bold text-blue-400 mt-2">
              {latestTemp}°C
            </h2>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl">
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Kelembapan Saat Ini
            </p>
            <h2 className="text-5xl font-bold text-blue-400 mt-2">
              {latestHumidity}%
            </h2>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl">
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Status Device
            </p>
            <div className="flex items-center gap-2 mt-4 text-2xl font-semibold text-emerald-400">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              Connected
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl">
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Total Logs
            </p>
            <h2 className="text-4xl font-bold mt-2">
              {sensorLogs.length} Data
            </h2>
          </div>
        </div>

        {/* Table Section (Glassmorphism) */}
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold">History Log</h3>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              Real-time Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm">
                  <th className="py-4 px-6 font-medium">No.</th>
                  <th className="py-4 px-6 font-medium">Device ID</th>
                  <th className="py-4 px-6 font-medium text-blue-400">
                    Temperature (°C)
                  </th>
                  <th className="py-4 px-6 font-medium text-blue-400">
                    Humidity (°C)
                  </th>
                  <th className="py-4 px-6 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sensorLogs.map((sensor, index) => (
                  <tr
                    key={sensor.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                    <td className="py-4 px-6 font-medium">
                      {sensor.device_id}
                    </td>
                    <td className="py-4 px-6 font-mono text-blue-400 font-bold text-lg">
                      {sensor.temperature}°C
                    </td>
                    <td className="py-4 px-6 font-mono text-blue-400 font-bold text-lg">
                      {sensor.humidity}%
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-400">
                      {new Date(sensor.created_at).toLocaleString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
