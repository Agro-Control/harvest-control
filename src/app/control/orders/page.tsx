"use client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import StatusCodeHandler from "@/components/status-code-handler";
import LoadingAnimation from "@/components/loading-animation";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import Filter from "@/components/control/filter";
import {Button} from "@/components/ui/button";
import { AxiosError } from "axios";
import {useQueryState} from "nuqs";
import { useEffect} from "react";
import { useGetOrders } from "@/utils/hooks/useGetOrders";
import OrdemServico from "@/types/ordem-de-servico";
import OrdersRow from "@/components/control/orders/orders-row";
import CreateOrderModal from "@/components/control/orders/create-order-modal";


const statusFilter: FilterInformation = {
    filterItem: [
        {value: "all"},
        {value: "A"},
        {value: "E"},
        {value: "C"},
        {
            value: "F",
        },
    ],
};

export default function Orders() {
    const [query] = useQueryState("query");
    const [status]= useQueryState("status");

    const mockUsuario = {
        id: 1,
        nome: "João",
        email: "joao@example.com",
        cpf: "123.456.789-00",
        telefone: "(00) 12345-6789",
        status: "ativo",
        data_contratacao: new Date("2022-01-01"),
        gestor_id: 2,
        empresa_id: 1,
        matricula: "123456",
        turno: "manhã",
        tipo: "ADM"
    };

    const isAdmin = mockUsuario.tipo === "ADM";


    const {
        data: {ordens_servico = []} = {}, 
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetOrders(!isAdmin ? mockUsuario.empresa_id : null, status, query);


    // Variavel que indica se está carregando ou refazendo a requisição
    const isLoadingData = isLoading || isRefetching; 

    useEffect(() => {
        refetch();
    }, [query, status]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Ordens de Serviço</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
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
                            <TableBody>
                                <OrdersRow key={ordem.id} ordem={ordem} />
                            </TableBody>
                        );
                    })}
            </Table>
            {/* Renderiza a animação de loading se estiver carregando ou refazendo a requisição */}
            {isLoadingData && <LoadingAnimation />}
            {/* Renderiza o componente com as mensagens de erro se houver erro e não estiver carregando */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="field" error={error as AxiosError} />}
        </div>
    );
}
