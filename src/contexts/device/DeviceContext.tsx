
import React, { createContext, useContext } from "react";
import { BankAccount, CardReader } from "./types";
import { useCardReaders, UseCardReadersResult } from "./useCardReaders";
import { useBankAccounts, UseBankAccountsResult } from "./useBankAccounts";
import { useBusinessRegistration, UseBusinessRegistrationResult } from "./useBusinessRegistration";

// Combine all the hooks into one context type
export interface DeviceContextType extends 
  UseCardReadersResult,
  UseBankAccountsResult,
  UseBusinessRegistrationResult {}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cardReaders = useCardReaders();
  const bankAccounts = useBankAccounts();
  const businessRegistration = useBusinessRegistration();

  // Combine all the values from the hooks
  const value: DeviceContextType = {
    ...cardReaders,
    ...bankAccounts,
    ...businessRegistration
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};
