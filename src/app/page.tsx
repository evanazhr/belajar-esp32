"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Metadata } from "next";

export const metada: Metadata = {
  title: "Aplikasi Sensor Suhu ESP32 Supabase & Vercel",
};
export default function Home() {
  const [logSuhu, setLogSuhu] = useState<any[]>([]);
  // Pindahkan client ke luar atau gunakan inisialisasi satu kali
  const supabase = createClient();

  useEffect(() => {
    // 1. Ambil data awal
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("log_suhu")
        .select()
        .order("created_at", { ascending: false })
        .limit(20); // Saran: kasih limit biar gak berat pas data udah ribuan

      if (error) console.error("Error fetch:", error);
      if (data) setLogSuhu(data);
    };

    fetchInitialData();

    // 2. Pasang Realtime
    const channel = supabase
      .channel("perubahan-suhu")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "log_suhu" },
        (payload) => {
          console.log("Data baru masuk dari ESP32!", payload.new);
          // Gunakan functional update biar aman dari race condition
          setLogSuhu((prev) => [payload.new, ...prev]);
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Sinyal Realtime Aktif!");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Kosongin dependency array biar cuma jalan sekali pas load

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col">
      <div className="max-w-[1200px] border-1 border-white/10 rounded-lg py-6 px-4 mx-auto w-[calc(100%-20px)]">
        <h1 className="text-lg md:text-xl uppercase text-center font-bold mb-6">
          Aplikasi pemantauan suhu dengan menggunakan sensor suhu, esp32,
          supabase dan vercel
        </h1>

        <div className="min-h-[500px] w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-2 px-4">No.</th>
                <th className="py-2 px-4">Device ID</th>
                <th className="py-2 px-4">Suhu (°C)</th>
                <th className="py-2 px-4">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {logSuhu?.map((suhu, index) => (
                <tr
                  key={suhu.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{suhu.device_id}</td>
                  <td className="py-2 px-4 font-mono text-blue-400">
                    {suhu.temperature}°C
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-400">
                    {new Date(suhu.created_at).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
