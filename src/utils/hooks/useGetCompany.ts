import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const getCompanyRequest = async (id: number | null) => {
    const { data } = await api.get(`/empresas/${id}`);
    return data;
};

export const useGetCompany = (id: number | null) => {
    return useQuery({
        queryKey: ["company"],
        enabled: !!id, 
        queryFn: () => getCompanyRequest(id),
    });
};