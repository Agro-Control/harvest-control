import { api } from "@/lib/api";
import Unidade from "@/types/unidade";



const createUnidadeRequest = async (createUnit: Unidade) => {
  const { ...rest } = createUnit;
  const response = await api.post(`/unidades`, rest);
  return response;
};


export const useCreateUnit = () => {
  return createUnidadeRequest;
};