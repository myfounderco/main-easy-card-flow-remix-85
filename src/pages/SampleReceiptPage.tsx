
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Share, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SampleReceiptPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"successful" | "failed">("successful");
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handlePrint = () => {
    toast.info("Print functionality would be connected to a receipt printer");
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Sample Receipt`,
        text: `EasyPay sample receipt template`,
      }).catch((error) => {
        toast.error("Error sharing receipt");
      });
    } else {
      toast.info("Sharing not supported on this device");
    }
  };

  const handleToggleStatus = () => {
    setStatus(status === "successful" ? "failed" : "successful");
  };
  
  const handleReportTransaction = () => {
    toast.info("Transaction reported. Our team will review it shortly.");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <h1 className="text-lg font-medium text-center -mt-9 text-gray-600">Sample Receipt</h1>
      </div>
      
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <div className="space-y-4 w-full">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="font-bold text-lg">Business Name Here</h3>
                <p className="text-xs text-gray-500">123 Business Address, City</p>
                <p className="text-xs text-gray-500">Tel: +234 800 123 4567</p>
                <p className="text-xs text-gray-500">WhatsApp: +234 800 123 4567</p>
                <p className="text-xs text-gray-500">RC Number: 1234567</p>
              </div>
              
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Receipt #</span>
                  <span className="font-mono">SAMPLE12345</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span>VISA ****1234</span>
                </div>
              </div>
              
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span>Item 1</span>
                  <span>₦2,500.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Item 2</span>
                  <span>₦4,000.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Item 3</span>
                  <span>₦1,800.00</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold py-2">
                <span>Total Amount</span>
                <span className="text-gray-700">₦8,300.00</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className={status === "successful" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {status === "successful" ? "Successful" : "Failed"}
                </span>
              </div>
              
              <div className="border-t pt-4 mt-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-5 w-5 rounded-full bg-blue-600 mr-1"></div>
                  <span className="font-semibold">
                    <span className="text-blue-600">Easy</span>
                    <span className="text-green-600">Pay</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500">www.easypay.com | support@easypay.com</p>
                <p className="text-xs text-gray-500">Customer Support: +234 800 1234 567</p>
                <p className="text-xs mt-2 text-gray-600 italic">
                  You too can start accepting card payments using our free mobile Card Reader POS.
                  Visit our website or download our app for more information.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-1.5"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-1.5"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline"
              className="flex items-center gap-1.5 text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100"
              onClick={handleReportTransaction}
            >
              <AlertTriangle className="h-4 w-4" />
              Report Transaction
            </Button>
          </div>
          
          <div className="mt-4">
            <Button onClick={handleToggleStatus} variant="ghost" className="w-full text-xs text-muted-foreground">
              (Demo: Click to toggle status)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleReceiptPage;
