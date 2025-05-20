import AppLayout from "@/components/layout/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./appRoutes"; // ou onde você separou o AppRoutes
import { ThemeProvider } from "@/components/theme-provider";

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
            <Toaster />
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
