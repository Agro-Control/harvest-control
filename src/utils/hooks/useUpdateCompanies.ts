import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Empresa from "@/types/empresa";

const updateCompanyRequest = async (updatedCompany: Empresa) => {
  const { ...rest } = updatedCompany;
  const response = await api.put(`/empresas`, rest);
  return response;
};


export const useUpdateCompany = () => {
  return updateCompanyRequest;
};
