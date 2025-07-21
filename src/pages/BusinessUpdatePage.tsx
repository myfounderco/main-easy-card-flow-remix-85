
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OTPAutoVerification } from "@/components/profile/OTPAutoVerification";
import { toast } from "sonner";

const BusinessUpdatePage = () => {
  const navigate = useNavigate();
  const [showLimitationDialog, setShowLimitationDialog] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  
  const handleRegisterBusiness = () => {
    // Pass state to indicate this is from profile page
    navigate("/cac-registration", { state: { fromProfile: true } });
  };
  
  const handleAlreadyRegistered = () => {
    // Pass state to indicate this is from profile page
    navigate("/cac-details", { state: { fromProfile: true } });
  };
  
  const handleOtpVerified = () => {
    setShowOtpDialog(false);
    toast.success("Business details verified successfully");
    navigate("/profile");
  };
  
  const handleSkipForNow = () => {
    navigate("/profile");
  };
  
  const handleAcceptLimitations = () => {
    setShowLimitationDialog(false);
    navigate("/profile");
  };
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-6">
        <Card className="bg-green-50 border-green-200 mb-6">
          <CardContent className="p-4">
            <p className="text-green-800 text-sm">
              The Central Bank of Nigeria (CBN) has mandated that all POS operators must have a registered business. Skipping this will limit your account to ₦10,000 per transaction and ₦100,000 daily.
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
                onClick={handleAlreadyRegistered}
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
                onClick={handleRegisterBusiness}
              >
                Register my business now
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={handleSkipForNow}
            className="w-full text-blue-600 font-medium bg-white border-blue-300"
          >
            DO THIS LATER
          </Button>
        </div>
        
        <p className="text-center text-sm text-blue-600 mt-4">
          Registering your business increases your transaction limits and builds trust with your customers
        </p>
      </div>
      
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Business</DialogTitle>
          </DialogHeader>
          <OTPAutoVerification onVerify={handleOtpVerified} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showLimitationDialog} onOpenChange={setShowLimitationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Info className="mr-2 h-5 w-5 text-amber-500" />
              Transaction Limitations
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-amber-600 font-medium mb-4">
              Without a registered business you will only be able to process:
            </p>
            
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>Maximum of ₦10,000 per transaction</li>
              <li>Maximum of ₦100,000 in daily transactions</li>
            </ul>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowLimitationDialog(false)}
                className="flex-1"
              >
                Go back to registration
              </Button>
              <Button 
                onClick={handleAcceptLimitations}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessUpdatePage;
