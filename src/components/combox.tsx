import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Tag } from "@/types/Tag";

type ComboBoxProps = {
  options: Tag[];
  value: string | undefined | null;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
};

export const ComboBox = ({
  options,
  value,
  onChange,
  placeholder = "Selecione",
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((option) => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption?.name || "Nenhuma tag selecionada"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
          <CommandGroup>
            {/* Opção para desmarcar a tag */}
            <CommandItem
              key="no-tag"
              onSelect={() => {
                onChange(undefined);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === undefined ? "opacity-100" : "opacity-0"
                )}
              />
              Nenhuma tag
            </CommandItem>

            {options.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
