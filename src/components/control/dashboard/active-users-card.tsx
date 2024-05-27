"use client";
import {useGetOperatorsByGroup} from "@/utils/hooks/useGetOperatorsByGroup";
import {User, Users, Pulse} from "@phosphor-icons/react";
import {useAuth} from "@/utils/hooks/useAuth";
import DoubleDataCard from "./double-data-card";

const ActiveUsersCard = () => {
    const {user} = useAuth();
    const grupo_id = user && user?.grupo_id;

    const {data, isLoading, isRefetching, refetch} = useGetOperatorsByGroup(grupo_id);
    const isLoadingData = isLoading || isRefetching;

    return (
        <DoubleDataCard
            title="Relação de usuários"
            subtitle="Totais e Ativos"
            Icon={User}
            isLoading={isLoadingData}
            firstDataTitle="Usuarios totais: "
            firstDataValue={data?.operadores_totais || 0}
            FirstDataIcon={Users}
            secondDataTitle="Usuarios ativos: "
            secondDataValue={data?.operadores_ativos || 0}
            SecondDataIcon={Pulse}
        />
    );
};
export default ActiveUsersCard;
