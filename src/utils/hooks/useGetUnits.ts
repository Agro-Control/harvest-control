import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getUnidade } from "@/app/control/business-management/units/page";

const getUnitsRequest = async (codigo? :string, status?: string) => {
  let url = "/unidades";

  const queryParams = [];

  if (codigo) queryParams.push(`codigo=${codigo}`);
  if (status) queryParams.push(`status=${status}`);

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const { data } = await api.get<getUnidade>(url);
  return data;
};

export const useGetUnits = (status? :string, codigo? : string) => {
  return useQuery({
    queryKey: ["units", codigo, status], 
    queryFn: () => getUnitsRequest(codigo, status), 
    retry: (failureCount, error) => {
    
      if (error instanceof Error && error.message.includes("404")) {
        
        return false;
      }
     
      return true;
    },
  });
};