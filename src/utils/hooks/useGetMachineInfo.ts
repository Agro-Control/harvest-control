import {useQuery} from "@tanstack/react-query";
import {api} from "@/lib/api";

export interface LoggedUser {
    id: number;
    nome: string;
    email:string;
    matricula: string;
    cpf: string;
    status: string;
    turno: string;
    tipo: string;
    telefone: string | null;
    data_contratacao: string;
    gestor_id: number;
    empresa_id: number;
    unidade_id: number;
}

export interface EventInfo {
    id: string;
    nome: string;
    duracao: number | null;
    operador_id: number;
    data_inicio: string | null;
    data_fim: string | null;
    ordem_servico_id: number;
    maquina_id: number;
    operador_nome: string | null;
}

export interface MachineInfoUser {
    id: number;
    nome: string | null;
    email: string | null;
    matricula: number;
    cpf: string | null;
    status: string | null;
    turno: string | null;
    tipo: string | null;
    telefone: string | null;
    data_contratacao: string | null;
    gestor_id: number;
    empresa_id: number;
    unidade_id: number;
}

export interface MachineInfo {
    ultimos_eventos: EventInfo[];
    qtd_manutencao_mes: number;
    tempo_total_manutencao_mes: number;
    qtd_manutencao_dia: number;
    tempo_total_manutencao_dia: number;
    tempo_total_todos_eventos: number;
    operador_conectado: LoggedUser | null;
    manutencao_eventos: EventInfo[];
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

