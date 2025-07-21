
import React from "react";
import { CreditCard, Trash2, CheckCircle, Building } from "lucide-react";
import { useDevice } from "@/contexts/DeviceContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BankAccountListProps {
  onRemove?: (accountId: string) => void;
}

export function BankAccountList({ onRemove }: BankAccountListProps) {
  const { bankAccounts, setDefaultBankAccount } = useDevice();
  
  if (bankAccounts.length === 0) {
    return (
      <div className="text-center py-4">
        <Building className="h-10 w-10 text-green-500 mx-auto mb-2" />
        <p>No bank accounts added yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {bankAccounts.map((account) => (
        <Card key={account.id} className={`${account.isDefault ? "border-blue-500 bg-white" : "bg-white border-blue-500"} transition-all hover:shadow-sm`}>
          <CardContent className="p-3">
            <div className="flex flex-col">
              <div className="flex justify-between mb-1">
                <div>
                  <h3 className="font-medium text-sm text-blue-500">{account.bankName}</h3>
                  <p className="text-base font-medium text-blue-500">{account.accountName}</p>
                  <p className="text-base font-mono font-medium text-blue-500">{account.accountNumber}</p>
                </div>
                <div>
                  {account.isDefault ? (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Deposit Account
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs bg-green-100 text-green-600 hover:bg-green-200 h-6"
                      onClick={() => setDefaultBankAccount(account.id)}
                    >
                      Use for Deposits
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 h-6 text-xs"
                  onClick={() => onRemove ? onRemove(account.id) : null}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Remove account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default BankAccountList;
