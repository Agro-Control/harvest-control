import {api} from "@/lib/api";
import Talhao from "@/types/talhao";



  const updateTalhaoRequest = async (updatedTalhao: Talhao): Promise<Talhao> => {
    const { ...rest } = updatedTalhao;
    const response = await api.put(`/talhoes`, rest);
    return response.data as Talhao; // Certifique-se de ajustar conforme necessário para o formato dos dados retornados pela sua API
  };
  
  
  export const useUpdateField = () => {
    return updateTalhaoRequest;
};