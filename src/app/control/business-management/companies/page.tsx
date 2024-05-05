"use client";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CreateCompanyModal from "@/components/control/company/create-company-modal";
import CompanyRow from "@/components/control/company/company-row";
import StatusCodeHandler from "@/components/status-code-handler";
import {useGetCompanies} from "@/utils/hooks/useGetCompanies";
import LoadingAnimation from "@/components/loading-animation";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import Filter from "@/components/control/filter";
import {Button} from "@/components/ui/button";
import Empresa from "@/types/empresa";
import {useQueryState} from "nuqs";
import {AxiosError} from "axios";
import {useEffect} from "react";
import { useAuth } from "@/utils/hooks/useAuth";

const estadoFilter: FilterInformation = {
    filterItem: [
        {value: "all"},
        {
            value: "PR",
        },
        {value: "SP"},
    ],
};
const statusFilter: FilterInformation = {
    filterItem: [
        {value: "all"},
        {
            value: "A",
        },
        {value: "I"},
    ],
};


/**
 * Componente que renderiza toda a pagina que tem a lista das empresas
 */
//TODO: solicitar pra trocar codigo pra nome no backend
export default function Companies() {
    const auth = useAuth();
    const user = auth.user?.usuario;
    const isGestor = user?.tipo === "G";
    // Hook que pega os parametros da URL
    const [query] = useQueryState("query"); // query é o nome do parametro que está na URL - Usado paro o campo busca.
    const [estado] = useQueryState("estado"); // estado é o nome do parametro que está na URL - Usado para o filtro de estado.
    const [cidade] = useQueryState("cidade"); // cidade é o nome do parametro que está na URL - Não está sendo usado
    const [status] = useQueryState("status"); // status é o nome do parametro que está na URL - Usado para filtrar ativo e inativo.

    
    const {
        data: {empresas = []} = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(isGestor ? parseInt(user?.empresa_id!) : null, !isGestor ? parseInt(user?.grupo_id!) : null, cidade, estado, query, status);



    // Variavel que indica se está carregando ou refazendo a requisição
    const isLoadingData = isLoading || isRefetching; 

    // Hook que refaz a requisição toda vez que os parametros da URL mudam - Quando troca filtro ou busca
    useEffect(() => {
        refetch();
    }, [query, estado, cidade, status]);



    return (
        
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Empresas</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter  filter={estadoFilter} paramType="estado" />
                <Filter  filter={statusFilter} paramType="status" />
            {!isGestor && <CreateCompanyModal>
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateCompanyModal> }
            </div>

            <Table  >
                <TableHeader>
                    <TableRow>
                        <TableHead>CNPJ</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Renderiza a lista de empresas SE não houver erro e nem estiver carregando  */}
                <TableBody> 
                {!isError &&
                    !isLoadingData &&

                        empresas.map((empresa: Empresa) => {
                            return (
                                <CompanyRow key={empresa.id} empresa={empresa} />
                            );
                        })                       
                    }
                    </TableBody>
            </Table>
            {/* Renderiza a animação de loading se estiver carregando ou refazendo a requisição */}
            {isLoadingData && <LoadingAnimation />}
            {/* Renderiza o componente com as mensagens de erro se houver erro e não estiver carregando */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="company" error={error as AxiosError} />}
        </div>
    );
}
