import {z} from "zod";
import {requiredStringField, optionalStringField} from "./reusableSchemes";

const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;

export const editUserSchema = z.object({
    nome: requiredStringField(1, 255, "O nome não pode estar vazio"),
    email: requiredStringField(1, 255, "O email não pode estar vazio").refine(
        (value) => value === null || emailRegex.test(value || "") || value === "",
        {
            message: "O email deve possuir este formato: exemplo@email.com",
        },
    ),
    cpf: requiredStringField(1, 255, "O CPF não pode estar vazio"),
    telefone: requiredStringField(1, 255, "O telefone não pode estar vazio"),
    turno: optionalStringField(1),
    status: requiredStringField(1,1, "Selecione o status"),
});
