import {z} from "zod";

export const requiredStringField = (minLength: number, maxLength: number, message: string) =>
    z.string().min(minLength, message).max(maxLength, "Máximo de caracteres alcançado");


export const optionalStringField = (maxLength: number) =>
    z.string().max(maxLength, "Máximo de caracteres alcançado").optional();

