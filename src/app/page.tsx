import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Rocket, Cpu, Layers, Database } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 md:py-32 relative overflow-hidden bg-background text-foreground">
      {/* Background Grid Pattern (Neobrutalist theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] z-0 pointer-events-none" />
      
      <main className="max-w-4xl w-full space-y-12 relative z-10">
        {/* Hero Section Card */}
        <Card className="p-8 md:p-12 bg-card text-card-foreground">
          <div className="text-center space-y-6">
            <span className="inline-block px-4 py-1.5 text-xs md:text-sm font-extrabold uppercase tracking-wider bg-main text-main-foreground border-2 border-border rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              🌱 Proyek IoT Sederhana
            </span>
            
            <h1 className="text-4xl md:text-7xl font-heading font-extrabold leading-tight text-foreground">
              Thermosync
              <br />
              <span className="underline decoration-main decoration-wavy decoration-3 md:decoration-6">
                Pemantauan Realtime
              </span>
            </h1>
            
            <p className="text-foreground/80 text-lg md:text-xl font-base max-w-2xl mx-auto leading-relaxed">
              Proyek IoT sederhana untuk memantau suhu dan kelembapan udara secara real-time menggunakan sensor{" "}
              <span className="bg-main/30 px-1.5 py-0.5 border border-border rounded-sm font-bold font-mono">DHT22</span> dan{" "}
              <span className="bg-main/30 px-1.5 py-0.5 border border-border rounded-sm font-bold font-mono">ESP32</span>. Dibuat sebagai prototype pembelajaran dengan{" "}
              <span className="font-extrabold">Next.js</span> dan{" "}
              <span className="bg-main/30 px-1.5 py-0.5 border border-border rounded-sm font-bold font-mono">Supabase</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base font-extrabold font-heading">
                  Buka Dashboard
                  <Rocket className="size-5" />
                </Button>
              </Link>
              <a
                href="https://github.com/evanazhr/thermosync-iot-nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="neutral" className="w-full sm:w-auto text-base font-extrabold font-heading">
                  Lihat GitHub
                  <FaGithub className="size-5" />
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#A6FAFF] dark:bg-[#1E3A5F] text-black dark:text-white">
            <CardHeader className="pb-2">
              <div className="p-3 bg-white dark:bg-black w-fit border-2 border-border rounded-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                <Cpu className="size-6 text-black dark:text-white" />
              </div>
              <CardTitle className="text-xl font-heading font-extrabold mt-4">ESP32 & DHT22</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-black/80 dark:text-white/80 font-base text-sm">
                Integrasi hardware IoT yang andal untuk membaca suhu dan kelembapan secara periodik.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-[#FF9E9E] dark:bg-[#5C1E1E] text-black dark:text-white">
            <CardHeader className="pb-2">
              <div className="p-3 bg-white dark:bg-black w-fit border-2 border-border rounded-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                <Layers className="size-6 text-black dark:text-white" />
              </div>
              <CardTitle className="text-xl font-heading font-extrabold mt-4">Next.js 16</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-black/80 dark:text-white/80 font-base text-sm">
                Frontend modern dengan kecepatan rendering server-side dan visual interface yang premium.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-[#B9FFB3] dark:bg-[#1E5F2A] text-black dark:text-white">
            <CardHeader className="pb-2">
              <div className="p-3 bg-white dark:bg-black w-fit border-2 border-border rounded-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                <Database className="size-6 text-black dark:text-white" />
              </div>
              <CardTitle className="text-xl font-heading font-extrabold mt-4">Supabase Realtime</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-black/80 dark:text-white/80 font-base text-sm">
                Penyimpanan data log sensor dengan sinkronisasi langsung menggunakan postgres changes channel.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
