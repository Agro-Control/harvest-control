import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetTalhao from "@/types/get-talhao";

const getEventsRequest = async (ordem_id: string | null) => {
    const { data } = await api.get(`/eventos/${ordem_id}`)
    return data;
};

export const useGetEvents = (ordem_id: string | null) => {
    return useQuery({
        queryKey: ["events"],
        queryFn: () => getEventsRequest(ordem_id),
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3)
                    return false;
            }

            return true;
        },
        enabled: !!ordem_id,
    });
};