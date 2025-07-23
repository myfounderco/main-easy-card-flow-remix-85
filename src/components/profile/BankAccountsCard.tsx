
import React from "react";
import { BankAccountList } from "@/components/profile/BankAccountList";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
        <CardTitle className="flex items-center text-green-500">
          <div className="h-6 w-6 flex-shrink-0 mr-2">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
              <path d="M3 21V11L12 5L21 11V21H3Z" stroke="currentColor" strokeWidth="2" />
              <path d="M6 21V15H10V21" stroke="currentColor" strokeWidth="2" />
              <path d="M14 21V15H18V21" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          Bank Accounts
        </CardTitle>
        <CardDescription>
          Add your bank accounts for deposits
        </CardDescription>
        <p className="text-xs text-blue-500">
          Payments will reflect instantly or within 24hrs
        </p>
      </CardHeader>
      <CardContent>
        <BankAccountList onRemove={onRemoveAccount} />
        
        <Button 
          className="w-full mt-4 rounded-full"
          onClick={onAddAccount}
        >
          Add New Bank Account
        </Button>
      </CardContent>
    </Card>
  );
};
