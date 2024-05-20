import {useQuery} from "@tanstack/react-query";
import {api} from "@/lib/api";
import GetGestor from "@/types/get-gestor";

const getManagersRequest = async (
    grupo_id: number | null,
    empresa_id: number | null,
    codigo: string | null,
    status: string | null,
    tipo: string | null,
) => {
    const {data} = await api.get<GetGestor>("/gestores", {
        params: {
            grupo_id,
            codigo,
            status,
            tipo,
            empresa_id,
        },
    });
    return data;
};

export const useGetManagers = (
    grupo_id: number | null,
    empresa_id: number | null,
    status: string | null,
    codigo: string | null,
    tipo: string | null,
) => {
    return useQuery({
        queryKey: ["managers"],
        queryFn: () => getManagersRequest(grupo_id, empresa_id, codigo, status, tipo),
        enabled: !!grupo_id,
        retry: (failureCount, error) => {
            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3) return false;
            }

            return true;
        },
    });
};
