"use client";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CreateUserModal from "@/components/control/create-user-modal";
import StatusCodeHandler from "@/components/status-code-handler";
import { useGetOperatorsList } from "@/utils/hooks/useGetOperatorsList";
import LoadingAnimation from "@/components/loading-animation";
import { useGetManagers } from "@/utils/hooks/useGetManagers";
import UsersList from "@/components/control/users/user-list";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import Filter from "@/components/control/filter";
import {useAuth} from "@/utils/hooks/useAuth";
import {Button} from "@/components/ui/button";
import {AxiosError} from "axios";
import {useQueryState} from "nuqs";
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
    } = useGetManagers(grupo_id, null, null, status, query);

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
    }, [status, query]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Gestão de usuarios</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                <CreateUserModal>
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
                        <TableHead>Matricula</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Contratação</TableHead>
                        <TableHead>Turno</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                {!isErrorData &&
                    !isLoadingData &&
                    (isAdmin ? <UsersList usuarios={gestor} /> : <UsersList usuarios={operador} />)}
            </Table>
            {isLoadingData && <LoadingAnimation />}
            {isErrorData && !isLoadingData && (
                <StatusCodeHandler requisitionType={isAdmin ? "manager" : "operator"} error={errorData as AxiosError} />
            )}
        </div>
    );
}
