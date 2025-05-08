import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/service/authService";
import {
  Home,
  Settings,
  CircleUserRound,
  LogOut,
  Bookmark,
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
import DialogSettings from "@/components/dialog/DialogSettings"; // ajuste o path conforme seu projeto
import { tagService } from "@/service/tagService";
import { Tag } from "@/types/Tag";
const items = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Markers",
    url: "markers",
    icon: Bookmark,
  },
  {
    title: "Account",
    url: "#",
    icon: CircleUserRound,
  },
];

export function AppSidebar() {
  const Navigate = useNavigate();
  const { user } = useAuth();
  const { setUser, setSession } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tags, setTags] = useState<Tag[] | null>([]);
  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
    setSession(null);
    setTimeout(() => {
      Navigate("/");
    }, 5);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = user?.id;
        const dataTag: Tag[] | null = await tagService.getAllByIdUser(idUser);
        setTags(dataTag);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  });
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Nimbus</SidebarGroupLabel>
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
                  <SidebarMenuButton asChild>
                    <a
                      className="cursor-pointer"
                      onClick={() => setDialogOpen(true)}
                    >
                      <Settings />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

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
      <DialogSettings open={dialogOpen} setOpenChange={setDialogOpen} />
    </>
  );
}
