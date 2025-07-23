
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentInfoDialog } from "@/components/business/PaymentInfoDialog";
import { PaymentConfirmedDialog } from "@/components/business/PaymentConfirmedDialog";

const BusinessNameCheckPage = () => {
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleContinueWithRC = () => {
    navigate("/reader-setup");
  };

  const handleRegisterBusiness = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentMade = () => {
    setShowPaymentDialog(false);
    setShowConfirmationDialog(true);
  };

  const handleConfirmationDone = () => {
    setShowConfirmationDialog(false);
    navigate("/reader-setup");
  };

  const handleDoLater = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-700">
            The Central Bank of Nigeria (CBN) has mandated that all POS operators must have a registered business. 
            Skipping this will limit your account to ₦10,000 per transaction and ₦100,000 daily.
          </p>
        </div>

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
                onClick={handleContinueWithRC}
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
                <p className="text-sm text-blue-600">
                  <span className="line-through">₦22,000</span> 
                  <span className="font-medium ml-2">₦12,000</span>
                  <span className="ml-2">(₦10,000 subsidy covered by EasyPay to help you get started)</span>
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

      <PaymentInfoDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        onPaymentMade={handlePaymentMade}
      />

      <PaymentConfirmedDialog
        open={showConfirmationDialog}
        onDone={handleConfirmationDone}
      />
    </div>
  );
};

export default BusinessNameCheckPage;
