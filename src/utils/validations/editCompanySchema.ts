import {z} from "zod";
import { requiredStringField, optionalStringField} from "./reusableSchemes";


const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;


export const editCompanySchema = z.object({
        id: z.number(),
        nome: requiredStringField(1, 255, "O nome da empresa não pode estar vazio"),
        cnpj: requiredStringField(14,14, "Cnpj é necessário"),
        telefone: requiredStringField(1, 11, "O telefone não pode estar vazio"),
        CEP: requiredStringField(8, 8, "O CEP não pode estar vazio"),
        estado: optionalStringField(255),
        cidade: optionalStringField(255),
        bairro: optionalStringField(255),
        logradouro: optionalStringField(255),
        numero: optionalStringField(255),
        complemento: optionalStringField(255),
        status: requiredStringField(1,1, "Selecione o status"),
        telefone_responsavel: requiredStringField(1, 255, "O telefone do responsável não pode estar vazio"),
        email_responsavel: requiredStringField(1, 255, "O email não pode estar vazio").refine(
            (value) => value === null || emailRegex.test(value || "") || value === "",
            {
                message: "O email deve possuir este formato: exemplo@email.com",
            },
        ),
        nome_responsavel: requiredStringField(1, 255, "O nome do responsável não pode estar vazio"),
});

