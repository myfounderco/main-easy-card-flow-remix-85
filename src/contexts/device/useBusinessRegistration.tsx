
import React, { useState, useEffect } from "react";

export interface UseBusinessRegistrationResult {
  hasBusinessRegistration: boolean;
  setHasBusinessRegistration: (value: boolean) => void;
}

export const useBusinessRegistration = (): UseBusinessRegistrationResult => {
  const [hasBusinessRegistration, setHasBusinessRegistration] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBusinessRegistration = localStorage.getItem("hasBusinessRegistration");
    
    if (savedBusinessRegistration) {
      try {
        setHasBusinessRegistration(JSON.parse(savedBusinessRegistration));
      } catch (error) {
        console.error("Error parsing business registration status from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("hasBusinessRegistration", JSON.stringify(hasBusinessRegistration));
  }, [hasBusinessRegistration]);

  return {
    hasBusinessRegistration,
    setHasBusinessRegistration
  };
};
