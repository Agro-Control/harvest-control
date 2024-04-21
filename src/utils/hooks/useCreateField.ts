import { api } from "@/lib/api";
import Talhao from "@/types/talhao";

const createTalhaoRequest = async (createField: Talhao): Promise<Talhao> => {
    const { ...rest } = createField;
    const response = await api.post(`/talhoes`, rest);
    return response.data;
};


export const useCreateField = () => {
    return createTalhaoRequest;
};