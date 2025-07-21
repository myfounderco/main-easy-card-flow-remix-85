
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calculator, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricingPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState(0);
  const [earnings, setEarnings] = useState(0);
  
  const calculateFee = (value: number) => {
    let calculatedFee = 0;
    
    if (value < 500) {
      calculatedFee = 5; // Flat fee of N5 for transactions below N500
    } else if (value >= 500 && value < 1000) {
      calculatedFee = value * 0.01; // 1% for transactions between N501-N999
    } else {
      calculatedFee = value * 0.015; // 1.5% for transactions N1,000 and above
      // Cap the fee at N2,500
      if (calculatedFee > 2500) {
        calculatedFee = 2500;
      }
    }
    
    return calculatedFee;
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
    
    if (value) {
      const numericValue = parseFloat(value);
      const calculatedFee = calculateFee(numericValue);
      setFee(calculatedFee);
      setEarnings(numericValue - calculatedFee);
    } else {
      setFee(0);
      setEarnings(0);
    }
  };
  
  const handleDone = () => {
    navigate("/profile");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">Our Pricing</h1>
      </div>
      
      <div className="p-4 space-y-6 pb-24">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">
                Transparent Pricing Structure
              </p>
              <p className="text-sm text-blue-600">
                We offer simple, fair pricing with no hidden fees or monthly charges. Use the calculator below or scroll down to see our % fees.
              </p>
            </div>
          </div>
        </div>

        {/* Fee Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calculator className="h-5 w-5 mr-2 text-blue-500" />
              Fee Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Enter Transaction Amount (₦)
              </label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="text-lg"
              />
            </div>
            
            {amount && (
              <div className="space-y-4 pt-4">
                <div className="flex justify-between py-2 bg-gray-50 px-3 rounded-md">
                  <span>Transaction Amount:</span>
                  <span className="font-medium">₦{parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 bg-red-50 px-3 rounded-md">
                  <span>EasyPay Fee:</span>
                  <span className="font-medium text-red-500">₦{fee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 bg-green-50 px-3 rounded-md">
                  <span>Your Earnings:</span>
                  <span className="font-medium text-green-600">₦{earnings.toLocaleString()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fee Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span>Transactions below ₦500</span>
              <span className="font-medium text-blue-500">₦5 flat fee</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Transactions ₦501 - ₦999</span>
              <span className="font-medium text-blue-500">1% fee</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Transactions ₦1,000 and above</span>
              <span className="font-medium text-blue-500">1.5% fee</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-sm text-blue-600">Our maximum fee is capped at ₦2,500 meaning no matter how large your transaction is we will not charge above ₦2,500</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-medium">Additional Information</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>All fees are deducted automatically from each transaction</li>
            <li>Instant settlements to your bank account</li>
            <li>No monthly fees or minimum transaction requirements</li>
            <li>No hidden charges or setup fees</li>
          </ul>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button 
            onClick={handleDone} 
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
