import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";


interface ClimateEvent {
    data_evento: string | number;
    duracao: number | null;
  }
  
  interface FieldClimateDetail {
    id: string;
    data: ClimateEvent[];
  }

const getFieldClimateDetail = async (talhao_id: number, data_inicio : string, data_fim : string, tipo: string ) => {
    const { data } = await api.get<FieldClimateDetail>("talhao/info_clima_detalhado", {
        params: {
            talhao_id,
            data_inicio,
            data_fim,
            tipo
        }
    });
    return data;
};

export const useGetFieldClimateDetail = (enabled: boolean, talhao_id: number, data_inicio : string, data_fim : string, tipo: string ) => {
    return useQuery({
        queryKey: ["field_climate_detail", talhao_id],
        enabled: !!enabled, 
        queryFn: () => getFieldClimateDetail(talhao_id, data_inicio, data_fim, tipo),
    });
};