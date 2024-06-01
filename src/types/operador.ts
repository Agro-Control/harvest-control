interface Operador {
    id: number;
    nome: string;
    email: string | null;
    cpf: string;
    telefone: string | null;
    status: string;
    data_contratacao: string;
    gestor_id: string | null;
    unidade_id: string | null;
    empresa_id: number | null;
    matricula: string | null;
    turno: string;
    tipo: string;
    grupo_id: number | null;
    empresa: string | null | undefined;
    unidade: string | null | undefined;
    

}

export default Operador; 