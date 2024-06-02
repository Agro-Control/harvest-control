"use client";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { useGetOperatorsList } from "@/utils/hooks/useGetOperatorsList";
import CreateUserModal from "@/components/control/create-user-modal";
import FilterInformationLabel from "@/types/filter-information-label";
import FilterWithLabel from "@/components/control/filter-with-label";
import StatusCodeHandler from "@/components/status-code-handler";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import LoadingAnimation from "@/components/loading-animation";
import { useGetManagers } from "@/utils/hooks/useGetManagers";
import UsersList from "@/components/control/users/user-list";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import Filter from "@/components/control/filter";
import {useAuth} from "@/utils/hooks/useAuth";
import {Button} from "@/components/ui/button";
import Empresa from "@/types/empresa";
import {useQueryState} from "nuqs";
import {AxiosError} from "axios";
import {useEffect} from "react";

const statusFilter: FilterInformation = {
    filterItem: [
        {value: "A"},
        {
            value: "I",
        },
    ],
};



export default function Users() {
    const {user} = useAuth();
    const isAdmin = user?.tipo === "D";
    const isGestor = user?.tipo === "G";
    const grupo_id = user && user?.grupo_id;

    const [query] = useQueryState("query");
    const [status] = useQueryState("status");
    const [empresa] = useQueryState("company");
 
    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
    } = useGetCompanies(isAdmin, grupo_id, null, null, null, false);

    const companyFilter: FilterInformationLabel = {
        filterItem: [
            { value: "all", label: "Todas"},
            ...empresas.map((empresa: Empresa) => ({
                value: empresa.id?.toString()!,
                label: empresa.nome!,
            })),
        ],
    };

    const {
        data: {operador = []} = {},
        error: operatorsError,
        isError: isOperatorsError,
        isLoading: isLoadingOperators,
        refetch: refetchOperators,
        isRefetching: isRefetchingOperators,
    } = useGetOperatorsList(null, null, status, query);

    const {
        data: {gestor = []} = {},
        error,
        isError,
        isLoading,
        refetch: refetchManager,
        isRefetching,
    } = useGetManagers(null, Number(empresa), null, status, query);

    const isLoadingData = isLoading || isRefetching  || isLoadingOperators || isRefetchingOperators;
    const isErrorData = isError || isOperatorsError;
    const errorData = error || operatorsError;

    useEffect(() => {
        if (!user) return;
        if (isAdmin) {
            if (gestor.length > 0) return;
            refetchManager();
            return;
        }
        if (isGestor) {
            if (operador.length > 0) return;
            refetchOperators();
            return;
        }
    }, []);

    useEffect(() => {
        if (isAdmin) {
            refetchManager();
        }
        if (isGestor) {
            refetchOperators();
        }
    }, [status, query, empresa]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Gestão de usuarios</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                {isAdmin && <FilterWithLabel filter={companyFilter} paramType="company" />}
                <Filter filter={statusFilter} paramType="status" />
                <CreateUserModal refetchOperators={refetchOperators} refetchManager={refetchManager} >
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateUserModal>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                       {!isAdmin && <TableHead>Matricula</TableHead>}
                        <TableHead>Nome</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Contratação</TableHead>
                        {!isAdmin &&<TableHead>Turno</TableHead>}
                        <TableHead>{isAdmin ? "Empresa" : "Unidade"}</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                {!isErrorData &&
                    !isLoadingData &&
                    (isAdmin ? <UsersList usuarios={gestor} refetchManager={refetchManager} managerList /> : <UsersList usuarios={operador} refetchOperators={refetchOperators} />)}
            </Table>
            {isLoadingData && <LoadingAnimation />}
            {isErrorData && !isLoadingData && (
                <StatusCodeHandler requisitionType={isAdmin ? "manager" : "operator"} error={errorData as AxiosError} />
            )}
        </div>
    );
}
