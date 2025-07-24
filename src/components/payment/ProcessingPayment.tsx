
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, AlertCircle, CreditCard } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";
import { useDevice } from "@/contexts/DeviceContext";
import { Button } from "@/components/ui/button";

interface ProcessingPaymentProps {
  onComplete?: () => void;
}

export function ProcessingPayment({ onComplete }: ProcessingPaymentProps) {
  const { amount, addTransaction, formatAmount } = usePayment();
  const { activeReader } = useDevice();
  const navigate = useNavigate();
  
  const [stage, setStage] = useState<"verifying" | "pin" | "failed">("verifying");
  const [pinDigits, setPinDigits] = useState<string[]>(["", "", "", ""]);
  const [currentPinIndex, setCurrentPinIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    // Simulate verifying payment
    const timer = setTimeout(() => {
      if (!activeReader) {
        setStage("failed");
        setErrorMessage("No Card Reader connected. Please connect a reader in the profile section.");
        return;
      }
      
      setStage("pin");
      
      return () => clearTimeout(timer);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [activeReader]);
  
  const handlePinDigit = (digit: number) => {
    if (currentPinIndex >= 4) return;
    
    const newPinDigits = [...pinDigits];
    newPinDigits[currentPinIndex] = digit.toString();
    setPinDigits(newPinDigits);
    setCurrentPinIndex(prev => prev + 1);
    
    // If we've entered all 4 digits, simulate processing
    if (currentPinIndex === 3) {
      setTimeout(() => {
        // Play success sound
        const audio = new Audio("/sound/success-ding.mp3");
        audio.play().catch(e => console.error("Error playing sound", e));
        
        // 10% chance of failure for demo purposes
        const success = Math.random() > 0.1;
        
        if (success) {
          const numAmount = parseFloat(amount) || 0;
          const transaction = addTransaction({
            amount: numAmount,
            status: "completed",
            cardType: "Visa",
            cardLast4: "4321",
            customerName: "John Doe", // Adding a sample name for testing
            customerPhone: "+2349012345678", // Adding a sample phone for testing
            receiptSent: false
          });
          
          // Navigate directly to receipt page
          if (onComplete) {
            onComplete();
          } else {
            navigate(`/receipt/${transaction.id}`);
          }
          
        } else {
          setStage("failed");
          setErrorMessage("Transaction declined by bank. Please try another card.");
        }
      }, 2000);
    }
  };
  
  const resetPin = () => {
    setPinDigits(["", "", "", ""]);
    setCurrentPinIndex(0);
  };
  
  const handleClose = () => {
    navigate("/");
  };
  
  const retryTransaction = () => {
    setStage("verifying");
    setErrorMessage("");
    resetPin();
  };
  
  const renderStageContent = () => {
    switch (stage) {
      case "verifying":
        return (
          <div className="flex flex-col items-center">
            <LoaderCircle className="h-16 w-16 text-green-500 animate-spin mb-4" />
            <h2 className="text-xl font-medium mb-2">Authorize Payment</h2>
            <p className="text-muted-foreground">Please wait while we verify your payment</p>
          </div>
        );
        
      case "pin":
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium mb-6">Authorize Payment</h2>
            
            <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-4 flex items-center font-bold text-sm justify-center max-w-xs">
              <CreditCard className="h-4 w-4 mr-2" />
              <span>Leave card inside reader till the transaction is complete.</span>
            </div>
            
            <p className="text-muted-foreground mb-2">You are about to pay</p>
            <p className="text-2xl font-medium mb-6 text-green-600">₦{formatAmount(amount)}</p>
            
            <div className="flex gap-3 mb-8">
              {pinDigits.map((digit, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center"
                >
                  {digit ? (
                    <span className="text-green-600">•</span>
                  ) : ""}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  className="w-20 h-20 rounded-md bg-secondary hover:bg-secondary/80 flex items-center justify-center text-xl font-medium transition-colors text-green-600"
                  onClick={() => handlePinDigit(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className="w-20 h-20 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center text-lg font-medium transition-colors"
                onClick={resetPin}
              >
                Delete
              </button>
              <button
                className="w-20 h-20 rounded-md bg-secondary hover:bg-secondary/80 flex items-center justify-center text-xl font-medium transition-colors text-green-600"
                onClick={() => handlePinDigit(0)}
              >
                0
              </button>
              <div className="w-20 h-20"></div>
            </div>
          </div>
        );
        
      case "failed":
        return (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-destructive/20 p-4 mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-xl font-medium mb-2">Payment Failed</h2>
            <p className="text-center text-muted-foreground mb-6">{errorMessage}</p>
            <Button onClick={retryTransaction}>Retry Transaction</Button>
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      {renderStageContent()}
    </div>
  );
}

export default ProcessingPayment;
