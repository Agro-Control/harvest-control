import {useQuery} from "@tanstack/react-query";
import {api} from "@/lib/api";
import Empresa from "@/types/empresa";

const getCompanieRequest = async (id: number) => {
        const {data} = await api.get<Empresa>("/empresas/", {
            params: {
                id: id
            },
        });
        return data;
   
};

export const useGetCompanie = (id: number) => {
    return useQuery({
        queryKey: ["companies"],
        queryFn: () => getCompanieRequest(id),
    });
};
