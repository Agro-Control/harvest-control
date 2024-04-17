"use client";
import CreateUserModal from "@/components/control/create-user-modal";
import EditUserModal from "@/components/control/edit-user-modal";
import Filter from "@/components/control/filter";
import SearchBar from "@/components/control/search-bar";
import ViewUserModal from "@/components/control/view-user-modal";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import FilterInformation from "@/types/filter-information";
import {Eye, Pencil, Plus} from "@phosphor-icons/react";

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

const userList = [
    {
        matricula: "000001",
        name: "João",
        status: "active",
        profile: "manager",
        contract: "12/12/2000",
    },
    {
        matricula: "000002",
        name: "Maria",
        status: "inactive",
        profile: "operator",
        contract: "12/12/2000",
    },
    {
        matricula: "000003",
        name: "José",
        status: "active",
        profile: "manager",
        contract: "12/12/2000",
    },
    {
        matricula: "000004",
        name: "Ana",
        status: "inactive",
        profile: "operator",
        contract: "12/12/2000",
    },
];
export default function Users() {
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
                <TableBody>
                    {userList.map((user) => {
                        return (
                            <TableRow key={user.matricula}>
                                <TableCell className="font-medium">{user.matricula}</TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="">{user.profile}</TableCell>
                                <TableCell className="">{user.status}</TableCell>
                                <TableCell className="">{user.contract}</TableCell>
                                <TableCell className="w-28">
                                    <div className="-ml-1 flex w-full flex-row items-center gap-3">
                                        <EditUserModal userInformation={user}>
                                            <Pencil
                                                className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                                                weight="fill"
                                            />
                                        </EditUserModal>
                                        <ViewUserModal userInformation={user}>
                                            <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                                        </ViewUserModal>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
