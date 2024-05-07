import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetGestor from "@/types/get-gestor";

const getManagersRequest = async (grupo_id: number | null, codigo: string | null, status: string | null) => {
    const { data } = await api.get<GetGestor>("/gestores", {
        params: {
            grupo_id: grupo_id,
            codigo: codigo,
            status: status,
        },
    });
    return data;
};

export const useGetManagers = (grupo_id: number | null, status: string | null, codigo: string | null) => {
    return useQuery({
        queryKey: ["managers", grupo_id, codigo, status],
        queryFn: () => getManagersRequest(grupo_id, codigo, status),
        enabled: !!grupo_id,
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3)
                    return false;
            }

            return true;
        },
    });
};