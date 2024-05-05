interface Empresa {
  id?: number;
  nome?: string;
  cnpj: string;
  telefone?: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  status: string;
  data_criacao?: string; 
  gestor_id: number | null;
}

export default Empresa;