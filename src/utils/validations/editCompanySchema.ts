import {z} from "zod";
import { requiredStringField, optionalStringField } from "./reusableSchemes";


const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;


export const editCompanySchema = z.object({
        id: z.number(),
        name: requiredStringField(1, 255, "O nome da empresa não pode estar vazio"),
        cnpj: requiredStringField(14,14, "Cnpj é necessário"),
        phone: requiredStringField(1, 255, "O telefone não pode estar vazio"),
        zipCode: requiredStringField(1, 255, "O CEP não pode estar vazio"),
        state: optionalStringField(255),
        city: optionalStringField(255),
        neighborhood: optionalStringField(255),
        adress: optionalStringField(255),
        number: optionalStringField(255),
        complement: optionalStringField(255),
        responsiblePhone: requiredStringField(1, 255, "O telefone do responsável não pode estar vazio"),
        responsibleEmail: requiredStringField(1, 255, "O email não pode estar vazio").refine(
            (value) => value === null || emailRegex.test(value || "") || value === "",
            {
                message: "O email deve possuir este formato: exemplo@email.com",
            },
        ),
        responsibleName: requiredStringField(1, 255, "O nome do responsável não pode estar vazio"),
});

