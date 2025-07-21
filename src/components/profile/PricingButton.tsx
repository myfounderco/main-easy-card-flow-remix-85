
import React from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingButtonProps {
  onClick: () => void;
}

export const PricingButton: React.FC<PricingButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      className="w-full mb-4 border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
      onClick={onClick}
    >
      <Calculator className="h-4 w-4 mr-2" />
      See our Charges
    </Button>
  );
};
