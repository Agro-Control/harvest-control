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
import {Calendar, Factory, GasPump, GearSix, Tag, Truck, Wrench, Files} from "@phosphor-icons/react";
import OperationalTimeItem from "@/components/control/dashboard/operational-time-item";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useGetOperationalTime} from "@/utils/hooks/useGetOperationalTime";
import {useGetMachineInfo} from "@/utils/hooks/useGetMachineInfo";
import {ReactNode, useEffect, useState} from "react";
import {useGetUnit} from "@/utils/hooks/useGetUnit";
import useFormattedDate from "@/utils/formatDate";
import tractor from "@/assets/tractorGreen.svg";
import colhedora from "@/assets/colhedora.png";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/utils/hooks/useAuth";
import {useTranslation} from "react-i18next";
import {Input} from "@/components/ui/input";
import AdvancedInfo from "./advanced-info";
import Maquina from "@/types/maquina";
import Image from "next/image";

interface EditMachineProps {
    machine: Maquina;
    children: ReactNode;
}

const ViewMachineModal = ({children, machine}: EditMachineProps) => {
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const {data: unidade, error, isError, isLoading, refetch, isRefetching} = useGetUnit(machine.unidade_id!);
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const empresa_id = user && user?.empresa_id;
    const grupo_id = user && user?.grupo_id;

    const {data: operationalTime, refetch: refetchOperationalTime} = useGetOperationalTime(
        grupo_id,
        isAdmin ? null : empresa_id,
        machine.id,
    );

    console.log(operationalTime);

    const {
        data,
        isLoading: isLoadingInfo,
        refetch: refetchInfo,
        isRefetching: isRefetchingInfo,
    } = useGetMachineInfo(machine.id);

    const formatDuration = (duration: number | null | undefined): string => {

        if(duration === undefined) return "";

        if (duration === 0 || duration === null) {
            return "Em andamento";
        }

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        const hoursStr = hours > 0 ? `${hours}hr` : "";
        const minutesStr = minutes > 0 ? `${minutes}min  ` : "";
        const secondsStr = seconds > 0 ? ` ${seconds}s` : "";

        return `${hoursStr} ${minutesStr}  ${secondsStr}`.trim();
    };

    const formatDate = useFormattedDate();

    useEffect(() => {
        if (open && !isLoading && !isRefetching) {
            refetch();
            refetchInfo();
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <Tabs defaultValue="account">
                <DialogContent className=" sm:min-w-[1120px]">
                    <DialogHeader className="gap-2">
                        <div>
                            <DialogTitle className="font-poppins text-green-950">
                                <div className="flex flex-row items-center justify-start gap-3">
                                    <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                        <Image className="h-5 w-5 " src={tractor} alt="T" />
                                    </div>
                                    <p>{`${machine.nome || ""} - ${machine.modelo || ""}`}</p>
                                </div>
                            </DialogTitle>
                        </div>

                        <TabsList className="grid max-w-[240px] grid-cols-2 ">
                            <TabsTrigger value="basic">Básico</TabsTrigger>
                            <TabsTrigger value="advanced">Avançado</TabsTrigger>
                        </TabsList>
                    </DialogHeader>
                    <TabsContent value="basic">
                        <div className="flex h-full w-full flex-row items-start justify-start gap-4">
                            <div className="flex min-w-[340px] flex-col gap-4">
                                <Image
                                    className="h-[242px] w-[335px] rounded-xl object-cover"
                                    quality={100}
                                    placeholder="blur"
                                    priority={true}
                                    src={colhedora}
                                    alt="T"
                                />
                                <div className="flex h-full max-h-[1px] min-h-[1px] w-full flex-1 bg-divider" />

                                <div className="flex w-full flex-col gap-3">
                                    <div className="flex flex-row items-center justify-start gap-3">
                                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border  border-divider bg-gray-500/10 ">
                                            <Files className="h-5 w-5 " />
                                        </div>
                                        <p className="text-sm font-bold">Informações</p>
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <div className="flex w-full flex-row gap-2">
                                            <p className="text-sm font-bold">Nome: </p>
                                            <p className="text-sm font-semibold text-green-800">{machine.nome || ""}</p>
                                        </div>
                                        <div className="flex w-full flex-row gap-2">
                                            <p className="text-sm font-bold">Modelo: </p>
                                            <p className="text-sm font-semibold text-green-800">
                                                {machine.modelo || ""}
                                            </p>
                                        </div>
                                        <div className="flex w-full flex-row gap-2">
                                            <p className="text-sm font-bold">Fabricante: </p>
                                            <p className="text-sm font-semibold text-green-800">
                                                {machine.fabricante || ""}
                                            </p>
                                        </div>
                                        <div className="flex w-full flex-row gap-2">
                                            <p className="text-sm font-bold">Unidade: </p>
                                            <p className="text-sm font-semibold text-green-800">
                                                {unidade?.nome || ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full gap-3"> 
                            <div className="flex w-full flex-row items-center justify-between rounded-2xl border border-divider bg-white p-4 ">
                               
                               <div className="flex w-full flex-row gap-4">
                               
                               <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 " >
                                   <Files className="h-5 w-5 text-green-950 " />
                               </div>
                               
                               <div className="flex  flex-row md:flex-col">
                                <div className="flex flex-row gap-2"> 
                                   <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                       Ultimo evento
                                   </p>
                                   <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                      {formatDate(data?.ultimos_eventos[0].data_inicio!)}
                                   </p>
                                </div>
                                   <p className="line-clamp-1 text-sm font-bold leading-5 text-green-950 ">
                                       {t(data?.ultimos_eventos[0].nome!) || ""}
                                   </p>
                               </div>

                               </div> 
                                    {/* TODO: verificar o tamanho do texto */}
                                  <p className="w-auto text-sm text-center font-bold text-green-950 px-4 rounded-full bg-green-400/50"> 
                                   {formatDuration(data?.ultimos_eventos[0].duracao) || ""}
                                  </p>

                            </div>  


                            <div className="col-span-2 flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4  lg:min-h-[130px] xl:col-span-1">
                                <div className="text-black flex h-full w-full flex-col items-center justify-between gap-3 rounded-2xl border border-divider bg-gray-500/10 px-3 py-12 text-base font-normal">
                                <OperationalTimeItem
                                    title="Operação"
                                    description="Tempo total de eventos produtivos."
                                    color="#16a34a"
                                    value={operationalTime?.operacionais || 0}
                                    total={operationalTime?.tempo_jornada_total || 100}
                                />
                                <OperationalTimeItem
                                    title="Improdutivo"
                                    description="Tempo total de eventos improdutivos."
                                    color="#FF5F15"
                                    value={operationalTime?.improdutivos || 0}
                                    total={operationalTime?.tempo_jornada_total || 100}
                                />
                                <OperationalTimeItem
                                    title="Manutenção"
                                    description="Tempo total de eventos manutenção."
                                    color="#ef4c51"
                                    value={operationalTime?.manutencao || 0}
                                    total={operationalTime?.tempo_jornada_total || 100}
                                />
                                </div>
                            </div>  
                           
                        </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="advanced">
                        {/* {data && <AdvancedInfo data={data} />} */}
                        <DialogFooter>
                            <Button
                                onClick={handleClose}
                                type="submit"
                                className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                            >
                                Voltar
                            </Button>
                        </DialogFooter>
                    </TabsContent>
                </DialogContent>
            </Tabs>
        </Dialog>
    );
};
export default ViewMachineModal;

