import {Progress} from "@/components/ui/progress";


interface MaintenanceProgressProps {
    tempo_total_manutencao_dia: number;
    tempo_total_todos_eventos: number;
}

const MaintenanceProgress = ({tempo_total_todos_eventos, tempo_total_manutencao_dia}: MaintenanceProgressProps) => {
    
    const porcentagemManutencao = tempo_total_todos_eventos > 0 ? (tempo_total_manutencao_dia / tempo_total_todos_eventos) * 100 : 0;
    return (
        <div className="col-span-2 flex flex-row w-full gap-4 justify-center items-center">
            <div className="flex flex-col w-full gap-3">
            <p className="text-sm font-semibold">Manutenção no dia em relação à operação</p>
            <div className="flex flex-row w-full gap-2 items-center justify-center">
                <Progress value={porcentagemManutencao}/>
            </div>
            </div>
                <p className="text-sm font-semibold text-red-800">{porcentagemManutencao.toFixed(2)}%</p>
        </div>
    )
}
export default MaintenanceProgress;
