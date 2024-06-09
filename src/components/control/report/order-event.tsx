import { CircleNotch, Clock} from "@phosphor-icons/react";
import {useTranslation} from "react-i18next";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface OrderEventProps {
    duracao: number;
    quantidade: number;
    title: string;
    isLoading: boolean;
}

const OrderEvent = ({ quantidade, duracao,isLoading, title}: OrderEventProps) => {
    const {t} = useTranslation();

    const formatDuration = (duration: number): string => {
        if (duration === 0) {
            return '0s';
        }

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;
    
        const hoursStr = hours > 0 ? `${hours}hr` : '';
        const minutesStr = minutes > 0 ? `${minutes}min  ` : '';
        const secondsStr = seconds > 0 ? ` ${seconds}s` : '';
    
        return `${hoursStr} ${minutesStr}  ${secondsStr}`.trim();
    };

    return (
        <TooltipProvider delayDuration={200}> 
        <div className="text-black col-span-1 flex h-18 py-1 w-full flex-col items-center justify-center gap-1 rounded-3xl border border-divider bg-gray-500/10 px-3 text-base font-normal">
           
           
             <div className="flex w-full flex-row items-center justify-between">
                <div className="flex gap-2 flex-row items-center justify-between">
                <Tooltip>
                <TooltipTrigger asChild>
                    <p className="text-md max-w-[128px] line-clamp-1 leading-5"> {t(title)}</p>
                    </TooltipTrigger >
                    <TooltipContent>
                            <p>{t(title)}</p>
                        </TooltipContent>

                    </Tooltip>
                    {isLoading ? (
                        <CircleNotch className="h-4 w-4 animate-spin text-green-900" />
                    ) : (
                        <p className="font-bold"> {quantidade}x</p>
                    )}
                </div>

                <div className="flex flex-row items-center gap-1">
                <Clock className="h-5 w-5 text-green-950" />
                <div className="flex flex-row items-center  justify-between">
                    {isLoading ? (
                        <CircleNotch className="h-4 w-4 animate-spin text-green-900" />
                    ) : (
                        <p className="font-bold">{formatDuration(duracao)}</p>
                    )}
                </div>
            </div>
            </div>
          
        </div>
        </TooltipProvider > 
    );
};


export default OrderEvent;
