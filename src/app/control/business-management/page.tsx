'use client';
import { useRouter } from 'next/navigation';
import FastAccessCard from '@/components/control/fast-access-card';

export default function BusinessManagementHome() {
    const router = useRouter();

    const handleCardClick = (route: string) => {
        router.push(route);
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10  px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Gerenciamento de Empresas</p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-1 ">
                <div className="grid size-3/5 gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <div onClick={() => handleCardClick('/control/business-management/companies')}>
                        <FastAccessCard title="Empresas" image="company" />
                    </div>
                    <div onClick={() => handleCardClick('/control/business-management/units')}>
                        <FastAccessCard title="Unidades" image="unity" />
                    </div>
                </div>
            </div>
        </div>
    );
}