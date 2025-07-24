
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Bluetooth, Smartphone, ArrowLeft, CreditCard } from "lucide-react";

const ReaderSetupPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNewReader = () => {
    setSelectedOption("new");
  };

  const handleExistingReader = () => {
    setSelectedOption("existing");
  };

  const handleContinue = () => {
    if (selectedOption === "new") {
      navigate("/request-reader", { state: { fromReaderSetup: true } });
    } else if (selectedOption === "existing") {
      navigate("/overview");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col">
      <div className="p-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="text-blue-500"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 max-w-md mx-auto pt-6 flex flex-col">
        <div className="flex justify-center mb-4">
          <CreditCard className="h-24 w-24 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">EasyPay Card Reader</h1>
        <p className="text-base text-gray-600 text-center mb-6">Let's get you set up with a Card Reader</p>
        
        <p className="text-base text-blue-400 font-bold text-center mb-6">
          Request a new Card Reader (POS) if you do not already have one. NOTE: Your first Card Reader is free and will be delivered to you at no cost
        </p>

        <Card 
          className={`border-2 mb-6 cursor-pointer ${selectedOption === "existing" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
          onClick={handleExistingReader}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 text-blue-500">
              <Bluetooth className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">I already have a reader</h3>
              <p className="text-gray-600 text-sm">Connect your existing Card Reader to your account</p>
            </div>
            {selectedOption === "existing" && (
              <CheckCircle2 className="h-6 w-6 text-blue-500" />
            )}
          </CardContent>
        </Card>

        <Card 
          className={`border-2 mb-8 cursor-pointer ${selectedOption === "new" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
          onClick={handleNewReader}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="h-12 w-12 text-blue-500">
              <Smartphone className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Request a new reader</h3>
              <p className="text-gray-600 text-sm">We'll ship a new Card Reader to your address for free</p>
            </div>
            {selectedOption === "new" && (
              <CheckCircle2 className="h-6 w-6 text-blue-500" />
            )}
          </CardContent>
        </Card>

        <Button 
          onClick={handleContinue}
          disabled={!selectedOption}
          className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ReaderSetupPage;
