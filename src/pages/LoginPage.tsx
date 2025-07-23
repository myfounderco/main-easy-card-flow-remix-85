
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Camera, Fingerprint } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OTPAutoVerification } from "@/components/profile/OTPAutoVerification";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [bvn, setBvn] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [signupPin, setSignupPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showSignupPin, setShowSignupPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpTitle, setOtpTitle] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpCallback, setOtpCallback] = useState<() => void>(() => {});
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    if (!phoneNumber || !pin) {
      toast.error("Please enter both phone number and PIN");
      setLoading(false);
      return;
    }
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      navigate("/");
      toast.success("Login successful");
    }, 1000);
  };
  
  const handleBiometricLogin = () => {
    toast.info("Biometric authentication would be initiated here");
    // Simulate biometric login
    setTimeout(() => {
      navigate("/");
      toast.success("Biometric login successful");
    }, 2000);
  };
  
  const handleForgotPassword = () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    
    setOtpTitle("Verify Your Phone Number");
    setOtpMessage("We've sent a 6-digit OTP to your phone number");
    setOtpCallback(() => handlePasswordReset);
    setShowOtpDialog(true);
  };

  const handlePasswordReset = () => {
    setShowOtpDialog(false);
    toast.success("Password reset instructions sent to your phone");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!phoneNumber || !bvn || !dateOfBirth || !signupPin || !bankName || !accountNumber) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setOtpTitle("Verify Your Phone Number");
    setOtpMessage("We've sent a 6-digit OTP to your phone number");
    setOtpCallback(() => completeSignup);
    setShowOtpDialog(true);
  };

  const completeSignup = () => {
    setShowOtpDialog(false);
    // After sign up, take them to the Business Registration Check page
    navigate("/business-registration-check");
    toast.success("Account created successfully");
  };

  const handleTakeSelfie = () => {
    toast.info("Camera functionality would open here");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-blue-600">Easy</span>
            <span className="text-green-600">Pay</span>
          </h1>
        </div>
        
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="phone-login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phone-login" className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  id="phone-number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pin">4-Digit PIN</Label>
                </div>
                <div className="relative">
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="Enter your 4-digit PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    required
                    maxLength={4}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="text-right">
                  <button 
                    type="button" 
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot PIN?
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full py-6"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="relative flex items-center justify-center">
                <hr className="w-full border-t border-gray-300" />
                <span className="absolute bg-background px-3 text-sm text-gray-500">or</span>
              </div>
              
              <Button
                type="button"
                variant="outline" 
                onClick={handleBiometricLogin}
                className="w-full flex justify-center items-center gap-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700"
              >
                <Fingerprint className="h-5 w-5" />
                Login with Biometrics
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      id="dob"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                    <Camera className="h-6 w-6 text-gray-400" />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleTakeSelfie}
                    className="flex-1"
                  >
                    Take Selfie
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-pin">Create 4-Digit PIN</Label>
                <div className="relative">
                  <Input
                    id="signup-pin"
                    type={showSignupPin ? "text" : "password"}
                    placeholder="Create a 4-digit PIN"
                    value={signupPin}
                    onChange={(e) => setSignupPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    required
                    maxLength={4}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowSignupPin(!showSignupPin)}
                  >
                    {showSignupPin ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="text-blue-600 font-medium mt-4 mb-2">
                Enter your bank account details
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bvn">BVN (Bank Verification Number)</Label>
                <Input
                  id="bvn"
                  type="text"
                  placeholder="Enter your BVN"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  required
                />
                <p className="text-xs text-blue-600 mt-1">
                  Don't know your BVN? Dial *565*0# on your phone to check.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bankName">Select Bank</Label>
                <Select value={bankName} onValueChange={setBankName} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {BANK_OPTIONS.map(bank => (
                      <SelectItem key={bank.value} value={bank.value}>
                        {bank.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  placeholder="Enter your account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  required
                  maxLength={10}
                />
                <p className="text-xs text-blue-600">Your funds will be deposited into this account instantly after every transaction.</p>
              </div>
              
              <Button
                type="submit"
                className="w-full py-6 mt-4"
              >
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{otpTitle}</DialogTitle>
          </DialogHeader>
          <OTPAutoVerification onVerify={otpCallback} message={otpMessage} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
