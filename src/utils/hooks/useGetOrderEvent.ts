import { useQuery } from "@tanstack/react-query";
import {api} from "@/lib/api";

interface OrderEvent {
    total: number | null;
    operacao: number | null;
    transbordo: number | null;
    deslocamento: number | null;
    manutencao: number | null;
    clima: number | null;
    abastecimento: number | null;
    inicio_ordem_servico: number | null;
    duracao_total: number | null;
    troca_turno: number | null;
    fim_ordem: number | null;
    aguardando_transbordo: number | null;
}

const getOrderEvent = async (ordem_id: number | null) => {


    const {data} = await api.get<OrderEvent>("dashboards/ordem_eventos", {
        params: {
            ordem_id,
        },
    });
    return data;
};

export const useGetOrderEvent = (ordem_id: number | null) => {
    return useQuery({
        queryKey: ["ordem_eventos", ordem_id],
        enabled: false,
        queryFn: () => getOrderEvent(ordem_id),
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404") || error.message.includes("400") ) {
                if (failureCount == 1)
                    return false;
            }

            return true;
        },
    });
};
