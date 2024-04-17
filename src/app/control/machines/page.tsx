"use client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CreateUserModal from "@/components/control/create-user-modal";
import EditUserModal from "@/components/control/edit-user-modal";
import ViewUserModal from "@/components/control/view-user-modal";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import {Eye, Pencil, Plus} from "@phosphor-icons/react";
import Filter from "@/components/control/filter";
import {Button} from "@/components/ui/button";

const statusFilter: FilterInformation = {
    filterItem: [
        {value: "active"},
        {
            value: "inactive",
        },
    ],
};
const modelFilter: FilterInformation = {
    filterItem: [
        {
            value: "colector",
        },
    ],
};

const machineList = [
    {
        code: "123123",
        modelo: "Colhedora",
        fabricante: "Renault",
        aquisicao: "15/12/1987",
        status: "active",
    },
    {
        code: "321321",
        modelo: "Colhedora",
        fabricante: "Ford",
        aquisicao: "26/09/1977",
        status: "inactive",
    },
];

const Machines = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Máquinas</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o código para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                <Filter filter={modelFilter} paramType="model" />
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
                        <TableHead>Código</TableHead>
                        <TableHead>Modelo</TableHead>
                        <TableHead>Fabricante</TableHead>
                        <TableHead>Aquisição</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {machineList.map((machine) => {
                        return (
                            <TableRow key={machine.code}>
                                <TableCell className="font-medium">{machine.code}</TableCell>
                                <TableCell className="font-medium">{machine.modelo}</TableCell>
                                <TableCell className="">{machine.fabricante}</TableCell>
                                <TableCell className="">{machine.aquisicao}</TableCell>
                                <TableCell className="">{machine.status}</TableCell>
                                {/* <TableCell className="w-28">
                                    <div className="-ml-1 flex w-full flex-row items-center gap-3">
                                        <EditUserModal userInformation={machine}>
                                            <Pencil
                                                className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                                                weight="fill"
                                            />
                                        </EditUserModal>
                                        <ViewUserModal userInformation={machine}>
                                            <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                                        </ViewUserModal>
                                    </div>
                                </TableCell> */}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
export default Machines;
