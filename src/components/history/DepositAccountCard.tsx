
import React from "react";
import { CreditCard } from "lucide-react";
import { useDevice } from "@/contexts/DeviceContext";
import { Card, CardContent } from "@/components/ui/card";

export const DepositAccountCard: React.FC = () => {
  const { bankAccounts } = useDevice();
  
  // Get the default account or the first available account
  const depositAccount = bankAccounts.find(account => account.isDefault) || bankAccounts[0];
  
  if (!depositAccount) {
    return null;
  }
  
  return (
    <Card className="mb-4 bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm text-blue-800">Deposit Account</h3>
            <p className="text-sm text-blue-700 font-medium">{depositAccount.accountName}</p>
            <p className="text-xs text-blue-600">{depositAccount.bankName} • {depositAccount.accountNumber}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
