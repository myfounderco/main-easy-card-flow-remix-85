import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

const CacRegistrationDetailsPage = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [error, setError] = useState("");

  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
    "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
    "Yobe", "Zamfara", "FCT"
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!businessName || !rcNumber || !address || !selectedState) {
      setError("All fields are required");
      return;
    }
    navigate("/reader-setup");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">CAC Registration Details</h1>
        <div className="w-9"></div>
      </div>

      <div className="p-4">
        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              type="text"
              id="businessName"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="rcNumber">RC Number</Label>
            <Input
              type="text"
              id="rcNumber"
              placeholder="Enter RC number"
              value={rcNumber}
              onChange={(e) => setRcNumber(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Select onValueChange={setSelectedState} defaultValue={selectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full rounded-md" onClick={handleSubmit}>
            Confirm Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CacRegistrationDetailsPage;
