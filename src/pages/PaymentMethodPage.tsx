
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Scan, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/contexts/PaymentContext";
import { useDevice } from "@/contexts/DeviceContext";
import { toast } from "sonner";

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const { amount, runningTotal, formatAmount, clearRunningTotal } = usePayment();
  const { activeReader } = useDevice();
  
  const totalAmount = runningTotal > 0 ? runningTotal : parseFloat(amount) || 0;
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleClose = () => {
    navigate("/");
  };
  
  const handleSelectMethod = (method: "card-reader" | "tap-to-pay" | "scan-card") => {
    if (totalAmount <= 0) {
      toast.error("Please enter a valid amount first");
      return;
    }
    
    switch (method) {
      case "card-reader":
        if (!activeReader) {
          toast.error("No card reader connected. Please connect a reader in the profile section.");
          return;
        }
        navigate("/process-payment");
        break;
      case "tap-to-pay":
        toast.info("Tap to Pay feature coming soon!");
        break;
      case "scan-card":
        toast.info("Scan Card feature coming soon!");
        break;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">Select Payment Method</h1>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 p-6">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground mb-1">Amount to charge</p>
          <p className="text-3xl font-semibold text-green-600">₦{formatAmount(totalAmount.toString())}</p>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto">
          <button 
            className="w-full p-4 border rounded-lg flex items-center hover:bg-accent transition-colors"
            onClick={() => handleSelectMethod("card-reader")}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4 text-left flex-1">
              <h3 className="font-medium">Card Reader</h3>
              <p className="text-sm text-muted-foreground">Insert or tap card on reader</p>
            </div>
            {activeReader && (
              <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
            )}
          </button>
          
          <button 
            className="w-full p-4 border rounded-lg flex items-center hover:bg-accent transition-colors"
            onClick={() => handleSelectMethod("tap-to-pay")}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4 text-left flex-1">
              <h3 className="font-medium">Tap to Pay</h3>
              <p className="text-sm text-muted-foreground">Use your phone as a card reader</p>
            </div>
          </button>
          
          <button 
            className="w-full p-4 border rounded-lg flex items-center hover:bg-accent transition-colors"
            onClick={() => handleSelectMethod("scan-card")}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Scan className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4 text-left flex-1">
              <h3 className="font-medium">Scan Card</h3>
              <p className="text-sm text-muted-foreground">Use camera to capture card details</p>
            </div>
          </button>
        </div>
        
        {runningTotal > 0 && (
          <div className="mt-8 max-w-md mx-auto">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={clearRunningTotal}
            >
              Clear Running Total
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodPage;
