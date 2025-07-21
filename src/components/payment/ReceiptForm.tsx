
import React from "react";
import { usePayment } from "@/contexts/PaymentContext";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ReceiptFormProps {
  transactionId: string;
}

export function ReceiptForm({ transactionId }: ReceiptFormProps) {
  const { transactions } = usePayment();
  
  const transaction = transactions.find(t => t.id === transactionId);
  
  if (!transaction) {
    return <div>Transaction not found</div>;
  }
  
  // Format phone number - replace +234 with 0 and mask all but last 4 digits
  const formatPhoneNumber = (phone: string | undefined) => {
    if (!phone) return "****3344";
    const cleaned = phone.replace(/^\+234/, "0");
    return `****${cleaned.slice(-4)}`;
  };
  
  const handleCopyId = () => {
    navigator.clipboard.writeText(transactionId);
    toast.success("Transaction ID copied to clipboard");
  };
  
  return (
    <div className="space-y-4 w-full">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
        <div className="text-center border-b pb-4">
          <h3 className="font-bold text-lg">John's Hardware Store</h3>
          <p className="text-xs text-blue-600">123 Main Street, Lagos</p>
          <p className="text-xs text-blue-600">Tel: 0800 123 4567</p>
          <p className="text-xs text-blue-600">WhatsApp: 0800 123 4567</p>
          <p className="text-xs text-blue-600">RC Number: 1234567</p>
        </div>
        
        <div className="space-y-2 border-b pb-4">
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-500">Transaction ID</span>
            <div className="flex items-center">
              <span className="font-mono">{transaction.id}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 ml-1" 
                onClick={handleCopyId}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date</span>
            <span>{transaction.date.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment Method</span>
            <span>{transaction.cardType} ****{transaction.cardLast4}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cardholder</span>
            <span>{transaction.customerName || "John Smith"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Phone</span>
            <span>{formatPhoneNumber(transaction.customerPhone)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-lg font-bold py-2">
          <span className="text-blue-600">Total Amount</span>
          <span className="text-blue-600">₦{transaction.amount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="capitalize text-green-500 font-medium">{transaction.status}</span>
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
          <p className="text-xs text-gray-500">Customer Support: 0800 1234 567</p>
          <p className="text-xs mt-2 text-gray-600 italic">
            You too can start accepting card payments using our free mobile card reader POS.
            Visit our website or download our app for more information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReceiptForm;
