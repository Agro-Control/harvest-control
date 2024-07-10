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
import {Calendar, Clock, GasPump, GearSix, User, Truck, Wrench, Files, ArrowFatLineRight, TrendUp, CloudRain} from "@phosphor-icons/react";
import OperationalTimeItem from "@/components/control/dashboard/operational-time-item";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useGetOperationalTime} from "@/utils/hooks/useGetOperationalTime";
import {useGetMachineInfo, EventInfo} from "@/utils/hooks/useGetMachineInfo";
import MaintenanceProgress from "./maintenance-progress";
import {ReactNode, useEffect, useState} from "react";
import {useGetUnit} from "@/utils/hooks/useGetUnit";
import useFormattedDate from "@/utils/formatDate";
import MaintenanceInfo from "./maintenance-info";
import tractor from "@/assets/tractorGreen.svg";
import colhedora from "@/assets/colhedora.png";
import {useAuth} from "@/utils/hooks/useAuth";
import {useTranslation} from "react-i18next";
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

   function getTime(dateString: Date | string | undefined | null): string {
        if (!dateString || typeof dateString !== 'string') {
            return "-";
        }

        if(dateString === null) {
            return "Em andamento";
        }
      
        const date = new Date(dateString);
  
        if (isNaN(date.getTime())) {
            return "";
        }
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
  
        return `${hours}:${minutes}:${seconds}`;
    };
   function getDate(dateString: Date | string | undefined | null): string {
        if (!dateString || typeof dateString !== 'string') {
            return "-";
        }

        if(dateString === null) {
            return "-";
        }
      
        const date = new Date(dateString);
  
        if (isNaN(date.getTime())) {
            return "";
        }
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
  
        return `${day}/${month}/${year}`;
    };
  

    const {
        data,
        isLoading: isLoadingInfo,
        refetch: refetchInfo,
        isRefetching: isRefetchingInfo,
    } = useGetMachineInfo(machine.id);

    const formatDuration = (duration: number | null | undefined): string => {
        if (duration === undefined) return "";

        if (duration === 0 || duration === null) {
            return "-";
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

    const handleEventRender = (event: EventInfo, index: number ) => {
        switch (event.nome) {
            case "manutencao":
                return (
                    <div key={index} className="flex w-full flex-row gap-4">
                                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-red-400 bg-red-300/50 ">
                                            <Wrench className="h-5 w-5 text-red-950 " />
                                        </div>

                                        <div className="flex flex-row md:flex-col mr-2">
                                            <p className="line-clamp-1 text-sm font-bold leading-5 text-red-900 ">
                                                {t(event.nome) || ""}
                                            </p>
                                            <div className="flex flex-row gap-1">
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    Ordem:
                                                </p>
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    {event.ordem_servico_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <p className="text-sm">{getDate(event?.data_inicio) || ""}: </p>
                                            <p className="text-sm">{getTime(event?.data_inicio) || ""} </p>
                                            <ArrowFatLineRight className="h-5 w-5 text-red-800 " />
                                            <p className="text-sm">{getTime(event?.data_fim) || ""} </p>

                                        <p className="text-sm rounded-full bg-red-200 px-2">
                                        {formatDuration(event.duracao)}
                                        </p>
                                        </div>

                                    </div>
                )
            case "deslocamento":
                return (
                    <div key={index} className="flex w-full flex-row gap-4">
                                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                            <TrendUp className="h-5 w-5 text-green-950 " />
                                        </div>

                                        <div className="flex flex-row md:flex-col mr-2">
                                            <p className="line-clamp-1 text-sm font-bold leading-5 text-green-950 ">
                                                {t(event.nome) || ""}
                                            </p>
                                            <div className="flex flex-row gap-1">
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    Ordem:
                                                </p>
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    {event.ordem_servico_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <p className="text-sm">{getDate(event?.data_inicio) || ""}: </p>
                                            <p className="text-sm">{getTime(event?.data_inicio) || ""} </p>
                                            <ArrowFatLineRight className="h-5 w-5 text-green-700 " />
                                            <p className="text-sm">{getTime(event?.data_fim) || ""} </p>

                                        <p className="text-sm rounded-full bg-green-200 px-2">
                                        {formatDuration(event.duracao)}
                                        </p>
                                        </div>

                                    </div>
                )
            case "operacao":
                return (
                    <div key={index} className="flex w-full flex-row gap-4">
                                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                            <TrendUp className="h-5 w-5 text-green-950 " />
                                        </div>

                                        <div className="flex flex-row md:flex-col mr-2">
                                            <p className="line-clamp-1 text-sm font-bold leading-5 text-green-950 ">
                                                {t(event.nome) || ""}
                                            </p>
                                            <div className="flex flex-row gap-1">
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    Ordem:
                                                </p>
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    {event.ordem_servico_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <p className="text-sm">{getDate(event?.data_inicio) || ""}: </p>
                                            <p className="text-sm">{getTime(event?.data_inicio) || ""} </p>
                                            <ArrowFatLineRight className="h-5 w-5 text-green-700 " />
                                            <p className="text-sm">{getTime(event?.data_fim) || ""} </p>

                                        <p className="text-sm rounded-full bg-green-200 px-2">
                                        {formatDuration(event.duracao)}
                                        </p>
                                        </div>

                                    </div>
                )
            case "clima":
                return (
                    <div key={index} className="flex w-full flex-row gap-4">
                                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                            <CloudRain className="h-5 w-5 text-green-950 " />
                                        </div>

                                        <div className="flex flex-row md:flex-col mr-2">
                                            <p className="line-clamp-1 text-sm font-bold leading-5 text-green-950 ">
                                                {t(event.nome) || ""}
                                            </p>
                                            <div className="flex flex-row gap-1">
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    Ordem:
                                                </p>
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    {event.ordem_servico_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <p className="text-sm">{getDate(event?.data_inicio) || ""}: </p>
                                            <p className="text-sm">{getTime(event?.data_inicio) || ""} </p>
                                            <ArrowFatLineRight className="h-5 w-5 text-green-700 " />
                                            <p className="text-sm">{getTime(event?.data_fim) || ""} </p>

                                        <p className="text-sm rounded-full bg-green-200 px-2">
                                        {formatDuration(event.duracao)}
                                        </p>
                                        </div>

                                    </div>
                )
            default:
                return (
                    <div key={index} className="flex w-full flex-row gap-4">
                                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                            <Clock className="h-5 w-5 text-green-950 " />
                                        </div>

                                        <div className="flex flex-row md:flex-col mr-2">
                                            <p className="line-clamp-1 text-sm font-bold leading-5 text-green-950 ">
                                                {t(event.nome) || ""}
                                            </p>
                                            <div className="flex flex-row gap-1">
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    Ordem:
                                                </p>
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    {event.ordem_servico_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <p className="text-sm">{getDate(event?.data_inicio) || ""}: </p>
                                            <p className="text-sm">{getTime(event?.data_inicio) || ""} </p>
                                            <ArrowFatLineRight className="h-5 w-5 text-green-700 " />
                                            <p className="text-sm">{getTime(event?.data_fim) || ""} </p>

                                        <p className="text-sm rounded-full bg-green-200 px-2">
                                        {formatDuration(event.duracao)}
                                        </p>
                                        </div>

                                    </div>
                )
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <Tabs defaultValue="basic">
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

                        <TabsList className="grid w-full grid-cols-3 ">
                            <TabsTrigger value="basic">Informações</TabsTrigger>
                            <TabsTrigger value="maintenance">Manutenções</TabsTrigger>
                            <TabsTrigger value="advanced">Operações</TabsTrigger>
                        </TabsList>
                    </DialogHeader>
                    <TabsContent value="basic">
                        <div className="flex h-full min-h-[427px] w-full flex-row items-start justify-start gap-4">
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
                            <div className="flex h-full w-full flex-col gap-3">
                                <div className="flex w-full flex-row items-center justify-between rounded-2xl border border-divider bg-white p-4 ">
                                    <div className="flex w-full flex-row gap-4">
                                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                            <Files className="h-5 w-5 text-green-950 " />
                                        </div>

                                        <div className="flex  flex-row md:flex-col">
                                            <div className="flex flex-row gap-2">
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    Ultimo evento
                                                </p>
                                                <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                    {formatDate(data?.ultimos_eventos[0]?.data_inicio!) || ""}
                                                </p>
                                            </div>
                                            <p className="line-clamp-1 text-sm font-bold leading-5 text-green-950 ">
                                                {t(data?.ultimos_eventos[0]?.nome!) || ""}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="min-w-[200px] rounded-full text-end text-sm font-bold  text-green-950">
                                        {formatDuration(data?.ultimos_eventos[0]?.duracao) || ""}
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
                        <div className="flex h-full min-h-[427px] w-full flex-row items-start justify-start gap-4">
                            <div className="flex h-full w-full flex-col gap-3">
                                <div className="flex w-full flex-row items-center justify-between rounded-2xl border border-divider bg-white p-4 ">
                                    {data?.operador_conectado === null ? (
                                         <div className="flex w-full flex-row gap-4 items-center">
                                         <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                             <User className="h-5 w-5 text-green-950 " />
                                         </div>
                                         <p>Nenhum operador conectado no momento</p>
                                         
                                         </div>
                                    ) : (
                                        <>
                                            <div className="flex w-full flex-row gap-4">
                                                <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                                                    <User className="h-5 w-5 text-green-950 " />
                                                </div>
                                                <div className="flex  flex-row md:flex-col">
                                                    <div className="flex flex-row items-center justify-center gap-2">
                                                        <p className="line-clamp-1 text-sm font-bold  text-green-950 ">
                                                            {data?.operador_conectado.nome || ""}
                                                        </p>
                                                        <p className="line-clamp-1 text-sm font-normal  text-gray-500  ">
                                                            Turno {t(data?.operador_conectado.turno!) || ""}
                                                        </p>
                                                    </div>
                                                    <p className="line-clamp-1 text-xs font-normal leading-4 text-gray-500  ">
                                                        Usuário conectado
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="min-w-[200px] rounded-full text-end text-sm font-bold  text-green-950">
                                                Matrícula: {data?.operador_conectado.matricula || ""}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-row w-full justify-center items-center gap-2 px-4">
                                <div className="flex h-full max-h-[1px] min-h-[1px] w-full flex-1 bg-divider" />
                            <p className="text-xs">Últimos eventos</p>
                             <div className="flex h-full max-h-[1px] min-h-[1px] w-full flex-1 bg-divider" />
                                </div>

                                <div className="flex w-full flex-col gap-6 items-center justify-between rounded-2xl  p-4 ">
                                   {
                                    data?.ultimos_eventos.length === 0 ? (
                                        <p>Não foram encontrados eventos no dia</p>
                                    ) : (
                                        data?.ultimos_eventos.map((evento, index) => {
                                            return (
                                            handleEventRender(evento, index)
                                            )
                                        })
                                    )
                                   }
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="maintenance">
                        <div className="flex h-full min-h-[427px] w-full flex-row items-start justify-start gap-4">
                            <div className="flex h-full w-full flex-col gap-3">
                                <div className="grid grid-cols-3 gap-4 w-full items-center justify-between rounded-2xl  p-4 ">
                                    <div className="flex col-span-1 h-9 w-full  items-center justify-between px-3 overflow-hidden rounded-full border border-red-400 bg-red-300/50 ">
                                                 <Wrench className="h-5 w-5 text-red-950 " />
                                                 <p className="text-sm font-bold">Tempo de manutenção no mes</p>
                                                 <p className="text-sm font-bold">{formatDuration(data?.tempo_total_manutencao_mes)}</p>
                                             </div>
                                        <MaintenanceProgress  tempo_total_manutencao_dia={data?.tempo_total_manutencao_dia || 0}  tempo_total_todos_eventos={data?.tempo_total_todos_eventos || 100} />
                                        


                                </div>
                                <div className="flex flex-row w-full justify-center items-center gap-2 px-4">
                                <div className="flex h-full max-h-[1px] min-h-[1px] w-full flex-1 bg-divider" />
                            <p className="text-xs">Histórico de manutenção</p>
                             <div className="flex h-full max-h-[1px] min-h-[1px] w-full flex-1 bg-divider" />
                                </div>

                                 <div className="flex flex-row w-full gap-2">
                                <div className="flex w-full flex-col gap-6 items-center justify-between rounded-2xl  p-4 ">
                                   {
                                       data?.manutencao_eventos.length === 0 ? (
                                           <p>Não foram encontradas manutenções no dia</p>
                                        ) : (
                                            data?.manutencao_eventos.map((evento, index) => {
                                                return (
                                                    handleEventRender(evento, index)
                                                )
                                            })
                                        )
                                    }
                                </div>
                                <div className="flex flex-col w-[84%] h-auto gap-2 bg-gray-100"> 
                                <MaintenanceInfo title="Manutenções" subtitle="Eventos totais no mês" value={data?.qtd_manutencao_mes || 0} isLoading={false} />
                                <MaintenanceInfo title="Manutenções" subtitle="Eventos totais no dia" value={data?.qtd_manutencao_dia || 0} isLoading={false} />
                                </div>
                                </div>  
                            </div>
                        </div>
                    </TabsContent>
                </DialogContent>
            </Tabs>
        </Dialog>
    );
};
export default ViewMachineModal;
