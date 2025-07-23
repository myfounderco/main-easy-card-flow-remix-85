
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, FileText, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useDevice } from "@/contexts/DeviceContext";

const BusinessRegistrationCheckPage = () => {
  const navigate = useNavigate();
  const { setHasBusinessRegistration } = useDevice();
  const [showLaterDialog, setShowLaterDialog] = useState(false);

  const handleContinueWithRC = () => {
    navigate("/cac-details");
  };

  const handleRegisterNow = () => {
    navigate("/cac-registration");
  };

  const handleDoLater = () => {
    setShowLaterDialog(true);
  };

  const confirmDoLater = () => {
    setShowLaterDialog(false);
    navigate("/reader-setup");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">Business Registration</h1>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Complete Your Registration</h2>
          <p className="text-muted-foreground text-sm">
            The CBN requires all POS operators to have registered businesses
          </p>
        </div>

        <div className="space-y-4">
          <Card className="border-2 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                I have an RC Number
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                Use your existing business registration certificate
              </p>
              <Button 
                onClick={handleContinueWithRC}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Continue with my RC Number
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Building2 className="h-5 w-5 mr-2 text-green-600" />
                Register New Business
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                We'll help you register your business with CAC
              </p>
              <Button 
                onClick={handleRegisterNow}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Register my business now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-2 text-orange-600" />
                Skip for Now
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                Limited to ₦10,000 per transaction, ₦300,000 daily
              </p>
              <Button 
                onClick={handleDoLater}
                variant="outline"
                className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 rounded-md"
              >
                DO THIS LATER
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showLaterDialog} onOpenChange={setShowLaterDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Transaction Limits Apply</DialogTitle>
            <DialogDescription>
              Without business registration, your account will be limited to:
              <br />• ₦10,000 per transaction
              <br />• ₦300,000 daily limit
              <br />• ₦1,000,000 monthly limit
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col space-y-2">
            <Button
              onClick={confirmDoLater}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Continue with Limits
            </Button>
            <Button
              onClick={() => setShowLaterDialog(false)}
              variant="outline"
              className="w-full rounded-md"
            >
              Go Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessRegistrationCheckPage;
