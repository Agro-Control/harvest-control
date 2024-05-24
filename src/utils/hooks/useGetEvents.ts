import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const getEventsRequest = async (id_ordem: number | null) => {
    const { data } = await api.get(`/eventos/${id_ordem}`)
    return data;
};

export const useGetEvents = (id_ordem: number | null) => {
    return useQuery({
        queryKey: ["events", id_ordem],
        queryFn: () => getEventsRequest(id_ordem),
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