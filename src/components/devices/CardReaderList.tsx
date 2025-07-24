
import React from "react";
import { useDevice } from "@/contexts/DeviceContext";
import { Button } from "@/components/ui/button";
import { Bluetooth, Calendar, CircleOff, CircleCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function CardReaderList() {
  const { readers, connectReader, disconnectReader, removeReader } = useDevice();
  const navigate = useNavigate();
  
  if (readers.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No Card Readers found.</p>
        <Button
          className="mt-4 bg-payment-blue hover:bg-payment-darkBlue"
          onClick={() => navigate("/request-reader")}
        >
          Request New Card Reader
        </Button>
      </div>
    );
  }
  
  const formatLastConnected = (date?: Date) => {
    if (!date) return "Never";
    
    // If today, show time
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If yesterday, show "Yesterday"
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    // Otherwise show date
    return date.toLocaleDateString();
  };
  
  const handleConnectToggle = async (readerId: string, connected: boolean) => {
    if (connected) {
      disconnectReader(readerId);
    } else {
      await connectReader(readerId);
    }
  };

  const handleDeleteReader = (readerId: string, readerName: string) => {
    removeReader(readerId);
    toast.success(`${readerName} removed successfully`);
  };
  
  return (
    <div className="space-y-4">
      {readers.map((reader) => (
        <div 
          key={reader.id}
          className="p-4 border border-border rounded-lg bg-background transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Bluetooth className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">{reader.name}</h3>
            </div>
            <div className="flex items-center">
              {reader.connected ? (
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full flex items-center mr-2">
                  <CircleCheck className="h-3 w-3 mr-1" />
                  Connected
                </span>
              ) : (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full flex items-center mr-2">
                  <CircleOff className="h-3 w-3 mr-1" />
                  Disconnected
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Last time used
            </span>
            <span>{formatLastConnected(reader.lastConnected)}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={reader.connected ? "outline" : "default"}
              size="sm"
              className="flex-1"
              onClick={() => handleConnectToggle(reader.id, reader.connected)}
            >
              {reader.connected ? "Disconnect" : "Connect"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleDeleteReader(reader.id, reader.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardReaderList;
