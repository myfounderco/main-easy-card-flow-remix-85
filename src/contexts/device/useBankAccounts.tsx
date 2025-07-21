
import React, { useState, useEffect } from "react";
import { BankAccount } from "./types";
import { toast } from "sonner";

export interface UseBankAccountsResult {
  bankAccounts: BankAccount[];
  addBankAccount: (account: Omit<BankAccount, "id">) => void;
  removeBankAccount: (accountId: string) => void;
  setDefaultBankAccount: (accountId: string) => void;
}

export const useBankAccounts = (): UseBankAccountsResult => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAccounts = localStorage.getItem("bankAccounts");
    
    if (savedAccounts) {
      try {
        setBankAccounts(JSON.parse(savedAccounts));
      } catch (error) {
        console.error("Error parsing bank accounts from localStorage:", error);
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("bankAccounts", JSON.stringify(bankAccounts));
  }, [bankAccounts]);

  const addBankAccount = (account: Omit<BankAccount, "id">) => {
    const newAccount = {
      ...account,
      id: `account-${Date.now().toString(36)}`
    };
    
    // If this is the first account or it's set as default, ensure it's the only default
    if (account.isDefault || bankAccounts.length === 0) {
      setBankAccounts(prev => [
        ...prev.map(acc => ({ ...acc, isDefault: false })),
        newAccount
      ]);
    } else {
      setBankAccounts(prev => [...prev, newAccount]);
    }
    
    toast.success(`Bank account added: ${account.bankName}`);
  };

  const removeBankAccount = (accountId: string) => {
    const accountToRemove = bankAccounts.find(acc => acc.id === accountId);
    
    setBankAccounts(prev => {
      const filtered = prev.filter(acc => acc.id !== accountId);
      
      // If we removed the default account and there are other accounts,
      // make the first one the default
      if (accountToRemove?.isDefault && filtered.length > 0) {
        return [
          { ...filtered[0], isDefault: true },
          ...filtered.slice(1)
        ];
      }
      
      return filtered;
    });
    
    if (accountToRemove) {
      toast.info(`Bank account removed: ${accountToRemove.bankName}`);
    }
  };

  const setDefaultBankAccount = (accountId: string) => {
    setBankAccounts(prev => 
      prev.map(account => ({
        ...account,
        isDefault: account.id === accountId
      }))
    );
    
    const account = bankAccounts.find(acc => acc.id === accountId);
    if (account) {
      toast.success(`${account.bankName} set as default account`);
    }
  };

  return {
    bankAccounts,
    addBankAccount,
    removeBankAccount,
    setDefaultBankAccount
  };
};
