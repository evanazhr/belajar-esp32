import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Background Grid Pattern (Neobrutalist theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] z-0 pointer-events-none" />

      <div className="text-center p-8 border-2 border-border bg-card text-card-foreground rounded-base shadow-shadow max-w-sm w-full mx-4">
        <h1 className="text-3xl font-heading font-black mb-4 text-destructive">
          404 Halaman Tidak Ditemukan
        </h1>
        <p className="font-base text-foreground/80 mb-6">Halaman yang Anda cari tidak dapat ditemukan.</p>
        <Link href={"/"}>
          <Button variant="default" className="w-full font-heading font-extrabold">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}
