import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetOperador from "@/types/get-operador";

const getNightOperatorsRequest = async (unidade_id: number | null, turno: string | null, codigo: string | null, status: string | null, disponibilidade_ordem: boolean | null) => {
    const { data } = await api.get<GetOperador>("/operadores", {
        params: {
            unidade_id: unidade_id,
            turno: turno,
            codigo: codigo,
            status: status,
            disponibilidade_ordem: disponibilidade_ordem
        },
    });
    return data;
};

export const useGetNightOperators = (enableFlag: boolean, unidade_id: number | null, turno: string | null, status: string | null, codigo: string | null, disponibilidade_ordem : boolean | null) => {
    return useQuery({
        queryKey: ["nightoperators", unidade_id, turno, codigo, status, disponibilidade_ordem],
        queryFn: () => getNightOperatorsRequest(unidade_id, turno, codigo, status, disponibilidade_ordem),
        enabled: enableFlag,
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3)
                    return false;
            }

            return true;
        },

    });
};