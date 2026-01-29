
"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import * as EthiopianDate from "ethiopian-date";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EthiopianDatePickerProps {
  value: string; // Storing date as "YYYY-MM-DD" in Ethiopian calendar
  onChange: (date: string) => void;
}

export function EthiopianDatePicker({ value, onChange }: EthiopianDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Convert the Ethiopian date string from props to a Gregorian Date object for the calendar
  const gregorianDate = React.useMemo(() => {
    if (!value) return undefined;
    try {
      const [ey, em, ed] = value.split("-").map(Number);
      if (isNaN(ey) || isNaN(em) || isNaN(ed)) return undefined;
      const [gy, gm, gd] = EthiopianDate.toGregorian(ey, em, ed);
      return new Date(gy, gm - 1, gd);
    } catch {
      return undefined;
    }
  }, [value]);

  // When a date is selected in the calendar
  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const [gy, gm, gd] = [selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()];
    const [ey, em, ed] = EthiopianDate.toEthiopian(gy, gm, gd);
    
    // Call the onChange prop with the new Ethiopian date string
    onChange(`${ey}-${em}-${ed}`);
    setIsOpen(false); // Close the popover
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !gregorianDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{value ? value : "Pick a date"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={gregorianDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default EthiopianDatePicker;
