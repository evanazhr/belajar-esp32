"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const ConnectionStatus = ({ lastCreatedAt }: { lastCreatedAt: string }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!lastCreatedAt) {
    return <div className="text-black/60 dark:text-white/60">Memuat...</div>;
  }

  const sensorDate = new Date(lastCreatedAt.endsWith('Z') ? lastCreatedAt : lastCreatedAt + "Z");

  const isConnected = lastCreatedAt && (now.getTime() - sensorDate.getTime()) < 30000;
  
  return (
    <>
      <span className={`w-4 h-4 rounded-full border-2 border-black dark:border-white ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
      <div className={isConnected ? "text-emerald-600 dark:text-emerald-300 font-extrabold" : "text-red-600 dark:text-red-300 font-extrabold"}>
        {isConnected ? "Terhubung" : "Terputus"}
      </div>
    </>
  );
};

export default function Dashboard() {
  const [sensorLogs, setSensorLogs] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supabase = createClient();

  const latestData = [
    {
      title: "Suhu Udara",
      data: sensorLogs[0]?.temperature || "--",
      unit: "°C",
      color: "bg-[#FF8B8B] dark:bg-[#6b2c2c] text-black dark:text-white"
    },
    {
      title: "Kelembapan Udara",
      data: sensorLogs[0]?.humidity || "--",
      unit: "%",
      color: "bg-[#A6FAFF] dark:bg-[#1e5c5e] text-black dark:text-white"
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/sensors");
        const result = await response.json();
        if (Array.isArray(result)) {
          setSensorLogs(result);
          setErrorMsg(null);
        } else {
          console.error("Gagal ambil data sensor, data tidak valid:", result);
          setSensorLogs([]);
          const err = result?.error || result?.message || (result && Object.keys(result).length > 0 ? JSON.stringify(result) : null);
          setErrorMsg(err && err !== "{}" ? err : "Koneksi database gagal atau tabel belum terbuat. Pastikan DATABASE_URL di file .env sudah terisi.");
        }
      } catch (error: any) {
        console.error({ "Gagal ambil data": error });
        setErrorMsg(error?.message || "Gagal menghubungkan ke server API.");
      }
    };

    loadData();

    const channel = supabase
      .channel("perubahan-suhu")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sensor_log" },
        (payload) => {
          setSensorLogs((prev) => {
            const arr = Array.isArray(prev) ? prev : [];
            return [payload.new, ...arr.slice(0, 19)];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans p-4 pt-28 md:pt-40 md:p-8 relative overflow-hidden">
      {/* Background Grid Pattern (Neobrutalist theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] z-0 pointer-events-none" />

      <main className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-6 bg-card text-card-foreground p-8 border-2 border-border rounded-base shadow-shadow">
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight">
            Dashboard
          </h1>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto font-base leading-relaxed">
            Dashboard sederhana untuk memantau data suhu dan kelembapan udara secara real-time dari modul{" "}
            <span className="bg-main/30 px-1.5 py-0.5 border border-border rounded-sm font-bold font-mono">ESP32</span> Anda.
          </p>
        </section>

        {/* Error Notification */}
        {errorMsg && (
          <Card className="bg-[#FF9E9E] dark:bg-[#5C1E1E] text-black dark:text-white border-2 border-border shadow-shadow p-6">
            <CardContent className="p-0 flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div className="space-y-1">
                <h4 className="font-heading font-extrabold text-lg">Koneksi Database Gagal</h4>
                <p className="font-base text-sm opacity-90">{errorMsg}</p>
                <p className="font-base text-xs opacity-75 pt-1">
                  Harap pastikan <code className="bg-white/30 dark:bg-black/30 px-1 py-0.5 rounded font-mono">DATABASE_URL</code> di file <code className="bg-white/30 dark:bg-black/30 px-1 py-0.5 rounded font-mono">.env</code> sudah terisi dengan benar (termasuk password database Supabase) dan migrasi database sudah dijalankan dengan perintah <code className="bg-white/30 dark:bg-black/30 px-1 py-0.5 rounded font-mono">pnpm migrate:up</code>.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestData.map((item, index) => (
            <Card key={index} className={`${item.color} border-2 border-border shadow-shadow`}>
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="text-xs uppercase tracking-wider font-extrabold opacity-75">
                  {item.title}
                </p>
                <h2 className="text-4xl md:text-5xl font-heading font-black mt-3 flex items-baseline">
                  {item.data}
                  <span className="text-2xl font-bold ml-1">{item.unit}</span>
                </h2>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-[#FFEEAD] dark:bg-[#5c531e] text-black dark:text-white border-2 border-border shadow-shadow">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <p className="text-xs uppercase tracking-wider font-extrabold opacity-75">
                Status Perangkat
              </p>
              <div className="flex items-center gap-2 mt-4 text-2xl font-black">
                <ConnectionStatus lastCreatedAt={sensorLogs[0]?.created_at} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Section */}
        <Card className="bg-card text-card-foreground p-0 overflow-hidden border-2 border-border shadow-shadow">
          <div className="p-6 border-b-2 border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-main text-main-foreground">
            <div>
              <h3 className="text-2xl font-heading font-black">Riwayat Log</h3>
              <p className="text-sm font-base opacity-80 mt-1">Data log sensor yang tersinkronisasi secara real-time.</p>
            </div>
            <span className="px-4 py-1.5 bg-card text-card-foreground border-2 border-border rounded-full text-sm font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              Total Log: {sensorLogs.length} Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary-background text-foreground hover:bg-secondary-background">
                  <TableHead className="py-4 px-6 font-extrabold w-16 text-foreground">No.</TableHead>
                  <TableHead className="py-4 px-6 font-extrabold text-foreground">Nama Perangkat</TableHead>
                  <TableHead className="py-4 px-6 font-extrabold text-foreground">Suhu (°C)</TableHead>
                  <TableHead className="py-4 px-6 font-extrabold text-foreground">Kelembapan (%)</TableHead>
                  <TableHead className="py-4 px-6 font-extrabold text-foreground">Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensorLogs.map((sensor, index) => (
                  <TableRow
                    key={sensor.id}
                    className="bg-card text-foreground hover:bg-secondary-background/30 transition-colors"
                  >
                    <TableCell className="py-4 px-6 font-base text-foreground/70">{index + 1}</TableCell>
                    <TableCell className="py-4 px-6 font-extrabold text-foreground">
                      {sensor.device_id}
                    </TableCell>
                    <TableCell className="py-4 px-6 font-mono font-black text-lg text-foreground">
                      {sensor.temperature}°C
                    </TableCell>
                    <TableCell className="py-4 px-6 font-mono font-black text-lg text-foreground">
                      {sensor.humidity}%
                    </TableCell>
                    <TableCell className="py-4 px-6 text-sm text-foreground/80 font-base">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
}
