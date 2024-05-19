import * as z from "zod";
import { optionalStringField, requiredStringField } from "./reusableSchemes";

export const editUnitSchema = z.object({
    id: z.number().optional(),
    nome: requiredStringField(1,255, "O nome da unidade não pode estar vazio"),
    cep: requiredStringField(8, 9, "O CEP não pode estar vazio"),
    estado: requiredStringField(2,20, "Estado não pode estar vazio"),
    cidade: requiredStringField(4,40, "Cidade não pode estar vazia"),
    bairro: requiredStringField(4,40, "Bairro não pode estar vazio"),
    logradouro: requiredStringField(4,60, "Logradouro não pode estar vazio"),
    numero: requiredStringField(1,20, "Número inválido"),
    complemento: optionalStringField(255),
    status: requiredStringField(1,1, "Selecione o status"),
    empresa_id: requiredStringField(1, 255, "A empresa não pode estar vazia"),
    gestor_id: requiredStringField(1, 255, "O gestor deve ser selecionado")
});