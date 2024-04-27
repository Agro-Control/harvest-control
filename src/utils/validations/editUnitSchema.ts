import * as z from "zod";
import { optionalStringField, requiredStringField } from "./reusableSchemes";

export const editUnitSchema = z.object({
    id: z.number().optional(),
    nome: requiredStringField(1,255, "O nome da unidade não pode estar vazio"),
    cnpj: requiredStringField(18,18, "Cnpj é necessário"),
    cep: requiredStringField(9, 9, "O CEP não pode estar vazio"),
    estado: optionalStringField(255),
    cidade: optionalStringField(255),
    bairro: optionalStringField(255),
    logradouro: optionalStringField(255),
    numero: optionalStringField(255),
    complemento: optionalStringField(255),
    status: optionalStringField(255),
    empresa_id: requiredStringField(1, 255, "A empresa não pode estar vazia")
});