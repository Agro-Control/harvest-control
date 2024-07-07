import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";



interface FieldDayEvent {
    data_evento: string | number;
    count: number | null;
  }
  
  export interface CalendarDatum {
    day: string,
    value: number;
}

const getFieldEventsTotal = async (talhao_id: number, data_inicio : string, data_fim : string ) => {
    const { data } = await api.get<CalendarDatum[]>("talhao/info_clima", {
        params: {
            talhao_id,
            data_inicio,
            data_fim,

        }
    });
    return data;
};

export const useGetFieldEventsTotal = (talhao_id: number, data_inicio : string, data_fim : string) => {
    return useQuery({
        queryKey: ["field_info_calendar", talhao_id],
        queryFn: () => getFieldEventsTotal(talhao_id, data_inicio, data_fim),
    });
};