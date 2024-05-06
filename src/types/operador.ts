interface Operador {
    id?: number | null;
    nome?: string | null;
    email?: string | null;
    cpf?: string | null;
    telefone?: string | null;
    status?: string | null;
    data_contratacao?: string | null;
    gestor_id?: number | null;
    empresa_id?: number | null;
    matricula?: string | null;
    turno?: string | null;
    tipo?: string | null;
}

export default Operador;