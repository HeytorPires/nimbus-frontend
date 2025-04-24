import {
  Bookmark,
  ClipboardList,
  Home,
  Search,
  Settings,
  CircleUserRound,
  LogOut,
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

// Menu items.
const items = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Tasks",
    url: "tasks",
    icon: ClipboardList,
  },
  {
    title: "Categorys",
    url: "#",
    icon: Bookmark,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
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
  const { setUser, signOut } = useAuth();
  const Navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    Navigate("/login");
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
