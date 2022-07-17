import express from "express"
import { register, login } from "../controllers/auth"
import { validate } from "../middlewares/validate"
import { loginSchema, registerSchema } from "../schemas/auth"

export const authRouter = express.Router()
authRouter.post("/register", validate(registerSchema), register)
authRouter.post("/login", validate(loginSchema), login)
