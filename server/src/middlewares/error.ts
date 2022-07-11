import { ErrorRequestHandler } from "express"
// import { logger } from "../utils"

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { httpCode, name, description } = err
    console.error(err)

    if (httpCode) res.status(httpCode)

    res.send({
        ok: false,
        error: {
            name,
            description,
        },
    })
}
