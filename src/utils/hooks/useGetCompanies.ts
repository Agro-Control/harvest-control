import {useQuery} from "@tanstack/react-query";
import GetEmpresa from "@/types/get-empresa";
import {api} from "@/lib/api";

const getCompaniesRequest = async (
    gestor_id: number | null,
    cidade: string | null,
    estado: string | null,
    codigo: string | null,
    status: string | null,
) => {
    const {data} = await api.get<GetEmpresa>("/empresas", {
        params: {
            gestor_id: gestor_id,
            codigo: codigo,
            cidade: cidade,
            estado: estado,
            status: status,
        },
    });
    return data;
};

export const useGetCompanies = (
    gestor_id: number | null,
    cidade: string | null,
    estado: string | null,
    codigo: string | null,
    status: string | null,
) => {
    return useQuery({
        queryKey: ["companies"],
        queryFn: () => getCompaniesRequest(gestor_id, cidade, estado, codigo, status),
    });
};
