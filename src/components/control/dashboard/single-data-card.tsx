import {Icon as IconType, CircleNotch} from "@phosphor-icons/react";
import React from "react";

interface SingleDataCardProps {
    Icon: IconType;
    title: string;
    subtitle: string;
    FirstDataIcon: IconType;
    firstDataTitle: string;
    firstDataValue: number | null;
    isLoading: boolean;
    children: React.ReactNode;

}


const SingleDataCard = ({ Icon, title, subtitle, FirstDataIcon, firstDataTitle, firstDataValue, children, isLoading}: SingleDataCardProps) => {

    return (
        <div className="col-span-2 flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4 lg:col-span-1 lg:max-h-[130px]">
            <div className="flex w-full flex-row gap-4">
                <div
                    className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg
            
            border
            border-green-500
            bg-green-400/50
            "
                >
                    <Icon className="h-5 w-5 text-green-950 " />
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
            <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row lg:gap-0">
                <div
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
"
                >
                    <FirstDataIcon className="h-5 w-5 text-green-950 " />
                    <div className="flex flex-row gap-1">
                        <p> {firstDataTitle}</p>
                        {isLoading ? (
                            <CircleNotch className="h-4 w-4 animate-spin text-green-900" />
                        ) : (
                            <p className="font-bold"> {firstDataValue}</p>
                        )}
                    </div>
                </div>

                <div className="flex h-8 max-w-[1px] flex-1 bg-divider" />
{children}
            </div>
        </div>
    );
}
export default SingleDataCard;


