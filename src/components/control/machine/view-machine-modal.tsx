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
import { useGetCompanie } from "@/utils/hooks/useGetCompanie";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Maquina from "@/types/maquina";
import { useGetUnit } from "@/utils/hooks/useGetUnit";
import { Calendar, Factory, GasPump, GearSix, Tag, Truck, Wrench } from "@phosphor-icons/react";
import useFormattedDate from "@/utils/formatDate";



interface EditMachineProps {
    machine: Maquina;
    children: ReactNode;
}

const ViewMachineModal = ({ children, machine }: EditMachineProps) => {
    const [open, setOpen] = useState(false);
    const {
        data: unidade,
        error,
        isError,
        isLoading,
        refetch,
        isRefetching,
    } = useGetUnit(machine.unidade_id!);

    const formatDate = useFormattedDate();

    useEffect(() => {
        if (open && !isLoading && !isRefetching) {
            refetch();
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Máquina</DialogTitle>
                    <DialogDescription>Você está visualizando as informações da Máquina.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input disabled Icon={Truck} className=" col-span-2" id="nome" placeholder="Codigo" value={machine.nome! || "Não informado"} />
                    <Input disabled Icon={GearSix} className="col-span-2 " id="modelo" placeholder="Modelo" value={machine.modelo! + " ha" || "Não informado"} />
                    <Input disabled Icon={Wrench} className="col-span-2 " id="fabricante" placeholder="Fabricante" value={machine.fabricante || "Não informado"} />
                    <Input disabled Icon={GasPump} className="col-span-1 " id="capacidade_opercional" placeholder="Capacidade Operacional" value={machine.capacidade_operacional || "Não informado"} />
                    <Input disabled Icon={Calendar} className="col-span-1 " id="data_aquisicao" placeholder="Data Aquisição" value={formatDate(machine.data_aquisicao!) || "Não informado"} />
                    {!isLoading && <Input disabled Icon={Factory} className="col-span-1 " id="unidade" placeholder="Unidade" value={!isLoading && unidade?.nome} />}
                    <Input disabled Icon={Tag} className="col-span-1 " id="status" placeholder="Status" value={machine.status === 'A' ? 'Ativo' : 'Inativo'} />
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleClose}
                        type="submit"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default ViewMachineModal;
