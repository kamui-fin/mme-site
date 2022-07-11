import { Joi, Segments } from "celebrate"
import express from "express"
import { register, login, getCurrentUser } from "../controllers/auth"
import { validate } from "../utils"

export const authRouter = express.Router()
authRouter.post(
    "/register",
    register,
    validate({
        [Segments.BODY]: Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    })
)
authRouter.post(
    "/login",
    login,
    validate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    })
)
authRouter.get("/me", getCurrentUser)
