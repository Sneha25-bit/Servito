import { Toaster } from "@/components_2/ui/toaster_2_2";
import { Toaster as Sonner } from "@/components_2/ui/sonner_2_2";
import { TooltipProvider } from "@/components_2/ui/tooltip_2_2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages_2/Index";
// NotFound page removed

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Catch-all route removed since NotFound page was deleted */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
