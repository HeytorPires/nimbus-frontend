import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { tagService } from "@/service/tagService";
import { useAuth } from "@/hooks/useAuth";
import { Tag } from "@/types/Tag";
import { toast } from "sonner";
interface iProps {
  open: boolean;
  setOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

const DialogMarkers = ({ open, setOpenChange, onCreated }: iProps) => {
  const { user } = useAuth();
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Tag name is required.");
      return;
    }

    if (!user) {
      toast.error("user not authenticated.");
      return;
    }
    const newTag: Tag = {
      name: name.trim(),
      created_by: user.id,
    };

    try {
      await tagService.create(newTag);
      setName("");
      toast.success("Tag create successfully");
      setOpenChange(false);
      onCreated?.();
    } catch (error) {
      console.error("Error to search tags", error);
      alert("Erro to create tag. try again.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="m-5">
          <DialogTitle>Create new marker</DialogTitle>
          <DialogDescription>Create your own bookmark</DialogDescription>
          <Input
            placeholder="Name marker"
            className="my-5"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-between">
            <Button className="w-min" onClick={handleSubmit}>
              Create
            </Button>
            <Button
              className="w-min"
              variant="destructive"
              onClick={() => setOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMarkers;
