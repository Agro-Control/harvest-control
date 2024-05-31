export interface Gestor {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    status: string;
    data_contratacao: string;
    gestor_id: string | null;
    unidade_id: string | null;
    empresa_id: number | null;
    matricula: string | null;
    turno: string;
    tipo: string;
    grupo_id: number;
}