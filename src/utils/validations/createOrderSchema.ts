import { z } from "zod";
import { requiredStringField, optionalStringField } from "./reusableSchemes";
;
export const createOrderSchema = z.object({
    id_gestor: optionalStringField(1),
    id_talhao: optionalStringField(1),
    id_unidade: optionalStringField(1),
    id_empresa: optionalStringField(1),
    id_maquina: optionalStringField(1),
    status: optionalStringField(255),
    operador_manha: optionalStringField(1),
    operador_tarde: optionalStringField(1),
    operador_noturno: optionalStringField(1),
    velocidade_minima: requiredStringField(3, 3, "Velocidade Mínima Inválida, insira com pontuação").refine(
        (value) => {
            const convertedSpeed = parseFloat(value.replace(",", "."));
            console.log(convertedSpeed);
            return convertedSpeed !== null && convertedSpeed >= 1.0 && convertedSpeed <= 1.5;
        },
        {
            message: "A velocidade mínima deve estar entre 1.0 Km/h e 1.5 Km/h",
        },
    ),
    velocidade_maxima: requiredStringField(3, 3, "Velocidade Máxima Inválida, insira com pontuação").refine(
        (value) => {
            const convertedSpeed = parseFloat(value.replace(",", "."));
            console.log(convertedSpeed);
            return convertedSpeed !== null && convertedSpeed >= 3.5 && convertedSpeed <= 5.0;
        },
        {
            message: "A velocidade máxima deve estar entre 3.5 Km/h e 5.0 Km/h",
        },
    ),
    rpm: requiredStringField(4, 4, "Rpm Inválido").refine(
        (value) => {
            const convertedRPM = parseInt(value);
            console.log(convertedRPM);
            return convertedRPM !== null && convertedRPM >= 1000 && convertedRPM <= 1500;
        },
        {
            message: "O RPM permitido é entre 1000 a 1500",
        },
    ),
});


