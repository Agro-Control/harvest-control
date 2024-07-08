import { useQuery } from "@tanstack/react-query";
import {api} from "@/lib/api";

interface EventInfo {
    evento: string;
    quantidade: number;
    duracao: number;
}


interface OrderEvent {
    total: number | null;
    duracao_total: number | null;
    eventos: EventInfo[];
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
        refetchInterval: 9000,
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404") || error.message.includes("400")  ) {
                if (failureCount == 1)
                    return false;
            }

            return true;
        },
    });
};
