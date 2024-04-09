interface OrdemServico {
    id?: number;
    data_inicio?: string;
    status?: string;
    data_fim?: string;
    velocidade_minima?: number;
    velocidade_maxima?: number;
    rpm?: number;
    id_gestor?: number;
    id_talhao?: number;
    id_unidade?: number;
    id_empresa?: number;
    id_maquina?: number;
    operadores_ids?: number[];
  }
  
  export default OrdemServico;