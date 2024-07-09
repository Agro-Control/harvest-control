import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface OrdersByGroup {
    ordens_totais: number;
    ordens_ativas: number;
}

const getActiveOrders = async (grupo_id: number | null, empresa_id: number | null) => {
    const { data } = await api.get<OrdersByGroup>("dashboards/ordem_ativas", {
        params: {
            grupo_id,
            empresa_id
        }
    });
    return data;
};

export const useGetActiveOrders = (grupo_id: number | null, empresa_id: number | null) => {
    return useQuery({
        queryKey: ["orders_by_group", grupo_id],
        enabled: true, 
        queryFn: () => getActiveOrders(grupo_id, empresa_id),
        refetchInterval: 9000,
    });
};