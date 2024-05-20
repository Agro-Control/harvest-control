"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateCompanyModal from "@/components/control/company/create-company-modal";
import CompanyRow from "@/components/control/company/company-row";
import StatusCodeHandler from "@/components/status-code-handler";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import LoadingAnimation from "@/components/loading-animation";
import { useGetCompany } from "@/utils/hooks/useGetCompany";
import FilterInformation from "@/types/filter-information";
import { useGetState } from "@/utils/hooks/useGetStates";
import SearchBar from "@/components/control/search-bar";
import Filter from "@/components/control/filter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/hooks/useAuth";
import Empresa from "@/types/empresa";
import { useQueryState } from "nuqs";
import { AxiosError } from "axios";
import { useEffect } from "react";


export default function Reports() {
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    // Hook que pega os parametros da URL
    const [query] = useQueryState("query"); // query é o nome do parametro que está na URL - Usado paro o campo busca.



    // Hook que refaz a requisição toda vez que os parametros da URL mudam - Quando troca filtro ou busca
    useEffect(() => {
        if (isAdmin) {
            refetch();
    }, [query]);



    return (

        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Empresas</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                {isAdmin && <CreateCompanyModal>
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateCompanyModal>}
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
                    {!isLoadingEmpresaData &&
                        !isErrorEmpresa && !isAdmin &&
                        <CompanyRow key={empresa.id} empresa={empresa} />
                    }
                    {!isError &&
                        !isLoadingData && isAdmin &&

                        empresas.map((empresa: Empresa) => {
                            return (
                                <CompanyRow key={empresa.id} empresa={empresa} />
                            );
                        })
                    }
                </TableBody>
            </Table>
            {/* Renderiza a animação de loading se estiver carregando ou refazendo a requisição */}
            {isLoadingData || isLoadingEmpresa && <LoadingAnimation />}
            {/* Renderiza o componente com as mensagens de erro se houver erro e não estiver carregando */}
            {isAdmin && isError && !isLoadingData && <StatusCodeHandler requisitionType="company" error={error as AxiosError} />}
        </div>
    );
}