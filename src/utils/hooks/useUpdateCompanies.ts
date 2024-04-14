import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {api} from "@/lib/api";
import Empresa from "@/types/empresa";



  const updateCompanyRequest = async (updatedCompany: Empresa): Promise<Empresa> => {
    const { ...rest } = updatedCompany;
    const response = await api.put(`/empresas`, rest);
    return response.data as Empresa; // Certifique-se de ajustar conforme necessário para o formato dos dados retornados pela sua API
  };
  
  
  export const useUpdateCompany = () => {
    return updateCompanyRequest;
};
