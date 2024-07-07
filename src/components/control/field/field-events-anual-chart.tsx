import { useGetFieldEventsTotal } from "@/utils/hooks/useGetFieldEventsTotal";
import { format } from "date-fns";
import { useEffect } from "react";
import { CalendarDatum, MyResponsiveCalendar } from "./calendar-chart";
import { DialogDescription } from "@/components/ui/dialog";

export const FieldEventsAnualChart = ({ talhao_id, data_inicio, data_fim }: { talhao_id: number, data_inicio: string, data_fim: string }) => {

  const { data,
    refetch,
    isLoading,
    isRefetching
  } = useGetFieldEventsTotal(talhao_id, data_inicio, data_fim);

  useEffect(() => {
    if (!isLoading && !isRefetching) {
      refetch();
    }
  }, [open, data_inicio, data_fim]);


  return (
    <div>
    <DialogDescription>Eventos Anuais</DialogDescription>
    <div style={{ height: 200, width: 800 }}>
      {!isLoading && data && <MyResponsiveCalendar data={data!} from={data_inicio} to={data_fim} />}
    </div>
    </div>
  );
};
