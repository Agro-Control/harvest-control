import * as z from "zod";
import { optionalStringField, requiredStringField } from "./reusableSchemes";

export const editFieldSchema = z.object({
    id: z.number().optional(),
    codigo: requiredStringField(1, 10, "O codigo do talhão não pode estar vazio")
    .refine(value => /^[a-zA-Z0-9]+$/.test(value), {
      message: "O codigo do talhão não pode conter caracteres especiais"
    }),
  tamanho: requiredStringField(1, 5, "Insira o tamanho do Talhão")
    .refine(value => /^[0-9]+$/.test(value), {
      message: "O tamanho do talhão deve conter apenas números"
    }),
    status: optionalStringField(255),
    unidade_id: requiredStringField(1, 255, "A unidade não pode estar vazia"),
    empresa_id: optionalStringField(255),
});