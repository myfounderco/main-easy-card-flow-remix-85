
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePayment } from "@/contexts/PaymentContext";
import { ProcessingPayment } from "@/components/payment/ProcessingPayment";
import { X, ChevronLeft, AlertTriangle, CreditCard } from "lucide-react";

const ProcessPaymentPage = () => {
  const navigate = useNavigate();
  const { amount, formatAmount, transactions, addTransaction } = usePayment();
  const [pin, setPin] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  // Add some validation
  useEffect(() => {
    if (parseFloat(amount) <= 0) {
      navigate("/");
    }
  }, [amount, navigate]);
  
  // Auto-process when PIN is complete
  useEffect(() => {
    if (pin.length === 4) {
      handleSubmit();
    }
  }, [pin]);
  
  const handlePinDigit = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };
  
  const handlePinBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };
  
  const handleCancel = () => {
    // Instead of using resetPayment, we'll navigate back
    navigate("/");
  };
  
  const handleSubmit = () => {
    setErrorMessage(null);
    
    if (pin.length < 4) {
      setErrorMessage("Please enter a 4-digit PIN");
      return;
    }
    
    // Begin processing - in a real app this would validate the PIN with a payment processor
    setProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, let's say PIN 1234 is "correct"
      if (pin === "1234") {
        // Instead of setPaymentStatus, we'll create a transaction directly
        const numAmount = parseFloat(amount) || 0;
        const transaction = addTransaction({
          amount: numAmount,
          status: "completed",
          cardType: "Visa",
          cardLast4: "4321",
          receiptSent: false
        });
        navigate(`/receipt/${transaction.id}`);
      } else {
        setErrorMessage("Invalid PIN. Please try again.");
        setPin("");
        setProcessing(false);
      }
    }, 2000);
  };
  
  // Pin display with dots for entered digits
  const pinDisplay = () => {
    return (
      <div className="flex justify-center space-x-4 my-4">
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index}
            className={`h-4 w-4 rounded-full ${
              index < pin.length ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };
  
  if (processing) {
    return <ProcessingPayment />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <div className="flex items-center mb-4">
        <button 
          onClick={handleCancel}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex-1 text-center">
          <h1 className="text-xl font-medium">Authorize Payment</h1>
        </div>
        
        <div className="w-10"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center mb-20">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 flex items-center font-bold text-sm justify-center max-w-xs mx-auto">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>Leave card inside reader till the transaction is complete.</span>
          </div>
          
          <div>
            <p className="text-green-600 mb-2">You are about to pay</p>
            <h2 className="text-5xl font-bold mb-2 text-green-600">{formatAmount(amount)}</h2>
            <p className="text-muted-foreground text-sm">
              Ask the customer to enter their 4-digit PIN
            </p>
          </div>
          
          {errorMessage && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          {pinDisplay()}
          
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinDigit(num.toString())}
                  className="h-16 w-16 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-medium transition-colors mx-auto"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handlePinBackspace}
                className="h-16 w-16 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center mx-auto"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => handlePinDigit("0")}
                className="h-16 w-16 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-medium transition-colors mx-auto"
              >
                0
              </button>
              <div className="h-16 w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPaymentPage;
