
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface BusinessDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
}

interface BusinessCustomizationFormProps {
  onClose?: () => void;
}

export function BusinessCustomizationForm({ onClose }: BusinessCustomizationFormProps) {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    name: "John's Hardware Store",
    address: "123 Main Street",
    city: "Lagos",
    state: "Lagos",
    phone: "0800 123 4567",
    whatsapp: "0800 123 4567",
    email: "info@johnhardware.com",
    website: "www.johnhardware.com",
    instagram: "@johnhardware"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Business details updated successfully");
    if (onClose) onClose();
  };
  
  const handleSave = () => {
    toast.success("Business details updated successfully");
    if (onClose) onClose();
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium">Customize Your Business</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Business Name</Label>
          <Input 
            id="name" 
            name="name"
            value={businessDetails.name}
            onChange={handleChange}
            placeholder="Your Business Name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input 
            id="address" 
            name="address"
            value={businessDetails.address}
            onChange={handleChange}
            placeholder="Street Address"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              name="city"
              value={businessDetails.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input 
              id="state" 
              name="state"
              value={businessDetails.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone"
              value={businessDetails.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input 
              id="whatsapp" 
              name="whatsapp"
              value={businessDetails.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp Number"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            name="email"
            value={businessDetails.email}
            onChange={handleChange}
            placeholder="Email Address"
            type="email"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input 
            id="website" 
            name="website"
            value={businessDetails.website}
            onChange={handleChange}
            placeholder="Website"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram Handle (Optional)</Label>
          <Input 
            id="instagram" 
            name="instagram"
            value={businessDetails.instagram}
            onChange={handleChange}
            placeholder="Instagram Handle"
          />
        </div>
        
        <div className="mt-5">
          <Button 
            type="button" 
            onClick={handleSave}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BusinessCustomizationForm;
