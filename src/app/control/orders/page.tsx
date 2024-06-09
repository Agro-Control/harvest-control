"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusCodeHandler from "@/components/status-code-handler";
import LoadingAnimation from "@/components/loading-animation";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import Filter from "@/components/control/filter";
import FilterInformationLabel from "@/types/filter-information-label";
import FilterWithLabel from "@/components/control/filter-with-label";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useGetOrders } from "@/utils/hooks/useGetOrders";
import OrdemServico from "@/types/ordem-de-servico";
import OrdersRow from "@/components/control/orders/orders-row";
import CreateOrderModal from "@/components/control/orders/create-order-modal";
import { useAuth } from "@/utils/hooks/useAuth";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import Empresa from "@/types/empresa";


const statusFilter: FilterInformation = {
    filterItem: [
        { value: "A" },
        { value: "E" },
        { value: "C" },
        {
            value: "F",
        },
    ],
};

export default function Orders() {
    const [query] = useQueryState("query");
    const [status] = useQueryState("status");
    const [empresa] = useQueryState("Empresas");
    const [enableFlag, setEnableFlag] = useState(false);
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";


    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        isError: isCompanyError,
        refetch: refetchCompanies,
    } = useGetCompanies(isAdmin ? true : false, isAdmin ? user?.grupo_id : null, null, null, null, false);

    const {
        data: { ordens_servico = [] } = {},
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetOrders(!isAdmin ? user!.empresa_id : parseInt(empresa!), status, query);

    const companyFilter: FilterInformationLabel = {
        filterItem: [
            { value: "all", label: "Todas"},
            ...empresas.map((empresa: Empresa) => ({
                value: empresa.id?.toString()!,
                label: empresa.nome!,
            })),
        ],
    };



    // Variavel que indica se está carregando ou refazendo a requisição
    const isLoadingData = isLoading || isRefetching;

    useEffect(() => {
        if (isCompanyError)
            refetchCompanies();
        if (empresa != null && empresa != "" && empresa != undefined) {
            setEnableFlag(true);
        } else {
            setEnableFlag(false);
        }
        refetch();
    }, [empresa, query, status]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Ordens de Serviço</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                {isAdmin && <FilterWithLabel filter={companyFilter} paramType="Empresas" />}
                <CreateOrderModal>
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateOrderModal>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Máquina</TableHead>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Data Fim</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>


                {!isError &&
                    !isLoadingData &&
                    ordens_servico.map((ordem: OrdemServico) => {
                        return (
                            <TableBody key={ordem.id} >
                                <OrdersRow key={ordem.id} ordem={ordem} />
                            </TableBody>
                        );
                    })}
            </Table>
            {/* Renderiza a animação de loading se estiver carregando ou refazendo a requisição */}
            {isLoadingData && <LoadingAnimation />}
            {isAdmin && !enableFlag && <div className="flex w-full items-center justify-center font-medium">Filtre as empresas para exibir as ordens</div>}
            {/* Renderiza o componente com as mensagens de erro se houver erro e não estiver carregando */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="order" error={error as AxiosError} />}
        </div>
    );
}
