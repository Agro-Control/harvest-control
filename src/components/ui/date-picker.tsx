"use client";

import * as React from "react";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarBlank} from "@phosphor-icons/react";

export function DatePicker() {
    const [date, setDate] = React.useState<Date>();

    React.useEffect(() => {
        console.log(date);
        if (!date) return;

        const formattedDate = format(date, "dd-MM-yyyy");
        console.log(formattedDate);
    }, [date]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                    <CalendarBlank className="-ml-1 mr-2 h-5 w-5" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Selecione a data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    disabled={(date) => date < new Date()}
                    mode="single"
                    locale={ptBR}
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
