import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

import GetEventos from "@/types/get-eventos";

const getEventsRequest = async (id_ordem: number | null, nome: string | null) => {
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

            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3)
                    return false;
            }

            return true;
        },
        enabled: !!id_ordem,
    });
};