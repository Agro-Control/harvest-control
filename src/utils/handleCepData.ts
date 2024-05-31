import axios from 'axios';
import { UseFormSetValue } from 'react-hook-form';
import { editUnitSchema } from './validations/editUnitSchema';
import {z} from "zod";

interface CepData {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;
}
// Interface para os campos do formulário


type Form = z.infer<typeof editUnitSchema>;
type FormFields = keyof Omit<Form, "cnpj" | "id" | "nome" | "empresa_id" | "status" | "numero">;
type HandledFormFields = {
    [key in FormFields]: string;
};

const mapCepDataToFormFields = (data: CepData): HandledFormFields => {
    return {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
    };
};

// Função para buscar os dados do CEP e definir os valores no formulário
export const handleCepData = async (cep: string, setValue: UseFormSetValue<Form>) => {
    try {
        const response = await axios.get<CepData>(`https://viacep.com.br/ws/${cep}/json/`, {
            timeout: 5000 // 5s
        });
        if (response.data.erro) {
            return { error: true };
        }
        const formFields = mapCepDataToFormFields(response.data);

        Object.keys(formFields).forEach((key) => {
            setValue(key as FormFields, formFields[key as FormFields]);
        });

        return { error: false };
    } catch (error) {
        return { error: true };
    }
};