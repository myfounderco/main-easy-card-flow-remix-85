
import React, { useState, useRef, useEffect } from "react";
import { usePayment } from "@/contexts/PaymentContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface KeypadProps {
  onKeyPress?: (digit: string) => void;
  onDelete?: () => void;
  onAdd?: () => void;
  showAddButton?: boolean;
  showDeleteLabel?: boolean;
  submitAction?: () => void;
  submitDisabled?: boolean;
  submitText?: string;
}

export function Keypad({
  onKeyPress,
  onDelete,
  onAdd,
  showAddButton = true,
  showDeleteLabel = false,
  submitAction,
  submitDisabled = false,
  submitText = "Submit"
}: KeypadProps) {
  const { addDigit, clearAmount, addToRunningTotal, clearRunningTotal, amount, deleteLastDigit } = usePayment();
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);
  
  const handleKeyPress = (digit: string) => {
    if (onKeyPress) {
      onKeyPress(digit);
    } else {
      addDigit(digit);
    }
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else if (isLongPress) {
      clearAmount();
      clearRunningTotal();
    } else {
      deleteLastDigit();
    }
  };

  const handleDeleteStart = () => {
    setIsLongPress(false);
    const timer = setTimeout(() => {
      setIsLongPress(true);
      handleDelete();
    }, 500); // Long press threshold of 500ms
    setLongPressTimer(timer);
  };

  const handleDeleteEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    if (!isLongPress) {
      handleDelete();
    }
    setIsLongPress(false);
  };
  
  const handleAddition = () => {
    if (onAdd) {
      onAdd();
    } else {
      addToRunningTotal();
    }
  };

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {/* Row 1 */}
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("1")}
      >
        1
      </button>
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("2")}
      >
        2
      </button>
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("3")}
      >
        3
      </button>
      
      {/* Row 2 */}
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("4")}
      >
        4
      </button>
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("5")}
      >
        5
      </button>
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("6")}
      >
        6
      </button>
      
      {/* Row 3 */}
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("7")}
      >
        7
      </button>
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("8")}
      >
        8
      </button>
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("9")}
      >
        9
      </button>
      
      {/* Row 4 */}
      <button 
        className="py-10 rounded-full flex items-center justify-center text-red-500 text-2xl font-bold transition-all duration-200 active:scale-95 bg-red-50"
        onMouseDown={handleDeleteStart}
        onMouseUp={handleDeleteEnd}
        onMouseLeave={handleDeleteEnd}
        onTouchStart={handleDeleteStart}
        onTouchEnd={handleDeleteEnd}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button 
        className="py-8 rounded-full flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("0")}
      >
        0
      </button>
      {showAddButton ? (
        <button 
          className="py-10 rounded-full flex items-center justify-center text-blue-500 text-xl font-light transition-all duration-200 active:scale-95"
          onClick={handleAddition}
        >
          +
        </button>
      ) : (
        <div></div>
      )}
      
      {/* Submit Button */}
      {submitAction && (
        <div className="col-span-3 mt-4">
          <Button
            onClick={submitAction}
            disabled={submitDisabled}
            className="w-full py-4 h-12 rounded-full"
          >
            {submitText}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Keypad;
