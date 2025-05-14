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
  Plus,
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
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import DialogCreateMarkers from "./dialog/DialogCreateMarkers";
interface Item {
  title: string;
  url: string;
  icon: React.ComponentType;
  items?: Tag[];
}

export function AppSidebar() {
  const Collapsible = CollapsiblePrimitive.Root;

  const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

  const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
  const navigate = useNavigate();
  const { user, setUser, setSession } = useAuth();
  const [dialogSettingsOpen, setDialogSettingsOpen] = useState(false);
  const [dialogMarkerOpen, setDialogMarkersOpen] = useState(false);
  const [markersOpen, setMarkersOpen] = useState(true); // controla o colapso
  const [items, setItems] = useState<Item[]>([
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
  ]);

  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
    setSession(null);
    setTimeout(() => {
      navigate("/");
    }, 5);
  };
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

  useEffect(() => {
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
                {items.map((item) => {
                  if (item.title === "Markers") {
                    return (
                      <Collapsible
                        key={item.title}
                        open={markersOpen}
                        onOpenChange={setMarkersOpen}
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="flex items-center gap-2 w-full cursor-pointer">
                              <Bookmark />
                              <span>{item.title}</span>
                              <ChevronRight
                                className={`ml-auto transition-transform ${
                                  markersOpen ? "rotate-90" : ""
                                }`}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        </SidebarMenuItem>

                        <CollapsibleContent>
                          <SidebarMenu className="pl-6">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <button
                                  className="cursor-pointer"
                                  onClick={() => setDialogMarkersOpen(true)}
                                >
                                  <Plus />
                                  <span>Add</span>
                                </button>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            {item.items?.map((tag) => (
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
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      className="cursor-pointer"
                      onClick={() => setDialogSettingsOpen(true)}
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
                    <span>{user?.email}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <DialogSettings
        open={dialogSettingsOpen}
        setOpenChange={setDialogSettingsOpen}
      />
      <DialogCreateMarkers
        open={dialogMarkerOpen}
        setOpenChange={setDialogMarkersOpen}
        onCreated={fetchData}
      />
    </>
  );
}
