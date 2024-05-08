"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateFieldModal from "@/components/control/field/create-field-modal";
import StatusCodeHandler from "@/components/status-code-handler";
import LoadingAnimation from "@/components/loading-animation";
import FieldRow from "@/components/control/field/field-row";
import FilterInformation from "@/types/filter-information";
import { useGetFields } from "@/utils/hooks/useGetFields";
import SearchBar from "@/components/control/search-bar";
import Filter from "@/components/control/filter";
import { Button } from "@/components/ui/button";
import Talhao from "@/types/talhao";
import { AxiosError } from "axios";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/hooks/useAuth";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useGetUnits } from "@/utils/hooks/useGetUnits";
import Unidade from "@/types/unidade";
import Empresa from "@/types/empresa";


const statusFilter: FilterInformation = {
    filterItem: [
        { value: "all" },
        { value: "A" },
        {
            value: "I",
        },
    ],
};

export default function Field() {
    const [query] = useQueryState("query");
    const [status] = useQueryState("status");
    const [unidade] = useQueryState("Unidades");
    const [empresa] = useQueryState("Empresas");
    const [enableFlag, setEnableFlag] = useState(false);
    const auth = useAuth();
    const user = auth.user?.usuario;
    const isGestor = user?.tipo === "G";

    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        isError: isCompanyError,
        refetch: refetchCompanies,
    } = useGetCompanies(!isGestor ? true : false, !isGestor ? parseInt(user?.grupo_id!) : null, null, null, null, null);

    const {
        data: { unidades = [] } = {},
        isLoading: isLoadingUnits, // Booleano que indica se está carregando
        refetch: refetchUnits, // Função que faz a requisição novamente
    } = useGetUnits(isGestor ? true : enableFlag, isGestor ? user.empresa_id : parseInt(empresa!), null, null);



    const {
        data: { talhoes = [] } = {},
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetFields(true, parseInt(unidade!), status, query);

    const companyFilter: FilterInformation = {
        filterItem: [
            { value: "all" },
            ...empresas.map((empresa: Empresa) => ({
                value: empresa.id?.toString()!,
                label: empresa.nome,
            })),
        ],
    };

    const unitFilter: FilterInformation = {
        filterItem: [
            { value: "all" },
            ...unidades.map((unit: Unidade) => ({
                value: unit.id?.toString()!
            })),
        ],
    };
    // Variavel que indica se está carregando ou refazendo a requisição
    const isLoadingData = isLoading || isRefetching;

    useEffect(() => {
        console.log(enableFlag);
        if (isCompanyError)
            refetchCompanies();
        if (empresa != null && empresa != "" && empresa != undefined) {
            setEnableFlag(true);
            refetchUnits();
        } else {
            setEnableFlag(false);
        }
        refetch();
    }, [empresa, unidade, query, status]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Talhões</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                {!isGestor && <Filter filter={companyFilter} paramType="Empresas" />}
                <Filter filter={unitFilter} paramType="Unidades" />
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
            {!isGestor && !enableFlag && <div className="flex w-full items-center justify-center font-medium">Filtre as empresas e unidades para exibir os talhões</div>}
            {/* Renderiza o componente com as mensagens de erro se houver erro e não estiver carregando */}
            {isError && !isLoadingData && <StatusCodeHandler requisitionType="field" error={error as AxiosError} />}
        </div>
    );
}
