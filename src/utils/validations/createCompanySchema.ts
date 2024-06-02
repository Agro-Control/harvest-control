import {z} from "zod";
import { requiredStringField, optionalStringField} from "./reusableSchemes";


const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;


export const createCompanySchema = z.object({
        nome: requiredStringField(1, 59, "O nome da empresa não pode estar vazio"),
        cnpj: requiredStringField(18,18, "CNPJ inválido"),
        telefone: requiredStringField(14, 16, "Telefone inválido"),
        cep: requiredStringField(8, 9, "CEP incompleto"),
        estado: requiredStringField(2,20, "Estado inválido"),
        cidade: requiredStringField(4,40, "Cidade inválida"),
        bairro: requiredStringField(4,40, "Bairro inválido"),
        logradouro: requiredStringField(4,60, "CNPJ inválido"),
        numero: requiredStringField(1,20, "Número inválido"),
        complemento: optionalStringField(255),

});