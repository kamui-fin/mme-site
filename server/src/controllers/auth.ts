import argon2 from "argon2"
import { CONFLICT, CREATED, OK } from "http-status"
import { AppDataSource, JWT_EXPIRE_TIME, TOKEN_KEY } from "../config"
import { User } from "../entity/User"
import { ApiError, catchAsync } from "../utils"
import jwt from "jsonwebtoken"

export const register = catchAsync(async (req, res) => {
    const { email, username, password } = req.body
    const userRepository = AppDataSource.getRepository(User)

    const oldUser = await userRepository.findOneBy({ email })
    if (oldUser) {
        throw new ApiError("User already exists", CONFLICT)
    }

    const hashed = await argon2.hash(password)
    const user = new User()
    user.email = email.toLowerCase()
    user.username = username
    user.password = hashed

    const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
        expiresIn: JWT_EXPIRE_TIME,
    })
    user.token = token
    await userRepository.save(user)

    res.status(CREATED).json(user)
})

export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ email })
    if (user && (await argon2.verify(user.password, password))) {
        const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
            expiresIn: JWT_EXPIRE_TIME,
        })
        user.token = token
        return res.status(OK).json(user)
    }
    throw new ApiError("Invalid credentials", 400)
})
