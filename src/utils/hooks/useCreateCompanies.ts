import {api} from "@/lib/api";
import Empresa from "@/types/empresa";



  const createCompanyRequest = async (createCompany: Empresa): Promise<Empresa> => {
    const { ...rest } = createCompany;
    const response = await api.post(`/empresas`, rest);
    return response.data as Empresa; // Certifique-se de ajustar conforme necessário para o formato dos dados retornados pela sua API
  };
  
  
  export const useCreateCompany = () => {
    return createCompanyRequest;
};