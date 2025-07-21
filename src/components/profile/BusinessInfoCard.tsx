
import React from "react";
import { User, Phone, Mail, MapPin, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BusinessInfoCardProps {
  onEditBusiness: () => void;
}

export const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({ onEditBusiness }) => {
  return (
    <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/30 border-primary/20">
      <CardContent className="flex flex-col py-6 px-4">
        <div className="flex mb-3">
          <div className="h-16 w-16 rounded-full bg-gray-700/20 flex items-center justify-center mr-4">
            <User className="h-8 w-8 text-gray-700" />
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-xl">John's Hardware Store</h2>
            <div className="text-sm text-muted-foreground space-y-1 mt-1">
              <p className="flex items-center"><Phone className="h-3 w-3 mr-1" /> 0800 123 4567</p>
              <p className="flex items-center"><Mail className="h-3 w-3 mr-1" /> info@johnhardware.com</p>
              <p className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> 123 Main Street, Lagos</p>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={onEditBusiness}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit Business Info
        </Button>
      </CardContent>
    </Card>
  );
};
