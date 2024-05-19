import {z} from "zod";
import { requiredStringField, optionalStringField} from "./reusableSchemes";


const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;


export const editCompanySchema = z.object({
        id: z.number(),
        nome: requiredStringField(1, 59, "O nome da empresa não pode estar vazio"),
        cnpj: requiredStringField(14,18, "CNPJ inválido"),
        telefone: requiredStringField(9, 16, "Telefone inválido"),
        cep: requiredStringField(8, 9, "CEP incompleto"),
        estado: requiredStringField(2,20, "Estado não pode estar vazio"),
        cidade: requiredStringField(4,40, "Cidade não pode estar vazia"),
        bairro: requiredStringField(4,40, "Bairro não pode estar vazio"),
        logradouro: requiredStringField(4,60, "Logradouro não pode estar vazio"),
        numero: requiredStringField(1,20, "Número não pode estar vazio"),
        complemento: optionalStringField(255),
        status: requiredStringField(1,1, "Selecione o status"),
        gestor_id: optionalStringField(255)
});

