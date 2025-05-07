import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface iProps {
  open: boolean;
  setOpenChange: (open: boolean) => void;
}

const DialogSettings = ({ open, setOpenChange }: iProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="m-5">
          <DialogTitle>title</DialogTitle>
          <DialogDescription>description</DialogDescription>
          <DialogDescription>Updated at updated_at?.toString</DialogDescription>
          <DialogDescription>
            <Link
              target="_blank"
              className="text-black flex flex-row items-center underline"
              to={""}
            >
              Repository
            </Link>
          </DialogDescription>
          <br />
          <>
            <DialogDescription
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
              className="max-h-48 w-full overflow-y-auto whitespace-pre-wrap break-words select-none border p-2 rounded bg-gray-100 text-sm"
            >
              var_env
            </DialogDescription>
            <br />
            <Button className="w-min"> Teste</Button>
          </>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSettings;
