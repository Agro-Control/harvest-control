import Operador from "./operador";

interface OrdemServicoPost {
    id?: number;
    data_inicio?: string;
    status?: string;
    data_previsao_fim?: string;
    velocidade_minima?: number;
    velocidade_maxima?: number;
    rpm?: number;
    gestor_id?: number;
    talhao_id?: number;
    unidade_id?: number;
    empresa_id?: number;
    maquina_id?: number;
    operadores?: number[];
  }
  
  export default OrdemServicoPost;