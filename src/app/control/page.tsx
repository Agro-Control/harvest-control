"use client";

import CompanyInformationCard from "@/components/control/company-information-card";
import UserInformationCard from "@/components/control/user-information-card";
import FastAccessCard from "@/components/control/fast-access-card";
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/utils/hooks/useAuth";

export interface mockcompany {
    nome: string;
    email: string;
    cnpj: string;
    cep: string;
    estado: string;
    responsavel: string;
    unidades: Array<{nome: string}>;
    maquinas: Array<{nome: string}>;

}

const company:mockcompany = {
    nome: "Agricultura familia",
    email: "contato@agrofamilia.com",
    cnpj: "47.777.132/0001-01",
    cep: "80010-000",
    estado: "PR",
    responsavel: "Alessandro",
    unidades: [
        {
            nome: "1"
        },
        {
            nome: "2"
        }
    ],
    maquinas: [
        {
            nome: "1"
        },
        {
            nome: "2"
        }
    ],


}



export default function Home() {

    const {user} = useAuth();
    const userName = user &&  user.usuario.nome;
    
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10  px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row items-center gap-2">
                <p className="font-poppins text-4xl font-medium">Olá! Bem vindo,</p>
                 {user ? <p className="font-poppins text-4xl font-medium">{userName}👋</p> : <Skeleton className="h-10 w-[148px]" /> } 
            </div>

            <div className="flex w-full flex-col items-start justify-start gap-1 ">
                <p className=" font-poppins text-sm">Acesso Rápido:</p>

                <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FastAccessCard title="Máquinas" image="machines" />
                    <FastAccessCard title="Operadores" image="users" />
                    <FastAccessCard isLast title="Dashboards" image="dashboard" />
                </div>
            </div>
            <UserInformationCard user={user} /> 
            <CompanyInformationCard company={company} />
            <div> 
            </div>
        </div>
    );
}
