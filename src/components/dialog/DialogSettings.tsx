import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeSwitch } from "../ThemeSwitch";
import { Typography } from "@/components/typography";

interface iProps {
  open: boolean;
  setOpenChange: (open: boolean) => void;
}

const DialogSettings = ({ open, setOpenChange }: iProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle>Configurações</DialogTitle>
        <DialogHeader className="m-5 ">
          <ThemeSwitch />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSettings;
