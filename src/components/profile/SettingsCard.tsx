
import React from "react";
import { FileText, Lock, LogOut, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SettingsCardProps {
  onAddCacDetails: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ 
  onAddCacDetails, 
  onChangePassword, 
  onLogout 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-400">Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          <div 
            className="flex items-center justify-between py-3 px-6 hover:bg-muted/50 cursor-pointer"
            onClick={onAddCacDetails}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-green-500" />
              <span>Add My CAC Details</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div 
            className="flex items-center justify-between py-3 px-6 hover:bg-muted/50 cursor-pointer"
            onClick={onChangePassword}
          >
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2 text-blue-400" />
              <span>Change Password</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div 
            className="flex items-center justify-between py-3 px-6 hover:bg-muted/50 cursor-pointer"
            onClick={onLogout}
          >
            <div className="flex items-center">
              <LogOut className="h-4 w-4 mr-2 text-red-400" />
              <span className="text-red-500">Logout</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
