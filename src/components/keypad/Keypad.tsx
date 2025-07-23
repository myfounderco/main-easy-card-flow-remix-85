
import React from "react";
import { usePayment } from "@/contexts/PaymentContext";
import { Button } from "@/components/ui/button";

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
  const { addDigit, clearAmount, addToRunningTotal, clearRunningTotal } = usePayment();
  
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
    } else {
      clearAmount();
      clearRunningTotal();
    }
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
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("1")}
      >
        1
      </button>
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("2")}
      >
        2
      </button>
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("3")}
      >
        3
      </button>
      
      {/* Row 2 */}
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("4")}
      >
        4
      </button>
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("5")}
      >
        5
      </button>
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("6")}
      >
        6
      </button>
      
      {/* Row 3 */}
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("7")}
      >
        7
      </button>
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("8")}
      >
        8
      </button>
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("9")}
      >
        9
      </button>
      
      {/* Row 4 */}
      <button 
        className="py-10 rounded-md flex items-center justify-center text-red-500 text-2xl font-bold transition-all duration-200 active:scale-95"
        onClick={handleDelete}
      >
        {showDeleteLabel ? "Delete" : "C"}
      </button>
      <button 
        className="py-8 rounded-md flex items-center justify-center text-blue-500 text-2xl font-medium transition-all duration-200 active:scale-95 bg-gray-50"
        onClick={() => handleKeyPress("0")}
      >
        0
      </button>
      {showAddButton ? (
        <button 
          className="py-10 rounded-md flex items-center justify-center text-blue-500 text-2xl font-bold transition-all duration-200 active:scale-95"
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
            className="w-full py-4 h-12"
          >
            {submitText}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Keypad;
