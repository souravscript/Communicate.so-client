"use client";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import logo from "@/../public/Shape.png";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName=usePathname()
  return pathName.startsWith('/auth/') ? null : (
    <div className="bg-card py-3 relative flex w-full items-center justify-between gap-[12rem] rounded-2xl mt-3">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2 pl-6">
        <Image src={logo} alt="logo" className="h-8 w-8" />
        <span className="font-inter font-bold text-primaryTextColor text-lg">
          Communicate.so
        </span>
      </div>

      {/* Middle Section - Search Input */}
      <div className="flex items-center flex-1 w-[25rem] bg-white border h-10 border-black border-opacity-15 rounded-lg px-3 py-1">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <Input
          type="text"
          placeholder="Type to search..."
          className="bg-transparent border-none w-full outline-none focus:outline-none focus-visible:ring-0 focus:border-transparent"
        />
      </div>



      {/* Right Section - Bell Icon */}
      <div className="flex items-center pr-6 ml-[8rem]">
        <Bell className="w-6 h-6 text-textSecondary cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
