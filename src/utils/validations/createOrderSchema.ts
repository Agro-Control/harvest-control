import { z } from "zod";
import { requiredStringField, optionalStringField } from "./reusableSchemes";

const isEndDateValid = (value: Date, context : any) => {
    const startDate = context?.parent?.data_inicio; // Obtém a data de início do contexto
    if (!startDate) return ; // Se a data de início não estiver definida, a validação passa
    const endDate = new Date(value);
    const nextDayStartDate = new Date(startDate);
    nextDayStartDate.setDate(nextDayStartDate.getDate() + 1); // Adiciona um dia à data de início
    return endDate > nextDayStartDate;
};

export const createOrderSchema = z.object({
    id_gestor: optionalStringField(255),
    id_talhao: requiredStringField(1, 255, "Selecione um Talhão").refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione um talhão",
    }),
    id_unidade: requiredStringField(1, 255, "Selecione uma Unidade").refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione uma unidade",
    }),
    id_empresa: requiredStringField(1, 255, "Selecione uma Empresa").refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione uma Empresa",
    }),
    id_maquina: requiredStringField(1, 255, "Selecione uma Máquina").refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione uma Máquina",
    }),
    data_inicio: z.coerce.date().refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione uma Data de Início",
    }),
    data_fim: z.coerce.date().refine((data) => {
        return data !== null && data !== undefined;
    }, {
        message: "A data de término deve ser maior em um dia do que a data de início",
    }),
    status: optionalStringField(255),
    operador_manha: requiredStringField(1, 255, "Selecione um Operador").refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione uma Operador do turno da manhã",
    }),
    operador_tarde: requiredStringField(1, 255, "Selecione um Operador").refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione uma Operador do turno da tarde",
    }),
    operador_noturno: requiredStringField(1, 255, "Selecione um Operador").refine((value) => {
        return value !== null && value !== undefined;
    }, {
        message: "Por favor, selecione uma Operador do turno da noite",
    }),
    velocidade_minima: requiredStringField(3, 3, "Velocidade Mínima Inválida, insira com pontuação").refine(
        (value) => {
            const convertedSpeed = parseFloat(value.replace(",", "."));
            return convertedSpeed !== null && convertedSpeed >= 1.0 && convertedSpeed <= 1.5;
        },
        {
            message: "A velocidade mínima deve estar entre 1.0 Km/h e 1.5 Km/h",
        },
    ),
    velocidade_maxima: requiredStringField(3, 3, "Velocidade Máxima Inválida, insira com pontuação").refine(
        (value) => {
            const convertedSpeed = parseFloat(value.replace(",", "."));
            return convertedSpeed !== null && convertedSpeed >= 3.5 && convertedSpeed <= 5.0;
        },
        {
            message: "A velocidade máxima deve estar entre 3.5 Km/h e 5.0 Km/h",
        },
    ),
    rpm: requiredStringField(4, 4, "Rpm Inválido").refine(
        (value) => {
            const convertedRPM = parseInt(value);
            return convertedRPM !== null && convertedRPM >= 1000 && convertedRPM <= 1500;
        },
        {
            message: "O RPM permitido é entre 1000 a 1500",
        },
    ),
}).refine((data) => data.data_fim > data.data_inicio, {
    message: "A data final não deve ser menor que a inicial.",
    path: ["endDate"],
  });
