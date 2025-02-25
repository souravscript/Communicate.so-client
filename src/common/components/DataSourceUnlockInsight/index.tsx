import React from "react";
import { Button } from "@/components/ui/button";
import dataSourceImg from "@/../public/addDataSource.png";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const DataSourceUnlockInsights: React.FC = () => {
  console.log("This is the dataSourceInsight component");

  return (
    <Card className="flex flex-col md:flex-row w-full max-w-[1080px] mb-6 relative bg-[#EFF6FF] rounded-md shadow-none p-6 md:h-[248px]">
      {/* Left Section - Text & Button */}
      <CardHeader className="flex flex-col items-start md:items-start justify-center">
        <CardTitle className="text-[#64748B] text-2xl md:text-4xl md:w-[500px] text-center md:text-left">
          Unlock insights from your company&apos;s data sources
        </CardTitle>
        <Link href={"/data-sources"}>
          <Button variant="default" className="bg-primaryColor hover:border hover:text-black hover:border-gray-300 hover:bg-white p-4 mt-6 md:mt-[4rem] w-full md:w-48">
            + Add New Data Source
          </Button>
        </Link>
      </CardHeader>

      {/* Right Section - Image */}
      <CardContent className="flex justify-center md:absolute md:right-0 md:bottom-[-1rem]">
        <Image
          src={dataSourceImg}
          alt="Data source insights"
          className="w-full max-w-[20rem] md:max-w-[24rem] h-auto"
        />
      </CardContent>
    </Card>
  );
};

export default DataSourceUnlockInsights;
