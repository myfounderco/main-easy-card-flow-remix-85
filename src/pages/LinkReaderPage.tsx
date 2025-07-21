
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Bluetooth, RefreshCw, CheckCircle2, AlertCircle, CreditCard, Loader, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useDevice } from "@/contexts/DeviceContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ReaderOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const LinkReaderPage = () => {
  const navigate = useNavigate();
  const { addReader } = useDevice();
  const [selectedReader, setSelectedReader] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState<string[]>([]);
  const [showReaderConnected, setShowReaderConnected] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (!selectedReader) {
      toast.error("Please select a reader type");
      return;
    }
    
    setScanning(true);
    
    setTimeout(() => {
      const demoReaders = ['EasyPay Reader (AB12)'];
      setFound(demoReaders);
      setScanning(false);
    }, 3000);
  };

  const handleConnect = (readerId: string) => {
    addReader({
      name: readerId,
      batteryLevel: 87,
      lastConnected: new Date()
    });
    
    // Show the connected toast
    setShowReaderConnected(true);
    setTimeout(() => {
      setShowReaderConnected(false);
      toast.success(`Connected to ${readerId}`);
      navigate("/profile");
    }, 1500);
  };

  const readerOptions: ReaderOption[] = [
    {
      id: "audio",
      name: "3.5mm Audio Jack Reader",
      description: "Connect via 3.5mm headphone jack",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 19a2 2 0 0 1-2 2l0 0a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2l0 0a2 2 0 0 1 2 2v8z" />
          <path d="M11 19a2 2 0 0 1-2 2l0 0a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2l0 0a2 2 0 0 1 2 2v8z" />
          <path d="M15 19a2 2 0 0 1-2 2l0 0a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2l0 0a2 2 0 0 1 2 2v8z" />
          <path d="M18 12h1a3 3 0 0 1 3 3v1" />
        </svg>
      )
    },
    {
      id: "usbc",
      name: "USB-C Reader",
      description: "Connect via USB Type-C port",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="8" width="16" height="8" rx="2" />
          <path d="m16 9 1 3v2" />
          <path d="m8 9-1 3v2" />
        </svg>
      )
    },
    {
      id: "lightning",
      name: "Lightning Port Reader",
      description: "Connect via Apple Lightning port",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 7 4-4h4l4 4v4l-4 4h-4l-4-4z" />
          <path d="M10 16v4" />
          <path d="M14 16v4" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="p-4 border-b border-border flex items-center justify-between bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-blue-50">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium text-blue-600">Link Card Reader</h1>
        <div className="w-9"></div>
      </div>
      
      <div className="p-6 max-w-md mx-auto">
        {!scanning && found.length === 0 && (
          <>
            <div className="text-center mb-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Connect Your Reader</h2>
              <p className="text-muted-foreground">Select your reader type to get started:</p>
            </div>
            
            <div className="space-y-4">
              {readerOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`border cursor-pointer transition-all ${
                    selectedReader === option.id 
                      ? "border-2 border-blue-500 bg-blue-50" 
                      : "hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                  onClick={() => setSelectedReader(option.id)}
                >
                  <CardContent className="p-4 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{option.name}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    {selectedReader === option.id && (
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 h-12 text-base"
              onClick={handleContinue}
              disabled={!selectedReader}
            >
              Continue
            </Button>
            
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Make sure your reader is turned on and in pairing mode
            </p>
          </>
        )}
        
        {scanning && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <Loader className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
            <h2 className="text-xl font-medium mb-3 text-gray-800">Scanning for Readers</h2>
            <p className="text-muted-foreground text-center max-w-xs">
              Please make sure your reader is turned on and in pairing mode
            </p>
            <Badge className="mt-8 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300">
              <Bluetooth className="h-3.5 w-3.5 mr-1" />
              Bluetooth scanning...
            </Badge>
          </div>
        )}
        
        {!scanning && found.length > 0 && (
          <>
            <div className="mb-6 text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-800">Readers Found</h2>
              <p className="text-sm text-muted-foreground mt-1">Tap a reader to connect</p>
            </div>
            
            <div className="space-y-4">
              {found.map((reader) => (
                <Card 
                  key={reader}
                  className="border cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                  onClick={() => handleConnect(reader)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{reader}</h3>
                          <p className="text-sm text-muted-foreground">Ready to connect</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-8 border-blue-300 text-blue-600 hover:bg-blue-50 h-12"
              onClick={() => {
                setScanning(true);
                setFound([]);
                setTimeout(() => {
                  setScanning(false);
                  setFound(['EasyPay Reader (AB12)']);
                }, 2000);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Scan Again
            </Button>
          </>
        )}
      </div>

      {showReaderConnected && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
          <div className="bg-blue-50 rounded-lg shadow-lg p-4 flex items-center border border-blue-200">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <CreditCard className="h-5 w-5 text-blue-700" />
            </div>
            <span className="text-blue-700 font-medium">Reader connected</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkReaderPage;
