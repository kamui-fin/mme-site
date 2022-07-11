import { catchAsync } from "../utils"
import { stripe } from "../config"
import { calculateOrderAmount } from "../services/products"

export const createCheckoutIntent = catchAsync(async (req, res) => {
    const { items } = req.body
    const intent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    })
    res.send({
        clientSecret: intent.client_secret,
    })
})
