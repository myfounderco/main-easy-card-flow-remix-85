
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
          
          <div className="bg-blue-500 text-white p-4 rounded-lg space-y-3">
            <p>Your CAC registration will take 5 days to be finalized. You can proceed with transactions, but your account will be limited to:</p>
            <ul className="space-y-1 text-sm">
              <li>• ₦10,000 per transaction</li>
              <li>• ₦100,000 in total daily transactions</li>
            </ul>
            <p className="text-sm">These limits will be lifted once your registration is complete.</p>
          </div>
          
          <Button
            onClick={onDone}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
