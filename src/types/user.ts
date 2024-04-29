interface User {
    usuario: {
        id: number;
        nome: string;
        email: string;
        cpf: string;
        telefone: string;
        status: string;
        data_contratação: string;
        gestor_id: string;
        empresa_id: string;
        matricula: string | null;
        turno: string | null;
        tipo: string;
        senha: string;
    },
    token: string
}

export default User;