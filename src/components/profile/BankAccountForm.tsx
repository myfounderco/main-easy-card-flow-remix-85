import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useDevice } from "@/contexts/DeviceContext";

const BANK_OPTIONS = [
  { value: "access", label: "Access Bank" },
  { value: "firstbank", label: "First Bank" },
  { value: "gtb", label: "Guaranty Trust Bank" },
  { value: "uba", label: "United Bank for Africa" },
  { value: "zenith", label: "Zenith Bank" },
  { value: "stanbic", label: "Stanbic IBTC" },
  { value: "fcmb", label: "FCMB" },
  { value: "fidelity", label: "Fidelity Bank" },
  { value: "ecobank", label: "Ecobank" },
  { value: "union", label: "Union Bank" },
];

interface BankAccountFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const BankAccountForm: React.FC<BankAccountFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { addBankAccount } = useDevice();
  const [loading, setLoading] = useState(false);
  const [bvn, setBvn] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!bvn || !bankName || !accountNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    // Simulate API call for name resolution
    setTimeout(() => {
      const selectedBank = BANK_OPTIONS.find(bank => bank.value === bankName);
      const resolvedAccountName = accountName || "John Doe (Demo)";
      
      // Add the bank account using the context (without bvn as it's not part of BankAccount interface)
      addBankAccount({
        bankName: selectedBank?.label || bankName,
        accountNumber,
        accountName: resolvedAccountName,
        isDefault: false
      });
      
      setLoading(false);
      onSuccess();
      toast.success("Bank account added successfully");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="bvn">BVN (Bank Verification Number)</Label>
          <Input
            id="bvn"
            placeholder="Enter your BVN"
            value={bvn}
            onChange={(e) => setBvn(e.target.value)}
            required
          />
          <p className="text-xs text-blue-600 mt-1">
            Your BVN is used to verify your identity and retrieve your account details. Don't know your BVN? Dial *565*0# on your phone to check.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bank">Bank Name</Label>
          <Select value={bankName} onValueChange={setBankName}>
            <SelectTrigger id="bank">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              {BANK_OPTIONS.map((bank) => (
                <SelectItem key={bank.value} value={bank.value}>
                  {bank.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="account-number">Account Number</Label>
          <Input
            id="account-number"
            placeholder="Enter your account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            inputMode="numeric"
            maxLength={10}
            required
          />
        </div>

        {accountNumber.length === 10 && bankName && (
          <div className="py-4 px-3 bg-gray-50 rounded-md border">
            <p className="text-sm font-medium">Account Name:</p>
            <p className="text-sm">{accountName || "John Doe (Demo)"}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-full">
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="rounded-full">
            {loading ? "Adding..." : "Add Account"}
          </Button>
        </div>
      </div>
    </form>
  );
};
