"use client";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CreateUserModal from "@/components/control/create-user-modal";
import {useGetUsersByGroup} from "@/utils/hooks/useGetUsersByGroup";
import StatusCodeHandler from "@/components/status-code-handler";
import LoadingAnimation from "@/components/loading-animation";
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
const profileFilter: FilterInformation = {
    filterItem: [
        {
            value: "manager",
        },
        {value: "operator"},
    ],
};

export default function Users() {
    const {user} = useAuth();
    const isAdmin = user?.tipo === "D";
    const grupo_id = user && user?.grupo_id;

    const [query] = useQueryState("query");
    const [status] = useQueryState("status");

    const {
        data: {usuarios = []} = {},
        error,
        isError,
        isLoading,
        refetch: refetchUsersByGroup,
        isRefetching,
    } = useGetUsersByGroup(grupo_id, null, null, status, null);

    const isLoadingData = isLoading || isRefetching;

    useEffect(() => {
        if (!user) return;
        if (isAdmin) {
            if (usuarios.length > 0) return;
            refetchUsersByGroup();
            return;
        }
    }, []);

    useEffect(() => {
        if (isAdmin) {
            refetchUsersByGroup();
        }
    }, [status]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Gestão de usuarios</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                <Filter filter={profileFilter} paramType="profile" />
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
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                {!isError &&
                    !isLoadingData &&
                    (isAdmin ? <UsersList usuarios={usuarios} /> : <UsersList usuarios={usuarios} />)}
            </Table>
            {isLoadingData && <LoadingAnimation />}
            {isAdmin && isError && !isLoadingData && (
                <StatusCodeHandler requisitionType="users" error={error as AxiosError} />
            )}
        </div>
    );
}
