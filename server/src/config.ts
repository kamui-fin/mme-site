import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import stripeApi from "stripe"

dotenv.config()

export const {
    NODE_ENV = "development",
    APP_PORT = 8000,
    FRONTEND_URI = "http://localhost:3000",
    POSTGRES_HOST = "localhost",
    POSTGRES_PORT = 5432,
    POSTGRES_USERNAME = "postgres",
    POSTGRES_PASSWORD = "postgres",
    POSTGRES_DB_NAME = "mme",
    TOKEN_KEY = "shhhhh",
    STRIPE_API_KEY,
    STRAPI_URL = "http://localhost:1337"
} = process.env

export const JWT_EXPIRE_TIME = "365d"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})

export const stripe = stripeApi(STRIPE_API_KEY)
