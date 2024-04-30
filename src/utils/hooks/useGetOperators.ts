import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetOperador from "@/types/get-operador";

const getOperatorsRequest = async (id_empresa: number | null, turno: string | null, codigo: string | null, status: string | null) => {
    const { data } = await api.get<GetOperador>("/operadores", {
        params: {
            id_empresa: id_empresa,
            turno: turno,
            codigo: codigo,
            status: status,
        },
    });
    return data;
};

export const useGetOperators = (enableFlag: boolean, id_empresa: number | null, turno: string | null, status: string | null, codigo: string | null) => {
    return useQuery({
        queryKey: ["operators", id_empresa, turno, codigo, status],
        queryFn: () => getOperatorsRequest(id_empresa, turno, codigo, status),
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