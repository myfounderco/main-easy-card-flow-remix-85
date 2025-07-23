
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface OTPAutoVerificationProps {
  onVerify: () => void;
  message?: string;
}

export const OTPAutoVerification = ({ onVerify, message = "We've sent a 6-digit OTP to your registered phone number" }: OTPAutoVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    // Check if all OTP fields are filled
    if (otp.every(digit => digit !== "") && otp.length === 6) {
      // Auto verify after a short delay to allow user to see the filled fields
      const timer = setTimeout(() => {
        toast.success("Verification successful");
        onVerify();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [otp, onVerify]);
  
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If user pastes multiple digits, distribute them across inputs
      const digits = value.split("").slice(0, 6);
      const newOtp = [...otp];
      
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      
      setOtp(newOtp);
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to clear current field and move focus back
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-center text-muted-foreground">
        {message}
      </p>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-6 gap-2 w-full max-w-xs">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              className="w-full text-center p-0 text-lg font-medium text-blue-500"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
              autoComplete={i === 0 ? "one-time-code" : "off"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTPAutoVerification;
