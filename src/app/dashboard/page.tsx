"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { HighlightCard } from "@/components/Card";


const ConnectionStatus = ({ lastCreatedAt } : {lastCreatedAt : string}) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!lastCreatedAt) {
    return <div className="text-gray-400">Loading...</div>;
  }

  const sensorDate = new Date(lastCreatedAt.endsWith('Z') ? lastCreatedAt : lastCreatedAt + "Z");

  const isConnected = lastCreatedAt && (now.getTime() - sensorDate.getTime()) < 30000;
  console.log(isConnected)
  return (
    <>
    {isConnected &&<span className={`w-3 h-3 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />}
    <div className={isConnected ? "text-emerald-400" : "text-red-400"}>
       {isConnected ? "Connected" : "Not Connected"}
    </div>
    </>
  );
};

export default function Dashboard() {
  const [sensorLogs, setSensorLogs] = useState<any[]>([]);
  const supabase = createClient();



  // get current data
  const latestData = [
    {
      title : "Suhu Udara",
      data : sensorLogs[0]?.temperature || "--",
      unit: "°C"
    },
    {
      title : "Kelembapan Udara",
      data : sensorLogs[0]?.humidity || "--",
      unit: "%"
    },
    {
      title: "Kelembapan Tanah",
      data : (sensorLogs[0]?.moisture || sensorLogs[0]?.moisture === 0) ? sensorLogs[0]?.moisture : "--",
      unit:"%"
    }

  ]
  
  

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
    <div className="min-h-screen w-full text-white font-sans p-4 pt-20 md:pt-40 md:p-8 relative ">
      {/* Efek Cahaya Latar */}
      <div className="absolute hidden md:flex top-[-10%] left-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute hidden md:flex bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <div className="absolute hidden md:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <main className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Dashboard
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Data selalu real-time dengan integrasi{" "}
            <span className="text-blue-400">ESP32</span>,
            <span className="text-emerald-400"> Supabase</span>, dan{" "}
            <span className="text-white">Vercel</span>.
          </p>
        </section>

        {/* Highlight Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {
            latestData.map((item, index) => (
              <HighlightCard key={index}>
                <>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">
                    {item.title}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold text-blue-400 mt-2">
                    {item.data}{item.unit}
                  </h2>
                </>
              </HighlightCard>
            ))
          }

            <HighlightCard>
              <>
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Status Device
              </p>
              <div className="flex items-center gap-2 mt-4 text-xl md:3xl font-semibold text-emerald-400">
                <ConnectionStatus lastCreatedAt={sensorLogs[0]?.created_at} />
              </div>
              </>
            </HighlightCard>
          </div>

        {/* Table Section (Glassmorphism) */}
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-semibold">History Log</h3>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
              Total Logs : {sensorLogs.length} Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-nowrap text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm">
                  <th className="py-4 px-6 font-medium">No.</th>
                  <th className="py-4 px-6 font-medium">Device ID</th>
                  <th className="py-4 px-6 font-medium text-blue-400">
                    Temperature (°C)
                  </th>
                  <th className="py-4 px-6 font-medium text-blue-400">
                    Humidity (%)
                  </th>
                  <th className="py-4 px-6 font-medium text-blue-400">
                    Soil Moisture (%)
                  </th>
                  <th className="py-4 px-6 font-medium text-blue-400">
                    Pump
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
                    <td className="py-4 px-6 font-mono text-blue-400 font-bold text-lg">
                      {sensor.moisture}%
                    </td>
                     <td className="py-4 px-6 font-mono text-blue-400 font-bold text-lg">
                      {Number(sensor.pump) === 1 ? "ON" : "OFF"}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-400">
                      {new Date(sensor.created_at + "Z").toLocaleString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          day: "2-digit",
                          month: "short",
                          hour12: false,
                        },
                      )}
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
