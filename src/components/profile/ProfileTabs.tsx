
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsTab } from "./AccountsTab";
import { DevicesCard } from "./DevicesCard";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddAccount: () => void;
  onRemoveAccount: (accountId: string) => void;
  onAddCacDetails: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
  onChatSupport: () => void;
  onContactVia: (platform: string) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
  onAddAccount,
  onRemoveAccount,
  onAddCacDetails,
  onChangePassword,
  onLogout,
  onChatSupport,
  onContactVia
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="account">Bank Account</TabsTrigger>
        <TabsTrigger value="devices">Card Readers (POS)</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <AccountsTab 
          onAddAccount={onAddAccount}
          onRemoveAccount={onRemoveAccount}
          onAddCacDetails={onAddCacDetails}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          onChatSupport={onChatSupport}
          onContactVia={onContactVia}
        />
      </TabsContent>
      
      <TabsContent value="devices">
        <DevicesCard />
      </TabsContent>
    </Tabs>
  );
};
