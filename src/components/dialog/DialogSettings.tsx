import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ThemeSwitch } from "../ThemeSwitch";

interface iProps {
  open: boolean;
  setOpenChange: (open: boolean) => void;
}

const DialogSettings = ({ open, setOpenChange }: iProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle>Settings</DialogTitle>
        <DialogHeader className="m-5 ">
          <ThemeSwitch />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSettings;
