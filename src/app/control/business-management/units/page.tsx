"use client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CreateUnitModal from "@/components/control/unit/create-unit-modal";
import StatusCodeHandler from "@/components/status-code-handler";
import LoadingAnimation from "@/components/loading-animation";
import FilterInformation from "@/types/filter-information";
import UnitRow from "@/components/control/unit/unit-row";
import SearchBar from "@/components/control/search-bar";
import {useGetUnits} from "@/utils/hooks/useGetUnits";
import Filter from "@/components/control/filter";
import {Button} from "@/components/ui/button";
import Unidade from "@/types/unidade";
import {useQueryState} from "nuqs";
import { AxiosError } from "axios";
import { useEffect} from "react";
import { useAuth } from "@/utils/hooks/useAuth";




const statusFilter: FilterInformation = {
    filterItem: [
        {value: "all"},
        {value: "A"},
        {
            value: "I",
        },
    ],
};

export default function Units() {
    const [query] = useQueryState("query");
    const [status]= useQueryState("status");
    const auth = useAuth();
    const user = auth.user?.usuario;
    const isGestor = user?.tipo === "G";



    const {
        data: {unidades = []} = {}, 
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetUnits(true, isGestor ? parseInt(user.empresa_id) : null, !isGestor ? parseInt(user!.grupo_id) : null, status, query);


    // Variavel que indica se está carregando ou refazendo a requisição
    const isLoadingData = isLoading || isRefetching; 
    

    useEffect(() => {
        refetch();
    }, [query, status]);

    
    
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
                        {!isGestor && <TableHead>Filiação</TableHead>}
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
               
        
                {!isError &&
                    !isLoadingData &&
                    unidades.map((unidade: Unidade) => {
                        return (
                            <TableBody>
                                <UnitRow key={unidade.id} unidade={unidade} isGestor={isGestor} />
                            </TableBody>
                        );
                    })}
            </Table>
            {/* Renderiza a animação de loading se estiver carregando ou refazendo a requisição */}
            {isLoadingData && <LoadingAnimation />}
            {/* Renderiza o componente com as mensagens de erro se houver erro e não estiver carregando */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="unit" error={error as AxiosError} />}
        </div>
    );
}
