import AppLayout from "@/components/layout/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./appRoutes"; // ou onde você separou o AppRoutes

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
          <Toaster />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
