"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import SideBarDataIcon from "@/common/utilComponents/SideBarDataIcon";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  const navItems = [
    { icon: <LayoutDashboard  />, label: "Dashboard", path: "/" },
    { icon: <SideBarDataIcon className="h-6 w-6 text-white" />, label: "Data Sources", path: "/data-sources" },
    { icon: <SideBarDataIcon className="h-6 w-6 text-white" />, label: "Content", path: "/content" },
    { icon: <User />, label: "Members", path: "/members" },
  ];

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("user");
    Cookies.remove("isLoggedIn");
    
    // Redirect to login page
    router.push("/auth/signin");
  };

  const pathName = usePathname();
  return pathName.startsWith("/auth/") ? null : (
    <div
      className={`inset-y-0 h-screen w-64 bg-[#22272F] text-white p-5 transition-transform duration-300 ease-in-out relative
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:block hidden`}
    >
      {/* Logo */}
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl mb-8 text-center">Shivam</h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-col space-y-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`flex items-center p-2 cursor-pointer transition-colors duration-300 rounded-lg ${
              pathName === item.path ? "text-primaryColor" : "hover:bg-gray-700"
            }`}
          >
            <span className={`${pathName === item.path ? "text-[#0F4ECC]" : ""}`}>{item.icon}</span>
            <span className={`ml-6 text-[14px] leading-[20px] tracking-normal ${pathName === item.path ? "text-[#0F4ECC]" : ""}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-700 my-4"></div>

      {/* Logout Button - Fixed at bottom */}
      <div className="absolute bottom-5 left-0 w-full px-5">
        <button
          onClick={handleLogout}
          className="flex items-center p-2 w-full cursor-pointer transition-colors duration-300 rounded-lg hover:bg-gray-700 text-red-400 hover:text-red-500"
        >
          <LogOut size={20} />
          <span className="ml-6 text-[14px] leading-[20px] tracking-normal">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
