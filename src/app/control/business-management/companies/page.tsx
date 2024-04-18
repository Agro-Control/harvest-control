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

const estadoFilter: FilterInformation = {
    filterItem: [
        {
            value: "PR",
        },
        {value: "SP"},
    ],
};

export default function Companies() {
    const [query] = useQueryState("query");
    const [estado] = useQueryState("estado");
    const [cidade] = useQueryState("cidade");
    const {
        data: {empresas = []} = {},
        error,
        isError,
        isLoading,
        refetch,
        isRefetching,
    } = useGetCompanies(cidade, estado, query);
    const isLoadingData = isLoading || isRefetching;

    
    useEffect(() => {
        refetch();
    }, [query, estado, cidade]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Empresas</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={estadoFilter} paramType="estado" />
                <CreateCompanyModal>
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateCompanyModal>
            </div>

            <Table>
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
                {!isError &&
                    !isLoadingData &&
                    empresas.map((empresa: Empresa) => {
                        return (
                            <TableBody>
                                <CompanyRow key={empresa.id} empresa={empresa} />
                            </TableBody>
                        );
                    })}
            </Table>
            {isLoadingData && <LoadingAnimation />}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="company" error={error as AxiosError} />}
        </div>
    );
}
