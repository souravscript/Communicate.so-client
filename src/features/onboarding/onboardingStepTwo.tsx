import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
//import { useState } from "react";
import Image from "next/image";

import awsLogo from '@/../public/aws.png';
import azureLogo from '@/../public/azure.png';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OnboardingStepTwoProps {
  handleNext: () => void;
  formData: {
    cloudProvider: string;
    region: string;
  };
  updateFormData: (data: Partial<{ cloudProvider: string; region: string }>) => void;
}

const providers = [
  { name: "AWS", logo: awsLogo },
  { name: "Azure", logo: azureLogo },
];

const regions = [
  "US East (N. Virginia)",
  "US West (Oregon)",
  "EU (Ireland)",
  "Asia Pacific (Tokyo)",
  "South America (São Paulo)",
];

const OnboardingStepTwo = ({ handleNext, formData, updateFormData }: OnboardingStepTwoProps) => {
  const handleSubmit = () => {
    console.log('Step 2 Data:', formData);
    handleNext();
  };

  return (
    <Card className="mx-auto shadow-none border-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex justify-center font-bold">
          Almost there...
        </CardTitle>
        <CardDescription className="flex justify-center text-sm opacity-55">
          Choose where you want to host the app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Cloud Provider Selection */}
          <div className="space-y-2">
            <Label className="opacity-55">Cloud Provider</Label>
            <div className="flex gap-4">
              {providers.map((provider) => (
                <div
                  key={provider.name}
                  className={`flex flex-col items-center p-4 rounded-lg cursor-pointer ${
                    formData.cloudProvider === provider.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => updateFormData({ cloudProvider: provider.name })}
                >
                  <Image
                    src={provider.logo}
                    alt={provider.name}
                    width={40}
                    height={40}
                    className="mb-2"
                  />
                  <span className="text-sm">{provider.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Region Selection */}
          <div className="space-y-2">
            <Label className="opacity-55">Preferred Region</Label>
            <Select
              onValueChange={(value) => updateFormData({ region: value })}
              value={formData.region}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Regions</SelectLabel>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Save and Next →
          </Button>
        </div>
      </CardContent>
      <p className="opacity-55 text-sm my-3 mx-6">
        How do we process the data?{" "}
        <span className="text-base opacity-100 text-black font-bold">Data Usage Policy</span>
      </p>
    </Card>
  );
};

export default OnboardingStepTwo;