
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Shield, CreditCard, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OverviewPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/reader-setup");
  };

  const offerings = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-grade security for all your payments"
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Methods",
      description: "Accept cards, bank transfers, and mobile payments"
    },
    {
      icon: Users,
      title: "Customer Support",
      description: "24/7 support to help grow your business"
    },
    {
      icon: TrendingUp,
      title: "Business Analytics",
      description: "Track your sales and business growth"
    }
  ];

  const partnerFeatures = [
    "Instant settlement to your account",
    "Competitive transaction rates",
    "Free card reader and setup",
    "Business registration support",
    "Real-time transaction monitoring"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="font-bold text-white text-xl">EP</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EasyPay</h1>
            <p className="text-gray-600">Your trusted POS solution for seamless payments</p>
          </div>

          {/* Our Offering Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Our Offering</h2>
            <div className="grid grid-cols-1 gap-4">
              {offerings.map((offering, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <offering.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{offering.title}</h3>
                        <p className="text-sm text-gray-600">{offering.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* The Right Partner Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">The Right Partner for Your Business</h2>
            <div className="space-y-4">
              {partnerFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Get Started Button */}
          <div className="mt-8">
            <Button 
              onClick={handleGetStarted}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium rounded-full flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
