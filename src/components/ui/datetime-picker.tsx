"use client";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format, startOfDay, isBefore} from "date-fns";
import {CalendarBlank} from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ptBR} from "date-fns/locale";
import {cn} from "@/lib/utils";

interface DatePickerProps {
    placeHolder: string | null;
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
}

export function DateTimePicker({value, onChange, placeHolder}: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(value);
    const [time, setTime] = React.useState<string>("00:00");
 
    useEffect(() => {
        if (!date) return;

        const [hours, minutes] = time.split(':').map(Number);
        const newDate = new Date(date.setHours(hours, minutes));

        const formattedDate = format(newDate, "dd-MM-yyyy HH:mm:ss");
        onChange(newDate); // Atualiza o valor no componente pai, se necessário
    }, [date, time, onChange]);

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };

    return (
        <div className="flex h-10 w-full gap-2 flex-row items-center rounded-xl border border-divider bg-white py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800 focus-visible:ring-offset-0">
            <Popover>
                <PopoverTrigger className={cn("h-10 rounded-xl border-divider hover:bg-white")} asChild>
                    <Button
                        variant={"ghost"}
                        className={cn("h-full w-full justify-start  text-left font-normal pr-0 ", !date && "text-gray-500")}
                    >
                        <CalendarBlank className="-ml-1 mr-2 h-5 w-5 text-green-950" />
                        {date ? format(date, "dd/MM/yyyy") : <span>{placeHolder || "Selecione a data"}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 ">
                    <Calendar
                        disabled={(date) => isBefore(date, startOfDay(new Date()))}
                        mode="single"
                        locale={ptBR}
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
                <Input
                    id="time"
                    className="z-50 gap-0 border-none bg-transparent p-0 focus-visible:ring-transparent"
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                />
                
        </div>
    );
}
