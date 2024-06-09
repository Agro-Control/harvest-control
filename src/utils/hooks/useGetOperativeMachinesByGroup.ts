import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";



interface MachinesByGroup {
    maquina_operando: number;
    maquinas_total: number;
}

const getOperativeMachinesByGroup = async (grupo_id: number | null,  empresa_id: number | null) => {
    const { data } = await api.get<MachinesByGroup>("dashboards/maquinas_operando", {
        params: {
            grupo_id,
            empresa_id
        }
    });
    return data;
};

export const useGetOperativeMachinesByGroup = (grupo_id: number | null,  empresa_id: number | null) => {
    return useQuery({
        queryKey: ["machines_by_group", grupo_id],
        enabled: true, 
        queryFn: () => getOperativeMachinesByGroup(grupo_id, empresa_id),
    });
};