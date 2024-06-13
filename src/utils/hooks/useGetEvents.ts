import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

import GetEventos from "@/types/get-eventos";

const getEventsRequest = async (id_ordem: number | null, nome: string | null) => {

    if(isNaN(Number(id_ordem))) id_ordem = null;

    const { data } = await api.get<GetEventos>(`/eventos/${id_ordem}`,{
        params: {
            nome
        }
    })
    return data;
};

export const useGetEvents = (id_ordem: number | null, nome: string | null) => {
    return useQuery({
        queryKey: ["events", id_ordem],
        queryFn: () => getEventsRequest(id_ordem, nome),
        retry: (failureCount, error) => {
            if (error instanceof Error && error.message.includes("422")) {
                    return false;
            }

            if (error instanceof Error && error.message.includes("404")|| error.message.includes("422")  ) {
                if (failureCount == 2)
                    return false;
            }

            return true;
        },
        enabled: !!id_ordem,
    });
};