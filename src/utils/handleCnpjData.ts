import {createCompanySchema} from "@/utils/validations/createCompanySchema";
import {UseFormSetValue} from "react-hook-form";
import axios from "axios";
import {z} from "zod";
import { editUnitSchema } from "./validations/editUnitSchema";


interface Data {
    nome_fantasia: string | null;
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cep: string;
    ddd1: string;
    telefone1: string;
    estado: {
        sigla: string;
    };
    cidade: {
        nome: string;
    };
}

interface Response {
    data: {
        estabelecimento: Data;
    };
}

type Form = z.infer<typeof createCompanySchema>;

type UnitForm = z.infer<typeof editUnitSchema>;

type UnitFormFields = keyof Omit<UnitForm, "cnpj" | "id" | "empresa_id">;

type FormFields = keyof Omit<Form, "cnpj" | "telefone_responsavel" | "email_responsavel" | "nome_responsavel">;

type HandledFormFields = {
    [key in FormFields]: string;
};

const mapDataToFormFields = (data: Data): HandledFormFields => ({
    nome: data.nome_fantasia || "",
    telefone: `(${data.ddd1}) ${data.telefone1.substring(0, 5)}-${data.telefone1.substring(5)}`,
    cep: data.cep.substring(0, 5) + "-" + data.cep.substring(5),
    estado: data.estado.sigla,
    cidade: data.cidade.nome,
    bairro: data.bairro,
    logradouro: `${data.tipo_logradouro} ${data.logradouro}`,
    numero: data.numero,
    complemento: data.complemento || "",
});

export const handleCnpjData = async (cnpj: string, setValue: UseFormSetValue<Form>) => {

    try {
        const response: Response = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`, {
            timeout: 5000, // 5s
        });

        const formFields = mapDataToFormFields(response.data.estabelecimento);

        Object.keys(formFields).forEach((key) => {
            setValue(key as FormFields, formFields[key as FormFields]);
        });

        return {error: false};
    } catch (error) {

        return {error: true};
    }
};

export const handleUnitCnpjData = async (cnpj: string, setValue: UseFormSetValue<UnitForm>) => {

    try {
        const response: Response = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`, {
            timeout: 5000, // 5s
        });

        const formFields = mapDataToFormFields(response.data.estabelecimento);

        Object.keys(formFields).forEach((key) => {
            setValue(key as UnitFormFields, formFields[key as FormFields]);
        });

        return {error: false};
    } catch (error) {

        return {error: true};
    }
};