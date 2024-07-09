"use client";
import {
    Buildings,
    Factory,
    Truck,
    Sun,
    SunHorizon,
    Moon,
    Hash,
    Grains,
    Calendar,
    Tag,
    CalendarBlank
} from "@phosphor-icons/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import OrdemServico from "@/types/ordem-de-servico";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useGetUnit } from "@/utils/hooks/useGetUnit";
import useFormattedDate from "@/utils/formatDate";
import { useGetCompany } from "@/utils/hooks/useGetCompany";
import { Button } from "@/components/ui/button";
import { useGetField } from "@/utils/hooks/useGetField";
import { useGetMachine } from "@/utils/hooks/useGetMachine";

interface ViewOrderProps {
    ordem: OrdemServico;
    children: ReactNode;
}

const ViewOrderModal = ({ children, ordem }: ViewOrderProps) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const formatDate = useFormattedDate();
    const morningOperator = ordem.operadores!.find(operator => operator.turno === 'M');
    const afternoonOperator = ordem.operadores!.find(operator => operator.turno === 'T');
    const nightOperator = ordem.operadores!.find(operator => operator.turno === 'N');

    const {
        data: unidade,
        isLoading: isLoadingUnit,
        refetch: refetchU
    } = useGetUnit(ordem.unidade_id!);

    const {
        data: empresa,
        isLoading: isLoadingCompany,
        refetch: refetchC
    } = useGetCompany(ordem.empresa_id!);

    const {
        data: talhao,
        isLoading: isLoadingField,
        refetch: refetchF
    } = useGetField(ordem.talhao_id!);

    const {
        data: maquina,
        isLoading: isLoadingMachine,
        refetch: refetchM
    } = useGetMachine(ordem.maquina_id!);

    useEffect(() => {
        refetchM();
        refetchC();
        refetchF();
        refetchU();
     
    }, [open]);

    const handleClose = () => {
        setOpen(false);

    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Ordem de Serviço</DialogTitle>
                    <DialogDescription>Você está visualizando as informações da Ordem de Serviço</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input disabled Icon={Hash} className=" col-span-2" id="id" placeholder="Código da Ordem" value={ordem.id! || "Não informado"} />
                    {!isLoadingCompany && <Input disabled Icon={Buildings} className="col-span-2 " id="empresa" placeholder="Empresa" value={empresa.nome! || "Não informado"} />}
                    {!isLoadingUnit && <Input disabled Icon={Factory} className="col-span-2 " id="unidade" placeholder="Unidade" value={unidade.nome || "Não informado"} />}
                    {!isLoadingMachine && <Input disabled Icon={Truck} className="col-span-1 " id="maquina" placeholder="Máquina" value={maquina.nome || "Não informado"} />}
                    {!isLoadingField && <Input disabled Icon={Grains} className="col-span-1 " id="talhao" placeholder="Talhão" value={talhao.codigo || "Não informado"} />}
                    <Input disabled Icon={CalendarBlank} className="col-span-1 " id="data_inicio" placeholder="Data Inicio" value={formatDate(ordem.data_inicio!) || "Não informado"} />
                    <Input disabled Icon={Calendar} className="col-span-1 " id="data_aquisicao" placeholder="Data Fim" value={formatDate(ordem.data_fim!) || "Não informado"} />
                    <Input disabled Icon={Tag} className="col-span-1 " id="status" placeholder="Status" value= {t(ordem.status!)} />
                    {morningOperator && <Input disabled Icon={SunHorizon} className="col-span-1 " id="operador_manha" placeholder="Operador Manhã" value= {morningOperator.nome!} />}
                    {afternoonOperator && <Input disabled Icon={Sun} className="col-span-1 " id="operador_tarde" placeholder="Operador Tarde" value= {afternoonOperator.nome!} />}
                    {nightOperator && <Input disabled Icon={Moon} className="col-span-1 " id="operador_noite" placeholder="Operador Noturno" value= {nightOperator.nome!} />}
                    
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
};
export default ViewOrderModal;
