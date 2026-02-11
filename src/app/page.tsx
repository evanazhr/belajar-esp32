export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col">
      <div className="max-w-[1200px] border-1 border-white/10 rounded-lg py-6 px-4 mx-auto w-[calc(100%-20px)]">
        <h1 className="text-3xl uppercase text-center font-bold">
          Aplikasi pemantauan suhu dengan menggunakan sensor suhu, esp32,
          supabase dan vercel
        </h1>
        <div className="flex items-center justify-center my-6">
          <button className="bg-blue-500 py-2 px-6 rounded-md text-xl uppercase hover:bg-blue-500/90 cursor-pointer ">
            dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
