import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { APP_PORT } from "./config"
import { errorHandler } from "./middlewares/error"
import { errors } from "celebrate"
import { router } from "./routes"
import { logger } from "./utils"

const app = express()
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(helmet())
app.use(morgan("combined"))
app.use(express.json())
app.use(router)
app.use(errors())
app.use(errorHandler)

app.listen(APP_PORT, () => {
    logger.info(`Listening to port ${APP_PORT}`)
})

process.on("unhandledRejection", (reason: Error) => {
    throw reason
})

process.on("uncaughtException", (error: Error) => {
    logger.error(error)
})
