import {useQuery} from "@tanstack/react-query";
import {api} from "@/lib/api";
import {getEmpresa} from "@/app/control/business-management/companies/page";

const getCompaniesRequest = async (cidade: string | null, estado: string | null, codigo: string | null) => {

    const {data} = await api.get<getEmpresa>("/empresas", {
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
