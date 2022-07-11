import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { AppDataSource, APP_PORT, FRONTEND_URI } from "./config"
import { errorHandler } from "./middlewares/error"
import { errors } from "celebrate"
import { router } from "./routes"
import { logger } from "./utils"
import "reflect-metadata"

const app = express()
app.use(cors({ origin: FRONTEND_URI, credentials: true }))
app.use(helmet())
app.use(morgan("combined"))
app.use(express.json())
app.use(router)
app.use(errors())
app.use(errorHandler)

AppDataSource.initialize()
    .then(() => {
        app.listen(APP_PORT, () => {
            logger.info(`Listening to port ${APP_PORT}`)
        })
    })
    .catch((error) => console.log(error))

process.on("unhandledRejection", (reason: Error) => {
    throw reason
})

process.on("uncaughtException", (error: Error) => {
    logger.error(error)
})
