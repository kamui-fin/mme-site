import { FORBIDDEN, UNAUTHORIZED } from "http-status"
import { TOKEN_KEY } from "../config"
import { ApiError } from "../utils"
import jwt from "jsonwebtoken"

export const authOnly = (req, res, next) => {
    const token = req.headers["Authorization"]
    if (!token) {
        throw new ApiError("Token required", FORBIDDEN)
    }
    try {
        const decoded = jwt.verify(token, TOKEN_KEY)
        req.user = decoded
    } catch (err) {
        return res.status(UNAUTHORIZED).send("Invalid token")
    }
}
