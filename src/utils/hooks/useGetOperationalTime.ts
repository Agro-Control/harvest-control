import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";



interface OperationalTime {
        operacionais: number | null;
        improdutivos:  number | null;
        manutencao:  number | null;
        tempo_jornada_total: number | null;
      
}

const getOperationalTime = async (grupo_id: number | null,  empresa_id: number | null, maquina_id: number | null ) => {
    const { data } = await api.get<OperationalTime>("dashboards/tempo_operacional", {
        params: {
            grupo_id,
            empresa_id,
            maquina_id
        }
    });
    return data;
};

export const useGetOperationalTime = (grupo_id: number | null,  empresa_id: number | null, maquina_id: number | null ) => {
    return useQuery({
        queryKey: ["operational_time", grupo_id, maquina_id],
        enabled: true, 
        queryFn: () => getOperationalTime(grupo_id, empresa_id, maquina_id),
        refetchInterval: 9000
    });
};