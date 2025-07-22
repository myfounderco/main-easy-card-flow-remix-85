import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Business Registration Required</h1>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-700">
            The Central Bank of Nigeria (CBN) has mandated that all POS operators must have a registered business. 
            Skipping this will limit your account to ₦10,000 per transaction and ₦300,000 daily.
          </p>
        </div>

        <div className="space-y-4">
          <Card className="border-2 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">I already have a registered business</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Proceed with your existing RC number
                  </p>
                  <Button 
                    onClick={handleContinueWithRC}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Continue with my RC Number
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">I want to Register my business</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Registration takes approximately 5 days to complete. We'll notify you when it's done.
                  </p>
                  <div className="text-sm mb-3">
                    <span className="line-through text-gray-500">₦22,000</span>
                    <span className="text-green-600 font-medium ml-2">₦12,000</span>
                    <span className="text-xs text-green-600 block">
                      (₦10,000 subsidy covered by EasyPay to help you get started)
                    </span>
                  </div>
                  <Button 
                    onClick={handleRegisterBusiness}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Register my business now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Button 
            variant="outline" 
            onClick={handleDoLater}
            className="w-full"
          >
            DO THIS LATER
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
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