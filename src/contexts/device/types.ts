
export interface CardReader {
  id: string;
  name: string;
  connected: boolean;
  batteryLevel?: number;
  lastConnected?: Date;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  isDefault: boolean;
}
