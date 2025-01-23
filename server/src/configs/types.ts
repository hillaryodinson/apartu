import { z } from "zod";
import { loginSchema } from "./zod";

export type LoginType =  z.infer<typeof loginSchema>;