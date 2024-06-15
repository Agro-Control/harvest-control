"use client";

import tractor from "@/assets/tractor.svg";
import Image from "next/image";
import {CircleNotch, Wrench, Clock} from "@phosphor-icons/react";

interface MaintenanceCardProps {
    title: string;
    subtitle: string;
    value: number | null;
    isLoading: boolean;
}

const MaintenanceInfo = ({title, subtitle, value, isLoading}: MaintenanceCardProps) => {
    return (
        <div className="col-span-1 flex h-full w-full flex-row items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4 lg:min-h-8 ">
            <div className="flex w-full flex-row gap-4">
                <div
                    className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg
        
        border
        border-green-500
        bg-green-400/50
        "
                >
                        <Wrench className="h-5 w-5 text-green-900 " />
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
                        {title}
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
                        {subtitle}
                    </p>
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-between gap-2 lg:gap-2 2xl:flex-row">
                <div
                    className="text-black flex h-9
    w-full
    flex-row
    items-center
    justify-center
    gap-3
    rounded-full
    px-3
    text-base
    font-normal
    2xl:w-full
"
                >
                  
                        <Image className="h-6 w-6 " src={tractor} alt="T" />
                    <div className="flex flex-row items-center gap-1 ">
                        {isLoading ? (
                            <CircleNotch className="h-4 w-4 animate-spin text-green-900" />
                        ) : (
                            <p className="font-bold"> {value} </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MaintenanceInfo;
