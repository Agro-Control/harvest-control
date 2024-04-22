
import { api } from "@/lib/api";
import Unidade from "@/types/unidade";


const updateUnidadeRequest = async (updatedUnidade: Unidade) => {
  const { ...rest } = updatedUnidade;
  const response = await api.put(`/unidades`, rest);
  return response;
};


export const useUpdateUnit = () => {
  return updateUnidadeRequest;
};