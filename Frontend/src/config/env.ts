import {z} from 'zod';

const envSchema = z.object ({
    VITE_NODE_ENV: z.enum(["development", "production"]).default("development"),
    VITE_BACKEND_URL: z.string(),
});
export const env = envSchema.parse(import.meta.env);
export type EnvType = z.infer<typeof envSchema> 