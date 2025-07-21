
import React from "react";
import { CreditCard, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardReaderList } from "@/components/devices/CardReaderList";

export const DevicesCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-300">
          <div className="relative h-6 w-6 flex-shrink-0 mr-2">
            <div className="relative">
              <CreditCard className="h-5 w-5 text-blue-300" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-300 rounded-full"></div>
            </div>
          </div>
          Card Readers
        </CardTitle>
        <CardDescription>
          Manage your existing readers or request a new one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardReaderList />
        
        <div className="flex flex-col space-y-3 mt-4">                  
          <Button
            className="w-full bg-payment-blue hover:bg-payment-darkBlue"
            onClick={() => navigate("/request-reader")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Request New Card Reader
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
