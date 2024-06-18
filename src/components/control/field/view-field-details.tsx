"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FieldClimateChart } from "./field-climate-chart";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import Talhao from "@/types/talhao";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { FieldAnualClimateChart } from "./field-climate-anual-chart";

interface EditFieldProps {
    field: Talhao;
    children: ReactNode;
}

export default function ViewFieldDetails({ children, field }: EditFieldProps) {
    const [open, setOpen] = useState(false);
    const [selectedInitialDate, setSelectedInitialDate] = useState<Date | undefined>(undefined);
    const [selectedFinalDate, setSelectedFinalDate] = useState<Date | undefined>(undefined);
    const [searchDates, setSearchDates] = useState<{ startDate: string; endDate: string } | null>(null);
    const [isTrienio, setIsTrienio] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false); // Novo estado para controlar se a busca foi realizada

    const handleClose = () => {
        setOpen(false);
    };

    const handleInitialDateChange = (date: Date | undefined) => {
        setSelectedInitialDate(date);
    };

    const handleFinalDateChange = (date: Date | undefined) => {
        setSelectedFinalDate(date);
    };

    const handleSearchClick = () => {
        if (selectedInitialDate && selectedFinalDate) {
            setSearchDates({
                startDate: format(selectedInitialDate, "yyyy-MM-dd"),
                endDate: format(selectedFinalDate, "yyyy-MM-dd"),
            });
            setSearchPerformed(true); // Marca que a busca foi realizada
        }
        setSearchPerformed(true)
    };

    const handleTrienioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTrienio(event.target.checked);
        setSearchPerformed(false); // Reseta o estado de busca realizada quando muda o triênio
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Talhão</DialogTitle>
                    <DialogDescription>Busque as informações de eventos climáticos do Talhão.</DialogDescription>
                </DialogHeader>

                <div className="w-full grid grid-cols-1 gap-4 py-4">
                    <div className="w-full grid grid-cols-3 gap-4 py-4">
                        <DatePicker
                            placeHolder={"Selecione a data de inicio"}
                            value={selectedInitialDate}
                            onChange={handleInitialDateChange}
                            allowPastDates={true}
                            disabled={isTrienio}
                        />
                        <DatePicker
                            placeHolder={"Selecione a data de fim"}
                            value={selectedFinalDate}
                            onChange={handleFinalDateChange}
                            allowPastDates={true}
                            minDate={selectedInitialDate}
                            disabled={isTrienio}
                        />
                        <Button onClick={handleSearchClick}>
                            Buscar
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="trienio"
                            className="mr-2"
                            checked={isTrienio}
                            onChange={handleTrienioChange}
                        />
                        <label htmlFor="trienio" className="font-poppins text-green-950">Buscar Por Triênio</label>
                    </div>
                </div>
                <div className="grid w-full gap-6 md:grid-cols-1 xl:grid-cols-3">
                    {searchPerformed && !isTrienio && (
                        <FieldClimateChart
                            isAnual={!isTrienio}
                            talhao_id={field.id!}
                            data_inicio={searchDates!.startDate}
                            data_fim={searchDates!.endDate}
                        />
                    )}
                    {searchPerformed && isTrienio && (
                        <FieldAnualClimateChart
                            isAnual={isTrienio}
                            talhao_id={field.id!}
                            data_inicio={format(new Date(), "yyyy-MM-dd")}
                            data_fim={format(new Date(), "yyyy-MM-dd")}
                        />
                    )}
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleClose}
                        type="submit"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Voltar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
