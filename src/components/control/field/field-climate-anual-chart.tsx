import { useGetFieldClimateDetail } from "@/utils/hooks/useGetFieldClimateDetails";
import { MyResponsiveLine, Serie } from "./line-chart";
import { Datum } from "@nivo/line";
import { useEffect } from "react";
import { format } from "date-fns";
import { FieldClimateAnualData, useGetFieldClimateAnualDetail } from "@/utils/hooks/useGetFieldClimateAnualDetails";
import formatDuration, { convertDurationToHoursFromSeconds } from "@/utils/functions/formatDuration";

export const FieldAnualClimateChart = ({ talhao_id, data_inicio, data_fim, tipo,  isAnual }: { talhao_id: number, data_inicio: string, data_fim: string, tipo: string, isAnual: boolean }) => {
    const { data,
        refetch,
        isLoading,
        isRefetching
    } = useGetFieldClimateAnualDetail(isAnual, talhao_id, data_inicio, data_fim, tipo);

    useEffect(() => {
        if (!isLoading && !isRefetching) {
            refetch();
        }
    }, [open]);

    console.log("data da api", data);



    // Mapear cada item do array e formatar os dados conforme necessário
    const formatData = (data: FieldClimateAnualData): Serie[] => {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        return data.map((item: any) => ({
            id: item.id,
            data: item.data.map((evento: any) => ({
                x: evento.data_evento ? evento.data_evento.split('-')[1] : "01",
                y: convertDurationToHoursFromSeconds(evento.duracao)
            }))
        }));
    };

    const formattedData: Serie[] = !isLoading ? formatData(data!) : [];
    console.log("data formatada >>>>");
    console.log(formattedData);
    console.log("data formatada ^^^");

    const colors = ["#166533", "#05f248", "#68a87a"];

    return (
        <div style={{ height: 500, width: 800 }}>
            {!isLoading && formattedData.length > 0 && <MyResponsiveLine data={formattedData} colors={colors} legend="Mês" />}
        </div>
    );
};
