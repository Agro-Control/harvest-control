import { useGetFieldClimateDetail } from "@/utils/hooks/useGetFieldClimateDetails";
import {MyResponsiveLine, Serie } from "./line-chart";
import { Datum } from "@nivo/line";
import { useEffect } from "react";
import { format } from "date-fns";
import { FieldClimateAnualData, useGetFieldClimateAnualDetail } from "@/utils/hooks/useGetFieldClimateAnualDetails";
import formatDuration, { convertDurationToHoursFromSeconds } from "@/utils/functions/formatDuration";
import { DialogDescription } from "@/components/ui/dialog";

export const FieldClimateChart = ({ talhao_id, data_inicio, data_fim, tipo, isAnual }: { talhao_id: number, data_inicio: string, data_fim: string, tipo: string, isAnual: boolean }) => {
  
   const { data,
    refetch,
    isLoading,
    isRefetching
   } = useGetFieldClimateDetail(!isAnual, talhao_id, data_inicio, data_fim, tipo);
  
   useEffect(() => {
   if(!isLoading && !isRefetching) {
        refetch(); 
    }
}, [open, data_inicio, data_fim]);

function formatDateToDayMonth(event : string | number) {
  let date;

  if (typeof event === "number") {
      date = new Date(event);
  } else if (typeof event === "string") {
      date = new Date(event.replace(/-/g, '/'));
  } else {
      return ""; 
  }

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() é baseado em zero
  return `${day}/${month}`;
}

console.log ("data da api", data);

  const formattedDataMonth: Serie[] = !isLoading && data && data.data.length > 0
  ? [{
      id: format(data.id, "yyyy"),
      data: data.data.map(event => ({
        x: formatDateToDayMonth(event.data_evento), 
        y: convertDurationToHoursFromSeconds(event.duracao!),
      })) 
    }]
  : [];



  const colors = ["#166533", "#05f248", "#68a87a"];

  return (
    <div style={{ height: 500, width: 1000}}>
      <DialogDescription>Dados de eventos por Mês</DialogDescription>
      {!isLoading && formattedDataMonth.length > 0 && <MyResponsiveLine data={formattedDataMonth} colors={colors} legend="Dia" />}
    </div>
  );
};
