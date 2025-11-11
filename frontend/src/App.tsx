import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import SPDashboard from "./components/SPDashboard";
import LoginPage from "./pages/LoginPage";
import CustomerProfile from "./pages/CustomerProfile";
import { User } from "lucide-react";
import MergedApp from "./pages/MergedApp";
import ProfilePageSP from "./pages/ProfilePageSP";
import PrivateRoute from "./components/privateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/*  Add your dashboard route here */}
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<SPDashboard />} />
          <Route path="/request" element={<ServiceRequestPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/profile" element={
            <PrivateRoute allowRoles={["customer"]}>
              <CustomerProfile />
            </PrivateRoute>
          }/>
          <Route path="/user" element={<MergedApp/>}/>
          <Route path="/sp-profile" element={
            <PrivateRoute allowRoles={["provider"]}>
              <ProfilePageSP />
            </PrivateRoute>
          } />


          {/* Keep this catch-all route last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
