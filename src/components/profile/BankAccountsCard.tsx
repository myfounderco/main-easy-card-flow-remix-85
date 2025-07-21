
import React from "react";
import { CreditCard, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BankAccountList } from "./BankAccountList";

interface BankAccountsCardProps {
  onAddAccount: () => void;
  onRemoveAccount: (accountId: string) => void;
}

export const BankAccountsCard: React.FC<BankAccountsCardProps> = ({ 
  onAddAccount, 
  onRemoveAccount 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-300">
          <div className="relative h-6 w-6 flex-shrink-0 mr-2">
            <div className="relative">
              <CreditCard className="h-5 w-5 text-blue-300" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-300 rounded-full"></div>
            </div>
          </div>
          Bank Accounts
        </CardTitle>
        <CardDescription>
          Manage your bank accounts for receiving payments
        </CardDescription>
        <div className="text-sm text-green-600 pt-2">
          Payments will reflect instantly or within 24hrs
        </div>
      </CardHeader>
      <CardContent>
        <BankAccountList onRemove={onRemoveAccount} />
        
        <div className="flex flex-col space-y-3 mt-4">
          <Button
            className="w-full bg-payment-blue hover:bg-payment-darkBlue"
            onClick={onAddAccount}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Bank Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
