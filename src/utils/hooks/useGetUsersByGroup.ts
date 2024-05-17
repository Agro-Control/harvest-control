import { useQuery } from "@tanstack/react-query";
import GetUsuarios from "@/types/get-usuarios";
import { api } from "@/lib/api";

const getUsersByGroup = async (
    grupo_id: number | null,
    empresa_id: number | null,
    unidade_id: number | null,
    status: string | null,
    tipo: string | null,
) => {
    const { data } = await api.get<GetUsuarios>("/usuarios", {
        params: {
            grupo_id,
            empresa_id,
            unidade_id,
            status,
            tipo,
        },
    });
    return data;
};

export const useGetUsersByGroup = (
    grupo_id: number | null,
    empresa_id: number | null,
    unidade_id: number | null,
    status: string | null,
    tipo: string | null,
) => {
        return useQuery({
            enabled: false,
            queryKey: ["groupUsers"],
            queryFn: () => getUsersByGroup(grupo_id, empresa_id, unidade_id, status, tipo),
        });
    
};
