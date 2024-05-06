import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const getCompanieRequest = async (id: number | null) => {
    const { data } = await api.get(`/empresas/${id}`);
    return data;
};

export const useGetCompanie = (id: number | null) => {
    return useQuery({
        queryKey: ["companie"],
        enabled: !!id,
        queryFn: () => getCompanieRequest(id),
    });
};