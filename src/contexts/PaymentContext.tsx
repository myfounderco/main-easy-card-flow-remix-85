
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  status: "completed" | "failed" | "pending";
  cardType?: string;
  cardLast4?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  receiptSent: boolean;
}

interface PaymentContextType {
  amount: string;
  setAmount: (amount: string) => void;
  addDigit: (digit: string) => void;
  clearAmount: () => void;
  deleteLastDigit: () => void;
  formatAmount: (value: string) => string;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => Transaction;
  currentTransaction: Transaction | null;
  setCurrentTransaction: (transaction: Transaction | null) => void;
  sendReceipt: (transactionId: string, email: string) => Promise<boolean>;
  runningTotal: number;
  addToRunningTotal: () => void;
  clearRunningTotal: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [amount, setAmount] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [runningTotal, setRunningTotal] = useState<number>(0);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions);
        const formattedTransactions = parsedTransactions.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("Error parsing transactions from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const addDigit = (digit: string) => {
    if (digit === "." && amount.includes(".")) return;
    
    if (digit === "." && amount === "") {
      setAmount("0.");
      return;
    }
    
    if (amount.includes(".") && amount.split(".")[1].length >= 2) return;
    
    if (!amount.includes(".") && amount.length >= 7) return;
    
    if (digit === "+") return;
    
    setAmount((prev) => prev + digit);
  };

  const clearAmount = () => {
    setAmount("");
  };

  const deleteLastDigit = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const formatAmount = (value: string): string => {
    if (!value) return "0.00";
    
    let numValue = parseFloat(value);
    if (isNaN(numValue)) return "0.00";
    
    if (value.includes(".")) {
      const parts = value.split(".");
      const decimalPart = parts[1].padEnd(2, "0").substring(0, 2);
      return `${Number(parts[0]).toLocaleString()}.${decimalPart}`;
    }
    
    return `${Number(value).toLocaleString()}.00`;
  };

  const addToRunningTotal = () => {
    if (!amount || amount === "0") return;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;
    
    setRunningTotal(prev => prev + numAmount);
    toast.success(`Added ₦${formatAmount(amount)} to total`, {
      description: `New total: ₦${(runningTotal + numAmount).toFixed(2)}`,
      duration: 2000
    });
    clearAmount();
  };

  const clearRunningTotal = () => {
    setRunningTotal(0);
    clearAmount();
    toast.info("Amount cleared");
  };

  const addTransaction = (transaction: Omit<Transaction, "id" | "date">): Transaction => {
    const newTransaction = {
      ...transaction,
      id: generateTransactionId(),
      date: new Date()
    };
    
    setTransactions((prev) => [newTransaction, ...prev]);
    setCurrentTransaction(newTransaction);
    return newTransaction;
  };

  const generateTransactionId = (): string => {
    return `TRX-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().substring(8)}`;
  };

  const sendReceipt = async (transactionId: string, email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTransactions((prev) => 
          prev.map(transaction => 
            transaction.id === transactionId 
              ? { ...transaction, receiptSent: true, customerEmail: email } 
              : transaction
          )
        );
        
        toast.success(`Receipt sent to ${email}`);
        resolve(true);
      }, 1500);
    });
  };

  return (
    <PaymentContext.Provider 
      value={{ 
        amount,
        setAmount,
        addDigit,
        clearAmount,
        deleteLastDigit,
        formatAmount,
        transactions,
        addTransaction,
        currentTransaction,
        setCurrentTransaction,
        sendReceipt,
        runningTotal,
        addToRunningTotal,
        clearRunningTotal
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
