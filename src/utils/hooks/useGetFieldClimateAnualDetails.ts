import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface ClimateEvent {
    data_evento: string | number;
    duracao: number | null;
  }
  
  export interface FieldClimateAnualDetail {
    id: string;
    data: ClimateEvent[];
  }
  export interface FieldClimateAnualData{
    data: FieldClimateAnualDetail[];
  }

const getFieldClimateAnualDetail = async (talhao_id: number, data_inicio : string, data_fim : string, tipo: string ) => {
    const { data } = await api.get<FieldClimateAnualData>("talhao/info_clima_anual_detalhado", {
        params: {
            talhao_id,
            data_inicio,
            data_fim,
            tipo
        }
    });
    return data;
};

export const useGetFieldClimateAnualDetail = (enabled: boolean, talhao_id: number, data_inicio : string, data_fim : string, tipo: string ) => {
    return useQuery({
        queryKey: ["field_climate_anual_detail", talhao_id],
        enabled: !!enabled, 
        queryFn: () => getFieldClimateAnualDetail(talhao_id, data_inicio, data_fim, tipo),
    });
};