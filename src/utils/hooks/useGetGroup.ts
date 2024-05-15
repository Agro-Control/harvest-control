import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const getGroupRequest = async (id: number | null) => {
    const { data } = await api.get(`/grupos/${id}`);
    return data;
};

export const useGetGroup = (id: number | null) => {
    return useQuery({
        queryKey: ["group"],
        enabled: false, 
        queryFn: () => getGroupRequest(id),
    });
};