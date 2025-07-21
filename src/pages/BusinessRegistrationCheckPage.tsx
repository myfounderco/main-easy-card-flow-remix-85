
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, FileText, Info, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useDevice } from "@/contexts/DeviceContext";

const BusinessRegistrationCheckPage = () => {
  const navigate = useNavigate();
  const { setHasBusinessRegistration } = useDevice();
  const [showLimitsDialog, setShowLimitsDialog] = useState(false);
  
  const handleBack = () => {
    navigate("/get-started");
  };
  
  const handleHasBusiness = () => {
    setHasBusinessRegistration(true);
    navigate("/cac-details");
  };
  
  const handleNeedsBusiness = () => {
    navigate("/cac-registration");
  };
  
  const handleDoLater = () => {
    setShowLimitsDialog(true);
  };
  
  const confirmSkip = () => {
    setHasBusinessRegistration(false);
    navigate("/reader-setup");
  };
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-6">
        <Card className="bg-green-50 border-green-200 mb-6">
          <CardContent className="p-4">
            <p className="text-green-800 text-sm">
              The Central Bank of Nigeria (CBN) has mandated that all POS operators must have a registered business. Skipping this will limit your account to ₦10,000 per transaction and ₦300,000 daily.
            </p>
          </CardContent>
        </Card>
        
        <h1 className="text-2xl font-bold text-center mb-2">Business Registration Required</h1>
        
        <div className="space-y-4 mb-8">
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                I already have a registered business
              </CardTitle>
              <CardDescription>
                Proceed with your existing RC number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleHasBusiness}
              >
                Continue with my RC Number
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                I want to Register my business
              </CardTitle>
              <CardDescription>
                Registration takes approximately 5 days to complete. We'll notify you when it's done.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <p className="text-sm text-muted-foreground">
                  <span className="line-through">₦22,000</span> 
                  <span className="text-green-600 font-medium ml-2">₦12,000</span>
                  <span className="ml-2 text-green-600">(₦10,000 subsidy covered by EasyPay to help you get started)</span>
                </p>
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleNeedsBusiness}
              >
                Register my business now
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={handleDoLater}
            className="w-full text-blue-600 font-medium bg-white border-blue-300"
          >
            DO THIS LATER
          </Button>
        </div>
        
        <p className="text-center text-sm text-blue-600 mt-4">
          Registering your business increases your transaction limits and builds trust with your customers
        </p>
      </div>
      
      <Dialog open={showLimitsDialog} onOpenChange={setShowLimitsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-amber-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Transaction Limitations
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Without business registration, transaction limits will be restricted:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-2">
            <div className="flex items-start">
              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-green-600">Maximum transaction amount: ₦10,000</p>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-green-600">Daily transaction limit: ₦300,000</p>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-green-600">Monthly transaction limit: ₦1,000,000</p>
            </div>
            
            <div className="mt-4 pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                These limits may affect your business operations. We recommend completing your business registration.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col space-y-6 sm:space-y-6">
            <Button 
              variant="outline" 
              onClick={() => setShowLimitsDialog(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Go Back to CAC Registration
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600" 
              onClick={confirmSkip}
            >
              Continue without registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessRegistrationCheckPage;
