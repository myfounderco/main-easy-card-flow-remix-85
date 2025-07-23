
import React, { useState } from "react";
import { useDevice } from "@/contexts/DeviceContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";
import { BankAccountForm } from "@/components/profile/BankAccountForm";
import { BusinessCustomizationForm } from "@/components/profile/BusinessCustomizationForm";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BusinessInfoCard } from "@/components/profile/BusinessInfoCard";
import { PricingButton } from "@/components/profile/PricingButton";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

const ProfilePage = () => {
  const { readers, bankAccounts, removeBankAccount } = useDevice();
  const [activeTab, setActiveTab] = useState("account");
  const [showBankDialog, setShowBankDialog] = useState(false);
  const [showBusinessDialog, setShowBusinessDialog] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [isBusinessVerified, setIsBusinessVerified] = useState(false);
  
  const navigate = useNavigate();
  
  const handleCall = () => {
    toast.info("Calling customer support...");
    window.location.href = "tel:08000000000";
  };
  
  const handleContactVia = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'whatsapp':
        url = 'https://wa.me/2348000000000';
        break;
      case 'instagram':
        url = 'https://instagram.com/easypay';
        break;
      case 'email':
        url = 'mailto:support@easypay.com';
        break;
      case 'chat':
        toast.info("Opening chat support...");
        break;
    }
    
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleRegisterBusiness = () => {
    navigate("/cac-registration");
  };

  const handlePricingInfo = () => {
    navigate("/pricing");
  };
  
  const handleAddCacDetails = () => {
    navigate("/business-update");
  };
  
  const confirmDeleteAccount = (accountId: string) => {
    setAccountToDelete(accountId);
    setShowDeleteConfirmation(true);
  };
  
  const handleDeleteAccount = () => {
    if (accountToDelete) {
      removeBankAccount(accountToDelete);
      setAccountToDelete(null);
      setShowDeleteConfirmation(false);
      toast.success("Bank account removed successfully");
    }
  };
  
  const handleLogout = () => {
    toast.success("You have been logged out");
    navigate("/login");
  };
  
  const handleChangePassword = () => {
    toast.info("Change password feature coming soon");
  };
  
  const handleChatSupport = () => {
    toast.info("Connecting to customer support...");
    // In a real implementation, this would open a chat interface
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16 bg-background">
      <ProfileHeader isBusinessVerified={isBusinessVerified} />
      
      <div className="p-4 pb-8">
        <BusinessInfoCard onEditBusiness={() => setShowBusinessDialog(true)} />

        <PricingButton onClick={handlePricingInfo} />
        
        <ProfileTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAddAccount={() => setShowBankDialog(true)}
          onRemoveAccount={confirmDeleteAccount}
          onAddCacDetails={handleAddCacDetails}
          onChangePassword={handleChangePassword}
          onLogout={handleLogout}
          onChatSupport={handleChatSupport}
          onContactVia={handleContactVia}
        />
      </div>
      
      <Dialog open={showBankDialog} onOpenChange={setShowBankDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
          </DialogHeader>
          <BankAccountForm 
            onSuccess={() => setShowBankDialog(false)} 
            onCancel={() => setShowBankDialog(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showBusinessDialog} onOpenChange={setShowBusinessDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Customize Your Business</DialogTitle>
          </DialogHeader>
          <BusinessCustomizationForm onClose={() => setShowBusinessDialog(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)} className="rounded-full">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} className="rounded-full">
              Remove Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
