"use client";

import { Check, Database } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import type { DatabaseType } from "../../types/dbs";

const databases = [
  {
    value: "postgres",
    label: "PostgreSQL",
  },
  {
    value: "mysql",
    label: "MySQL",
  },
  {
    value: "sqlite",
    label: "SQLite",
  },
  {
    value: "mongodb",
    label: "MongoDB",
  },
  {
    value: "mssql",
    label: "SQL Server",
  },
];

interface DatabaseSelectorProps {
  value: DatabaseType;
  onChange: (value: DatabaseType) => void;
}

export function DatabaseSelector({ value, onChange }: DatabaseSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedDb = databases.find((db) => db.value === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Database Type
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedDb ? selectedDb.label : "Select database..."}
            <Database className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search database..." />
            <CommandList>
              <CommandEmpty>No database found.</CommandEmpty>
              <CommandGroup>
                {databases.map((db) => (
                  <CommandItem
                    key={db.value}
                    value={db.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue as DatabaseType);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === db.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {db.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
