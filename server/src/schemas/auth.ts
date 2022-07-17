import { object, string, TypeOf } from "zod"

export const registerSchema = object({
    body: object({
        username: string({ required_error: "Username is required" }),
        email: string({ required_error: "Email is required" }).email("Invalid email"),
        password: string({ required_error: "Password is required" })
            .min(6, "Password must be more than 6 characters")
            .max(100, "Password must be less than 100 characters"),
        confirmPassword: string({ required_error: "Please confirm your password" }),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["passwordConfirm"],
        message: "Passwords do not match",
    }),
})

export const loginSchema = object({
    body: object({
        email: string({ required_error: "Email is required" }).email("Invalid email or password"),
        password: string({ required_error: "Password is required" }).min(8, "Invalid email or password"),
    }),
})

export type CreateUserInput = TypeOf<typeof registerSchema>["body"]
export type LoginUserInput = TypeOf<typeof loginSchema>["body"]
