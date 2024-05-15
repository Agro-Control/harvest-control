import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const getFieldRequest = async (id: number | null) => {
    const { data } = await api.get(`/talhoes/${id}`);
    return data;
};

export const useGetField = (id: number | null) => {
    return useQuery({
        queryKey: ["field"],
        enabled: !!id, 
        queryFn: () => getFieldRequest(id),
    });
};