interface Evento {
    id: string | null;
    nome: string | null;
    data_inicio: Date | null;
    data_fim: Date | null;
    duracao: number | null;
    ordem_servico_id: number | null;
    maquina_id: number | null;
    operador_id: number | null;
}

export default Evento;