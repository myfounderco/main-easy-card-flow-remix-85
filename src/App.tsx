
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PaymentProvider } from "@/contexts/PaymentContext";
import { DeviceProvider } from "@/contexts/DeviceContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import LoginSignupPage from "./pages/LoginSignupPage";
import ProfilePage from "./pages/ProfilePage";
import KeypadPage from "./pages/KeypadPage";
import ProcessPaymentPage from "./pages/ProcessPaymentPage";
import ReceiptPage from "./pages/ReceiptPage";
import HistoryPage from "./pages/HistoryPage";
import OverviewPage from "./pages/OverviewPage";
import GetStartedPage from "./pages/GetStartedPage";
import BusinessNameCheckPage from "./pages/BusinessNameCheckPage";
import BusinessRegistrationCheckPage from "./pages/BusinessRegistrationCheckPage";
import CacRegistrationPage from "./pages/CacRegistrationPage";
import CacRegistrationDetailsPage from "./pages/CacRegistrationDetailsPage";
import CacDetailsPage from "./pages/CacDetailsPage";
import BusinessRegistrationPage from "./pages/BusinessRegistrationPage";
import BusinessUpdatePage from "./pages/BusinessUpdatePage";
import LinkReaderPage from "./pages/LinkReaderPage";
import ReaderSetupPage from "./pages/ReaderSetupPage";
import RequestReaderPage from "./pages/RequestReaderPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import SampleReceiptPage from "./pages/SampleReceiptPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaymentProvider>
        <DeviceProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login-signup" element={<LoginSignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/keypad" element={<KeypadPage />} />
                <Route path="/process-payment" element={<ProcessPaymentPage />} />
                <Route path="/receipt" element={<ReceiptPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />
                <Route path="/business-name-check" element={<BusinessNameCheckPage />} />
                <Route path="/business-registration-check" element={<BusinessRegistrationCheckPage />} />
                <Route path="/cac-registration" element={<CacRegistrationPage />} />
                <Route path="/cac-registration-details" element={<CacRegistrationDetailsPage />} />
                <Route path="/cac-details" element={<CacDetailsPage />} />
                <Route path="/business-registration" element={<BusinessRegistrationPage />} />
                <Route path="/business-update" element={<BusinessUpdatePage />} />
                <Route path="/link-reader" element={<LinkReaderPage />} />
                <Route path="/reader-setup" element={<ReaderSetupPage />} />
                <Route path="/request-reader" element={<RequestReaderPage />} />
                <Route path="/payment-method" element={<PaymentMethodPage />} />
                <Route path="/sample-receipt" element={<SampleReceiptPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DeviceProvider>
      </PaymentProvider>
    </QueryClientProvider>
  );
}

export default App;
