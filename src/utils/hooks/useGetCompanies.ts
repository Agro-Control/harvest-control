import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";


const getCompaniesRequest = async () => {
  const { data } = await api.get<Empresa>("/empresas/");
  return data;
};

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompaniesRequest,
  });
};