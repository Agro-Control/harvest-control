interface Maquina {
    id: number | null;
    nome: string | null;
    fabricante: string | null;
    modelo: string | null;
    status: string | null;
    capacidade_operacional: number | null;
    data_aquisicao: Date | null;
    unidade_id: number | null;
}

export default Maquina;