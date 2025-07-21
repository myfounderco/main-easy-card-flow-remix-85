import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, Building, CreditCard, Clock, Percent } from "lucide-react";

const GetStartedPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/login");
  };

  const renderHeader = () => (
    <header className="flex justify-between items-center p-6">
      <div className="logo">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-600">Easy</span>
          <span className="text-green-600">Pay</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Accept VISA logo */}
        <div className="flex items-center">
          <span className="text-xs mr-1 text-gray-600">Accept</span>
          <div className="bg-white text-blue-600 font-bold text-sm border border-blue-200 px-2 py-1 rounded">
            VISA
          </div>
        </div>
        
        {/* Mastercard-like logo */}
        <div className="flex">
          <div className="h-6 w-6 bg-red-500 rounded-full opacity-80"></div>
          <div className="h-6 w-6 bg-yellow-500 rounded-full -ml-3 opacity-80"></div>
        </div>
        
        {/* Verve logo */}
        <div className="bg-green-400 text-white font-bold px-2 py-1 rounded text-xs">
          VERVE
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-white">
      {renderHeader()}

      {/* Main content */}
      <main className="px-6 py-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-blue-600 uppercase text-sm font-medium mb-2">Step into the future</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start accepting card payments on the go
          </h1>
          <div className="h-1 w-32 bg-blue-600 mb-4"></div>
        </div>

        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="border rounded-lg p-6 flex items-start">
            <div className="mr-6">
              <div className="h-16 w-16 bg-white rounded-lg border shadow-md flex items-center justify-center">
                <div className="relative">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                  <div className="absolute -top-2 -right-2 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="12" height="12" className="text-white">
                      <path fill="currentColor" d="M6 8.94L4.4 7.34 3 8.74 6 11.74 12 5.74 10.6 4.34 6 8.94Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-500">Free Reader (POS)</h3>
              <p className="text-gray-500">
                Get a free card reader to start accepting card payments right away with no setup or monthly fees
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="border rounded-lg p-6 flex items-start">
            <div className="mr-6">
              <div className="h-16 w-16 bg-white rounded-lg border shadow-md flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-green-500">Licensed by CBN</h3>
              <p className="text-gray-500">
                We are fully licensed and regulated by the Central Bank of Nigeria
              </p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="border rounded-lg p-6 flex items-start">
            <div className="mr-6">
              <div className="h-16 w-16 bg-white rounded-lg border shadow-md flex items-center justify-center">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-amber-500">Get Start Selling Immediately</h3>
              <p className="text-gray-500">
                Start accepting payments right after signup with our easy-to-use platform
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="border rounded-lg p-6 flex items-start">
            <div className="mr-6">
              <div className="h-16 w-16 bg-white rounded-lg border shadow-md flex items-center justify-center">
                <Percent className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-indigo-500">Low Fees Only 1.5%</h3>
              <p className="text-gray-500">
                Transparent pricing with only 1.5% per transaction with no hidden fees
              </p>
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="border rounded-lg p-6 flex items-start">
            <div className="mr-6">
              <div className="h-16 w-16 bg-white rounded-lg border shadow-md flex items-center justify-center">
                <Building className="h-8 w-8 text-blue-700" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-700">CAC Registration</h3>
              <p className="text-gray-500">
                We will help register your business with the Corporate Affairs Commission with us paying ₦10,000 of the cost
              </p>
            </div>
          </div>
          
          {/* Feature 6 - Instant Deposits */}
          <div className="border rounded-lg p-6 flex items-start">
            <div className="mr-6">
              <div className="h-16 w-16 bg-white rounded-lg border shadow-md flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-green-600">Instant Deposits</h3>
              <p className="text-gray-500">
                Your money is sent directly into your bank account after every transaction — no waiting till the next day
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Button
            onClick={handleGetStarted}
            className="w-full sm:w-auto gap-2 bg-blue-600 py-6 text-lg font-medium text-white hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default GetStartedPage;
