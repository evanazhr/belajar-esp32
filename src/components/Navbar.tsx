"use client";
import Link from "next/link";
import { CloudSync, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const closeMenu = () => setIsActive(false);

  const NavItems = [
    {
      name: "Home",
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
          className="fixed inset-0 bg-white/2 backdrop-blur-sm z-10 top-0 left-0 min-h-screen md:hidden"
          onClick={closeMenu}
        />
      )}
      <div className="flex flex-col md:flex-row relative border-1 gap-6 md:gap-12 border-white/5 z-20 rounded-xl px-4 py-4 md:w-fit w-full mx-auto bg-white/5 gap-2 backdrop-blur-md shadow-md shadow-white/10 md:items-center justify-between">
        <div
          className={`${isActive ? "border-b-1 pb-4 border-white/5 md:border-none md:pb-0 md:border-none" : ""}`}
        >
          <Link href={"/"}>
            <span className="flex flex-row gap-2">
              <CloudSync />
              <p className="font-bold text-xl">Thermosync</p>
            </span>
          </Link>
        </div>
        <div
          className={`${isActive ? "flex" : "hidden md:flex"} md:flex-row duration-500 transition-all md:items-center items-start flex-col md:justify-center gap-2`}
        >
          {NavItems.map((item, index) => {
            return (
              <Link href={item.href} key={index} className="w-full md:w-fit">
                <button
                  className={`${pathname === item.href ? "border-white/20 min-w-[80px] border bg-white/5 shadow-white" : ""} w-full md:w-fit text-white/60 duration-500 hover:bg-white/10 hover:backdrop-blur-md rounded-xl font-bold hover:border hover:border-white/5 hover:shadow-white/5 inset cursor-pointer hover:shadow-xl px-6 py-2 text-base `}
                >
                  {item.name}
                </button>
              </Link>
            );
          })}
        </div>
        <div className="absolute  right-4">
          <button
            className="md:hidden flex cursor-pointer"
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <Menu />
          </button>
        </div>
      </div>
    </>
  );
}
