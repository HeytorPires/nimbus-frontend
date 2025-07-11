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

interface DialogMarkersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

const DialogMarkers = ({
  open,
  onOpenChange,
  onCreated,
}: DialogMarkersProps) => {
  const { user } = useAuth();
  const [tagName, setTagName] = useState("");

  const handleSubmit = async () => {
    if (!tagName.trim()) {
      toast.error("Tag name is required.");
      return;
    }

    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    const newTag: Tag = {
      name: tagName.trim(),
      created_by: user.id,
    };

    try {
      await tagService.create(newTag);
      setTagName("");
      toast.success("Tag created successfully!");
      onOpenChange(false);
      onCreated?.();
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("Failed to create tag. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="m-5">
          <DialogTitle>Create new tag</DialogTitle>
          <DialogDescription>Create your own tag</DialogDescription>
          <Input
            placeholder="Tag name"
            className="my-5"
            onChange={(e) => setTagName(e.target.value)}
          />
          <div className="flex justify-between">
            <Button className="w-min" onClick={handleSubmit}>
              Create
            </Button>
            <Button
              className="w-min"
              variant="destructive"
              onClick={() => onOpenChange(false)}
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
