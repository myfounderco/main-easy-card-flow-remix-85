
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, UserCircle, Check } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";
import { useDevice } from "@/contexts/DeviceContext";
import { Button } from "@/components/ui/button";
import { Keypad } from "@/components/keypad/Keypad";
import { BottomNav } from "@/components/layout/BottomNav";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const KeypadPage = () => {
  const { amount, formatAmount, runningTotal } = usePayment();
  const { activeReader, hasBusinessRegistration } = useDevice();
  const navigate = useNavigate();
  const [showReaderConnected, setShowReaderConnected] = useState(false);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [hasShownReaderNotification, setHasShownReaderNotification] = useState(false);
  
  useEffect(() => {
    if (activeReader && !hasShownReaderNotification) {
      setShowReaderConnected(true);
      setHasShownReaderNotification(true);
      const timer = setTimeout(() => {
        setShowReaderConnected(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [activeReader, hasShownReaderNotification]);
  
  // Reset the notification flag when reader is disconnected
  useEffect(() => {
    if (!activeReader) {
      setHasShownReaderNotification(false);
    }
  }, [activeReader]);
  
  const numericAmount = parseFloat(amount) || 0;
  const totalAmount = runningTotal > 0 ? runningTotal + numericAmount : numericAmount;
  const isValidAmount = totalAmount > 0;
  
  // Calculate transaction fee
  const calculateFee = (amount: number) => {
    if (amount <= 0) return 0;
    if (amount < 500) return 5; // Flat fee for small transactions
    const percentageFee = amount * 0.015; // 1.5%
    return Math.min(percentageFee, 2500); // Cap at ₦2,500
  };
  
  const transactionFee = calculateFee(totalAmount);
  
  const handleCharge = () => {
    if (!isValidAmount) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Check transaction limits for unregistered users
    if (!hasBusinessRegistration && totalAmount > 10000) {
      setShowRegistrationDialog(true);
      return;
    }
    
    if (!activeReader) {
      toast.error("Please Connect Card Reader (POS) to phone charging port to accept this payment.", {
        duration: 4000,
        position: "bottom-center"
      });
      return;
    }
    
    navigate("/process-payment");
  };
  
  return (
    <>
      <div className="min-h-screen flex flex-col pb-16 bg-background">
        <div className="flex-1 flex flex-col px-4 pt-8">
          {!activeReader ? (
            <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-6 flex items-center font-bold text-sm justify-center">
              <CreditCard className="h-4 w-4 mr-2" />
              <span>Connect card reader (POS) into phone charging point or via Bluetooth.</span>
            </div>
          ) : (
            <div className="bg-green-50 text-green-700 p-3 rounded-md mb-6 flex items-center font-bold text-sm justify-center">
              <CreditCard className="h-4 w-4 mr-2" />
              <span>Insert card into reader chip side up.</span>
            </div>
          )}
          
          {showReaderConnected && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
              <div className="bg-blue-50 rounded-lg shadow-lg p-4 flex items-center border border-blue-200">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <CreditCard className="h-5 w-5 text-blue-700" />
                </div>
                <span className="text-blue-700 font-medium">Reader connected</span>
              </div>
            </div>
          )}
          
          <div className="flex-1 flex flex-col items-center justify-center mb-8">
            <div className="text-muted-foreground text-sm mb-2">Amount</div>
            <div className="flex items-baseline">
              <span className="text-2xl mr-2 text-green-500/70">₦</span>
              <div className={cn(
                "payment-amount",
                !amount && !runningTotal && "text-muted-foreground"
              )}>
                {runningTotal > 0 ? (
                  <>
                    <span className="text-green-600 font-bold text-[2.4rem]">{formatAmount(runningTotal.toString())}</span>
                    {numericAmount > 0 && (
                      <span className="text-green-600"> + {formatAmount(amount)}</span>
                    )}
                  </>
                ) : (
                  <span className="text-green-600">{formatAmount(amount)}</span>
                )}
              </div>
            </div>
            {runningTotal > 0 && (
              <div className="mt-2 text-sm font-bold text-muted-foreground text-[1.2rem]">
                Total: ₦{formatAmount(totalAmount.toString())}
              </div>
            )}
            
            {/* Transaction Fee Display */}
            {isValidAmount && (
              <div className="mt-2 text-sm text-blue-600">
                Transaction fee: ₦{transactionFee.toFixed(2)}
              </div>
            )}
          </div>
          
          <div className="w-full max-w-md mx-auto mb-6">
            <Keypad />
          </div>
          
          <div className="w-full max-w-md mx-auto mb-8">
            <Button 
              onClick={handleCharge} 
              disabled={!isValidAmount}
              className="w-full h-14 text-lg relative overflow-hidden group text-white bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              <span className="absolute inset-0 flex items-center justify-center group-hover:translate-y-10 transition-transform duration-200">
                Charge ₦{formatAmount(totalAmount.toString())}
              </span>
              <span className="absolute inset-0 flex items-center justify-center -translate-y-10 group-hover:translate-y-0 transition-transform duration-200">
                <ArrowRight className="h-6 w-6" />
              </span>
            </Button>
          </div>
        </div>
        
        <BottomNav />
      </div>
      
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-500">Transaction Limit Exceeded</DialogTitle>
            <DialogDescription className="text-blue-600">
              You can't process more than ₦10,000 till you complete your CAC registration as mandated by the CBN.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="space-y-3">
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
            </div>
            <div className="mt-5 text-center">
              <p className="text-sm text-blue-600 font-medium">
                Want to lift all transaction limits on your account? Then proceed to your CAC details/registration below.
              </p>
            </div>
          </div>
          <DialogFooter className="mt-4 flex flex-col space-y-6 sm:space-y-6">
            <Button 
              variant="outline" 
              onClick={() => setShowRegistrationDialog(false)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              Back To Edit Amount
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 rounded-full"
              onClick={() => {
                setShowRegistrationDialog(false);
                navigate("/business-registration-check");
              }}
            >
              Complete Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KeypadPage;
