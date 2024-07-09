import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";



interface MachinesMaintenance {
   evento: string;
   qtd_eventos_mes: number;
   tempo_total_manutencao: number;
   eventos_manutencao_dia_atual: number;
   qtd_maquinas_manutencao_dia: number;
}

const getMachineMaintenance = async (grupo_id: number | null,  empresa_id: number | null) => {
    const { data } = await api.get<MachinesMaintenance>("dashboards/maquinas_manutencao", {
        params: {
            grupo_id,
            empresa_id
        }
    });
    return data;
};

export const useGetMachineMaintenance = (grupo_id: number | null,  empresa_id: number | null) => {
    return useQuery({
        queryKey: ["machines_maintenance", grupo_id],
        enabled: true, 
        queryFn: () => getMachineMaintenance(grupo_id, empresa_id),
        refetchInterval: 9000
    });
};