import dotenv from "dotenv"

dotenv.config()

export const {
    NODE_ENV = "development",
    APP_PORT = 3000,
} = process.env

