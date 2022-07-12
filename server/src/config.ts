import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import Stripe from "stripe"

dotenv.config()

export const {
    NODE_ENV = "development",
    APP_PORT = 8000,
    POSTGRES_PORT = 5432,
    POSTGRES_USERNAME = "postgres",
    POSTGRES_PASSWORD = "postgres",
    POSTGRES_DB_NAME = "mme",
    TOKEN_KEY = "shhhhh",
    STRIPE_API_KEY,
} = process.env

export const STRAPI_URL = NODE_ENV === "production" ? process.env.STRAPI_URL : "http://localhost:1337"
export const FRONTEND_URL = NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:3000"
export const POSTGRES_HOST = NODE_ENV === "production" ? process.env.POSTGRES_HOST : "localhost"
console.log(NODE_ENV, STRAPI_URL, FRONTEND_URL, POSTGRES_HOST)

export const JWT_EXPIRE_TIME = "365d"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: POSTGRES_HOST,
    port: typeof POSTGRES_PORT === "string" ? Number.parseInt(POSTGRES_PORT) : POSTGRES_PORT,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})

export const stripe = new Stripe(STRIPE_API_KEY!, {
    apiVersion: "2020-08-27",
})
