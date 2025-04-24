import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

function TesteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="pointer-events-auto">
          Testar Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Teste</DialogTitle>
        <DialogDescription>Este é um teste do diálogo.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default TesteDialog;
