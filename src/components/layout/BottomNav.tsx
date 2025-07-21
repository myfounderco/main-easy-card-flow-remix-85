
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleUser, Calculator, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState("");
  
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  
  const navItems = [
    {
      name: "My Account",
      icon: (
        <CircleUser className="h-7 w-7" />
      ),
      path: "/profile"
    },
    {
      name: "Sell",
      icon: (
        <Calculator className="h-7 w-7" />
      ),
      path: "/"
    },
    {
      name: "Transactions",
      icon: (
        <FileText className="h-7 w-7" />
      ),
      path: "/history"
    }
  ];
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white shadow-md flex justify-around px-4 pb-1 z-50">
      {navItems.map((item) => (
        <button 
          key={item.path}
          onClick={() => handleNavigation(item.path)}
          className={cn(
            "flex flex-col items-center justify-center py-1 transition-colors duration-200",
            activePath === item.path 
              ? "text-blue-500" 
              : "text-gray-500 hover:text-gray-600" // Changed from text-gray-700 to text-gray-500 for lighter gray
          )}
        >
          {item.icon}
          <span className="text-xs mt-0.5">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
