interface Operador {
    id: number;
    nome: string;
    email: string | null;
    cpf: string;
    telefone: string | null;
    status: string;
    data_contratacao: string;
    gestor_id: string;
    unidade_id: string;
    empresa_id: number | null;
    matricula: string | null;
    turno: string;
    tipo: string;
    grupo_id: number | null;
}

export default Operador; 