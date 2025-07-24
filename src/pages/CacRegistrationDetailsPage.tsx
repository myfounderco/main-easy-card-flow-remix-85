
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building, Info, CheckCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CacRegistrationDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [nin, setNin] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showLimitationDialog, setShowLimitationDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  
  // Check if the user came from profile page or business registration flow
  const fromProfileUpdate = location.state?.fromProfile === true;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName || !businessAddress || !state || !lga || !nin || !businessCategory) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setShowPaymentDialog(true);
  };

  const handlePaymentConfirmed = () => {
    setShowPaymentDialog(false);
    setShowConfirmationDialog(true);
  };
  
  const handleConfirmationDone = () => {
    setShowConfirmationDialog(false);
    
    if (fromProfileUpdate) {
      // If user came from profile page, return to profile
      navigate("/profile");
    } else {
      // If user came from signup flow, go to reader setup
      navigate("/reader-setup");
    }
  };
  
  const handleSkipForNow = () => {
    setShowLimitationDialog(true);
  };
  
  const handleAcceptLimitations = () => {
    setShowLimitationDialog(false);
    
    if (fromProfileUpdate) {
      // If user came from profile page, return to profile
      navigate("/profile");
    } else {
      // If user came from signup flow, go to reader setup
      navigate("/reader-setup");
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium">Business Name Registration</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">
                Registration costs ₦22,000
              </p>
              <p className="text-sm text-blue-600">
                EasyPay will subsidize ₦10,000 of this cost, so you'll only pay ₦12,000.
              </p>
              <p className="text-sm text-blue-600 mt-1">
                We only offer Business Name Registration (sole proprietorship).
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name (Required)</Label>
            <Input 
              id="businessName" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. John's Hardware Store"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nin">NIN (Required)</Label>
            <Input 
              id="nin" 
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              placeholder="Enter your NIN"
            />
            <p className="text-xs text-blue-600">Your National Identification Number is required for CAC registration</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessCategory">Business Category (Required)</Label>
            <Select value={businessCategory} onValueChange={setBusinessCategory}>
              <SelectTrigger id="businessCategory">
                <SelectValue placeholder="Select business category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail Shop</SelectItem>
                <SelectItem value="restaurant">Restaurant/Food</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion/Clothing</SelectItem>
                <SelectItem value="grocery">Grocery Store</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="hardware">Hardware Store</SelectItem>
                <SelectItem value="services">Professional Services</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address (Required)</Label>
            <Input 
              id="businessAddress" 
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              placeholder="Business Address"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State (Required)</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="kano">Kano</SelectItem>
                  <SelectItem value="rivers">Rivers</SelectItem>
                  <SelectItem value="oyo">Oyo</SelectItem>
                  <SelectItem value="kaduna">Kaduna</SelectItem>
                  <SelectItem value="enugu">Enugu</SelectItem>
                  {/* Add more states */}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lga">LGA (Required)</Label>
              <Select value={lga} onValueChange={setLga}>
                <SelectTrigger id="lga">
                  <SelectValue placeholder="Select LGA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ikeja">Ikeja</SelectItem>
                  <SelectItem value="lekki">Lekki</SelectItem>
                  <SelectItem value="surulere">Surulere</SelectItem>
                  <SelectItem value="oshodi">Oshodi</SelectItem>
                  <SelectItem value="yaba">Yaba</SelectItem>
                  {/* Add more LGAs */}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-6 flex gap-4">
            <Button 
              type="button"
              variant="outline"
              onClick={handleSkipForNow}
              className="flex-1 text-blue-600 font-medium bg-white"
            >
              DO THIS LATER
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              Proceed to Payment
              <Building className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-center text-blue-600 mt-4">
            Registration process takes approximately 5 days. We'll notify you once completed.
          </p>
        </form>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Information</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Regular Registration Cost:</span>
                <span className="text-gray-500 line-through">₦22,000</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">EasyPay Subsidy:</span>
                <span className="text-green-600 font-medium">-₦10,000</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="font-medium">You Pay:</span>
                <span className="text-blue-700 font-bold">₦12,000</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <p className="font-medium text-gray-800 mb-1">Account Details:</p>
              <p className="text-gray-700">Bank: <span className="font-bold text-blue-600">First Bank</span></p>
              <div className="flex items-center">
                <p className="text-gray-700">Account Number: <span className="font-bold text-blue-600">1234567890</span></p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2 h-6 w-6"
                  onClick={() => {
                    navigator.clipboard.writeText("1234567890");
                    toast.success("Account number copied to clipboard");
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-gray-700">Account Name: <span className="font-bold text-blue-600">EasyPay Nigeria Ltd</span></p>
            </div>
            
            <p className="text-sm text-blue-600">
              Please make your payment to the above account. Once your payment is confirmed, your CAC registration process will begin.
            </p>
            
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md"
              onClick={handlePaymentConfirmed}
            >
              I have made the payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent>
          <div className="flex flex-col items-center py-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-xl font-medium mb-4 text-center">Payment Confirmed</h2>
            
            <div className="bg-blue-600 text-white p-4 rounded-lg mb-6 w-full">
              <p className="mb-3">
                Your CAC registration will take 5 days to be finalized. You can proceed with transactions, but your account will be limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>₦10,000 per transaction</li>
                <li>₦100,000 in total daily transactions</li>
              </ul>
              <p>These limits will be lifted once your registration is complete.</p>
            </div>
            
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={handleConfirmationDone}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showLimitationDialog} onOpenChange={setShowLimitationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Info className="mr-2 h-5 w-5 text-amber-500" />
              Transaction Limitations
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-amber-600 font-medium mb-4">
              Without a registered business you will only be able to process:
            </p>
            
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>Maximum of ₦10,000 per transaction</li>
              <li>Maximum of ₦100,000 in daily transactions</li>
            </ul>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowLimitationDialog(false)}
                className="flex-1"
              >
                Go back to registration
              </Button>
              <Button 
                onClick={handleAcceptLimitations}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CacRegistrationDetailsPage;
