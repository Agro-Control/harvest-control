import {z} from "zod";
import { requiredStringField, optionalStringField} from "./reusableSchemes";


const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;


export const createCompanySchema = z.object({
        nome: requiredStringField(1, 255, "O nome da empresa não pode estar vazio"),
        cnpj: requiredStringField(18,18, "CNPJ inválido"),
        telefone: requiredStringField(14, 255, "Telefone inválido"),
        cep: requiredStringField(8, 255, "CEP incompleto"),
        estado: optionalStringField(255),
        cidade: optionalStringField(255),
        bairro: optionalStringField(255),
        logradouro: optionalStringField(255),
        numero: optionalStringField(255),
        complemento: optionalStringField(255),
        gestor_id: optionalStringField(255),

});