
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Please enter both email and password");
    }
  };

  const handleBiometricLogin = () => {
    toast.info("Biometric login activated");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-white text-lg">EP</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your EasyPay account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">or</div>
            <div 
              className="flex items-center justify-center gap-2 text-blue-600 cursor-pointer hover:text-blue-700"
              onClick={handleBiometricLogin}
            >
              <Fingerprint className="h-5 w-5" />
              <span>Login with Biometrics</span>
            </div>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/get-started")}>
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
