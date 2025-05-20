import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { useRouteLoaderData } from "react-router-dom";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(theme === "dark");
  }, [theme]);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    setTheme(checked ? "dark" : "light");
    // window.location.reload();
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        checked={enabled}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="theme-switch">
        {enabled ? "Dark Mode" : "Light Mode"}
      </Label>
    </div>
  );
}
