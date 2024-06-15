"use client";

import {EventInfo} from "@/utils/hooks/useGetMachineInfo";
import {ClockCountdown, Clock} from "@phosphor-icons/react";
import {useTranslation} from "react-i18next";

interface Props {
    title: string;
    subtitle: string;
    events: EventInfo[];
    isLoading: boolean;
}

const LastEvents = ({title, subtitle, events}: Props) => {
    const {t} = useTranslation();
    const formatDuration = (duration: number): string => {
        if (duration === 0) {
            return "0s";
        }

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        const hoursStr = hours > 0 ? `${hours}h` : "";
        const minutesStr = minutes > 0 ? `${minutes}m  ` : "";
        const secondsStr = seconds > 0 ? ` ${seconds}s` : "";

        return `${hoursStr} ${minutesStr}  ${secondsStr}`.trim();
    };

    return (
        <div className="col-span-1 flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4 lg:h-auto ">
            <div className="flex w-full flex-row gap-4">
                <div
                    className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg
        
        border
        border-green-500
        bg-green-400/50
        "
                >
                    <ClockCountdown className="h-5 w-5 text-green-900 " />
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
            {events.length === 0 ? (
                <div className="text-black flex h-auto  w-full items-center justify-center  gap-3 rounded-full px-1 text-base font-normal ">
                    <p>Não foram encontrados eventos</p>
                </div>
            ) : (
                <div className="text-black grid h-auto  w-full  grid-cols-1 gap-3 rounded-full px-1 text-base font-normal ">
                    {events.slice(0, 2).map((event) => {
                        return (
                            <div key={event.id} className="text-black col-span-1 flex h-auto w-full flex-row items-center justify-between gap-3 rounded-full border border-divider bg-gray-500/10 px-6 text-base font-normal 2xl:w-auto">
                                <p>{t(event.nome)}</p>
                                <div className="flex flex-row gap-2 items-center justify-start " >
                                <Clock className="h-5 w-5 text-green-950" />
                                <p>{formatDuration(event.duracao || 0)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default LastEvents;
