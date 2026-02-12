import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl md:text-3xl mb-2 text-red-500 font-bold">
          404 Not Found
        </h1>
        <p>Halaman tidak ditemukan.</p>
        <Link href={"/"}>
          <button className="my-4 py-2 bg-white/5 rounded-full px-6 border backdrop-blur-xl border-white/10 shadow-xl cursor-pointer font-bold ">
            Kembali ke Home
          </button>
        </Link>
      </div>
    </div>
  );
}
