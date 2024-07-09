"use client";
import {useGetActiveOrders} from "@/utils/hooks/useGetActiveOrders";
import {FileArrowUp, Files, Receipt} from "@phosphor-icons/react";
import SingleDataCard from "./single-data-card";
import {useAuth} from "@/utils/hooks/useAuth";
import Link from "next/link";
import DoubleDataCard from "./double-data-card";

const ActiveOrdersCard = () => {
    const {user} = useAuth();
    const isAdmin = user?.tipo === "D";
    const grupo_id = user && user?.grupo_id;
    const empresa_id = user && user?.empresa_id;

    const {data, isLoading, isRefetching, refetch} = useGetActiveOrders(grupo_id, isAdmin ? null : empresa_id);
    const isLoadingData = isLoading || isRefetching;

    return (
        <DoubleDataCard
        title="Ordens de Serviço"
        subtitle="Grupo empresarial"
        Icon={Files}
        isLoading={isLoadingData}
        firstDataTitle="Ordens totais: "
        firstDataValue={data?.ordens_totais || 0}
        FirstDataIcon={Receipt}
        secondDataTitle="Ordens ativas: "
        secondDataValue={data?.ordens_ativas || 0}
        SecondDataIcon={FileArrowUp}
    ></DoubleDataCard>
    );
};
export default ActiveOrdersCard;
