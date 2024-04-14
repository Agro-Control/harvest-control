import {z} from "zod";
import { requiredStringField, optionalStringField} from "./reusableSchemes";


const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;


export const createCompanySchema = z.object({
        nome: requiredStringField(1, 255, "O nome da empresa não pode estar vazio"),
        cnpj: requiredStringField(14,14, "Cnpj é necessário"),
        telefone: requiredStringField(1, 255, "O telefone não pode estar vazio"),
        CEP: requiredStringField(1, 255, "O CEP não pode estar vazio"),
        estado: optionalStringField(255),
        cidade: optionalStringField(255),
        bairro: optionalStringField(255),
        logradouro: optionalStringField(255),
        numero: optionalStringField(255),
        complemento: optionalStringField(255),
        telefoneResponsavel: requiredStringField(1, 12, "O telefone do responsável não pode estar vazio"),
        emailResponsavel: requiredStringField(1, 255, "O email não pode estar vazio").refine(
            (value) => value === null || emailRegex.test(value || "") || value === "",
            {
                message: "O email deve possuir este formato: exemplo@email.com",
            },
        ),
        nomeResponsavel: requiredStringField(1, 255, "O nome do responsável não pode estar vazio"),
});