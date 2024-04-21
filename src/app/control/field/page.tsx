"use client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CreateFieldModal from "@/components/control/field/create-field-modal";
import FilterInformation from "@/types/filter-information";
import SearchBar from "@/components/control/search-bar";
import {useGetFields} from "@/utils/hooks/useGetFields";
import Filter from "@/components/control/filter";
import {Button} from "@/components/ui/button";
import Unidade from "@/types/unidade";
import {useQueryState} from "nuqs";
import { useEffect} from "react";
import FieldRow from "@/components/control/field/field-row";
import StatusCodeHandler from "@/components/status-code-handler";
import LoadingAnimation from "@/components/loading-animation";
import { AxiosError } from "axios";
import Talhao from "@/types/talhao";


const statusFilter: FilterInformation = {
    filterItem: [
        {value: "A"},
        {
            value: "I",
        },
    ],
};

export default function Field() {
    const [query] = useQueryState("query");
    const [status]= useQueryState("status");



    const {
        data: {talhoes = []} = {}, 
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetFields(status, query);


    // Variavel que indica se está carregando ou refazendo a requisição
    const isLoadingData = isLoading || isRefetching; 

    useEffect(() => {
        refetch();
    }, [query, status]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Talhões</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                <CreateFieldModal>
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateFieldModal>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Código Talhao</TableHead>
                        <TableHead>Tamanho</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
               
        
                {!isError &&
                    !isLoadingData &&
                    talhoes.map((talhao: Talhao) => {
                        return (
                            <TableBody>
                                <FieldRow key={talhao.id} talhao={talhao} />
                            </TableBody>
                        );
                    })}
            </Table>
            {/* Renderiza a animação de loading se estiver carregando ou refazendo a requisição */}
            {isLoadingData && <LoadingAnimation />}
            {/* Renderiza o componente com as mensagens de erro se houver erro e não estiver carregando */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="field" error={error as AxiosError} />}
        </div>
    );
}
