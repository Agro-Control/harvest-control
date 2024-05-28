import {Icon as IconType, CircleNotch} from "@phosphor-icons/react";
import React from "react";

interface OrderStatusPieProps {
    Icon: IconType;
    title: string;
    subtitle: string;
    FirstDataIcon: IconType;
    firstDataTitle: string;
    firstDataValue: number | null;
    isLoading: boolean;
}

const OrderStatusPie = () => {
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
                    {/* <Icon className="h-5 w-5 text-green-950 " /> */}
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
                        123
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
                        123
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
            ></div>
        </div>
    );
};
export default OrderStatusPie;
