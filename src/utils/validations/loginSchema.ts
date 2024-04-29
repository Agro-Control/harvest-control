import { requiredStringField } from "./reusableSchemes";
import {z} from "zod";



const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;
export const loginSchema = z.object({
    email: requiredStringField(1, 255, "O email não pode estar vazio").refine(
        (value) => value === null || emailRegex.test(value || "") || value === "",
        {
            message: "O email deve possuir este formato: exemplo@email.com",
        },
    ),

    senha: requiredStringField(1, 255, "A senha não pode estar vazia"),
});
