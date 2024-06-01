"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusCodeHandler from "@/components/status-code-handler";
import LoadingAnimation from "@/components/loading-animation";
import { useAuth } from "@/utils/hooks/useAuth";
import { useQueryState } from "nuqs";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useGetEvents } from "@/utils/hooks/useGetEvents";
import Evento from "@/types/evento";
import ReportRow from "@/components/control/report/report-row";
import ReportCard from "@/components/control/report/report-card";
import Filter from "@/components/control/filter";
import FilterInformationLabel from "@/types/filter-information-label";
import FilterWithLabel from "@/components/control/filter-with-label";
import Operador from "@/types/operador";

export default function Reports() {
    const auth = useAuth();
    const user = auth.user;

    const evetnTypeFilter: FilterInformationLabel = {
        filterItem: [
            { value: "all", label: "Todos" },
            { value: "operacao", label: "Operação" },
            { value: "transbordo", label: "Transbordo" },
            { value: "deslocamento", label: "Deslocamento" },
            { value: "aguardando transbordo", label: "Aguardando Transbordo" },
            { value: "manutencao", label: "Manutenção" },
            { value: "clima", label: "Clima" },
            { value: "troca de turno", label: "Troca de Turno" },
        ],
    };

    // Hooks para obter os parâmetros da URL e os eventos da API
    const [query] = useQueryState("query");
    const [tipoEvento] = useQueryState("Eventos");
    const { data: { eventos = [] } = {}, error, isError, isLoading, refetch, isRefetching } = useGetEvents(parseInt(query!));
    const isLoadingData = isLoading || isRefetching;

    useEffect(() => {
       
    }, [eventos, tipoEvento]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row justify-between items-start ">
                <p className="font-poppins text-4xl font-medium">Relatório de Eventos</p>
                <ReportCard />
            </div>
            <form className="fflex w-full flex-row items-start justify-start gap-4">
                <FilterWithLabel filter={evetnTypeFilter} paramType="Eventos" />
            </form>
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
                {!isError && !isLoadingData && eventos && eventos.length > 0 &&
                        eventos.filter(evento => {
                            if (tipoEvento) {
                                const nomeMatch = evento.nome && evento.nome.toLowerCase().includes(tipoEvento.toLowerCase());
                                return nomeMatch;
                            } else {
                                return true; // Se nenhum tipo de evento estiver selecionado, exibir todos os eventos
                            }
                        }).map((evento: Evento) => (
                            <ReportRow key={evento.id} evento={evento} />
                        ))
                    }
                </TableBody>
            </Table>
            {/* Renderizar animação de carregamento, se necessário */}
            {isLoadingData && <LoadingAnimation />}
            {/* Renderizar mensagem se não houver eventos */}
            {eventos.length === 0 && !isLoadingData && <div className="flex w-full items-center justify-center font-medium">Nenhum evento encontrado.</div>}
            {/* Renderizar mensagem de erro, se houver */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="report" error={error as AxiosError} />}
        </div>
    );
}