
import {Icon as IconType, CircleNotch, FileDoc} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";


interface OrderEventProps {
    Icon: IconType;
    event: number;
    title: string;
    isLoading: boolean;
}



const OrderEvent = ({Icon, event, isLoading, title}: OrderEventProps) => {
    const { t } = useTranslation()
    return (
       
        <div
        className="col-span-1 text-black flex h-9 w-full flex-row items-center justify-center gap-2 rounded-full border border-divider bg-gray-500/10 px-3 text-base font-normal 2xl:w-auto"
    >
        <Icon className="h-5 w-5 text-green-950" />
        <div className="flex flex-row justify-between w-full  items-center">
            <p className="line-clamp-1 text-md leading-5" > {t(title)}</p>
            {isLoading ? (
                <CircleNotch className="h-4 w-4 animate-spin text-green-900" />
            ) : (
                <p className="font-bold"> {event}</p>
            )}
        </div>
    </div>

    )
}

export default OrderEvent
