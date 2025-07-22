
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KeypadPage from "./pages/KeypadPage";
import ProcessPaymentPage from "./pages/ProcessPaymentPage";
import ReceiptPage from "./pages/ReceiptPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import LoginSignupPage from "./pages/LoginSignupPage";
import GetStartedPage from "./pages/GetStartedPage";
import ReaderSetupPage from "./pages/ReaderSetupPage";
import RequestReaderPage from "./pages/RequestReaderPage";
import SampleReceiptPage from "./pages/SampleReceiptPage";
import CacRegistrationDetailsPage from "./pages/CacRegistrationDetailsPage";
import BusinessUpdatePage from "./pages/BusinessUpdatePage";
import OverviewPage from "./pages/OverviewPage";
import BusinessRegistrationCheckPage from "./pages/BusinessRegistrationCheckPage";
import BusinessNameCheckPage from "./pages/BusinessNameCheckPage";
import PricingPage from "./components/profile/PricingPage";
import CacDetailsPage from "./pages/CacDetailsPage";
import { PaymentProvider } from "./contexts/PaymentContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import { Toaster } from "@/components/ui/sonner";
import { LinkReaderPage } from "./pages/LinkReaderPage";

function App() {
  return (
    <PaymentProvider>
      <DeviceProvider>
        <RouterProvider
          router={
            createBrowserRouter([
              {
                path: "/",
                element: <KeypadPage />,
              },
              {
                path: "/process-payment",
                element: <ProcessPaymentPage />,
              },
              {
                path: "/receipt/:id",
                element: <ReceiptPage />,
              },
              {
                path: "/history",
                element: <HistoryPage />,
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
              {
                path: "/login",
                element: <LoginSignupPage />,
              },
              {
                path: "/get-started",
                element: <GetStartedPage />,
              },
              {
                path: "/business-registration-check",
                element: <BusinessRegistrationCheckPage />,
              },
              {
                path: "/business-name-check",
                element: <BusinessNameCheckPage />,
              },
              {
                path: "/business-update",
                element: <BusinessUpdatePage />,
              },
              {
                path: "/reader-setup",
                element: <ReaderSetupPage />,
              },
              {
                path: "/request-reader",
                element: <RequestReaderPage />,
              },
              {
                path: "/link-reader",
                element: <LinkReaderPage />,
              },
              {
                path: "/sample-receipt",
                element: <SampleReceiptPage />,
              },
              {
                path: "/cac-registration",
                element: <CacRegistrationDetailsPage />,
              },
              {
                path: "/cac-details",
                element: <CacDetailsPage />,
              },
              {
                path: "/overview",
                element: <OverviewPage />,
              },
              {
                path: "/pricing",
                element: <PricingPage />,
              },
            ])
          }
        />
        <Toaster />
      </DeviceProvider>
    </PaymentProvider>
  );
}

export default App;
