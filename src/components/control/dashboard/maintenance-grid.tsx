"use client";

import MaintenanceCard from "@/components/control/dashboard/maintenance-card";
import {useGetMachineMaintenance} from "@/utils/hooks/useGetMachineMaintenance";
import {useAuth} from "@/utils/hooks/useAuth";
import MaintenancePercentage from "./maintenance-percentage";



const MaintenanceGrid = () => {

    const {user} = useAuth();
    const isAdmin = user?.tipo === "D";
    const grupo_id = user && user?.grupo_id;
    const empresa_id = user && user?.empresa_id;

    const {data, isLoading, isRefetching, refetch} = useGetMachineMaintenance(grupo_id, isAdmin ? null : empresa_id);
    const isLoadingData = isLoading || isRefetching;

    return (
        <div className="grid w-full gap-6 md:grid-cols-2 pb-4 xl:grid-cols-3">
               <MaintenanceCard title="Manutenção hoje" subtitle="Máquinas em manutenção hoje" value={data?.qtd_maquinas_manutencao_dia || 0}  isLoading={isLoadingData} />
               <MaintenancePercentage title="Porcentagem do dia" subtitle="Tempo total de manutenção no dia" value={data?.tempo_total_manutencao || 0}  isLoading={isLoadingData} />
               <MaintenanceCard title="Eventos mensais" subtitle="Eventos de manutenção nesse mês" isEvent value={data?.qtd_eventos_mes || 0}  isLoading={isLoadingData} />
            
            </div>
    )
}
export default MaintenanceGrid;