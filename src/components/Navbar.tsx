"use client";
import Link from "next/link";
import { CloudSync, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const closeMenu = () => setIsActive(false);

  const NavItems = [
    {
      name: "Beranda",
      href: "/",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
    },
  ];
  return (
    <>
      {isActive && (
        <div
          className="fixed inset-0 bg-background/40 backdrop-blur-xs z-20 top-0 left-0 min-h-screen md:hidden"
          onClick={closeMenu}
        />
      )}
      <div className="fixed w-full top-4 z-30">
        <div className="flex left-0 flex-col md:flex-row relative border-2 border-border z-20 rounded-base px-4 md:px-8 w-[calc(100vw-32px)] py-4 mx-4 md:w-fit mx-auto bg-card text-card-foreground gap-4 shadow-shadow md:items-center justify-between">
          <div
            className={`${isActive ? "border-b-2 pb-4 border-border md:border-none md:pb-0" : ""} flex items-center justify-between`}
          >
            <Link href={"/"}>
              <span className="flex flex-row gap-2 items-center text-foreground hover:opacity-85 transition-opacity">
                <CloudSync className="size-6 text-foreground" />
                <p className="font-heading font-extrabold text-2xl tracking-tight">Thermosync</p>
              </span>
            </Link>
          </div>
          <div
            className={`${isActive ? "flex mt-2" : "hidden md:flex"} md:flex-row duration-500 transition-all md:items-center items-stretch flex-col md:justify-center gap-3`}
          >
            {NavItems.map((item, index) => {
              return (
                <Link href={item.href} key={index} className="w-full md:w-fit" onClick={closeMenu}>
                  <Button
                    variant={pathname === item.href ? "default" : "neutral"}
                    className="w-full md:w-fit font-bold font-heading"
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="absolute right-4 top-4 md:hidden">
            <button
              className="flex cursor-pointer p-1.5 border-2 border-border bg-main text-main-foreground rounded-base shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
