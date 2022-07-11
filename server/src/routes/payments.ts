import express from "express"
import { createCheckoutIntent } from "../controllers/payments"

export const paymentsRouter = express.Router()
paymentsRouter.post("/create-checkout-intent", createCheckoutIntent)
