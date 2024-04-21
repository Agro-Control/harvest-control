interface Talhao {
    id: number | null;
    codigo: string;
    tamanho: string;
    status: string;
    gestor_id?: number; 
    empresa_id: number;
}


export default Talhao;