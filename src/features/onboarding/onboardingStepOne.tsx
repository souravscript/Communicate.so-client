import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { useState } from "react";
import Image from "next/image";

// Import your integration images
import slackLogo from '@/../public/slack.png';
import salesforceLogo from '@/../public/salesforce.png';
import pdfLogo from '@/../public/pdf.png';
import dbLogo from '@/../public/DB-onboard.png';
import googleDriveLogo from '@/../public/drive-onboard.png';

interface OnboardingStepOneProps {
  handleNext: () => void;
  formData: {
    companyName: string;
    website: string;
    integration: string[];
  };
  updateFormData: (data: Partial<{ companyName: string; website: string; integration: string[] }>) => void;
}

const OnboardingStepOne = ({ handleNext, formData, updateFormData }: OnboardingStepOneProps) => {
  const integrations = [
    { name: "Slack", logo: slackLogo },
    { name: "Salesforce", logo: salesforceLogo },
    { name: "PDF", logo: pdfLogo },
    { name: "Database", logo: dbLogo },
    { name: "Drive", logo: googleDriveLogo },
  ];

  const handleIntegrationChange = (integration: string) => {
    const updatedIntegrations = formData.integration.includes(integration)
      ? formData.integration.filter((item) => item !== integration)
      : [...formData.integration, integration];
    updateFormData({ integration: updatedIntegrations });
  };

  const handleSubmit = () => {
    console.log('Step 1 Data:', formData);
    handleNext();
  };

  return (
    <Card className="mx-auto shadow-none border-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex justify-center font-bold">
          Just a few steps more
        </CardTitle>
        <CardDescription className="flex justify-center text-sm opacity-55">
          Add the required information to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="opacity-55" htmlFor="company">
              Company Name (required)
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Eg. Raven Bank"
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="opacity-55" htmlFor="website">
              Company Website
            </Label>
            <Input
              id="website"
              type="text"
              placeholder="Eg. www.company.com"
              value={formData.website}
              onChange={(e) => updateFormData({ website: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="opacity-55">Preferred Integrations (can be changed later)</Label>
            <div className="flex flex-wrap gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className={`flex flex-col items-center p-1 rounded-lg cursor-pointer ${
                    formData.integration.includes(integration.name)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleIntegrationChange(integration.name)}
                >
                  <Image
                    src={integration.logo}
                    alt={integration.name}
                    width={20}
                    height={20}
                    className="mb-2 border-none"
                  />
                  <span className="text-sm">{integration.name}</span>
                </div>
              ))}
            </div>
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

export default OnboardingStepOne;