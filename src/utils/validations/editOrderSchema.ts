import { z } from "zod";
import { requiredStringField, optionalStringField } from "./reusableSchemes";

export const editOrderSchema = z.object({
    status: optionalStringField(255),
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
});