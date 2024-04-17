"use client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CreateUnitModal from "@/components/control/unit/create-unit-modal";
import EditUnitModal from "@/components/control/unit/edit-unit-modal";
import ViewUnitModal from "@/components/control/unit/view-unit-modal";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import {useGetUnits} from "@/utils/hooks/useGetUnits";
import {Eye, Pencil, } from "@phosphor-icons/react";
import Filter from "@/components/control/filter";
import {Button} from "@/components/ui/button";
import Unidade from "@/types/unidade";
import {useQueryState} from "nuqs";
import { useState} from "react";

export interface getUnidade {
    unidades: Unidade[];
}

//TODO: Refatorar essas unidades

const statusFilter: FilterInformation = {
    filterItem: [
        {value: "A"},
        {
            value: "I",
        },
    ],
};

export default function Units() {
    const [query, setQuery] = useQueryState("query");
    const [status, setSelectedStatus] = useState<string>();
    const {data: {unidades = []} = {}} = useGetUnits(status === null ? "" : status, query === null ? "" : query);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Unidades</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                <CreateUnitModal>
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateUnitModal>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Código Unidade</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Filiação</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {unidades.map((unidade: Unidade) => {
                        return (
                            <TableRow key={unidade.id}>
                                <TableCell className="font-medium">{unidade.id}</TableCell>
                                <TableCell className="font-medium">{unidade.nome}</TableCell>
                                <TableCell className="font-medium">{unidade.empresa_nome}</TableCell>
                                <TableCell className="">{unidade.status}</TableCell>
                                <TableCell className="w-28">
                                    <div className="-ml-1 flex w-full flex-row items-center gap-3">
                                        <EditUnitModal unit={unidade}>
                                            <Pencil
                                                className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                                                weight="fill"
                                            />
                                        </EditUnitModal>
                                        <ViewUnitModal unit={unidade}>
                                            <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                                        </ViewUnitModal>
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
