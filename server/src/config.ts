import dotenv from "dotenv"
import { DataSource } from "typeorm"

dotenv.config()

export const {
    NODE_ENV = "development",
    APP_PORT = 3000,
    POSTGRES_HOST = "localhost",
    POSTGRES_PORT = 5432,
    POSTGRES_USERNAME = "postgres",
    POSTGRES_PASSWORD = "postgres",
    POSTGRES_DB_NAME = "mme",
} = process.env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_NAME,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})
