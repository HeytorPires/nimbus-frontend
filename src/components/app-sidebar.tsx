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
  ChevronRight,
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
import DialogSettings from "@/components/dialog/DialogSettings";
import { tagService } from "@/service/tagService";
import { Tag } from "@/types/Tag";

interface Item {
  title: string;
  url: string;
  icon: React.ComponentType;
  items?: Tag[];
}

const itemss: Item[] = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Markers",
    url: "markers",
    icon: ChevronRight,
    items: [],
  },
  {
    title: "Account",
    url: "#",
    icon: CircleUserRound,
  },
];

export function AppSidebar() {
  const Navigate = useNavigate();
  const { user, setUser, setSession } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [items, setItems] = useState<Item[]>(itemss);

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
        const dataTag = await tagService.getAllByIdUser(idUser);
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.title === "Markers" ? { ...item, items: dataTag || [] } : item
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

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
                    {/* Render tags se existirem */}
                    {item.title === "Markers" &&
                      item.items &&
                      item.items.length > 0 && (
                        <SidebarMenu className="pl-6">
                          {item.items.map((tag) => (
                            <SidebarMenuItem key={tag.id}>
                              <SidebarMenuButton asChild>
                                <Link to={`/markers/${tag.id}`}>
                                  <Bookmark />
                                  <span>{tag.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      )}
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
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <a className="cursor-pointer">
                      <span>{user?.email}</span>
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
