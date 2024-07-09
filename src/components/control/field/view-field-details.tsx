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
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Talhao from "@/types/talhao";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { FieldAnualClimateChart } from "./field-climate-anual-chart";
import FilterInformation from "@/types/filter-information";
import Filter from "../filter";
import { useQueryState } from "nuqs";
import { FieldEventsAnualChart } from "./field-events-anual-chart";

interface EditFieldProps {
    field: Talhao;
    children: ReactNode;
}
//SOMENTE VISUALIZAÇÂO N PUXAR/MERGE MAIN
const eventTypeFilter: FilterInformation = {
    filterItem: [
        { value: "abastecimento" },
        { value: "troca_turno" },
        { value: "operacao" },
        { value: "aguardando_transbordo_automatico" },
        { value: "deslocamento" },
        { value: "aguardando_transbordo" },
        { value: "manutencao" },
        { value: "clima" },
    ]
};

export default function ViewFieldDetails({ children, field }: EditFieldProps) {
    const [open, setOpen] = useState(false);
    const [Tipo] = useQueryState("Tipo");
    const [selectedInitialDate, setSelectedInitialDate] = useState<Date | undefined>(undefined);
    const [selectedFinalDate, setSelectedFinalDate] = useState<Date | undefined>(undefined);
    const [searchDates, setSearchDates] = useState<{ startDate: string; endDate: string } | null>(null);
    const [isTrienio, setIsTrienio] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false); // Novo estado para controlar se a busca foi realizada

    useEffect(() => {

    }, [isTrienio, searchPerformed, Tipo]);

    const handleClose = () => {
        setOpen(false);
        setIsTrienio(false);
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
    function getInicioDoAnoAtual() {
        let hoje = new Date();
        let anoAtual = hoje.getFullYear();
        let inicioDoAno = new Date(anoAtual, 0, 1);
        function formatarData(inicioDoAno: Date) {
            let dia: string | number = inicioDoAno.getDate() + 1;
            let mes: string | number = inicioDoAno.getMonth() + 1;
            let ano: string | number = inicioDoAno.getFullYear();

            // Garantindo que o dia e o mês tenham dois dígitos
            if (dia < 10) {
                dia = '0' + dia.toString();
            }
            if (mes < 10) {
                mes = '0' + mes.toString();
            }

            return `${ano}-${mes}-${dia}`;
        }

        // Formatando a data de início do ano
        let dataInicioDoAnoFormatada = formatarData(inicioDoAno);

        return dataInicioDoAnoFormatada;
    }

    // Exemplo de uso da função
    const dataInicioDoAno = getInicioDoAnoAtual();
    const dataAmanha = new Date();
    dataAmanha.setDate(dataAmanha.getDate() + 1);
    console.log(Tipo);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[1800px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Talhão {field.codigo}</DialogTitle>
                    <DialogDescription>Busque as informações de eventos do Talhão: {field.codigo}.</DialogDescription>
                </DialogHeader>

                <div className="w-full grid grid-cols-1 gap-4 py-4">
                    <div className="w-full grid grid-cols-4 gap-4 py-4">
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
                        <Filter filter={eventTypeFilter} paramType="Tipo" />
                        <Button disabled={Tipo && isTrienio ? !isTrienio : !selectedInitialDate || !selectedFinalDate}
                            onClick={handleSearchClick} className="font-regular rounded-xl max-w-[150px] bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600">
                            Buscar
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="trienio"
                            className="mr-2 bg-green-500"
                            checked={isTrienio}
                            onChange={handleTrienioChange}
                        />
                        <label htmlFor="trienio" className="font-poppins text-green-950">Buscar Por Triênio</label>
                    </div>
                </div>
                <div className="grid w-full gap-30 md:grid-cols-2 xl:grid-cols-2">
                    <FieldEventsAnualChart talhao_id={field.id!} data_inicio={dataInicioDoAno} data_fim={format(dataAmanha, "yyyy-MM-dd")}></FieldEventsAnualChart>
                    
                    <div style={{ height: 500, width: 800 }}>
                        {searchPerformed && !isTrienio && (
                            <FieldClimateChart
                                isAnual={!isTrienio}
                                talhao_id={field.id!}
                                data_inicio={searchDates!.startDate}
                                data_fim={searchDates!.endDate}
                                tipo={Tipo!}
                            />
                        )}
                        {searchPerformed && isTrienio && (
                            <FieldAnualClimateChart
                                isAnual={isTrienio}
                                talhao_id={field.id!}
                                data_inicio={format(new Date(), "yyyy-MM-dd")}
                                data_fim={format(new Date(), "yyyy-MM-dd")}
                                tipo={Tipo!}
                            />
                        )}
                    </div>

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
