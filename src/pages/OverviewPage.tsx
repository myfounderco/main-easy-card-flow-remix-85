
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
import { BottomNav } from "@/components/layout/BottomNav";
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
    <div className="min-h-screen flex flex-col pb-16 bg-background">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-medium">Overview</h1>
      </div>
      
      <div className="flex-1 p-4 space-y-6">
        {currentScreen === 'pricing' ? (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-500">Our Offering</h2>
            
            <Card className="overflow-hidden">
              <div className="bg-blue-500 text-white p-4">
                <div className="flex items-center mb-2">
                  <Percent className="h-5 w-5 mr-2" />
                  <h3 className="text-lg font-medium">Simple Transparent Pricing</h3>
                </div>
                <p className="text-sm opacity-90">
                  No hidden fees or charges, just a simple percentage.
                </p>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Percent className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Transaction Fee</p>
                        <p className="text-sm text-muted-foreground">Our commission on sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-blue-500">1.5%</p>
                      <p className="text-xs text-muted-foreground">per transaction</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" className="text-amber-600">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Fee Cap</p>
                        <p className="text-sm text-muted-foreground">Maximum transaction fee</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-blue-500">₦2,500</p>
                      <p className="text-xs text-muted-foreground">maximum</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <Coins className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium">Small Transactions</p>
                        <p className="text-sm text-muted-foreground">For transactions below ₦500</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-blue-500">₦5</p>
                      <p className="text-xs text-muted-foreground">flat fee</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <span className="font-bold text-lg text-purple-600">0</span>
                      </div>
                      <div>
                        <p className="font-medium">No Monthly Fees</p>
                        <p className="text-sm text-muted-foreground">No setup costs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-blue-500">Zero</p>
                      <p className="text-xs text-muted-foreground">No other deductions</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                        <Gift className="h-4 w-4 text-pink-500" />
                      </div>
                      <div>
                        <p className="font-medium">Card Reader (POS)</p>
                        <p className="text-sm text-muted-foreground">For new users</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-blue-500">FREE</p>
                      <p className="text-xs text-muted-foreground">Your First Reader</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleNext}
                className="flex items-center h-14 w-40 bg-blue-500 hover:bg-blue-600"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-500">The Right Partner for Your Business</h2>
            
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
            </div>
            
            <div className="pt-6">
              <Button 
                onClick={handleStartSelling} 
                className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600"
              >
                Start Selling
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default OverviewPage;
