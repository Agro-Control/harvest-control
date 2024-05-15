import { useQuery } from "@tanstack/react-query";
import GetEmpresa from "@/types/get-empresa";
import { api } from "@/lib/api";

const getCompaniesRequest = async (
    grupo_id: number | null,
    estado: string | null,
    codigo: string | null,
    status: string | null,
) => {
    const { data } = await api.get<GetEmpresa>("/empresas", {
        params: {
            grupo_id: grupo_id,
            codigo: codigo,
            estado: estado,
            status: status,
        },
    });
    return data;
};

export const useGetCompanies = (
    enable_flag: boolean,
    grupo_id: number | null,
    estado: string | null,
    codigo: string | null,
    status: string | null,
) => {
        return useQuery({
            enabled: !!enable_flag,
            queryKey: ["companies"],
            queryFn: () => getCompaniesRequest(grupo_id, estado, codigo, status),
        });
    
};
