import AppLayout from "@/components/layout/layout";
import ScrollToTop from "@/components/layout/scroll-to-top";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth";
import { HashRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./appRoutes";
import { ThemeProvider } from "@/components/theme-provider";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
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
