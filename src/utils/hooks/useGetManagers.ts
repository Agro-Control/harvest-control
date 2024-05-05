import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetGestor from "@/types/get-gestor";

const getManagersRequest = async (id_grupo: number | null, codigo: string | null, status: string | null) => {
    const { data } = await api.get<GetGestor>("/gestores", {
        params: {
            id_grupo: id_grupo,
            codigo: codigo,
            status: status,
        },
    });
    return data;
};

export const useGetManagers = (id_grupo: number | null, status: string | null, codigo: string | null) => {
    return useQuery({
        queryKey: ["managers", id_grupo, codigo, status],
        queryFn: () => getManagersRequest(id_grupo, codigo, status),
        enabled: !!id_grupo,
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3)
                    return false;
            }

            return true;
        },
    });
};