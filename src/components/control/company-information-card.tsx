"use client";
import {Buildings, IdentificationCard, House, GlobeHemisphereEast} from "@phosphor-icons/react";
import logoRounded from "@/assets/logo-rounded.svg";
import {Skeleton} from "@/components/ui/skeleton";
import {useTranslation} from "react-i18next";
import Empresa from "@/types/empresa";


interface CompanyInformationCardProps {
    company: Empresa;
}

const CompanyInformationCard = ({company}: CompanyInformationCardProps) => {

    const {t} = useTranslation();
    const formattedCnpj = company ? company.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : "Não informado";

    return (
        <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="flex w-full flex-row items-center justify-start gap-2">
                <img src={logoRounded.src} className="h-[24px] w-[24px]" />
                <p className="font-medium">Informações da empresa</p>
            </div>
            <div className="flex h-[2px]  w-full flex-none bg-divider" />

            <div className="mt-4 grid w-full grid-cols-5 gap-12 font-medium">
                <div className="flex w-full flex-row gap-2">
                    <Buildings className="h-6 w-6" weight="fill" color="#052e14" />
                    {company ? <p> {company.nome} </p> : <Skeleton className="h-6 w-full" />}
                </div>
                <div className="col-span-1 flex w-full flex-row gap-2">
                    <IdentificationCard className="h-6 w-6" weight="fill" color="#052e14" />
                    {company ? <p> {formattedCnpj} </p> : <Skeleton className="h-6 w-full" />}
                </div>
                <div className="flex w-full flex-row gap-2">
                    <GlobeHemisphereEast className="h-6 w-6" weight="fill" color="#052e14" />
                    {company ? <p> {company.cep} </p> : <Skeleton className="h-6 w-full" />}
                    
                </div>
            
                <div className="flex w-full flex-row gap-2">
                    <House className="h-6 w-6" weight="fill" color="#052e14" />
                    {company ? <p> {t(company.estado!)}</p> : <Skeleton className="h-6 w-full" />}
                </div>
                
                
            </div>
            <div className="flex h-full w-full flex-row"></div>
        </div>
    );
};
export default CompanyInformationCard;
