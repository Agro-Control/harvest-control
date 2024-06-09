"use client";

import {Files} from "@phosphor-icons/react";
import {useGetOrderStatus} from "@/utils/hooks/useGetOrderStatus";
import React from "react";
import PieGraph, {Data} from "./responsive-pie";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/utils/hooks/useAuth";

const OrderStatusPie = () => {
    const {t} = useTranslation();
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const empresa_id = user && user?.empresa_id;
    const grupo_id = user && user?.grupo_id;

    const {data} = useGetOrderStatus(grupo_id, isAdmin ? null : empresa_id);
    const greenShades = ["#15803c", "#166533"];
    const formattedData: Data[] = data
        ? Object.entries(data).map(([key, value], index) => ({
              id: t(key),
              label: t(key),
              value: Number(value) || 0,
              color: "#15803c",
          }))
        : [];

    return (
        <div className="col-span-2 flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4  lg:min-h-[480px] xl:col-span-1">
            <div className="flex w-full flex-row gap-4">
                <div
                    className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg
            
            border
            border-green-500
            bg-green-400/50
            "
                >
                    <Files className="h-5 w-5 text-green-950 " />
                </div>

                <div className="flex  flex-row md:flex-col">
                    <p
                        className="
                    line-clamp-1
                    text-base
                    font-bold
                    leading-5
                    text-green-950

                "
                    >
                        Ordens de serviço
                    </p>
                    <p
                        className="
                        line-clamp-1
                        text-xs
                        font-normal
                        leading-4
                    text-gray-500

                    "
                    >
                        Status
                    </p>
                </div>
            </div>
            <div
                className="text-black flex h-full
                    w-full
                    flex-row
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    border border-divider   
                    bg-gray-500/10
                    px-3
                    text-base
                    font-normal"
            >
                <PieGraph data={formattedData} />
            </div>
        </div>
    );
};
export default OrderStatusPie;
