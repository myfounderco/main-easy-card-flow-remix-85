
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Clock, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentInfoDialog } from "@/components/business/PaymentInfoDialog";
import { PaymentConfirmedDialog } from "@/components/business/PaymentConfirmedDialog";

const BusinessRegistrationCheckPage = () => {
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaymentConfirmed, setShowPaymentConfirmed] = useState(false);

  const handleProceedToPayment = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentMade = () => {
    setShowPaymentDialog(false);
    setShowPaymentConfirmed(true);
  };

  const handlePaymentConfirmedDone = () => {
    setShowPaymentConfirmed(false);
    navigate("/reader-setup");
  };

  const handleDoLater = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Business Registration</h1>
        </div>

        {/* Main Card */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-blue-600">Complete Your CAC Registration</CardTitle>
            <CardDescription className="text-center">
              As mandated by the CBN, complete your Corporate Affairs Commission (CAC) registration 
              to lift all transaction limits on your account.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="h-5 w-5 mr-3 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Current Limits (Unregistered)</p>
                  <p className="text-xs text-muted-foreground">Max ₦10,000 per transaction, ₦300,000 daily, ₦1M monthly</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-5 w-5 mr-3 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">After Registration</p>
                  <p className="text-xs text-muted-foreground">Unlimited transactions, higher daily/monthly limits</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-5 w-5 mr-3 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Processing Time</p>
                  <p className="text-xs text-muted-foreground">7-14 business days</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-5 w-5 mr-3 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Registration Fee</p>
                  <p className="text-xs text-muted-foreground">₦15,000 (Business Name) or ₦35,000 (Limited Company)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleProceedToPayment}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            Proceed to Payment
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDoLater}
            className="w-full rounded-full"
          >
            DO THIS LATER
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By proceeding, you agree to our terms and conditions. 
          This registration is handled by our verified CAC partners.
        </p>
      </div>

      {/* Payment Info Dialog */}
      <PaymentInfoDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        onPaymentMade={handlePaymentMade}
      />

      {/* Payment Confirmed Dialog */}
      <PaymentConfirmedDialog
        open={showPaymentConfirmed}
        onDone={handlePaymentConfirmedDone}
      />
    </div>
  );
};

export default BusinessRegistrationCheckPage;
