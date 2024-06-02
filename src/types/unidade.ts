import Empresa from "./empresa";

interface Unidade {
    id?: number;
    nome?: string;
    cnpj?: string;
    cep?: string;
    estado?: string;
    cidade?: string;
    bairro?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    status?: string;
    data_criacao?: string;
    empresa_id?: number;
    empresa_nome?: string;
    gestor_id: number | null;
}

export default Unidade;