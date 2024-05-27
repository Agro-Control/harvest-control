"use client";
import {useGetOperativeMachinesByGroup} from "@/utils/hooks/useGetOperativeMachinesByGroup";
import {Truck, WifiHigh, Bus} from "@phosphor-icons/react";
import {useAuth} from "@/utils/hooks/useAuth";
import DoubleDataCard from "./double-data-card";

const OperativeMachinesCard = () => {
    const {user} = useAuth();
    const grupo_id = user && user?.grupo_id;

    const {data, isLoading, isRefetching, refetch} = useGetOperativeMachinesByGroup(grupo_id);
    const isLoadingData = isLoading || isRefetching;

    return (
        <DoubleDataCard
            title="Relação de máquinas"
            subtitle="Totais e Operando"
            Icon={Bus}
            isLoading={isLoadingData}
            firstDataTitle="Máquinas totais: "
            firstDataValue={data?.maquinas_total || 0}
            FirstDataIcon={Truck}
            secondDataTitle="Máquinas operando: "
            secondDataValue={data?.maquina_operando || 0}
            SecondDataIcon={WifiHigh}
        />
    );
};
export default OperativeMachinesCard;
