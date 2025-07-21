
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react";
import { useDevice } from "@/contexts/DeviceContext";

const CacDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setHasBusinessRegistration } = useDevice();
  const [rcNumber, setRcNumber] = useState("");
  const [nin, setNin] = useState("");
  const [cacDocuments, setCacDocuments] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setCacDocuments(prevFiles => [...prevFiles, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setCacDocuments(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rcNumber.trim() || !nin.trim()) {
      toast.error("Please enter both RC Number and NIN");
      return;
    }
    
    if (cacDocuments.length === 0) {
      toast.error("Please upload at least one CAC document");
      return;
    }
    
    // Simulate submission
    toast.success("CAC details submitted successfully");
    // Set business registration to true when user submits CAC details (existing business)
    setHasBusinessRegistration(true);
    setIsSubmitted(true);
  };
  
  const handleDone = () => {
    // Check if the user came from profile page or business registration flow
    const fromProfileUpdate = location.state?.fromProfile === true;
    
    if (fromProfileUpdate) {
      // If user came from profile page, return to profile
      navigate("/profile");
    } else {
      // If user came from signup flow, go to reader setup
      navigate("/reader-setup");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">CAC Details</h1>
      </div>
      
      <div className="p-4 max-w-md mx-auto">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rcNumber">RC Number</Label>
              <Input 
                id="rcNumber"
                value={rcNumber}
                onChange={(e) => setRcNumber(e.target.value)}
                placeholder="Enter your RC Number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nin">NIN (National Identification Number)</Label>
              <div>
                <Input 
                  id="nin"
                  value={nin}
                  onChange={(e) => setNin(e.target.value)}
                  placeholder="Enter your NIN"
                />
                <p className="text-xs text-blue-500 mt-1">
                  Don't know your NIN? Dial *346# on your phone to check.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Upload CAC Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop your CAC documents here</p>
                <input
                  type="file"
                  id="cacDocuments"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("cacDocuments")?.click()}
                  className="w-full text-sm"
                >
                  Select Files
                </Button>
              </div>
              
              {cacDocuments.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium">Uploaded Documents:</p>
                  {cacDocuments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-500"
                        onClick={() => handleRemoveFile(index)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 h-12 font-medium rounded-md"
            >
              Submit CAC Details
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-medium mb-2">Documents Submitted</h2>
              <p className="text-gray-600 mb-4">Your CAC details have been submitted successfully.</p>
              <p className="text-blue-600 bg-blue-50 p-3 rounded-md text-sm border border-blue-200">
                Your CAC registration will take 5 days to be finalized. You can proceed with transactions, 
                but your account will be limited to <span className="text-green-600">₦10,000</span> per transaction 
                and <span className="text-green-600">₦300,000</span> per day. 
                Monthly limit of <span className="text-green-600">₦1,000,000</span> will apply.
                The limit will be lifted once the registration process is completed.
              </p>
            </div>
            <div className="pt-4">
              <Button 
                onClick={handleDone}
                className="h-10 bg-green-500 hover:bg-green-600 text-white w-1/2 font-medium rounded-md"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CacDetailsPage;
