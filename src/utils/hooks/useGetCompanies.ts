import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getEmpresa } from "@/app/control/business-management/companies/page";

const getCompaniesRequest = async (cidade?: string, estado?: string, codigo?: string) => {
  let url = "/empresas";

  const queryParams = [];

  if (codigo) queryParams.push(`codigo=${codigo}`);
  if (cidade) queryParams.push(`cidade=${cidade}`);
  if (estado) queryParams.push(`estado=${estado}`);

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const { data } = await api.get<getEmpresa>(url);
  return data;
};

export const useGetCompanies = (cidade?: string, estado?: string, codigo? : string) => {
  return useQuery({
    queryKey: ["companies", cidade, estado, codigo], 
    queryFn: () => getCompaniesRequest(cidade, estado, codigo), 
    retry: (failureCount, error) => {
    
      if (error instanceof Error && error.message.includes("404")) {
        
        return false;
      }
     
      return true;
    },
  });
};