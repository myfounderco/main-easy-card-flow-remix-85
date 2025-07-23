
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

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />
      
      <div className="px-4 pb-20">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-6 space-y-6">
          {activeTab === "profile" && (
            <>
              <BusinessInfoCard />
              <BankAccountsCard />
              <DevicesCard />
              <SettingsCard />
              <SupportSection />
            </>
          )}
          
          {activeTab === "accounts" && <AccountsTab />}
          
          {activeTab === "devices" && <DevicesCard />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
