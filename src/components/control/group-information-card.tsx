"use client";
import {Buildings, Calendar } from "@phosphor-icons/react";
import logoRounded from "@/assets/logo-rounded.svg";
import {Skeleton} from "@/components/ui/skeleton";
import {useTranslation} from "react-i18next";
import Grupo from "@/types/grupo";
import {format} from "date-fns";


interface GroupInformationCardProps {
    group: Grupo;
}

const GroupInformationCard = ({group}: GroupInformationCardProps) => {
    const formattedDate = group && format(group.data_criacao, "dd/MM/yyyy");

    return (
        <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="flex w-full flex-row items-center justify-start gap-2">
                <img src={logoRounded.src} className="h-[24px] w-[24px]" />
                <p className="font-medium">Informações do Grupo Empresarial</p>
            </div>
            <div className="flex h-[2px]  w-full flex-none bg-divider" />

            <div className="mt-4 grid w-full grid-cols-5 gap-12 font-medium">
                <div className="flex w-full flex-row gap-2">
                    <Buildings className="h-6 w-6" weight="fill" color="#052e14" />
                    {group ? <p> {group.nome} </p> : <Skeleton className="h-6 w-full" />}
                </div>
                <div className="flex w-full flex-row gap-2">
                    <Calendar className="h-6 w-6" weight="fill" color="#052e14" />
                    {group ? <p> Data de criação: {formattedDate} </p> : <Skeleton className="h-6 w-full" />}
                    
                </div>
                
            </div>
            <div className="flex h-full w-full flex-row"></div>
        </div>
    );
};
export default GroupInformationCard;
