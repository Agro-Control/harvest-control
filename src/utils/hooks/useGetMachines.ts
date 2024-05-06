import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetMaquina from "@/types/get-maquina";

const getMachinesRequest = async (unidade_id: number | null, codigo: string | null, status: string | null) => {
    const { data } = await api.get<GetMaquina>("/maquinas", {
        params: {
            unidade_id: unidade_id,
            codigo: codigo,
            status: status,
        },
    });
    return data;
};

export const useGetMachines = (enableFlag: boolean, unidade_id: number | null, status: string | null, codigo: string | null) => {
    return useQuery({
        queryKey: ["machines", unidade_id, codigo, status],
        queryFn: () => getMachinesRequest(unidade_id, codigo, status),
        enabled: enableFlag,
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3)
                    return false;
            }

            return true;
        },
    });
};