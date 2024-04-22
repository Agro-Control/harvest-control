import {api} from "@/lib/api";
import Talhao from "@/types/talhao";



  const updateTalhaoRequest = async (updatedTalhao: Talhao) => {
    const { ...rest } = updatedTalhao;
    const response = await api.put(`/talhoes`, rest);
    return response; 
  };
  
  
  export const useUpdateField = () => {
    return updateTalhaoRequest;
};