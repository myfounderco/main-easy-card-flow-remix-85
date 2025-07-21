
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useDevice } from "@/contexts/DeviceContext";

interface ProfileHeaderProps {
  isBusinessVerified?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isBusinessVerified }) => {
  const { hasBusinessRegistration } = useDevice();
  
  // Use the prop if provided, otherwise fall back to the context value
  const isVerified = isBusinessVerified !== undefined ? isBusinessVerified : hasBusinessRegistration;
  
  return (
    <div className="p-4 border-b border-border flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-medium text-gray-700">My Profile</h1>
        {isVerified ? (
          <Badge className="ml-2 bg-green-600 text-white">Business Registration Verified</Badge>
        ) : (
          <Badge className="ml-2 bg-orange-500 text-white">CAC Registration Pending</Badge>
        )}
      </div>
    </div>
  );
};
