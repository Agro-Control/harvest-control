import {useQuery} from "@tanstack/react-query";
import GetEmpresa from "@/types/get-empresa";
import {api} from "@/lib/api";

const getCompaniesRequest = async (cidade: string | null, estado: string | null, codigo: string | null) => {
        const {data} = await api.get<GetEmpresa>("/empresas", {
            params: {
                codigo: codigo,
                cidade: cidade,
                estado: estado,
            },
        });
        return data;
   
};

export const useGetCompanies = (cidade: string | null, estado: string | null, codigo: string | null) => {
    return useQuery({
        queryKey: ["companies"],
        queryFn: () => getCompaniesRequest(cidade, estado, codigo),
    });
};
