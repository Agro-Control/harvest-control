import {z} from "zod";
import {requiredStringField} from "./reusableSchemes";

const emailRegex = /^(?![-.])[\w.-]+@(?![-.])[\w.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,30}$/;

export const createUserSchema = z.object({
    nome: requiredStringField(1, 255, "O nome não pode estar vazio"),

    tipo: requiredStringField(1, 255, "O cargo não pode estar vazio"),

    email: requiredStringField(1, 255, "O email não pode estar vazio").refine(
        (value) => value === null || emailRegex.test(value || "") || value === "",
        {
            message: "O email deve possuir este formato: exemplo@email.com",
        },
    ),

    cpf: requiredStringField(1, 255, "O CPF não pode estar vazio"),

    telefone: requiredStringField(1, 255, "O telefone não pode estar vazio"),

    place_id:  requiredStringField(1, 255, "Selecione o local"),
    

    turno: requiredStringField(1, 255, "Selecione um turno"),
});
