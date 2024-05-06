export interface UserData {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    status: string;
    data_contratação: string;
    gestor_id: string;
    unidade_id: string;
    empresa_id: string;
    matricula: string | null;
    turno: string | null;
    tipo: string;
    grupo_id: string;
}

interface User {
    usuario: UserData;
    token: string;
}

export default User;
