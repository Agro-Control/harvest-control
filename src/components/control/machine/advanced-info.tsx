import {MachineInfo} from "@/utils/hooks/useGetMachineInfo";
import MaintenanceInfo from "./maintenance-info";
import MaintenanceTime from "./maintenance-time";
import LastEvents from "./last-events";


interface AdvancedInfoProps {
    data: MachineInfo;
}

const AdvancedInfo = ({data}: AdvancedInfoProps) => {
    return (
        <div className="grid w-full grid-cols-1 gap-2 pb-4 ">
            <MaintenanceInfo title="Manutenção" subtitle="Mês" value={data?.qtd_manutencao_mes || 0} isLoading={false} />
            <MaintenanceInfo title="Manutenção" subtitle="Dia" value={data?.qtd_manutencao_dia || 0} isLoading={false} />
            <MaintenanceTime
                title="Tempo"
                subtitle="Manutenção Mês"
                value={data?.tempo_total_manutencao_mes || 0}
                isLoading={false}
            />
            <MaintenanceTime
                title="Tempo"
                subtitle="Manutenção Dia"
                value={data?.tempo_total_manutencao_dia || 0}
                isLoading={false}
            />
            <LastEvents title="Eventos"
                subtitle="Ultimos eventos"
                events={data?.ultimos_eventos || []}
                isLoading={false} />
        </div>
    );
};
export default AdvancedInfo;
