import { useQuery } from "@tanstack/react-query";
import {api} from "@/lib/api";

interface OrderStatus {
    Ativa: number | null;
    total_de_ordens: number | null;
    // operacao: number | null;
    // transbordo: number | null;
    // deslocamento: number | null;
    // manutencao: number | null;
    // clima: number | null;
    // abastecimento: number | null;
    // inicio_ordem_servico: number | null;
    // troca_turno: number | null;
    // fim_ordem: number | null;
    // aguardando_transbordo: number | null;
}

const getOrderStatus = async (grupo_id: number | null) => {
    const {data} = await api.get<OrderStatus>("dashboards/ordem_status", {
        params: {
            grupo_id,
        },
    });
    return data;
};

export const useGetOrderStatus = (grupo_id: number | null) => {
    return useQuery({
        queryKey: ["order_status"],
        enabled: true,
        queryFn: () => getOrderStatus(grupo_id),
    });
};
