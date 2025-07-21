
import React from "react";
import { BankAccountsCard } from "./BankAccountsCard";
import { SettingsCard } from "./SettingsCard";
import { SupportSection } from "./SupportSection";

interface AccountsTabProps {
  onAddAccount: () => void;
  onRemoveAccount: (accountId: string) => void;
  onAddCacDetails: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
  onChatSupport: () => void;
  onContactVia: (platform: string) => void;
}

export const AccountsTab: React.FC<AccountsTabProps> = ({
  onAddAccount,
  onRemoveAccount,
  onAddCacDetails,
  onChangePassword,
  onLogout,
  onChatSupport,
  onContactVia
}) => {
  return (
    <div className="space-y-4">
      <BankAccountsCard 
        onAddAccount={onAddAccount} 
        onRemoveAccount={onRemoveAccount} 
      />
      
      <SettingsCard 
        onAddCacDetails={onAddCacDetails}
        onChangePassword={onChangePassword}
        onLogout={onLogout}
      />
      
      <SupportSection 
        onChatSupport={onChatSupport}
        onContactVia={onContactVia}
      />
    </div>
  );
};
