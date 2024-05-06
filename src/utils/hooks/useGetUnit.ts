import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetUnidade from "@/types/get-unidade";


const getUnitRequest = async (unidade_id: number) => {
    const { data } = await api.get(`/unidades/${unidade_id}`);
    return data;
};

export const useGetUnit = (unidade_id: number) => {
    return useQuery({
        queryKey: ["unidades"],
        queryFn: () => getUnitRequest(unidade_id),
    });
};
