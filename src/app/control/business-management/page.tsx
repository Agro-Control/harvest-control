'use client';
import FastAccessCard from '@/components/control/fast-access-card';

export default function BusinessManagementHome() {

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10  px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Gerenciamento de Empresas</p>
            </div>

            <div className="flex w-full flex-col items-start justify-center gap-1 ">
            <p className=" font-poppins text-sm">Acesso Rápido:</p>
                <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FastAccessCard title="Empresas" image="companies" />
                    <FastAccessCard title="Unidades" image="units" />
                </div>
            </div>
        </div>
    );
}