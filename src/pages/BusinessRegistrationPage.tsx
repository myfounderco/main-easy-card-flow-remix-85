import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BottomNav } from "@/components/layout/BottomNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const BusinessRegistrationPage = () => {
  const [businessName, setBusinessName] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    if (!businessName || !rcNumber) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setShowConfirmation(true);
    }, 1000);
  };
  
  const handleConfirmation = () => {
    setShowConfirmation(false);
    toast.success("Business registration details saved!");
    navigate("/profile");
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16 bg-background">
      <div className="p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left h-5 w-5"
          >
            <path d="M3 12h18" />
            <path d="m12 5-7 7 7 7" />
          </svg>
        </Button>
      </div>
      
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2">Business Registration</h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-600 text-center">
              The Central Bank of Nigeria (CBN) has mandated that all POS operators must have a registered business. Skipping this will limit your account to ₦10,000 per transaction and ₦100,000 daily.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                type="text"
                id="businessName"
                placeholder="Enter business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rcNumber">RC Number</Label>
              <Input
                type="text"
                id="rcNumber"
                placeholder="Enter RC number"
                value={rcNumber}
                onChange={(e) => setRcNumber(e.target.value)}
              />
            </div>
            
            <Button className="w-full rounded-full" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Details</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit these details?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowConfirmation(false)} className="rounded-full">
              Edit
            </Button>
            <Button type="submit" onClick={handleConfirmation} className="rounded-full">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNav />
    </div>
  );
};

export default BusinessRegistrationPage;
