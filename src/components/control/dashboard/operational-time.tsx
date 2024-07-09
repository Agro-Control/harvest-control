"use client";

import {ChartLine} from "@phosphor-icons/react";
import {useGetOperationalTime} from "@/utils/hooks/useGetOperationalTime";
import React, { useEffect } from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/utils/hooks/useAuth";
import OperationalTimeItem from "./operational-time-item";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";

const OperationalTime = () => {
    const isDesktop = useMediaQuery("(min-width: 376px)");
    const {t} = useTranslation();
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const empresa_id = user && user?.empresa_id;
    const grupo_id = user && user?.grupo_id;

    const {data, refetch} = useGetOperationalTime(grupo_id, isAdmin ? null : empresa_id, null);
    
    const formatDuration = (duration: number): string => {
        if (duration === 0) {
            return "0s";
        }

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        const hoursStr = hours > 0 ? `${hours}hr` : "";
        const minutesStr = minutes > 0 ? `${minutes}min  ` : "";
        const secondsStr = seconds > 0 ? ` ${seconds}s` : "";

        return `${hoursStr} ${minutesStr}  ${secondsStr}`.trim();
    };





    return (
        <div className="col-span-2 flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4  lg:min-h-[480px] xl:col-span-1">
           <div className="flex w-full items-center justify-between flex-row"> 

            <div className="flex flex-row gap-4">
                <div
                    className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg border border-green-500 bg-green-400/50 ">
                    <ChartLine className="h-5 w-5 text-green-950 " />
                </div>

                <div className="flex flex-row md:flex-col">
                    <p
                        className="
                    line-clamp-1
                    text-base
                    font-bold
                    leading-5
                    text-green-950

                "
                    >
                        Jornada da frota
                    </p>
                   {isDesktop && <p
                        className="
                        line-clamp-1
                        text-xs
                        font-normal
                        leading-4
                    text-gray-500

                    "
                    >
                        Relação do tempo total e eventos produzidos
                    </p>}
                </div>
               


            </div>

            <p
                        className="
                    text-base
                    font-semibold
                    leading-5
                    text-green-950

                "
                    >
                        {formatDuration(data?.tempo_jornada_total || 0)}
                    </p>
           </div>

            <div
                className="text-black flex h-full
                    w-full
                    flex-col
                    items-center
                    justify-between
                    py-12
                    gap-3
                    rounded-2xl
                    border border-divider   
                    bg-gray-500/10
                    px-3
                    text-base
                    font-normal"
            >
                <OperationalTimeItem title="Operação" description="Tempo total de eventos produtivos." color="#16a34a" value={data?.operacionais || 0}  total={data?.tempo_jornada_total || 100} />
                <OperationalTimeItem  title="Improdutivo" description="Tempo total de eventos improdutivos." color="#FF5F15" value={data?.improdutivos || 0}  total={data?.tempo_jornada_total || 100}/>
                <OperationalTimeItem  title="Manutenção" description="Tempo total de eventos manutenção." color="#ef4c51" value={data?.manutencao || 0} total={data?.tempo_jornada_total || 100} />
                
            </div>
        </div>
    );
};
export default OperationalTime;
