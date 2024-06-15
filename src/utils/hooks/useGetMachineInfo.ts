import {useQuery} from "@tanstack/react-query";
import {api} from "@/lib/api";

export interface EventInfo {
    id: string;
    nome: string;
    duracao: number | null;
    operador_id: number;
}

export interface MachineInfo {
    ultimos_eventos: EventInfo[];
    qtd_manutencao_mes: number;
    tempo_total_manutencao_mes: number;
    qtd_manutencao_dia: number;
    tempo_total_manutencao_dia: number;
}

const getMachineInfo = async (maquina_id: number | null) => {
    const {data} = await api.get<MachineInfo>(`maquinas/info/${maquina_id}`);
    return data;
};

export const useGetMachineInfo = (maquina_id: number | null) => {
    return useQuery({
        queryKey: ["machines_info", maquina_id],
        enabled: true,
        queryFn: () => getMachineInfo(maquina_id),
    });
};
