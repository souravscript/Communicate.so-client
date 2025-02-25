import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OnboardingStepThreeProps {
  formData: {
    domainName: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const OnboardingStepThree = ({ formData, handleChange, handleSubmit }: OnboardingStepThreeProps) => {
  return (
    <Card className="shadow-none border-none">
      <CardHeader className=" space-y-1">
        <CardTitle className="text-2xl flex justify-center font-bold">Final Step!</CardTitle>
      </CardHeader>
      <CardDescription className="flex justify-center space-y-4 text-sm opacity-55">
        Choose your Project domain
      </CardDescription>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Project Domain</Label>
          <Input
            name="domainName"
            placeholder="ravenbank                              .communicate.so"
            value={formData.domainName}
            onChange={handleChange}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default OnboardingStepThree;