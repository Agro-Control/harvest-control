import {api} from "@/lib/api";
import Empresa from "@/types/empresa";



  const createCompanyRequest = async (createCompany: Empresa) => {
    const { ...rest } = createCompany;
    const response = await api.post(`/empresas`, rest);
    return response;
  };
  
  
  export const useCreateCompany = () => {
    return createCompanyRequest;
};