import z from "zod";


export const createUserZodSchema = z.object({
    name: z.string({ error: "Name is required" }),
    email: z.email("Invalid email format"),
    password: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters long"),
})