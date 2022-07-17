import express from "express"
import { createCheckoutIntent } from "../controllers/payments"
import { authOnly } from "../middlewares/auth"

export const paymentsRouter = express.Router()
paymentsRouter.post("/create-checkout-intent", createCheckoutIntent, authOnly)
