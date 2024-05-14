import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetEstados from "@/types/get-estados";


const getStateRequest = async (grupo_id: number | null, empresa_id: number | null) => {
    const { data } = await api.get<GetEstados>("/estados_empresa", {
        params: {
            grupo_id: grupo_id,
            empresa_id: empresa_id,
        },
    });
    return data;
};

export const useGetState = (grupo_id: number | null, empresa_id: number | null) => {
    return useQuery({
        queryKey: ["units", grupo_id, empresa_id,],
        queryFn: () => getStateRequest(grupo_id, empresa_id),
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
