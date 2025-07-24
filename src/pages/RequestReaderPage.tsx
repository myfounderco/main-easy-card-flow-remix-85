
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, X, Smartphone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const RequestReaderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formStep, setFormStep] = useState(1);
  const [readerType, setReaderType] = useState("");
  const [useRegisteredAddress, setUseRegisteredAddress] = useState(false);
  const [useLocationServices, setUseLocationServices] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    busStop: ""
  });
  
  // Check if the user is coming from reader setup (first-time flow) or profile
  const isFromReaderSetup = location.state?.fromReaderSetup === true;
  
  const handleClose = () => {
    navigate("/reader-setup");
  };
  
  const handleGoBack = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    } else {
      navigate("/reader-setup");
    }
  };
  
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };
  
  const handleReaderTypeSelect = (value: string) => {
    setReaderType(value);
  };
  
  const handleRequestSubmit = () => {
    // Here you would handle the actual request submission
    toast.success("Reader request submitted successfully!");
    // Navigate to profile page or overview based on where user came from
    setTimeout(() => {
      if (isFromReaderSetup) {
        navigate("/overview");
      } else {
        navigate("/profile");
      }
    }, 1500);
  };
  
  const toggleRegisteredAddress = () => {
    setUseRegisteredAddress(!useRegisteredAddress);
    if (!useRegisteredAddress) {
      // Populate with mock registered address
      setAddress({
        street: "123 Business Street",
        city: "Lagos",
        state: "Lagos State",
        busStop: "Ikeja Bus Stop"
      });
    } else {
      // Clear the address
      setAddress({
        street: "",
        city: "",
        state: "",
        busStop: ""
      });
    }
  };
  
  const toggleLocationServices = () => {
    setUseLocationServices(!useLocationServices);
    if (!useLocationServices) {
      // Mock getting location
      toast.info("Fetching your current location...");
      setTimeout(() => {
        setAddress({
          street: "15 Current Location Street",
          city: "Lagos",
          state: "Lagos State",
          busStop: "Victoria Island Bus Stop"
        });
        toast.success("Location detected successfully");
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium ml-2">Request New Card Reader (POS)</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 p-6">
        {formStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-500">Delivery Address</CardTitle>
              <CardDescription>
                Enter the address where you'd like to receive your free card reader
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAddressSubmit}>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg mb-4">
                  <Switch 
                    id="registeredAddress" 
                    checked={useRegisteredAddress}
                    onCheckedChange={toggleRegisteredAddress}
                  />
                  <Label htmlFor="registeredAddress">Use my registered address</Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-lg mb-4">
                  <Switch 
                    id="locationServices" 
                    checked={useLocationServices}
                    onCheckedChange={toggleLocationServices}
                  />
                  <Label htmlFor="locationServices">Use my current location</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input 
                    id="street" 
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    placeholder="123 Main St" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    placeholder="Lagos" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    value={address.state}
                    onChange={(e) => setAddress({...address, state: e.target.value})}
                    placeholder="Lagos State" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="busStop">Nearest Bus Stop</Label>
                  <Input 
                    id="busStop" 
                    value={address.busStop}
                    onChange={(e) => setAddress({...address, busStop: e.target.value})}
                    placeholder="Enter nearest bus stop" 
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-payment-blue hover:bg-payment-darkBlue rounded-md">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        
        {formStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-500">Select Reader Type</CardTitle>
              <CardDescription>
                Choose the type of card reader (POS) that best suits your device's charging port
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={readerType} onValueChange={handleReaderTypeSelect}>
                <div 
                  className={`flex items-center space-x-4 border rounded-lg p-4 cursor-pointer ${readerType === "lightning" ? "border-primary bg-primary/5" : "hover:border-primary"}`}
                  onClick={() => setReaderType("lightning")}
                >
                  <RadioGroupItem value="lightning" id="lightning" className="cursor-pointer" />
                  <div className="h-16 w-16 border rounded-md flex items-center justify-center bg-blue-50">
                    <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-500">
                      <path d="M12 2L4 12h6v8l8-10h-6z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="lightning" className="font-medium cursor-pointer">iPhone Lightning Reader</Label>
                    <p className="text-sm text-muted-foreground">For iPhone models with Lightning port</p>
                    <p className="text-sm font-medium mt-1 text-green-600">Free</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center space-x-4 border rounded-lg p-4 cursor-pointer ${readerType === "typeC" ? "border-primary bg-primary/5" : "hover:border-primary"}`}
                  onClick={() => setReaderType("typeC")}
                >
                  <RadioGroupItem value="typeC" id="typeC" className="cursor-pointer" />
                  <div className="h-16 w-16 border rounded-md flex items-center justify-center bg-blue-50">
                    <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-500">
                      <rect x="4" y="8" width="16" height="8" rx="2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="typeC" className="font-medium cursor-pointer">USB-C Reader</Label>
                    <p className="text-sm text-muted-foreground">For newer iPhone models and Android with USB-C</p>
                    <p className="text-sm font-medium mt-1 text-green-600">Free</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center space-x-4 border rounded-lg p-4 cursor-pointer ${readerType === "headphone" ? "border-primary bg-primary/5" : "hover:border-primary"}`}
                  onClick={() => setReaderType("headphone")}
                >
                  <RadioGroupItem value="headphone" id="headphone" className="cursor-pointer" />
                  <div className="h-16 w-16 border rounded-md flex items-center justify-center bg-blue-50">
                    <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-500">
                      <circle cx="12" cy="6" r="3" />
                      <path d="M9 18V9a3 3 0 013-3h0a3 3 0 013 3v9" />
                      <rect x="7" y="15" width="4" height="6" rx="1" />
                      <rect x="13" y="15" width="4" height="6" rx="1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="headphone" className="font-medium cursor-pointer">Headphone Jack Reader</Label>
                    <p className="text-sm text-muted-foreground">For devices with a standard headphone jack</p>
                    <p className="text-sm font-medium mt-1 text-green-600">Free</p>
                  </div>
                </div>
              </RadioGroup>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Delivery Information</h3>
                <p className="text-sm text-blue-600 font-bold">
                  Your free card reader will be delivered within 3–5 business days.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-payment-blue hover:bg-payment-darkBlue rounded-md"
                onClick={handleRequestSubmit}
                disabled={!readerType}
              >
                Request Free Reader
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RequestReaderPage;
