 "use client";

import StatSection from "@/common/components/StatSection";
import { Stat } from "@/constants/types";
import MemberList from "@/features/Members/MembersList";
import { Layers, Link, MessageCircle, Users } from "lucide-react";

const dummyStats: Stat[] = [
  {
      title: "Average Weekly Users",
      value: 90,
      icon: <Link className="text-blue-500" size={32} />
  },
  {
      title: "Total Members",
      value: 9000,
      icon: <MessageCircle className="text-blue-500" size={32} />
  },
  {
      title: "Average time spent",
      value: "15 minutes",
      icon: <Layers className="text-blue-500" size={32} />
  },
  {
      title: "Active Monthly Users",
      value: 400,
      icon: <Users className="text-blue-500" size={32} />
  },
];

// const dummyMembers: Member[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     category: "Admin",
//     createdAt: new Date().toLocaleDateString(),
//     lastLogin: new Date().toLocaleDateString()
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     category: "User",
//     createdAt: new Date().toLocaleDateString(),
//     lastLogin: new Date().toLocaleDateString()
//   }
// ];

// const dummyCategories: Category[] = [
//   { id: "1", name: "Admin" },
//   { id: "2", name: "User" },
//   { id: "3", name: "Moderator" }
// ];

export default function Home() {
  return (
    <>
    <div className="flex h-full w-full">
      <div className="flex flex-col p-4 gap-2 items-center w-full basis-2/3 max-w-5xl">
        <div className="relative left-10"><StatSection stats={dummyStats} statTitle="Members" /></div>
        <MemberList/>
      </div>
    </div>
    </>
  );
}