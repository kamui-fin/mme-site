import { ErrorRequestHandler } from "express"
// import { logger } from "../utils"

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { httpCode, description } = err
    console.error(err)

    if (httpCode) res.status(httpCode)

    res.send({
        status: "err",
        message: description,
    })
}
