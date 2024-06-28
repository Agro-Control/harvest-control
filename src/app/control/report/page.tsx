"use client";
import {Funnel, ClockCountdown} from "@phosphor-icons/react";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import StatusCodeHandler from "@/components/status-code-handler";
import ReportCard from "@/components/control/report/report-card";
import OrderEvent from "@/components/control/report/order-event";
import ReportRow from "@/components/control/report/report-row";
import LoadingAnimation from "@/components/loading-animation";
import {useGetEvents} from "@/utils/hooks/useGetEvents";
import {useGetOrderEvent} from "@/utils/hooks/useGetOrderEvent";
import {useAuth} from "@/utils/hooks/useAuth";
import {useQueryState} from "nuqs";
import Evento from "@/types/evento";
import {AxiosError} from "axios";
import {useEffect} from "react";

export default function Reports() {
    const auth = useAuth();
    const user = auth.user;

    // Hooks para obter os parâmetros da URL e os eventos da API
    const [query] = useQueryState("query");
    const [tipoEvento] = useQueryState("Eventos");
    const {
        data: {eventos = []} = {},
        error,
        isError,
        isLoading,
        refetch,
        isRefetching,
    } = useGetEvents(parseInt(query!), tipoEvento);

    const isLoadingData = isLoading || isRefetching;

    const {
        data,
        isLoading: isLoadingOrderEvent,
        isRefetching: isRefetchingOrderEvent,
        refetch: refetchOrderEvents,
    } = useGetOrderEvent(Number(query));


    const isLoadingOrderEventData = isLoadingOrderEvent || isRefetchingOrderEvent;
    useEffect(() => {
        refetch();
    }, [eventos, tipoEvento]);

    useEffect(() => {
        refetchOrderEvents();
    }, [query]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row items-start justify-between ">
                <p className="font-poppins text-4xl font-medium">Relatório de Eventos</p>
            </div>

            <div className="flex w-full flex-col gap-2 xl:flex-row">
                <div className="flex w-full flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4 lg:col-span-1 lg:min-h-[130px]">
                    <div className="flex w-full flex-row gap-4">
                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50">
                            <ClockCountdown className="h-5 w-5 text-green-950 " />
                        </div>

                        <div className="flex flex-col gap-1 md:gap-0 ">
                            <p className="line-clamp-1 text-base font-bold leading-5 text-green-950">Eventos</p>
                            <p className="line-clamp-3 text-xs font-normal text-gray-500">
                                Todos os eventos do sistema e a contagem de suas ocorrências
                            </p>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4 ">
                        {data && (
                            <OrderEvent
                                duracao={data?.duracao_total || 0}
                                quantidade={data?.total || 0}
                                isLoading={isLoadingOrderEventData}
                                title="Eventos"
                            />
                        )}
                        {data?.eventos.map((evento, index) => {
                            return (
                                <OrderEvent
                                    key={index}
                                    duracao={evento.duracao || 0}
                                    quantidade={evento.quantidade || 0}
                                    isLoading={isLoadingOrderEventData}
                                    title={evento.evento}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="flex  flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4 md:min-w-[300px] lg:col-span-1 lg:min-h-[130px]">
                    <div className="flex w-full flex-row gap-4">
                        <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50">
                            <Funnel className="h-5 w-5 text-green-950 " />
                        </div>

                        <div className="flex flex-col gap-1 md:gap-0 ">
                            <p className="line-clamp-1 text-base font-bold leading-5 text-green-950">Filtros</p>
                            <p className="line-clamp-1 text-xs font-normal text-gray-500">Ordem de serviço</p>
                        </div>
                    </div>

                    <ReportCard />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Data Fim</TableHead>
                        <TableHead>Duração</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Renderizar os eventos filtrados na tabela */}
                <TableBody>
                    {!isError &&
                        !isLoadingData &&
                        eventos &&
                        eventos.length > 0 &&
                        eventos
                            .filter((evento) => {
                                if (tipoEvento) {
                                    const nomeMatch =
                                        evento.nome && evento.nome.toLowerCase().includes(tipoEvento.toLowerCase());
                                    return nomeMatch;
                                } else {
                                    return true; // Se nenhum tipo de evento estiver selecionado, exibir todos os eventos
                                }
                            })
                            .map((evento: Evento) => <ReportRow key={evento.id} evento={evento} />)}
                </TableBody>
            </Table>
            {/* Renderizar animação de carregamento, se necessário */}
            {isLoadingData && <LoadingAnimation />}
            {/* Renderizar mensagem se não houver eventos */}
            {eventos.length === 0 && !isLoadingData && !isError && (
                <div className="flex w-full items-center justify-center font-medium">
                    Pesquise uma ordem para mostrar os eventos
                </div>
            )}
            {/* Renderizar mensagem de erro, se houver */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="report" error={error as AxiosError} />}
        </div>
    );
}
