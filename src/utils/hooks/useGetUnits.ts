import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getUnidade } from "@/app/control/business-management/units/page";
import GetUnidade from "@/types/get-unidade";

const getUnitsRequest = async (codigo : string | null, status: string | null) => {
    const {data} = await api.get<GetUnidade>("/unidades", {
        params: {
            codigo: codigo,
            status: status,
        },
    });
    return data;
};

export const useGetUnits = (status : string | null, codigo : string | null) => {
  return useQuery({
    queryKey: ["units", codigo, status], 
    queryFn: () => getUnitsRequest(codigo, status), 
    retry: (failureCount, error) => {
    
      if (error instanceof Error && error.message.includes("404")) {
        if(failureCount == 3)
        return false;
      }
     
      return true;
    },
  });
};


