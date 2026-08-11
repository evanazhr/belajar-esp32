export default function Footer() {
  return (
    <footer className="w-full border-t-4 border-border py-8 px-6 mt-12 bg-card text-card-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-heading font-extrabold text-lg">Aplikasi Pemantauan Thermosync</p>
        <p className="font-base text-sm">
          Dibuat oleh{" "}
          <a
            href="https://github.com/evanazhr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-extrabold hover:text-main transition-colors"
          >
            evanazhr
          </a>{" "}
          • 2026
        </p>
      </div>
    </footer>
  );
}
