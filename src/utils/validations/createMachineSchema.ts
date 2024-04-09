import { z } from 'zod';

const machineSchema = z.object({
    modelo:  z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
});