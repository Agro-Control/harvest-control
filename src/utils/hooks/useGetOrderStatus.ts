import { useQuery } from "@tanstack/react-query";
import {api} from "@/lib/api";

interface OrderStatus {
    Ativa: number | null;
    total_de_ordens: number | null;
}

const getOrderStatus = async (grupo_id: number | null, empresa_id: number | null) => {
    const {data} = await api.get<OrderStatus>("dashboards/ordem_status", {
        params: {
            grupo_id,
            empresa_id
        },
    });
    return data;
};

export const useGetOrderStatus = (grupo_id: number | null, empresa_id: number | null) => {
    return useQuery({
        queryKey: ["order_status"],
        enabled: true,
        queryFn: () => getOrderStatus(grupo_id, empresa_id),
        refetchInterval: 9000
    });
};
