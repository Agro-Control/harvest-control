import { api } from "@/lib/api";
import Unidade from "@/types/unidade";



const createUnidadeRequest = async (createUnit: Unidade): Promise<Unidade> => {
  const { ...rest } = createUnit;
  const response = await api.post(`/unidades`, rest);
  return response.data as Unidade; // Certifique-se de ajustar conforme necessário para o formato dos dados retornados pela sua API
};


export const useCreateUnit = () => {
  return createUnidadeRequest;
};