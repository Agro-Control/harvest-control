import FastAccessCard from "@/components/control/fast-access-card";

export default function Home() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start overflow-hidden px-6 pt-10 text-green-950 gap-10 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins font-medium text-4xl">Olá! Bem vindo, Gerente 👋</p>
            </div>

            <div className="flex w-full flex-col items-start justify-start gap-1 ">
                <p className="ml-1 font-poppins text-sm">Acesso Rápido:</p>

                <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FastAccessCard title="Máquinas" image="machine" />
                    <FastAccessCard title="Operadores" image="operator" />
                    <FastAccessCard title="Dashboards" image="dashboard" />
                </div>
            </div>
        </div>
    );
}
