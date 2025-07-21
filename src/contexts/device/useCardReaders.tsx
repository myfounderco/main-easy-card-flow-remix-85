
import React, { useState, useEffect } from "react";
import { CardReader } from "./types";
import { toast } from "sonner";

export interface UseCardReadersResult {
  readers: CardReader[];
  activeReader: CardReader | null;
  connectReader: (readerId: string) => Promise<boolean>;
  disconnectReader: (readerId: string) => void;
  addReader: (reader: Omit<CardReader, "id" | "connected">) => CardReader;
  removeReader: (readerId: string) => void;
}

export const useCardReaders = (): UseCardReadersResult => {
  const [readers, setReaders] = useState<CardReader[]>([
    {
      id: "reader-001",
      name: "Square Reader S1",
      connected: false,
      batteryLevel: 85,
      lastConnected: new Date(Date.now() - 86400000) // 1 day ago
    }
  ]);
  
  const [activeReader, setActiveReader] = useState<CardReader | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedReaders = localStorage.getItem("cardReaders");
    const savedActiveReader = localStorage.getItem("activeReader");
    
    if (savedReaders) {
      try {
        const parsedReaders = JSON.parse(savedReaders);
        // Convert date strings back to Date objects
        const formattedReaders = parsedReaders.map((r: any) => ({
          ...r,
          lastConnected: r.lastConnected ? new Date(r.lastConnected) : undefined
        }));
        setReaders(formattedReaders);
      } catch (error) {
        console.error("Error parsing card readers from localStorage:", error);
      }
    }
    
    if (savedActiveReader) {
      try {
        const reader = JSON.parse(savedActiveReader);
        if (reader) {
          setActiveReader({
            ...reader,
            lastConnected: reader.lastConnected ? new Date(reader.lastConnected) : undefined
          });
        }
      } catch (error) {
        console.error("Error parsing active reader from localStorage:", error);
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cardReaders", JSON.stringify(readers));
  }, [readers]);
  
  useEffect(() => {
    if (activeReader) {
      localStorage.setItem("activeReader", JSON.stringify(activeReader));
    } else {
      localStorage.removeItem("activeReader");
    }
  }, [activeReader]);

  const connectReader = async (readerId: string): Promise<boolean> => {
    // Simulate connecting to a card reader
    return new Promise((resolve) => {
      setTimeout(() => {
        setReaders(prevReaders => 
          prevReaders.map(reader => 
            reader.id === readerId 
              ? { ...reader, connected: true, lastConnected: new Date() } 
              : reader
          )
        );
        
        const reader = readers.find(r => r.id === readerId);
        if (reader) {
          const updatedReader = { ...reader, connected: true, lastConnected: new Date() };
          setActiveReader(updatedReader);
          toast.success(`Connected to ${reader.name}`);
        }
        
        resolve(true);
      }, 2000);
    });
  };

  const disconnectReader = (readerId: string) => {
    setReaders(prevReaders => 
      prevReaders.map(reader => 
        reader.id === readerId 
          ? { ...reader, connected: false } 
          : reader
      )
    );
    
    if (activeReader?.id === readerId) {
      setActiveReader(null);
    }
    
    const reader = readers.find(r => r.id === readerId);
    if (reader) {
      toast.info(`Disconnected from ${reader.name}`);
    }
  };

  const addReader = (reader: Omit<CardReader, "id" | "connected">): CardReader => {
    const newReader = {
      ...reader,
      id: `reader-${Date.now().toString(36)}`,
      connected: false
    };
    
    setReaders(prev => [...prev, newReader]);
    return newReader;
  };

  const removeReader = (readerId: string) => {
    setReaders(prevReaders => prevReaders.filter(reader => reader.id !== readerId));
    
    if (activeReader?.id === readerId) {
      setActiveReader(null);
    }
  };

  return {
    readers,
    activeReader,
    connectReader,
    disconnectReader,
    addReader,
    removeReader
  };
};
