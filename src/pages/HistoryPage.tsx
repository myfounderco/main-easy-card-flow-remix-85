
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, CreditCard, Search, FileCheck, AlertTriangle, UserCircle, Flag } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const HistoryPage = () => {
  const { transactions } = usePayment();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTransactions = transactions.filter(transaction => {
    const searchValue = searchTerm.toLowerCase();
    return (
      transaction.id.toLowerCase().includes(searchValue) ||
      transaction.amount.toString().includes(searchValue) ||
      (transaction.customerName && transaction.customerName.toLowerCase().includes(searchValue)) ||
      transaction.date.toLocaleDateString().includes(searchValue)
    );
  });
  
  // Calculate lifetime sales total (completed transactions only)
  const lifetimeSales = transactions
    .filter(t => t.status === "completed")
    .reduce((total, t) => total + t.amount, 0);
  
  // Calculate today's sales total (completed transactions only)
  const today = new Date().toLocaleDateString();
  const todaySales = transactions
    .filter(t => t.status === "completed" && t.date.toLocaleDateString() === today)
    .reduce((total, t) => total + t.amount, 0);
  
  const handleViewReceipt = (id: string) => {
    navigate(`/receipt/${id}`);
  };
  
  const handleReportTransaction = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent navigating to receipt page
    toast.success(`Transaction ${id.slice(0, 8)} reported for review`);
  };
  
  const groupTransactionsByDate = () => {
    const groups: { [date: string]: typeof transactions } = {};
    
    filteredTransactions.forEach(transaction => {
      const dateKey = transaction.date.toLocaleDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
    });
    
    return groups;
  };
  
  const groupedTransactions = groupTransactionsByDate();
  
  return (
    <div className="min-h-screen flex flex-col pb-16 bg-background">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-medium">Sales History</h1>
      </div>
      
      <div className="p-4 bg-card rounded-md mx-4 mb-4">
        <div className="flex justify-between mb-3 pb-3 border-b border-border">
          <div>
            <p className="text-sm text-muted-foreground">Today's Sales</p>
            <p className="text-xl font-semibold text-green-600">₦{todaySales.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Lifetime Sales</p>
            <p className="text-xl font-semibold text-blue-600">₦{lifetimeSales.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="px-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="text-center py-12">
            <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Transactions Yet</h3>
            <p className="text-muted-foreground">Start accepting payments to see your transaction history.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(([date, transactionsForDate]) => (
              <div key={date}>
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <h3 className="text-sm font-medium">{date}</h3>
                </div>
                
                <div className="space-y-3">
                  {transactionsForDate.map(transaction => (
                    <div
                      key={transaction.id}
                      className="p-3 border border-border rounded-lg bg-card transition-all duration-200 hover:border-primary/50"
                      onClick={() => handleViewReceipt(transaction.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {transaction.cardType && transaction.cardLast4 
                                ? `${transaction.cardType} ****${transaction.cardLast4}`
                                : "Card Payment"
                              }
                            </span>
                            {transaction.customerName && (
                              <span className="text-xs text-muted-foreground">
                                {transaction.customerName}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-medium text-gray-600">₦{transaction.amount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {transaction.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs"
                            onClick={(e) => handleReportTransaction(e, transaction.id)}
                          >
                            <Flag className="h-3 w-3 mr-1 text-amber-500" />
                            Report
                          </Button>
                          <div className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            transaction.status === "completed" && "bg-success/10 text-success",
                            transaction.status === "failed" && "bg-destructive/10 text-destructive",
                            transaction.status === "pending" && "bg-amber-500/10 text-amber-500"
                          )}>
                            {transaction.status === "completed" && (
                              <span className="flex items-center">
                                <FileCheck className="h-3 w-3 mr-1" />
                                Successful
                              </span>
                            )}
                            {transaction.status === "failed" && (
                              <span className="flex items-center">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Failed
                              </span>
                            )}
                            {transaction.status === "pending" && (
                              <span className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse mr-1"></span>
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HistoryPage;
