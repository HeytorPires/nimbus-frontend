import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { Tag } from "@/types/Tag";
import { tagService } from "@/service/tagService";
import { toast } from "sonner";

interface iProps {
  open: boolean;
  setOpenChange: (open: boolean) => void;
  onCreated?: () => void;
  tagInitial: Tag | undefined;
}

const DialogMarkersEdit = ({
  open,
  setOpenChange,
  onCreated,
  tagInitial,
}: iProps) => {
  const [tag, setTag] = useState<Tag | undefined>(tagInitial);
  const oldName = tag?.name;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag((prevTag) => ({
      ...prevTag,
      name: e.target.value,
    }));
  };
  const handleEdit = async () => {
    try {
      if (!tag?.id) {
        toast.error("Impossivel atualizar uma tag sem ID");
        onCreated?.();
        return;
      }
      await tagService.update(tag?.id, tag);
      toast.success("Tag atualizada com sucesso!");
      setOpenChange(false);
      onCreated?.();
    } catch (error) {
      console.error("Erro ao atualizar tag:", error);
      alert("Erro ao atualizar a tag. Tente novamente.");
    }
    onCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="m-5">
          <DialogTitle>Edit markers</DialogTitle>
          <DialogDescription>Edit your bookmarks</DialogDescription>
          <p>Old name: {oldName}</p>
          <Input
            placeholder="Name marker"
            className="my-1"
            value={tag?.name}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <Button className="w-min" onClick={handleEdit}>
              Update
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

export default DialogMarkersEdit;
