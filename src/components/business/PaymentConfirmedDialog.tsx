
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Check } from "lucide-react";

interface PaymentConfirmedDialogProps {
  open: boolean;
  onDone: () => void;
}

export const PaymentConfirmedDialog = ({ open, onDone }: PaymentConfirmedDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md [&>button]:hidden">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold text-green-600">Payment Confirmed</h2>
          
          <p className="text-gray-600">
            Your payment has been received and your business registration is now in progress.
          </p>
          
          <div className="bg-green-50 p-4 rounded-lg space-y-3">
            <h3 className="font-medium text-green-700">What happens next:</h3>
            <div className="space-y-2 text-sm text-green-600">
              <div className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-0.5" />
                <span>Processing time: 7-14 business days</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-0.5" />
                <span>You'll receive updates via email and SMS</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-0.5" />
                <span>Transaction limits will be lifted upon completion</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onDone}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
