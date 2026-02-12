import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 relative ">
      {/* Efek Cahaya Latar */}
      <div className="absolute hidden md:flex top-[-10%] left-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute hidden md:flex bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <main className="text-center space-y-8 max-w-3xl">
        <div className="space-y-4">
          <h2 className="text-blue-400 font-mono tracking-widest uppercase text-sm">
            Fullstack IoT Project
          </h2>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Thermosync
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Realtime Monitoring
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Sistem pemantauan suhu real-time menggunakan sensor
            <span className="text-yellow-200"> DHT22</span> dan
            <span className="text-blue-400"> ESP32</span>. Dibangun dengan
            <span className="text-white"> NextJs</span>. dan
            <span className="text-emerald-400"> Supabase </span>
            sebagai databasenya untuk kemudahan akses dan performa maksimal. ,
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Launch Dashboard
          </Link>
          <a
            href="https://github.com/evanazhr/thermosync-iot-nextjs"
            target="_blank"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all"
          >
            View GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
