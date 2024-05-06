import { optional, z } from 'zod';
import { optionalStringField, requiredStringField } from './reusableSchemes';

export const createMachineSchema = z.object({
    nome: requiredStringField(1, 30, "O nome da máquina não pode estar vazio"),
    fabricante: requiredStringField(1, 50, "O nome do fabricante não pode estar vazio"),
    modelo: requiredStringField(1, 20, "O nome do fabricante não pode estar vazio"),
    status: optionalStringField(255),
    capacidade_operacional: optionalStringField(255),
    empresa_id: optionalStringField(255),
    //data_aquisicao: z.date(),
    unidade_id: requiredStringField(1, 255, "Selecione a unidade"),

});




