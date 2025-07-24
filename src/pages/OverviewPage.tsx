
import React, { useState } from "react";
import { 
  Percent, 
  Smartphone, 
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Coins,
  Clock,
  Gift,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const OverviewPage = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<'pricing' | 'partner'>('pricing');
  
  const handleNext = () => {
    setCurrentScreen('partner');
  };
  
  const handleStartSelling = () => {
    navigate("/");
  };
  
  const handleDone = () => {
    navigate("/profile");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-medium">Overview</h1>
      </div>
      
      <div className="flex-1 p-4 space-y-6">
        {currentScreen === 'pricing' ? (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-blue-500">Reasons to choose EasyPay</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="overflow-hidden">
                <div className="bg-blue-500 text-white p-3">
                  <div className="flex items-center mb-1">
                    <Percent className="h-4 w-4 mr-2" />
                    <h3 className="text-base font-medium">Transaction Fee</h3>
                  </div>
                  <p className="text-xs opacity-90">Our commission on sales</p>
                </div>
                <CardContent className="p-3 text-center">
                  <p className="font-bold text-2xl text-blue-500">1.5%</p>
                  <p className="text-xs text-muted-foreground">per transaction</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-amber-500 text-white p-3">
                  <div className="flex items-center mb-1">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" className="mr-2">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <h3 className="text-base font-medium">Fee Cap</h3>
                  </div>
                  <p className="text-xs opacity-90">Maximum transaction fee</p>
                </div>
                <CardContent className="p-3 text-center">
                  <p className="font-bold text-2xl text-blue-500">₦2,500</p>
                  <p className="text-xs text-muted-foreground">maximum</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-indigo-500 text-white p-3">
                  <div className="flex items-center mb-1">
                    <Coins className="h-4 w-4 mr-2" />
                    <h3 className="text-base font-medium">Small Transactions</h3>
                  </div>
                  <p className="text-xs opacity-90">For transactions below ₦500</p>
                </div>
                <CardContent className="p-3 text-center">
                  <p className="font-bold text-2xl text-blue-500">₦5</p>
                  <p className="text-xs text-muted-foreground">flat fee</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-pink-500 text-white p-3">
                  <div className="flex items-center mb-1">
                    <Gift className="h-4 w-4 mr-2" />
                    <h3 className="text-base font-medium">Card Reader (POS)</h3>
                  </div>
                  <p className="text-xs opacity-90">For new users</p>
                </div>
                <CardContent className="p-3 text-center">
                  <p className="font-bold text-2xl text-blue-500">FREE</p>
                  <p className="text-xs text-muted-foreground">Your First Reader</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleNext}
                className="flex items-center h-14 w-40 bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-blue-500">The right partner for your business</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-medium">Mobile Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Charge your customers, send receipts and view your transactions anytime from your phone.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium">99.99% Network Uptime</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enjoy 99.99% network uptime so you don't have to lose a sale due to connection issues.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-medium">Instant Deposits</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your money is sent directly into your bank account after every transaction - no waiting till the next day.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-purple-500 text-white p-4">
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2">0</span>
                    <h3 className="text-lg font-medium">No Monthly Fees</h3>
                  </div>
                  <p className="text-sm opacity-90">No setup costs</p>
                </div>
                <CardContent className="p-4 text-center">
                  <p className="font-bold text-3xl text-blue-500">Zero</p>
                  <p className="text-sm text-muted-foreground">No other deductions</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-6">
              <Button 
                onClick={handleStartSelling} 
                className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Start Selling
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
