import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetOperador from "@/types/get-operador";

const getOperatorsList = async (empresa_id: number | null, unidade_id: number | null, turno: string | null, codigo: string | null, status: string | null) => {
    const { data } = await api.get<GetOperador>("/operadores", {
        params: {
            empresa_id,
            unidade_id: unidade_id,
            turno: turno,
            codigo: codigo,
            status: status,
        },
    });
    return data;
};

export const useGetOperatorsList = (empresa_id: number | null, unidade_id: number | null, turno: string | null, status: string | null, codigo: string | null) => {
    return useQuery({
        queryKey: ["operatorList"],
        queryFn: () => getOperatorsList(empresa_id, unidade_id, turno, codigo, status),
        enabled: false,

    });
};