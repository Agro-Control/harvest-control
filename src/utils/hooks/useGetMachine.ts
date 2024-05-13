import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const getMachineRequest = async (maquina_id: number) => {
    const { data } = await api.get(`/maquinas/${maquina_id}`);
    return data;
};

export const useGetMachine = (maquina_id: number) => {
    return useQuery({
        queryKey: ["maquina"],
        queryFn: () => getMachineRequest(maquina_id),
    });
};