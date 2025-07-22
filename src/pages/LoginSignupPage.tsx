
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Fingerprint, Camera, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OTPAutoVerification } from "@/components/profile/OTPAutoVerification";

const LoginSignupPage = () => {
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [pin, setPin] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bvn, setBvn] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const navigate = useNavigate();

  const banks = [
    "Access Bank", "GTBank", "First Bank", "UBA", "Zenith Bank",
    "Fidelity Bank", "FCMB", "Sterling Bank", "Union Bank", "Wema Bank"
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmailOrPhone && loginPassword) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Please enter both email/phone and password");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupFirstName || !signupLastName || !signupEmail || !signupPassword || !signupPhone || !dateOfBirth || !pin || !bankAccount || !bvn || !selectedBank) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }
    
    setShowOtpVerification(true);
  };

  const handleOtpVerification = () => {
    toast.success("Account created successfully!");
    navigate("/business-registration-check");
    setShowOtpVerification(false);
  };

  const handleBiometricLogin = () => {
    toast.info("Biometric login activated");
    navigate("/");
  };

  const handleForgotPassword = () => {
    toast.info("Forgot password feature will be implemented soon");
  };

  if (showOtpVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="font-bold text-white text-lg">EP</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Verify Your Phone</CardTitle>
            <CardDescription>We've sent a verification code to {signupPhone}</CardDescription>
          </CardHeader>
          <CardContent>
            <OTPAutoVerification 
              onVerify={handleOtpVerification}
              message={`We've sent a 6-digit OTP to ${signupPhone}`}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-white text-lg">EP</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to EasyPay</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email-phone">Phone Number or Email</Label>
                  <Input
                    id="login-email-phone"
                    type="text"
                    placeholder="Enter your phone number or email"
                    value={loginEmailOrPhone}
                    onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-600 text-sm hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>
                
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={handleBiometricLogin}
                  className="w-auto mx-auto flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <Fingerprint className="h-5 w-5" />
                  <span>Login with Biometrics</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-firstname">First Name</Label>
                    <Input
                      id="signup-firstname"
                      type="text"
                      placeholder="First name"
                      value={signupFirstName}
                      onChange={(e) => setSignupFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-lastname">Last Name</Label>
                    <Input
                      id="signup-lastname"
                      type="text"
                      placeholder="Last name"
                      value={signupLastName}
                      onChange={(e) => setSignupLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-of-birth">Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => toast.info("Camera feature will be implemented")}
                >
                  <Camera className="h-4 w-4" />
                  Take Selfie
                </Button>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-pin">Create 4-Digit PIN</Label>
                  <div className="relative">
                    <Input
                      id="signup-pin"
                      type={showPin ? "text" : "password"}
                      placeholder="Create a 4-digit PIN"
                      value={pin}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setPin(value);
                      }}
                      maxLength={4}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPin(!showPin)}
                    >
                      {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bank-account">Bank Account Number</Label>
                  <Input
                    id="bank-account"
                    type="text"
                    placeholder="Enter your bank account number"
                    value={bankAccount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setBankAccount(value);
                    }}
                    maxLength={10}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
                  <Input
                    id="bvn"
                    type="text"
                    placeholder="Enter your BVN"
                    value={bvn}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setBvn(value);
                    }}
                    maxLength={11}
                    required
                  />
                  <p className="text-xs text-blue-600">
                    Don't know your BVN? Dial *565*0# on your phone to check.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bank-select">Select Bank</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginSignupPage;
