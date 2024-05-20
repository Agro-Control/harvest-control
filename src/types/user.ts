export interface UserData {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    status: string;
    data_contratacao: string;
    gestor_id: string;
    unidade_id: string;
    empresa_id: number;
    matricula: string | null;
    turno: string | null;
    tipo: string;
    grupo_id: number;
}

interface User {
    usuario: UserData;
    token: string;
}

export default User;