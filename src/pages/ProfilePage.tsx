
import React, { useState } from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { BusinessInfoCard } from "@/components/profile/BusinessInfoCard";
import { BankAccountsCard } from "@/components/profile/BankAccountsCard";
import { DevicesCard } from "@/components/profile/DevicesCard";
import { SettingsCard } from "@/components/profile/SettingsCard";
import { SupportSection } from "@/components/profile/SupportSection";
import { AccountsTab } from "@/components/profile/AccountsTab";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "profile");

  // Callback functions for the components
  const handleEditBusiness = () => {
    console.log("Edit business clicked");
  };

  const handleAddAccount = () => {
    console.log("Add account clicked");
  };

  const handleRemoveAccount = (accountId: string) => {
    console.log("Remove account clicked:", accountId);
  };

  const handleAddCacDetails = () => {
    console.log("Add CAC details clicked");
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleChatSupport = () => {
    console.log("Chat support clicked");
  };

  const handleContactVia = (platform: string) => {
    console.log("Contact via clicked:", platform);
  };

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />
      
      <div className="px-4 pb-20">
        <ProfileTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onAddAccount={handleAddAccount}
          onRemoveAccount={handleRemoveAccount}
          onAddCacDetails={handleAddCacDetails}
          onChangePassword={handleChangePassword}
          onLogout={handleLogout}
          onChatSupport={handleChatSupport}
          onContactVia={handleContactVia}
        />
        
        <div className="mt-6 space-y-6">
          {activeTab === "profile" && (
            <>
              <BusinessInfoCard onEditBusiness={handleEditBusiness} />
              <BankAccountsCard 
                onAddAccount={handleAddAccount}
                onRemoveAccount={handleRemoveAccount}
              />
              <DevicesCard />
              <SettingsCard 
                onAddCacDetails={handleAddCacDetails}
                onChangePassword={handleChangePassword}
                onLogout={handleLogout}
              />
              <SupportSection 
                onChatSupport={handleChatSupport}
                onContactVia={handleContactVia}
              />
            </>
          )}
          
          {activeTab === "accounts" && (
            <AccountsTab 
              onAddAccount={handleAddAccount}
              onRemoveAccount={handleRemoveAccount}
              onAddCacDetails={handleAddCacDetails}
              onChangePassword={handleChangePassword}
              onLogout={handleLogout}
              onChatSupport={handleChatSupport}
              onContactVia={handleContactVia}
            />
          )}
          
          {activeTab === "devices" && <DevicesCard />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
