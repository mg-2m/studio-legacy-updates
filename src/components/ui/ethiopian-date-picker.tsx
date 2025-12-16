
"use client";

import React, { useState, useMemo } from 'react';
const EthiopianCalendar = require('react-ethiopian-calendar');
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as EthiopianDate from 'ethiopian-date';

interface EthiopianDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const EthiopianDatePicker: React.FC<EthiopianDatePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedGregorianDate = useMemo(() => {
    if (!value) return new Date();
    try {
      const [ey, em, ed] = value.split('-').map(Number);
      if (isNaN(ey) || isNaN(em) || isNaN(ed)) return new Date();
      const [gy, gm, gd] = EthiopianDate.toGregorian(ey, em, ed);
      return new Date(gy, gm - 1, gd);
    } catch {
      return new Date();
    }
  }, [value]);

  const handleSelect = (date: number[]) => {
    const [year, month, day] = date;
    const ethiopianDate = EthiopianDate.toEthiopian(year, month, day);
    onChange(`${ethiopianDate[0]}-${ethiopianDate[1]}-${ethiopianDate[2]}`);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <EthiopianCalendar
          onDateChange={handleSelect}
          date={selectedGregorianDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EthiopianDatePicker;
