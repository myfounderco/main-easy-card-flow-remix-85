
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Receipt, History, User } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-6 pb-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to EasyCardFlow</h1>
          <p className="text-lg text-muted-foreground">Your complete payment solution</p>
        </div>

        <div className="grid gap-4 max-w-md mx-auto">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full p-6 justify-start h-auto" 
                onClick={() => navigate("/keypad")}
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-lg mb-1">Process Payment</h3>
                  <p className="text-muted-foreground text-sm">Accept payments via card or cash</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full p-6 justify-start h-auto" 
                onClick={() => navigate("/history")}
              >
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <History className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-lg mb-1">Transaction History</h3>
                  <p className="text-muted-foreground text-sm">View past transactions and receipts</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full p-6 justify-start h-auto" 
                onClick={() => navigate("/reader-setup")}
              >
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-lg mb-1">Card Reader Setup</h3>
                  <p className="text-muted-foreground text-sm">Connect and manage your card readers</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full p-6 justify-start h-auto" 
                onClick={() => navigate("/profile")}
              >
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <User className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-lg mb-1">My Account</h3>
                  <p className="text-muted-foreground text-sm">Manage your business details and settings</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
