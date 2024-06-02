import { useQuery } from "@tanstack/react-query";
import GetEmpresa from "@/types/get-empresa";
import { api } from "@/lib/api";

const getCompaniesRequest = async (
    grupo_id: number | null,
    estado: string | null,
    codigo: string | null,
    status: string | null,
    disp_gestor: boolean, 
) => {
    const { data } = await api.get<GetEmpresa>("/empresas", {
        params: {
            grupo_id: grupo_id,
            codigo: codigo,
            estado: estado,
            status: status,
            disp_gestor: disp_gestor,
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
    disp_gestor: boolean,
) => {
        return useQuery({
            enabled: !!enable_flag,
            queryKey: ["companies", disp_gestor],
            queryFn: () => getCompaniesRequest(grupo_id, estado, codigo, status, disp_gestor),
        });
    
};
