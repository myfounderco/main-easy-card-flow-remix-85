
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface PaymentInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentMade: () => void;
}

export const PaymentInfoDialog = ({ open, onOpenChange, onPaymentMade }: PaymentInfoDialogProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">Payment Information</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Cost Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Business Name Registration</span>
                <span>₦15,000</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>EasyPay Subsidy</span>
                <span>-₦10,000</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total Amount</span>
                <span>₦5,000</span>
              </div>
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="space-y-4">
            <h3 className="font-medium">Make Payment to:</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Account Name</p>
                  <p className="font-medium">EasyPay Business Services</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard("EasyPay Business Services", "Account name")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-medium">0123456789</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard("0123456789", "Account number")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Bank</p>
                  <p className="font-medium">GTBank</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard("GTBank", "Bank name")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <div>
                  <p className="text-sm text-blue-600">Amount</p>
                  <p className="font-bold text-blue-600">₦5,000</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard("5000", "Amount")}
                >
                  <Copy className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            After making the payment, click "I have made the payment" below
          </div>
          
          <Button
            onClick={onPaymentMade}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            I have made the payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
