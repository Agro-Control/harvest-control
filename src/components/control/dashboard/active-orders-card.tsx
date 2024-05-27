"use client";
import {useGetActiveOrders} from "@/utils/hooks/useGetActiveOrders";
import {FileArrowUp, Files, ArrowRight} from "@phosphor-icons/react";
import SingleDataCard from "./single-data-card";
import {useAuth} from "@/utils/hooks/useAuth";
import Link from "next/link";

const ActiveOrdersCard = () => {
    const {user} = useAuth();
    const grupo_id = user && user?.grupo_id;

    const {data, isLoading, isRefetching, refetch} = useGetActiveOrders(grupo_id);
    const isLoadingData = isLoading || isRefetching;

    return (
        <SingleDataCard
            title="Ordens de Serviço"
            subtitle="Grupo empresarial"
            Icon={Files}
            isLoading={isLoadingData}
            firstDataTitle="Ordens ativa: "
            firstDataValue={data?.ordens_ativas || 0}
            FirstDataIcon={FileArrowUp}
        >
             <Link
             href="/control/orders"
                    className="text-black flex h-9
        w-full
        flex-row
        items-center
        justify-center
        gap-3
        rounded-full
        border border-divider   
        bg-gray-500/10
        px-3
        text-base
        font-normal
        xl:w-auto
        cursor-pointer
        hover:bg-gray-500/20
        transition-colors
"
                >
                    <ArrowRight className="h-5 w-5 text-green-950 " />
                    
                            <p className="font-bold"> Acessar ordens</p>
                    </Link>

        </SingleDataCard>
    );
};
export default ActiveOrdersCard;
