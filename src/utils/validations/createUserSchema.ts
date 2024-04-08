import {z} from "zod";
import { requiredStringField, optionalStringField } from "./reusableSchemes";


const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,30}$/;

export const createUserSchema = z.object({
    name: requiredStringField(1, 255, "O nome não pode estar vazio"),

    role: requiredStringField(1, 255, "O cargo não pode estar vazio"),

    email: requiredStringField(1, 255, "O email não pode estar vazio").refine(
        (value) => value === null || emailRegex.test(value || "") || value === "",
        {
            message: "O email deve possuir este formato: exemplo@email.com",
        },
    ),

    password: requiredStringField(1, 255, "A senha não pode estar vazia").refine(
        (value) => value === null || passwordRegex.test(value || "") || value === "",
        {
            message: "Sua senha é fraca!",
        },
    ),

    identifier: requiredStringField(1, 255, "O CPF não pode estar vazio"),

    phone: requiredStringField(1, 255, "O telefone não pode estar vazio"),

    address: optionalStringField(255),

    state: optionalStringField(255),
    city: optionalStringField(255),
    neighborhood:optionalStringField(255),
    street: optionalStringField(255),
    number: optionalStringField(10),
    company: requiredStringField(1, 255, "A empresa não pode estar vazia"),
});
