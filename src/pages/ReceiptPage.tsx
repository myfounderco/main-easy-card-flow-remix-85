
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Share, CheckCircle, AlertTriangle, Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/contexts/PaymentContext";
import { ReceiptForm } from "@/components/payment/ReceiptForm";
import { toast } from "sonner";

const ReceiptPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { transactions } = usePayment();
  
  const transaction = id ? transactions.find(t => t.id === id) : null;
  
  const handleGoBack = () => {
    navigate("/history");
  };
  
  const handlePrint = () => {
    toast.info("Print functionality would be connected to a receipt printer");
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Receipt #${id}`,
        text: `Transaction receipt for ₦${transaction?.amount.toFixed(2)}`,
      }).catch((error) => {
        toast.error("Error sharing receipt");
      });
    } else {
      toast.info("Sharing not supported on this device");
    }
  };

  const handleReportTransaction = () => {
    toast.info("Transaction reported. Our team will review it shortly.");
  };

  const handleNewSale = () => {
    navigate("/");
  };
  
  const handleCopyId = () => {
    if (id) {
      navigator.clipboard.writeText(id);
      toast.success("Transaction ID copied to clipboard");
    }
  };
  
  if (!transaction) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={handleGoBack} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium mb-2">Receipt Not Found</h2>
            <p className="text-muted-foreground mb-4">The receipt you're looking for doesn't exist.</p>
            <Button onClick={handleGoBack} className="rounded-full">Go Back</Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={handleGoBack} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <h1 className="text-lg font-medium text-center -mt-9 text-gray-600">Receipt</h1>
      </div>
      
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center mb-4">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-xl font-medium mb-1">Transaction Successful</h2>
            <h3 className="text-3xl font-medium mb-1 text-success">₦{transaction.amount.toFixed(2)}</h3>
            <p className="text-muted-foreground">
              {transaction.date.toLocaleDateString()} at {transaction.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="text-center text-blue-500 text-sm mb-3">
            Receipt has been sent to card holder's linked phone number and email (scroll down for more details)
          </div>
          
          <div className="w-full mb-4">
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 h-14 text-lg"
              onClick={handleNewSale}
            >
              <Plus className="h-5 w-5 mr-2" /> New Sale
            </Button>
          </div>
          
          <ReceiptForm transactionId={transaction.id} />
          
          <div className="flex justify-center space-x-3 my-4">
            <Button 
              onClick={handlePrint}
              variant="outline"
              className="flex items-center gap-1.5 text-green-600 border-green-200 bg-green-50 hover:bg-green-100 rounded-full"
              size="sm"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="flex items-center gap-1.5 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-full"
              size="sm"
            >
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-1.5 text-red-600 border-red-200 bg-red-50 hover:bg-red-100 rounded-full"
              onClick={handleReportTransaction}
              size="sm"
            >
              <AlertTriangle className="h-4 w-4" />
              Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
