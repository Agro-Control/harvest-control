import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";



interface OperatorsByGroup {
    operadores_ativos: number;
    operadores_totais: number;
}

const getOperatorsByGroup = async (grupo_id: number | null,   empresa_id: number | null) => {
    const { data } = await api.get<OperatorsByGroup>("dashboards/operadores_operando", {
        params: {
            grupo_id,
            empresa_id
        }
    });
    return data;
};

export const useGetOperatorsByGroup = (grupo_id: number | null,   empresa_id: number | null) => {
    return useQuery({
        queryKey: ["operators_by_group", grupo_id],
        enabled: true, 
        queryFn: () => getOperatorsByGroup(grupo_id, empresa_id),
        refetchInterval: 9000,
    });
};