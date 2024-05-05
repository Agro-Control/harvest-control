import { useQuery } from "@tanstack/react-query";
import GetEmpresa from "@/types/get-empresa";
import { api } from "@/lib/api";

const getCompaniesRequest = async (
    grupo_id: number | null,
    cidade: string | null,
    estado: string | null,
    codigo: string | null,
    status: string | null,
) => {
    const { data } = await api.get<GetEmpresa>("/empresas", {
        params: {
            grupo_id: grupo_id,
            codigo: codigo,
            cidade: cidade,
            estado: estado,
            status: status,
        },
    });
    return data;
};

const getCompanyRequest = async (id_empresa: number) => {
    const { data } = await api.get("/empresas/", {
        params: {
            id_empresa: id_empresa
        },
    });
    return data;

};

export const useGetCompanies = (
    id_empresa: number | null,
    grupo_id: number | null,
    cidade: string | null,
    estado: string | null,
    codigo: string | null,
    status: string | null,
) => {
    if (id_empresa) {
        return useQuery({
            queryKey: ["companies"],
            queryFn: () => getCompanyRequest(id_empresa),
        })
    } else {
        return useQuery({
            queryKey: ["companies"],
            queryFn: () => getCompaniesRequest(grupo_id, cidade, estado, codigo, status),
        });
    }
};
