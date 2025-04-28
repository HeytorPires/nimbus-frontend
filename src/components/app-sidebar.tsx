import {
  Home,
  Settings,
  CircleUserRound,
  LogOut,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/service/authService";
// Menu items.
const items = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Add",
    url: "tasks",
    icon: Plus,
  },
  {
    title: "Edit",
    url: "#",
    icon: Pencil,
  },
  {
    title: "Delete",
    url: "#",
    icon: Trash2,
  },
  {
    title: "Account",
    url: "#",
    icon: CircleUserRound,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { setUser, setSession } = useAuth();
  const Navigate = useNavigate();

  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
    setSession(null);
    setTimeout(() => {
      Navigate("/");
    }, 5);
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Taskly</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleLogout}>
                  <a className="cursor-pointer">
                    <LogOut />
                    <span>Log out</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
