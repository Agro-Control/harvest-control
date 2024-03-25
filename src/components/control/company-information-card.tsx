"use client";
import {mockcompany} from "@/app/control/page";
import logoRounded from "@/assets/logo-rounded.svg";

import {Buildings, EnvelopeSimple, House, GlobeHemisphereEast} from "@phosphor-icons/react";

interface CompanyInformationCardProps {
    company: mockcompany;
}

const CompanyInformationCard = ({company}: CompanyInformationCardProps) => {
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
                    <p>{company.nome}</p>
                </div>
                <div className="flex w-full flex-row gap-2">
                    <GlobeHemisphereEast className="h-6 w-6" weight="fill" color="#052e14" />
                    <p>{company.cep}</p>
                </div>

                <div className="flex w-full flex-row gap-2">
                    <House className="h-6 w-6" weight="fill" color="#052e14" />
                    <p>
                        {company.estado}
                    </p>
                </div>
                <div className="col-span-2 flex w-full flex-row gap-2">
                    <EnvelopeSimple className="h-6 w-6" weight="fill" color="#052e14" />
                    <p>{company.email}</p>
                </div>
                <div className="flex w-full flex-row gap-2">
                    <p><span className="font-semibold"> Unidades: </span> {company.unidades.length}</p>
                </div>
                <div className="flex w-full flex-row gap-2">
                    <p><span className="font-semibold"> Máquinas: </span>   {company.maquinas.length}</p>
                </div>
            </div>
            <div className="flex h-full w-full flex-row"></div>
        </div>
    );
};
export default CompanyInformationCard;
