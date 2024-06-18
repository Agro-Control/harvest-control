"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarBlank } from "@phosphor-icons/react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ptBR } from "date-fns/locale";
import { format, isBefore, isAfter, addDays } from "date-fns";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  placeHolder: string | null;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  allowPastDates?: boolean;
  minDate?: Date;
  disabled: boolean // Nova propriedade para definir a data mínima selecionável
}

export function DatePicker({ value, onChange, placeHolder, allowPastDates, minDate, disabled }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    if (!date) return;

    onChange(date); // Atualiza o valor no componente pai, se necessário
  }, [date, onChange]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (allowPastDates) {
      return isAfter(date, new Date());
    } else {
      return isBefore(date, new Date());
    }
  };

  const isEndDateDisabled = (date: Date): boolean => {
    // Se minDate estiver definido e a data selecionada for antes de minDate, desabilita
    if (minDate && isBefore(date, minDate)) {
      return true;
    }
    if(minDate && isAfter(date, addDays(minDate, 30))){
      return true;
    }

    return false;
  };

  const selectedInitialDate = date || value;

  return (
    <Popover>
      <PopoverTrigger disabled={disabled} className={cn("h-10 border-divider rounded-xl hover:bg-white")} asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-gray-500")}
        >
          <CalendarBlank className="-ml-1 mr-2 h-5 w-5 text-green-950" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeHolder || "Selecione a data"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={minDate ? isEndDateDisabled : isDateDisabled} // Usa isEndDateDisabled se minDate estiver definido, caso contrário usa isDateDisabled
          mode="single"
          locale={ptBR}
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}